<script lang="ts">
	import { getHeadUrl } from '$lib/data/images';
	import { teamStore } from '$lib/stores/team.svelte';
	import type { Player } from '$lib/types/player';
	import { formatHeight, isStatRelevantToArchetype } from '$lib/util/stats';
	import Abilities from './Abilities.svelte';
	import OverallBadge from './badge/OverallBadge.svelte';
	import Stars from './Stars.svelte';

	let { player }: { player: Player } = $props();

	const topAbilities = $derived.by(() => {
		const statEntries = Object.entries(player.stats).filter(([stat]) =>
			isStatRelevantToArchetype(player, stat)
		);
		return statEntries.toSorted((a, b) => b[1] - a[1]).slice(0, 3);
	});
</script>

<button
	type="button"
	class="card cursor-pointer bg-base-200 transition-all duration-50 hover:bg-base-300"
	onclick={() => teamStore.selectPlayer(player.id)}
>
	<div class="card-body text-left">
		<div class="flex items-center gap-2">
			<img
				class="pointer-events-none -mt-8 h-24 w-24"
				src={getHeadUrl(player.skinTone, player.headIndex)}
				alt="Head"
			/>

			<div class="flex-1">
				<div class="inline-flex items-center gap-2">
					<div class="badge badge-soft text-nowrap badge-primary">
						{player.position} • #{player.jerseyNumber}
					</div>
					<h1 class="card-title">{player.firstName} {player.lastName}</h1>
					<OverallBadge ovr={player.ovr} />
				</div>

				<div class="flex flex-col gap-1">
					<p class="card-text opacity-50">{player.year} • {player.devTrait} • {player.archetype}</p>
					<p class="card-text">
						{formatHeight(player.height)} • {player.weight}lbs <Stars stars={player.starRating} />
					</p>
				</div>
			</div>
		</div>

		<!-- Top abilities -->
		<div class="flex gap-2">
			{#each topAbilities as [stat, value] (stat)}
				<div class="flex flex-col items-center rounded-md bg-base-300 px-5 py-1">
					<span class="text-xs">{stat}</span>
					<span class="text-base">{value}</span>
				</div>
			{/each}
		</div>

		{#if Object.keys(player.abilities).length > 0}
			<div class="flex gap-2">
				<Abilities abilities={player.abilities} />
			</div>
		{/if}

		{#if Object.keys(player.mentalAbilities).length > 0}
			<div class="flex gap-2">
				<Abilities abilities={player.mentalAbilities} />
			</div>
		{/if}
	</div>
</button>
