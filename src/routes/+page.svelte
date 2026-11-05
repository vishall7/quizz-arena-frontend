<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Button from '#lib/components/Button.svelte';
</script>

<svelte:head>
	<title>Quizz Arena</title>
</svelte:head>

<main
	class="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface px-6 text-center text-ink"
>
	<h1 class="text-8xl font-bold tracking-tight">
		<span class="text-accent">Quizz</span> Arena
	</h1>

	<Button size="lg" onclick={() => goto(resolve('/login'))}>Login</Button>
</main>
