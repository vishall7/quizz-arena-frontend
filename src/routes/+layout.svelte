<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';
    import { theme } from '#lib/stores/theme.svelte.ts';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => theme.init())
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
