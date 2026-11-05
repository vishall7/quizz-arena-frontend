import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

const SIGNUP_ENDPOINT = 'http://localhost:3000/api/v1/auth/signup';

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
	return 'Unable to create your account. Please check your details and try again.';
}

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const firstName = String(formData.get('first_name') ?? '').trim();
		const lastName = String(formData.get('last_name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const password = String(formData.get('password') ?? '');

		const values = { firstName, lastName, email };
		if (!firstName || !lastName || !email || !password) {
			return fail(400, {
				error: 'First name, last name, email, and password are required.',
				...values
			});
		}

		let response: Response;
		try {
			response = await fetch(SIGNUP_ENDPOINT, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password })
			});
		} catch {
			return fail(502, { error: 'Unable to reach the signup service.', ...values });
		}

		const body = await readResponse(response);
		if (!response.ok) {
			return fail(response.status >= 400 && response.status < 600 ? response.status : 502, {
				error: errorMessage(body),
				...values
			});
		}

		redirect(303, '/login');
	}
};
