<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import Button from '#lib/components/Button.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>Sign in | Quizz Arena</title>
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-surface px-6 text-ink">
	<form method="POST" use:enhance class="w-full max-w-md space-y-6" aria-labelledby="login-title">
		<div class="space-y-2">
			<p class="text-sm font-medium tracking-wide text-ink-muted uppercase">Quizz Arena</p>
			<h1 id="login-title" class="text-4xl font-bold">Sign in</h1>
			<p class="text-ink-muted">Welcome back. Enter your details to continue.</p>
		</div>

		{#if form?.error}
			<p class="rounded-md border border-danger bg-danger/10 p-3 text-sm text-danger" role="alert">
				{form.error}
			</p>
		{/if}

		<div class="space-y-4">
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
					autocomplete="current-password"
					required
					class="w-full rounded-md border border-stroke bg-surface-raised px-4 py-3 text-ink outline-none focus:border-stroke-strong"
				/>
			</label>
		</div>

		<Button type="submit" class="w-full">Sign in</Button>
		<p class="text-center text-sm text-ink-muted">
			Need an account?
			<a class="font-medium text-accent hover:text-accent-hover" href={resolve('/signup')}
				>Create one</a
			>
		</p>
	</form>
</main>
