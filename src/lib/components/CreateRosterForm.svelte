<script lang="ts">
	import { PRESETS } from '$lib/data/presets';
	import { DefenseSchemes, OffensiveSchemes } from '$lib/data/schemes';

	import { teamStore } from '$lib/stores/team.svelte';

	const teamConfig = $derived(teamStore.config);

	function handleGenerateRoster() {
		teamStore.generateRoster();
	}
</script>

<div class="card bg-base-100 shadow-xl">
	<div class="card-body">
		<h1 class="card-title text-4xl">CFB 26 Roster Generator</h1>

		<label for="offense" class="mt-2">Offense OVR {teamConfig.offensiveOVR}</label>
		<p class="-mt-2 text-sm text-gray-400">Determines a target OVR for offensive starters.</p>
		<input
			class="range range-primary range-sm"
			id="offense"
			type="range"
			min="12"
			max="99"
			bind:value={teamConfig.offensiveOVR}
			step="1"
		/>

		<label for="defense" class="mt-2">Defense OVR {teamConfig.defensiveOVR}</label>
		<p class="-mt-2 text-sm text-gray-400">Determines a target OVR for defensive starters.</p>
		<input
			class="range range-primary range-sm"
			id="defense"
			type="range"
			min="12"
			max="99"
			bind:value={teamConfig.defensiveOVR}
			step="1"
		/>

		<label for="program-rating" class="mt-2">Program Rating {teamConfig.programRating} stars</label>
		<p class="-mt-2 text-sm text-gray-400">
			Gives players a bonus to their HS star rating and development traits.
		</p>
		<input
			class="range range-primary range-sm"
			id="program-rating"
			type="range"
			min="0.5"
			max="5"
			step="0.5"
			bind:value={teamConfig.programRating}
		/>

		<label for="offensive-scheme" class="mt-2">Offensive Scheme</label>
		<p class="-mt-2 text-sm text-gray-400">
			Determines preferences for offensive players' archetypes.
		</p>
		<select id="offensive-scheme" class="select" bind:value={teamConfig.offensiveScheme}>
			{#each OffensiveSchemes as scheme (scheme)}
				<option value={scheme}>{scheme}</option>
			{/each}
		</select>

		<label for="defensive-scheme" class="mt-2">Defensive Scheme</label>
		<p class="-mt-2 text-sm text-gray-400">
			Determines preferences for defensive players' archetypes.
		</p>
		<select id="defensive-scheme" class="select" bind:value={teamConfig.defensiveScheme}>
			{#each DefenseSchemes as scheme (scheme)}
				<option value={scheme}>{scheme}</option>
			{/each}
		</select>

		<label for="defensive-scheme" class="mt-2">Roster Preset</label>
		<p class="-mt-2 text-sm text-gray-400">Determines the number of players for each position.</p>
		<select id="defensive-scheme" class="select" bind:value={teamConfig.preset}>
			{#each PRESETS as preset (preset)}
				<option value={preset}>{preset}</option>
			{/each}
		</select>

		<button class="btn mt-4 max-w-80 btn-primary" onclick={handleGenerateRoster}
			>Generate Roster</button
		>
	</div>
</div>
