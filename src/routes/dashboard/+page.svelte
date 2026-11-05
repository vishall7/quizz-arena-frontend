<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Dashboard | Quizz Arena</title>
</svelte:head>

<main class="flex min-h-screen items-center justify-center bg-surface px-6 text-ink">
	<h1 class="text-center text-4xl font-bold">Welcome, {data.name}</h1>
</main>
