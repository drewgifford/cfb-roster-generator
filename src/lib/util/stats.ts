import { Positions } from '$lib/data/positions';
import type { Player } from '$lib/types/player';
import type { PlayerStats } from '$lib/types/stats';

export function isStatRelevantToArchetype(player: Player, stat: string) {
	const positionData = Positions[player.position];
	const archetypeData = positionData.overallsByArchetype[player.archetype];
	if (!archetypeData) return false;
	return archetypeData.weights[stat as keyof PlayerStats] !== undefined;
}

export function getStat(stats: Partial<PlayerStats>, stat: string) {
	return stats[stat as keyof PlayerStats] ?? 0;
}

export function formatHeight(heightInInches: number) {
	const feet = Math.floor(heightInInches / 12);
	const inches = heightInInches % 12;
	return `${feet}'${inches}"`;
}
