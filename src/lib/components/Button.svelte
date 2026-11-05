<script lang="ts">
	import { cva } from 'class-variance-authority';
	import type { Snippet } from 'svelte';
	import { cn } from '#lib';

	const button = cva('rounded font-bold transition-colors cursor-pointer', {
		variants: {
			variant: {
				primary: 'bg-accent font-bold text-ink hover:bg-accent-hover',
				secondary: 'bg-transparent border border-stroke text-ink-raised hover:bg-accent-hover',
				danger: 'bg-red-600 text-white hover:bg-red-500'
			},
			size: {
				sm: 'px-3 py-1.5 text-sm',
				md: 'px-4 py-2 text-base',
				lg: 'px-6 py-3 text-lg'
			}
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md'
		}
	});

	interface Props {
		variant?: 'primary' | 'secondary' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	let { variant, size, class: className, children, ...rest }: Props = $props();
</script>

<button class={cn(button({ variant, size }), className)} {...rest}>
	{@render children()}
</button>
