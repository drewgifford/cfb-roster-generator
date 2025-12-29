<script lang="ts">
	import { calculatePlayerOvr } from '$lib/calculations/ovr';
	import { getHeadUrl, headUrls } from '$lib/data/images';
	import { getArchetypesForPosition } from '$lib/data/positions';
	import { teamStore } from '$lib/stores/team.svelte';
	import {
		DEALBREAKERS,
		DEV_TRAITS,
		POTENTIALS,
		YEAR_DISPLAY,
		YEARS,
		type Dealbreaker,
		type PlayerPotential,
		type Handedness,
		type DevTrait,
		type Year,
		type Player
	} from '$lib/types/player';
	import { formatHeight } from '$lib/util/stats';
	import Abilities from './Abilities.svelte';
	import OverallBadge from './badge/OverallBadge.svelte';
	import Stars from './Stars.svelte';
	import StatGrid from './stat/StatGrid.svelte';

	const selectedPlayer = $derived(teamStore.selectedPlayer);

	const overallsByArchetype = $derived.by(() => {
		const archetypes = getArchetypesForPosition(selectedPlayer?.position ?? 'QB');
		if (!selectedPlayer) return [];

		return archetypes
			.map((archetype) => {
				const copiedPlayer = { ...selectedPlayer, archetype };
				return {
					archetype,
					ovr: calculatePlayerOvr(copiedPlayer)
				};
			})
			.sort((a, b) => b.ovr - a.ovr);
	});

	// Helper to trigger store updates while typing/selecting
	function update(updates: Partial<Player>) {
		if (!selectedPlayer) return;
		teamStore.updatePlayer(selectedPlayer.id, updates);
	}
</script>

