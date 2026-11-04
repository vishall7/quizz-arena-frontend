# 01: Sign in and reach the authenticated welcome dashboard

**Blocked by:** None
**Type:** HITL

## What
Allow a returning user to log in through the existing backend and enter the protected `/dashboard` route. The dashboard welcomes the authenticated user by name, while visitors without a valid session are sent to `/login`.

## Acceptance criteria

- [ ] `/login` accepts an email and password and submits them to the backend login endpoint at `http://localhost:3000/api/v1/login`.
- [ ] A successful login establishes a session without exposing the access token to browser JavaScript, then redirects to `/dashboard`.
- [ ] `/dashboard` obtains the authenticated user's details from `http://localhost:3000/api/v1/users/me` and displays `Welcome, {name}` on a black screen.
- [ ] Accessing `/dashboard` with no token, an invalid token, or an expired token clears the local session and redirects to `/login`.
- [ ] Authenticated backend requests use the session access token; the browser does not directly make authenticated backend requests.
- [ ] Login failures show the backend-provided error message without creating a session.

## Notes

Successful login and current-user response field names must be confirmed from the backend before this issue can be completed.
