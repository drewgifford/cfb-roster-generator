import {
	type ArchetypeAnalysis,
	type BaselineFormula,
	type PlayerDb,
	type PositionAnalysis
} from '$lib/types/roster-conversion';
import { STAT_NAMES } from '$lib/types/stats';

function getStat(player: PlayerDb, stat: string): number {
	return Number(player[stat as keyof PlayerDb]);
}

function linearRegression(data: [number, number][]): BaselineFormula {
	const n = data.length;
	let sumX = 0,
		sumY = 0,
		sumXY = 0,
		sumX2 = 0;

	data.forEach(([x, y]) => {
		sumX += x;
		sumY += y;
		sumXY += x * y;
		sumX2 += x * x;
	});

	const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
	const intercept = (sumY - slope * sumX) / n;

	const yMean = sumY / n;
	let ssTotal = 0,
		ssResidual = 0;

	data.forEach(([x, y]) => {
		const yPred = slope * x + intercept;
		ssTotal += (y - yMean) ** 2;
		ssResidual += (y - yPred) ** 2;
	});

	const r2 = 1 - ssResidual / ssTotal;
	return { slope, intercept, r2 };
}

function pearsonCorrelation(x: number[], y: number[]): number {
	const n = x.length;
	const sumX = x.reduce((a, b) => a + b, 0);
	const sumY = y.reduce((a, b) => a + b, 0);
	const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
	const sumX2 = x.reduce((a, b) => a + b * b, 0);
	const sumY2 = y.reduce((a, b) => a + b * b, 0);

	const num = n * sumXY - sumX * sumY;
	const denom = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
	return num / denom;
}

function stdDev(values: number[]): number {
	const mean = values.reduce((a, b) => a + b, 0) / values.length;
	const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
	return Math.sqrt(variance);
}

export function analyzePosition(allPlayers: PlayerDb[], position: string): PositionAnalysis {
	console.log(`Analyzing position ${position}`);

	const players = allPlayers.filter((p) => p.position === position);
	const baselineFormulas: Record<string, BaselineFormula> = {};
	const stats = Object.keys(STAT_NAMES);

	stats.forEach((stat) => {
		const data = players
			.map((p) => [p.OVR, getStat(p, stat)])
			.filter(([o, s]) => !isNaN(o) && !isNaN(s));

		if (data.length > 1) {
			baselineFormulas[stat] = linearRegression(data as [number, number][]);
		}
	});

	const correlations: Record<string, Record<string, number>> = {};

	stats.forEach((stat) => {
		correlations[stat] = {};
		stats.forEach((otherStat) => {
			if (stat === otherStat) {
				correlations[stat][otherStat] = 1;
			} else {
				const vals1 = players.map((p) => getStat(p, stat)).filter((v) => !isNaN(v));
				const vals2 = players.map((p) => getStat(p, otherStat)).filter((v) => !isNaN(v));

				if (vals1.length > 1 && vals2.length > 1 && vals1.length === vals2.length) {
					correlations[stat][otherStat] = pearsonCorrelation(vals1, vals2);
				} else {
					correlations[stat][otherStat] = 0;
					console.warn(`Not enough data for ${stat} and ${otherStat}`);
				}
			}
		});
	});

	const stdDevs: Record<string, number> = {};
	stats.forEach((stat) => {
		const vals = players
			.map((p) => getStat(p, stat))
			.filter((v) => !isNaN(Number(v)))
			.map(Number);
		stdDevs[stat] = stdDev(vals);
	});

	const archetypes: Record<string, ArchetypeAnalysis> = {};
	const uniqueArchetypes = [...new Set(players.map((p) => p.archetype))];

	uniqueArchetypes.forEach((archetype) => {
		if (archetype === 'Edge Setter') archetype = 'Gap Specialist';

		const archetypePlayers = players.filter((p) => p.archetype === archetype);
		const deltas: Record<string, number> = {};

		stats.forEach((stat) => {
			if (baselineFormulas[stat]) {
				const playerDeltas = archetypePlayers
					.map((p) => {
						const baseline =
							baselineFormulas[stat].slope * p.OVR + baselineFormulas[stat].intercept;

						const actual = getStat(p, stat);
						return actual - baseline;
					})
					.filter((d) => !isNaN(d));

				if (playerDeltas.length > 0) {
					deltas[stat] = playerDeltas.reduce((a, b) => a + b, 0) / playerDeltas.length;
				}
			}
		});

		archetypes[archetype] = { deltas, sampleCount: archetypePlayers.length };
	});

	return { baselineFormulas, correlations, stdDevs, archetypes };
}
