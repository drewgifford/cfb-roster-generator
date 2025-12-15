import { SvelteMap } from 'svelte/reactivity';
import type { Player } from '$lib/types/player';
import { createDefaultTeamConfig, type TeamConfig } from '$lib/types/team';
import { generateRoster, regeneratePlayer } from '$lib/generation/player-generate';
import type { PlayerStats } from '$lib/types/stats';
import { calculatePlayerOvr } from '$lib/calculations/ovr';

class TeamStore {
	roster = $state<SvelteMap<string, Player>>(new SvelteMap());
	config = $state<TeamConfig>(createDefaultTeamConfig());
	selectedPlayerId = $state<string | null>(null);
	selectedPlayer = $derived(this.selectedPlayerId ? this.roster.get(this.selectedPlayerId) : null);
	usedJerseyNumbers = $state<Set<number>>(new Set());

	generateRoster() {
		const { players, usedJerseyNumbers } = generateRoster(this.config);
		for (const player of players) {
			this.roster.set(player.id, player);
		}
		this.usedJerseyNumbers = usedJerseyNumbers;
	}

	hasRoster() {
		return this.roster.size > 0;
	}

	hasSelectedPlayer() {
		return this.selectedPlayerId !== null;
	}

	selectPlayer(playerId: string | null) {
		this.selectedPlayerId = playerId;
	}

	updatePlayerStats(playerId: string, stats: Partial<PlayerStats>) {
		const player = this.roster.get(playerId);
		if (!player) return;

		const updatedPlayer = {
			...player,
			stats: { ...player.stats, ...stats }
		};

		updatedPlayer.ovr = calculatePlayerOvr(updatedPlayer);

		this.roster.set(playerId, updatedPlayer);
	}

	updatePlayer(playerId: string, updates: Partial<Player>) {
		const player = this.roster.get(playerId);
		if (!player) return;

		const updated = { ...player, ...updates };
		updated.ovr = calculatePlayerOvr(updated);
		this.roster.set(playerId, updated);
	}

	regeneratePlayer(playerId: string) {
		const player = this.roster.get(playerId);
		if (!player) return;

		const updatedPlayer = regeneratePlayer(player, this.config, this.usedJerseyNumbers);
		this.roster.set(playerId, updatedPlayer);
	}

	clearRoster() {
		this.roster.clear();
		this.usedJerseyNumbers.clear();
		this.selectedPlayerId = null;
	}

	exportRoster() {
		const out = {
			preset: this.config.preset,
			programRating: this.config.programRating,
			roster: Array.from(this.roster.values())
		};

		const a = document.createElement('a');
		const file = new Blob([JSON.stringify(out)], { type: 'application/json' });
		a.href = URL.createObjectURL(file);

		const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
		a.download = `cfb26-team-${date}.json`;
		a.click();
	}
}

export const teamStore = new TeamStore();
