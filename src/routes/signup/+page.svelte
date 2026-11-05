<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Button from '#lib/components/Button.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>Sign up | Quizz Arena</title>
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-surface px-6 text-ink">
	<form method="POST" use:enhance class="w-full max-w-md space-y-6" aria-labelledby="signup-title">
		<div class="space-y-2">
			<p class="text-sm font-medium tracking-wide text-ink-muted uppercase">Quizz Arena</p>
			<h1 id="signup-title" class="text-4xl font-bold">Create your account</h1>
			<p class="text-ink-muted">Sign up to start playing quizzes.</p>
		</div>

		{#if form?.error}
			<p class="rounded-md border border-danger bg-danger/10 p-3 text-sm text-danger" role="alert">
				{form.error}
			</p>
		{/if}

		<div class="space-y-4">
			<label class="block space-y-2">
				<span class="text-sm font-medium">First name</span>
				<input
					name="first_name"
					type="text"
					autocomplete="given-name"
					required
					value={form?.firstName ?? ''}
					class="w-full rounded-md border border-stroke bg-surface-raised px-4 py-3 text-ink outline-none focus:border-stroke-strong"
				/>
			</label>
			<label class="block space-y-2">
				<span class="text-sm font-medium">Last name</span>
				<input
					name="last_name"
					type="text"
					autocomplete="family-name"
					required
					value={form?.lastName ?? ''}
					class="w-full rounded-md border border-stroke bg-surface-raised px-4 py-3 text-ink outline-none focus:border-stroke-strong"
				/>
			</label>
			<label class="block space-y-2">
				<span class="text-sm font-medium">Email</span>
				<input
					name="email"
					type="email"
					autocomplete="email"
					required
					value={form?.email ?? ''}
					class="w-full rounded-md border border-stroke bg-surface-raised px-4 py-3 text-ink outline-none focus:border-stroke-strong"
				/>
			</label>
			<label class="block space-y-2">
				<span class="text-sm font-medium">Password</span>
				<input
					name="password"
					type="password"
					autocomplete="new-password"
					required
					class="w-full rounded-md border border-stroke bg-surface-raised px-4 py-3 text-ink outline-none focus:border-stroke-strong"
				/>
			</label>
		</div>

		<Button type="submit" class="w-full">Create account</Button>
		<p class="text-center text-sm text-ink-muted">
			Already have an account?
			<a class="font-medium text-accent hover:text-accent-hover" href={resolve('/login')}>Sign in</a
			>
		</p>
	</form>
</main>