{#if selectedPlayer}
	<div class="card mb-4 bg-base-200 text-left">
		<div class="card-body">
			<div class="flex gap-2">
				<button
					type="button"
					class="btn w-40 btn-sm btn-error"
					onclick={() => teamStore.selectPlayer(null)}
				>
					&lt; Back to roster
				</button>

				<button
					type="button"
					class="btn w-40 btn-sm btn-warning"
					onclick={() => teamStore.regeneratePlayer(selectedPlayer.id)}
				>
					Regenerate Player
				</button>
			</div>

			<div class="flex items-center gap-4">
				<div class="flex flex-col gap-2">
					<img
						class="pointer-events-none -mt-8 h-36 w-36"
						src={getHeadUrl(selectedPlayer.skinTone, selectedPlayer.headIndex)}
						alt="Head"
					/>

					<div class="flex flex-col gap-2">
						<div>
							<label for="skinTone">Skin Tone</label>
							<input
								class="range range-primary range-sm"
								id="skinTone"
								type="range"
								min="0"
								max="7"
								step="1"
								value={selectedPlayer.skinTone}
								oninput={(e) => update({ skinTone: Number(e.currentTarget.value) })}
							/>
						</div>
						<div>
							<label for="headIndex">Head</label>
							<input
								class="range range-primary range-sm"
								id="headIndex"
								type="range"
								min="0"
								max={headUrls[selectedPlayer.skinTone as keyof typeof headUrls].length - 1}
								step="1"
								value={selectedPlayer.headIndex}
								oninput={(e) => update({ headIndex: Number(e.currentTarget.value) })}
							/>
						</div>
					</div>
				</div>

				<div class="flex-1">
					<h1 class="card-title text-3xl">
						<div class="badge badge-primary">{selectedPlayer.position}</div>
						{selectedPlayer.firstName}
						{selectedPlayer.lastName}
						<OverallBadge ovr={selectedPlayer.ovr} />
					</h1>

					<div>
						<h2 class="text-lg font-bold">Player Bio</h2>
						<div class="flex max-w-4xl flex-wrap gap-2">
							<div>
								<label for="firstName">First Name</label>
								<!-- Using oninput for live updates while typing -->
								<input
									type="text"
									id="firstName"
									class="input-bordered input"
									value={selectedPlayer.firstName}
									oninput={(e) => update({ firstName: e.currentTarget.value })}
								/>
							</div>
							<div>
								<label for="lastName">Last Name</label>
								<input
									type="text"
									id="lastName"
									class="input-bordered input"
									value={selectedPlayer.lastName}
									oninput={(e) => update({ lastName: e.currentTarget.value })}
								/>
							</div>

							<div>
								<label for="year">Year</label>
								<select
									id="year"
									class="select-soft select min-w-24"
									value={selectedPlayer.year}
									onchange={(e) => update({ year: e.currentTarget.value as Year })}
								>
									{#each YEARS as year (year)}
										<option value={year}>{YEAR_DISPLAY[year]}</option>
									{/each}
								</select>
							</div>

							<div class="max-w-24">
								<label for="height">Height ({formatHeight(selectedPlayer.height)})</label>
								<input
									type="number"
									id="height"
									class="input-bordered input"
									value={selectedPlayer.height}
									oninput={(e) => update({ height: Number(e.currentTarget.value) })}
								/>
							</div>
							<div class="max-w-24">
								<label for="weight">Weight (lbs)</label>
								<input
									type="number"
									id="weight"
									class="input-bordered input"
									value={selectedPlayer.weight}
									oninput={(e) => update({ weight: Number(e.currentTarget.value) })}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h2 class="text-lg font-bold">Player Traits</h2>

				<div class="flex max-w-4xl flex-wrap gap-2">
					<div>
						<label for="archetype">Archetype</label>
						<select
							id="archetype"
							class="select-soft select"
							value={selectedPlayer.archetype}
							onchange={(e) => update({ archetype: e.currentTarget.value })}
						>
							{#each overallsByArchetype as overall (overall.archetype)}
								<option value={overall.archetype}
									>{overall.archetype} <OverallBadge ovr={overall.ovr} /></option
								>
							{/each}
						</select>
					</div>

					<div>
						<label for="devTrait">Development Trait</label>
						<select
							id="devTrait"
							class="select-soft select min-w-24"
							value={selectedPlayer.devTrait}
							onchange={(e) => update({ devTrait: e.currentTarget.value as DevTrait })}
						>
							{#each DEV_TRAITS as devTrait (devTrait)}
								<option value={devTrait}>{devTrait}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="potential">Potential</label>
						<select
							id="potential"
							class="select-soft select min-w-24"
							value={selectedPlayer.potential}
							onchange={(e) => update({ potential: e.currentTarget.value as PlayerPotential })}
						>
							{#each POTENTIALS as potential (potential)}
								<option value={potential}>{potential}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="handedness">Handedness</label>
						<select
							id="handedness"
							class="select-soft select min-w-24"
							value={selectedPlayer.handedness}
							onchange={(e) => update({ handedness: e.currentTarget.value as Handedness })}
						>
							{#each ['Left', 'Right'] as handedness (handedness)}
								<option value={handedness}>{handedness}</option>
							{/each}
						</select>
					</div>

					<div class="w-48">
						<label for="star-rating"
							>HS Star Rating <Stars stars={selectedPlayer.starRating} /></label
						>
						<input
							class="range range-primary range-sm"
							id="star-rating"
							type="range"
							min="1"
							max="5"
							step="1"
							value={selectedPlayer.starRating}
							oninput={(e) => update({ starRating: Number(e.currentTarget.value) })}
						/>
					</div>

					<div>
						<label for="dealbreaker">Dealbreaker</label>
						<select
							id="dealbreaker"
							class="select-soft select min-w-24"
							value={selectedPlayer.dealbreaker}
							onchange={(e) => update({ dealbreaker: e.currentTarget.value as Dealbreaker })}
						>
							{#each DEALBREAKERS as dealbreaker (dealbreaker)}
								<option value={dealbreaker}>{dealbreaker}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			{#if Object.keys(selectedPlayer.abilities).length > 0}
				<div class="mb-2">
					<h2 class="text-lg font-bold">Physical Abilities</h2>
					<Abilities abilities={selectedPlayer.abilities} />
				</div>
			{/if}

			{#if Object.keys(selectedPlayer.mentalAbilities).length > 0}
				<div class="mb-2">
					<h2 class="text-lg font-bold">Mental Abilities</h2>
					<Abilities abilities={selectedPlayer.mentalAbilities} />
				</div>
			{/if}

			<!-- Ensure StatGrid also doesn't use bind:value if you want OVR to update live -->
			<StatGrid player={selectedPlayer} />
		</div>
	</div>
{/if}
