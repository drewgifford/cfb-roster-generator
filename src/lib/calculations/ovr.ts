import { PositionGroups } from '$lib/data/position-groups';
import { Positions, type PositionType } from '$lib/data/positions';
import type { PlayerStats } from '$lib/types/stats';

export interface CalculatePlayerOvrParams {
	stats: PlayerStats;
	position: PositionType;
	archetype: string;
}

export function calculatePlayerOvr<T extends CalculatePlayerOvrParams>(params: T): number {
	const position = params.position;
	const archetype = params.archetype;
	const posData = Positions[position];
	const archetypeData = posData.overallsByArchetype[archetype];
	const positionGroup = posData.positionGroup;
	const posGroupData = PositionGroups[positionGroup];
	const statMeans = posGroupData.statMeans;

	if (!archetypeData || !statMeans) return 0;

	const { weights, intercept } = archetypeData;

	let weightedSum = 0;
	Object.keys(weights).forEach((stat) => {
		// Safe access with fallback to avoid NaN
		weightedSum +=
			(params.stats[stat as keyof PlayerStats] || 0) * (weights[stat as keyof PlayerStats] ?? 0);
	});

	const ovr = Math.round(weightedSum + intercept);
	return ovr;
}
