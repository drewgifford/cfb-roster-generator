<script lang="ts">
	let { stars }: { stars: number } = $props();

	const starArray = $derived.by(() => Array(stars).fill(0));
</script>

<div class="flex inline-block gap-1">
	{#each starArray as _, i (i)}
		<span class="text-yellow-500">★</span>
	{/each}
</div>
