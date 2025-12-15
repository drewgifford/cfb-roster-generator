<script>
	// Simple click outside handler (optional)
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let { children } = $props();

	function close() {
		dispatch('close');
	}

	$effect(() => {
		// 1. Lock scroll on the body
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		// 2. Cleanup function runs when component is destroyed (unmounted)
		return () => {
			document.body.style.overflow = originalOverflow;
		};
	});
</script>

<div
	class="fixed inset-0 z-50 overflow-y-auto bg-base-100/60 backdrop-blur-sm"
	onclick={close}
	role="presentation"
>
	<div class="flex min-h-full items-center justify-center p-4">
		<button type="button" onclick={(e) => e.stopPropagation()} class="w-full max-w-5xl">
			{@render children()}
		</button>
	</div>
</div>
