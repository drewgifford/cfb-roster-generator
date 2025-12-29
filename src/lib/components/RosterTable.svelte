<script lang="ts">
	import { POSITION_ORDER, type PositionType } from '$lib/data/positions';
	import { teamStore } from '$lib/stores/team.svelte';
	import PlayerCard from './PlayerCard.svelte';
	let { roster } = teamStore;

	let selectedPosition = $state<PositionType | null>(null);
	let searchQuery = $state<string>('');

	const filteredRoster = $derived.by(() => {
		return Array.from(roster.values()).filter((player) => {
			if (selectedPosition && player.position !== selectedPosition) return false;
			if (
				searchQuery &&
				!player.firstName.toLowerCase().includes(searchQuery.toLowerCase()) &&
				!player.lastName.toLowerCase().includes(searchQuery.toLowerCase())
			)
				return false;
			return true;
		});
	});

	function getPlayersInPosition(position: PositionType) {
		return Array.from(roster.values()).filter((player) => player.position === position).length;
	}
</script>

<div class="my-4 flex w-full gap-2">
	<div>
		<select class="select-bordered select w-48" bind:value={selectedPosition}>
			<option value={null}>Choose a Position ({filteredRoster.length})</option>
			{#each POSITION_ORDER as position (position)}
				<option value={position}
					>{position} ({getPlayersInPosition(position as PositionType)})</option
				>
			{/each}
		</select>
	</div>

	<div class="flex-1">
		<input
			type="text"
			class="input-bordered input w-full"
			placeholder="Search for a player"
			bind:value={searchQuery}
		/>
	</div>

	<div>
		<button class="btn btn-primary" onclick={() => teamStore.exportRoster()}>Export to JSON</button>
	</div>
</div>

<div class="-mt-2 mb-2 text-right">
	<p>
		Download the <a
			target="_blank"
			class="text-blue-500"
			href="https://github.com/drewgifford/cfb-roster-generator">Firefox extension on GitHub</a
		> to import rosters into Team Builder.
	</p>
</div>
<div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
	{#each filteredRoster as player (player.id)}
		<PlayerCard {player} />
	{/each}
</div>
