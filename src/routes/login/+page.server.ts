import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const LOGIN_ENDPOINT = 'http://localhost:3000/api/v1/auth/login';
const SESSION_COOKIE = 'access_token';

type BackendResponse = Record<string, unknown>;

async function readResponse(response: Response): Promise<BackendResponse> {
	try {
		const body: unknown = await response.json();
		return body && typeof body === 'object' ? (body as BackendResponse) : {};
	} catch {
		return {};
	}
}

function errorMessage(body: BackendResponse): string {
	const detail = body.detail ?? body.message ?? body.error;
	if (typeof detail === 'string') return detail;
	if (Array.isArray(detail)) {
		return detail
			.map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
			.join(', ');
	}
	return 'Unable to sign in. Please check your credentials and try again.';
}

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required.', email });
		}

		let response: Response;
		try {
			response = await fetch(LOGIN_ENDPOINT, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
		} catch {
			return fail(502, { error: 'Unable to reach the login service.', email });
		}

		const body = await readResponse(response);
		if (!response.ok) {
			return fail(response.status >= 400 && response.status < 600 ? response.status : 502, {
				error: errorMessage(body),
				email
			});
		}

		const result =
			body.data && typeof body.data === 'object' ? (body.data as BackendResponse) : body;
		const accessToken = result.access_token ?? result.accessToken ?? result.token;
		if (typeof accessToken !== 'string' || !accessToken) {
			return fail(502, { error: 'The login service returned no access token.', email });
		}

		cookies.set(SESSION_COOKIE, accessToken, {
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});

		redirect(303, '/dashboard');
	}
};
