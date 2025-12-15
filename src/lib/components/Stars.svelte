<script lang="ts">
	let { stars }: { stars: number } = $props();

	const starArray = $derived.by(() => Array(stars).fill(true));
</script>

<div class="flex inline-block gap-1">
	{#each starArray as star, i (i)}
		<span class="text-yellow-500">{star && '★'}</span>
	{/each}
</div>
