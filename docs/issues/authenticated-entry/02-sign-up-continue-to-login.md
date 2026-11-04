# 02: Sign up and continue to login

**Blocked by:** 01
**Type:** HITL

## What
Allow a new user to create an account through the existing signup backend endpoint. A successful signup does not authenticate the user and instead directs them to the login page.

## Acceptance criteria

- [ ] `/signup` accepts first name, last name, email, and password.
- [ ] The submitted signup data is sent to `http://localhost:3000/api/v1/auth/signup`.
- [ ] A successful signup redirects the user to `/login` without establishing a session.
- [ ] Backend validation and other signup failures show the provided error message and preserve the user's ability to correct and resubmit the form.
- [ ] The access token is neither requested nor stored as part of signup.

## Notes

The backend's success response shape must be confirmed while implementing the success path.
