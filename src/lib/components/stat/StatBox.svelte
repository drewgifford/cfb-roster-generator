<script lang="ts">
	import { teamStore } from '$lib/stores/team.svelte';
	import type { Player } from '$lib/types/player';
	import { STAT_NAMES } from '$lib/types/stats';
	import { getStat } from '$lib/util/stats';

	let { key, player, star = false }: { player: Player; key: string; star?: boolean } = $props();

	const value = $derived(getStat(player.stats, key));
	const name = $derived(STAT_NAMES[key as keyof typeof STAT_NAMES]);

	function handleStatChange(key: string, event: Event) {
		const target = event.target as HTMLInputElement;
		const value = parseInt(target.value, 10);
		if (!isNaN(value)) {
			teamStore.updatePlayerStats(player.id, { [key]: value });
		}
	}
</script>

<div>
	<label for={key} class="text-sm">
		{#if star}
			<span class="text-secondary">★</span>
		{/if}

		{name} ({key})</label
	>
	<input
		onchange={(e) => handleStatChange(key, e)}
		type="number"
		class="input-bordered input"
		{value}
		min="0"
		max="99"
		step="1"
	/>
</div>
