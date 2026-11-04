# PRD: Authenticated Entry

## Problem
Quizz Arena does not yet provide a way for visitors to create an account, sign in, or access an authenticated starting experience. Users need a clear public entry point and a protected dashboard that recognizes them after authentication.

## Goal
Deliver the first authentication slice: public landing, signup, and login experiences, plus a protected dashboard that welcomes the signed-in user by name.

## User Stories
- As a visitor, I want to see a simple landing page with paths to sign up or log in, so that I can begin using Quizz Arena.
- As a new user, I want to sign up and then proceed to login, so that I can access my account.
- As a returning user, I want to log in with the existing backend, so that I can access the dashboard.
- As an authenticated user, I want to see a welcome message containing my name, so that I know I have reached my account area.
- As an unauthenticated visitor, I want protected pages to require login, so that account data remains private.

## Requirements
- The public `/` route displays a black screen with a prominent heading and buttons or links for Login and Sign up.
- The `/signup` route submits signup details to the existing backend. A successful signup sends the user to `/login`; signup does not authenticate the user.
- The `/login` route submits login details to the existing backend. A successful login establishes an authenticated session using the returned access token and sends the user to `/dashboard`.
- The `/dashboard` route is authenticated and displays `Welcome, {name}`, using the signed-in user's name from the backend's current-user data.
- Authenticated data access uses the backend access token. The token must not be exposed to browser JavaScript or browser-managed token storage.
- An absent, invalid, or expired token prevents dashboard access, ends the local session, and sends the user to `/login`.
- Signup, login, current-user lookup, and future dashboard data access are handled through the SvelteKit server rather than directly from page client code.
- The existing fonts, spacing, and colors remain the design foundation; the pages in this slice use a black screen presentation.

## Boundaries
This slice owns the public entry routes, signup and login flows, authenticated session use, dashboard access control, and the initial welcome screen. It connects the SvelteKit application to the existing authentication backend at `http://localhost:3000/api/v1`, including signup at `/auth/signup`, login at `/login`, and current-user lookup at `/users/me`.

## Out of Scope
- Refresh tokens and automatic token renewal.
- Quiz lists, quiz play, user profile editing, and other dashboard features.
- A broader dashboard design beyond the welcome message.
- Changes to the backend authentication design or endpoint naming.

## Success Criteria
- Visitors can navigate from `/` to signup or login.
- A successful signup leads to login without granting dashboard access.
- A successful login leads to `/dashboard`.
- `/dashboard` shows the authenticated user's name in the welcome message.
- Direct access to `/dashboard` without a valid session redirects to `/login`.
- Authentication tokens are not available to browser JavaScript.

## Open Questions
- The exact signup and login request/response field names have not been provided.
- Cookie lifetime and the desired post-login redirect behavior beyond `/dashboard` have not been specified.
