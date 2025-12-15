<script lang="ts">
	import type { Player } from '$lib/types/player';
	import { ALL_STAT_KEYS } from '$lib/types/stats';
	import { isStatRelevantToArchetype } from '$lib/util/stats';
	import StatBox from './StatBox.svelte';

	let { player }: { player: Player } = $props();

	const relevantStats = $derived.by(() => {
		return ALL_STAT_KEYS.filter((stat) => isStatRelevantToArchetype(player, stat)).sort((a, b) =>
			a.localeCompare(b)
		);
	});

	const otherStats = $derived.by(() => {
		return ALL_STAT_KEYS.filter((stat) => !relevantStats.includes(stat)).sort((a, b) =>
			a.localeCompare(b)
		);
	});
</script>

{#if player}
	<div class="w-full rounded-md bg-base-100 p-4">
		<div>
			<h2 class="text-lg font-bold">Relevant Stats</h2>
			<p class="text-content text-sm">
				These stats are used to calculate the player's overall rating.
			</p>
		</div>

		<div class="mt-2 grid w-full grid-cols-4 gap-2">
			{#each relevantStats as stat (stat)}
				<StatBox {player} key={stat} star />
			{/each}
		</div>
	</div>

	<div class="w-full rounded-md bg-base-200 p-4">
		<div>
			<h2 class="text-lg font-bold">Other Stats</h2>
			<p class="text-content text-sm">
				These stats are not included in the player's overall rating.
			</p>
		</div>

		<div class="mt-2 grid w-full grid-cols-4 gap-2">
			{#each otherStats as stat (stat)}
				<StatBox {player} key={stat} />
			{/each}
		</div>
	</div>
{/if}
