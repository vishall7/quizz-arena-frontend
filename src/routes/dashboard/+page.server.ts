import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const CURRENT_USER_ENDPOINT = 'http://localhost:3000/api/v1/users/me';
const SESSION_COOKIE = 'access_token';

type User = Record<string, unknown>;

function userName(user: User): string {
	const responseData = user.data && typeof user.data === 'object' ? (user.data as User) : user;
	const nested =
		responseData.user && typeof responseData.user === 'object'
			? (responseData.user as User)
			: responseData;
	const directName = nested.name ?? nested.full_name ?? nested.fullName ?? nested.username;
	if (typeof directName === 'string' && directName.trim()) return directName;

	const firstName = nested.first_name ?? nested.firstName;
	const lastName = nested.last_name ?? nested.lastName;
	if (typeof firstName === 'string' || typeof lastName === 'string') {
		return [firstName, lastName]
			.filter((part): part is string => typeof part === 'string' && part.length > 0)
			.join(' ');
	}

	return typeof nested.email === 'string' ? nested.email : 'there';
}

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const accessToken = cookies.get(SESSION_COOKIE);
	if (!accessToken) redirect(303, '/login');

	let response: Response;
	try {
		response = await fetch(CURRENT_USER_ENDPOINT, {
			headers: { Authorization: `Bearer ${accessToken}` }
    });
	} catch {
		cookies.delete(SESSION_COOKIE, { path: '/' });
		redirect(303, '/login');
	}

	if (!response.ok) {
		cookies.delete(SESSION_COOKIE, { path: '/' });
		redirect(303, '/login');
	}

	try {
		const body: unknown = await response.json();
		const user = body && typeof body === 'object' ? (body as User) : {};
		return { name: userName(user) };
	} catch {
		cookies.delete(SESSION_COOKIE, { path: '/' });
		redirect(303, '/login');
	}
};
