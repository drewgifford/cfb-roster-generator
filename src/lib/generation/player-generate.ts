import { generateRandomName } from '$lib/data/names';
import { STAT_CATEGORIES, type PlayerStats } from '$lib/types/stats';
import {
	PositionGroups,
	type MentalAbility,
	type PositionGroupType
} from '$lib/data/position-groups';
import { Positions, type PositionType, type PositionData, isOffense } from '$lib/data/positions';
import { POSITION_COUNTS } from '$lib/data/presets';
import { OFFENSE_SCHEMES, DEFENSE_SCHEMES, type ArchetypeWeights } from '$lib/data/schemes';
import type { Dealbreaker, Handedness, Player, PlayerPotential, Year } from '$lib/types/player';
import type { TeamConfig } from '$lib/types/team';
import { calculatePlayerOvr } from '$lib/calculations/ovr';

export interface GeneratePlayerParams {
	position: PositionType;
	depth: number;
	maxDepth: number;
	archetypeWeights: ArchetypeWeights;
	usedJerseyNumbers: Set<number>;
	baseTeamOvr: number;
	programRating: number;
}

export function generatePlayer(params: GeneratePlayerParams) {
	const { firstName, lastName } = generateRandomName();

	const { depth, maxDepth, baseTeamOvr, position, programRating, usedJerseyNumbers } = params;

	const positionData = Positions[position];

	const archetype = getPlayerArchetype(params.archetypeWeights, positionData);

	const role = getRosterRole(depth, maxDepth);

	const targetOvr = getTargetOvr(baseTeamOvr, depth, maxDepth, role);

	const year = getYear(targetOvr, depth);

	const devTrait = getDevTrait(targetOvr, year, programRating);

	const stats = getStatsForArchetype(position, archetype, targetOvr);

	const { height, weight } = getPhysicals(positionData, stats, programRating);

	const jerseyNumber = getJerseyNumber(positionData, usedJerseyNumbers);

	const handedness = getHandedness();

	const potential = getPlayerPotential(targetOvr, devTrait, year);

	const starRating = getHSStarRating(targetOvr, year, programRating);

	const dealbreaker = getDealbreaker(starRating, potential);

	const abilities = getAbilities(position, archetype, stats, year, devTrait, potential);

	const mentalAbilities = getMentalAbilities(position, potential);

	usedJerseyNumbers.add(jerseyNumber);

	const player: Player = {
		id: crypto.randomUUID(),
		firstName,
		lastName,
		archetype,
		year,
		position,
		starRating,
		devTrait,
		stats,
		height,
		ovr: targetOvr,
		weight,
		potential,
		handedness,
		dealbreaker,
		jerseyNumber,
		depth,
		abilities,
		isLocked: false,
		mentalAbilities
	};
	return player;
}

export function generateRoster(params: TeamConfig) {
	const { preset, offensiveOVR, defensiveOVR, programRating } = params;

	console.log('params', params);

	const usedJerseyNumbers: Set<number> = new Set();
	const players: Player[] = [];
	const positionCounts = POSITION_COUNTS[preset];

	const archetypeWeights = getRosterArchetypeWeights(params);

	for (const [positionKey, count] of Object.entries(positionCounts)) {
		const position = positionKey as PositionType;

		const baseTeamOvr = isOffense(position) ? offensiveOVR : defensiveOVR;

		for (let depth = 1; depth <= count; depth++) {
			const player = generatePlayer({
				position,
				depth,
				maxDepth: count,
				usedJerseyNumbers,
				archetypeWeights,
				baseTeamOvr,
				programRating
			});

			players.push(player);
		}
	}
	return { players, usedJerseyNumbers };
}

function getRosterArchetypeWeights(teamConfig: TeamConfig) {
	const { offensiveScheme, defensiveScheme } = teamConfig;
	const archetypeWeights: ArchetypeWeights = {};

	const offenseSchemeDef = OFFENSE_SCHEMES[offensiveScheme].archetypeWeights;
	const defenseSchemeDef = DEFENSE_SCHEMES[defensiveScheme].archetypeWeights;

	// Merge scheme weights
	for (const [group, data] of [
		...Object.entries(offenseSchemeDef),
		...Object.entries(defenseSchemeDef)
	]) {
		archetypeWeights[group as PositionGroupType] = data;
	}
	return archetypeWeights;
}

function getPlayerArchetype(
	archetypeWeights: ArchetypeWeights,
	positionData: PositionData
): string {
	const archetypePriorities = archetypeWeights[positionData.positionGroup]!;

	// Get total weight
	const totalWeight = Object.values(archetypePriorities).reduce(
		(sum, next) => (sum = sum + next),
		0
	);

	// Generate random number
	const rand = Math.round(Math.random() * totalWeight);
	let currWeight = 0;

	for (const [archetype, weight] of Object.entries(archetypePriorities)) {
		currWeight += weight;
		if (rand <= currWeight) return archetype;
	}
	return Object.keys(archetypePriorities).at(-1)!;
}

function getPlayerPotential(currentOvr: number, devTrait: DevTrait, year: Year): PlayerPotential {
	let basePotentialScore = 75;

	switch (devTrait) {
		case 'Elite':
			basePotentialScore = 96;
			break;
		case 'Star':
			basePotentialScore = 90;
			break;
		case 'Impact':
			basePotentialScore = 84;
			break;
		default:
			break;
	}

	let varianceRange = 0;

	switch (year) {
		case 'SR':
			varianceRange = 10;
			break;
		case 'JR':
			varianceRange = 8;
			break;
		case 'SO':
			varianceRange = 6;
			break;
		default:
			varianceRange = 4;
			break;
	}

	const randomVariance = Math.random() * varianceRange * 2 - varianceRange;
	let projectedCeiling = basePotentialScore + randomVariance;

	if (projectedCeiling < currentOvr) {
		projectedCeiling = currentOvr;
	}

	if (projectedCeiling >= 90) {
		return 'High';
	} else if (projectedCeiling >= 80) {
		return 'Medium';
	} else {
		return 'Low';
	}
}

type RosterRole = 'Star' | 'Quality' | 'Average' | 'Developing' | 'Project';
function getRosterRole(depth: number, maxDepth: number): RosterRole {
	const rand = Math.random();
	const isRotation = depth <= Math.ceil(maxDepth / 2);

	if (depth === 1) {
		// The True Starter
		if (rand < 0.15) return 'Star';
		if (rand < 0.6) return 'Quality';
		if (rand < 0.9) return 'Average';
		return 'Developing';
	}

	if (isRotation) {
		// Rotation Players (WR2/3, CB2/3, or QB2 in small rooms)
		// Decent chance at Quality/Average.
		if (rand < 0.05) return 'Star'; // Rare Hidden Gem
		if (rand < 0.25) return 'Quality'; // Solid contributor
		if (rand < 0.7) return 'Average'; // Most likely
		if (rand < 0.9) return 'Developing';
		return 'Project';
	}

	// Deep Bench (The Plateau)
	// Mostly Developing or Average.
	if (rand < 0.02) return 'Quality'; // Very rare
	if (rand < 0.3) return 'Average'; // Serviceable backup
	if (rand < 0.8) return 'Developing'; // Standard young player
	return 'Project';
}

function getHandedness(): Handedness {
	const rand = Math.random();
	if (rand < 0.13) return 'Left';
	else return 'Right';
}

function getMentalAbilities(
	position: PositionType,
	potential: PlayerPotential
): Record<string, number> {
	let pointsToSpend = 0;
	switch (potential) {
		case 'Low':
			pointsToSpend = 5;
			break;
		case 'Medium':
			pointsToSpend = 10;
			break;
		case 'High':
			pointsToSpend = 20;
			break;
	}

	const randomModifier = Math.random() * 0.5 - 0.25;
	pointsToSpend *= 1 + randomModifier;

	const selectedAbilities: Record<
		string,
		{
			level: number;
			nextLevelCost: number;
		}
	> = {};

	const positionData = Positions[position];
	const positionGroupData = PositionGroups[positionData.positionGroup];
	const mentalAbilities = positionGroupData.mentalAbilities;

	for (const ability of mentalAbilities) {
		selectedAbilities[ability] = {
			level: 0,
			nextLevelCost: 5
		};
	}

	function getPurchaseableAbilities() {
		return Object.entries(selectedAbilities).filter(([, data]) => {
			return data.nextLevelCost <= pointsToSpend;
		});
	}

	let purchaseableAbilities = getPurchaseableAbilities();

	while (purchaseableAbilities.length > 0 && pointsToSpend > 0) {
		// If they have an existing ability they have a chance to upgrade it
		const existingAbilities = Object.entries(selectedAbilities).filter(([, data]) => {
			return data.level > 0;
		});

		const upgradeAbilitRand = Math.random();
		if (existingAbilities.length > 0 && upgradeAbilitRand < 0.4) {
			const [, existingAbilityData] =
				existingAbilities[Math.floor(Math.random() * existingAbilities.length)];
			existingAbilityData.level++;
			pointsToSpend -= existingAbilityData.nextLevelCost;
		} else {
			const randomIndex = Math.floor(Math.random() * purchaseableAbilities.length);
			const [, abilityData] = purchaseableAbilities[randomIndex];
			abilityData.level++;
			pointsToSpend -= abilityData.nextLevelCost;
		}

		purchaseableAbilities = getPurchaseableAbilities();
	}

	const playerMentalAbilities: Record<string, number> = {};
	Object.entries(selectedAbilities).forEach(([name, data]) => {
		if (data.level === 0) return;
		playerMentalAbilities[name as MentalAbility] = data.level;
	});

	return playerMentalAbilities;
}

function getAbilities(
	position: PositionType,
	archetype: string,
	stats: PlayerStats,
	year: Year,
	devTrait: DevTrait,
	potential: PlayerPotential
) {
	// 1. Determine Years in School
	let yearsInSchool = 1; // Default to 1 (FR)
	switch (year) {
		case 'FR':
			yearsInSchool = 1;
			break;
		case 'rFR':
			yearsInSchool = 2;
			break;
		case 'SO':
			yearsInSchool = 2;
			break;
		case 'rSO':
			yearsInSchool = 3;
			break;
		case 'JR':
			yearsInSchool = 3;
			break;
		case 'rJR':
			yearsInSchool = 4;
			break;
		case 'SR':
			yearsInSchool = 4;
			break;
		case 'rSR':
			yearsInSchool = 5;
			break;
	}

	// Costs: Bronze (2), Silver (4), Gold (6), Platinum (8)
	const traitCosts = [2, 4, 6, 8];

	const xpPerYear = {
		Normal: 2,
		Impact: 3,
		Star: 5,
		Elite: 8
	};

	// 2. Setup Ability Data
	const positionData = Positions[position];
	const positionGroupData = PositionGroups[positionData.positionGroup];
	const archetypeData = positionGroupData.archetypes.find((a) => a.name === archetype);

	// Safety check if archetype doesn't have abilities
	const abilities = archetypeData?.abilities ?? [];

	type SelectedAbility = {
		level: number;
		nextLevelCost: number;
		requirements: Partial<Record<keyof PlayerStats, [number, number, number, number]>>;
	};

	const selectedAbilities: Record<string, SelectedAbility> = {};
	for (const ability of abilities) {
		selectedAbilities[ability.name] = {
			level: 0,
			nextLevelCost: traitCosts[0],
			requirements: ability.requirements
		};
	}

	// 3. Calculate Total Lifetime XP
	// Instead of simulating year-by-year decisions, we build a pool of XP.
	function getXpGain() {
		// Add variance (-1 to +2)
		const variance = Math.random() * 3 - 1;
		let base = xpPerYear[devTrait];

		// High potential players earn slightly more
		if (potential === 'High') base *= 1.25;
		if (potential === 'Medium') base *= 1.1;

		return Math.max(1, base + variance);
	}

	let totalXP = 0;
	// Give them initial XP (Freshman year start)
	totalXP += getXpGain();

	// Add XP for every year they've been in the system
	for (let i = 0; i < yearsInSchool; i++) {
		totalXP += getXpGain();
	}

	// 4. Spending Loop
	// Keep buying as long as we have XP and valid options
	let attempts = 0;
	while (totalXP > 0 && attempts < 100) {
		attempts++; // Safety break for infinite loops

		// Filter abilities we can afford
		const affordableAbilities = Object.entries(selectedAbilities).filter(([, data]) => {
			// Check if maxed out (Level 4)
			if (data.level >= 4) return false;
			return data.nextLevelCost <= totalXP;
		});

		// If nothing is affordable, stop spending
		if (affordableAbilities.length === 0) break;

		// Filter by Stat Requirements
		// IMPORTANT FIX: Check requirements[currentLevel], not requirements[0]
		const validAbilities = affordableAbilities.filter(([, data]) => {
			const targetLevelIndex = data.level; // 0 for Bronze, 1 for Silver, etc.

			return Object.entries(data.requirements).every(([stat, reqArray]) => {
				// reqArray is [BronzeReq, SilverReq, GoldReq, PlatReq]
				const reqValue = reqArray?.[targetLevelIndex];
				if (reqValue === undefined) return true; // No requirement for this level
				return stats[stat as keyof PlayerStats] >= reqValue;
			});
		});

		if (validAbilities.length === 0) break; // Have money, but stats are too low

		// Pick a random ability to upgrade
		// You could add logic here to prioritize cheaper ones, or prioritize getting to Gold
		const randomIndex = Math.floor(Math.random() * validAbilities.length);
		const [, abilityData] = validAbilities[randomIndex];

		// Execute Purchase
		totalXP -= abilityData.nextLevelCost;
		abilityData.level++;

		// Update cost for next level
		if (abilityData.level < 4) {
			abilityData.nextLevelCost = traitCosts[abilityData.level];
		} else {
			abilityData.nextLevelCost = 999; // Maxed out
		}
	}

	// 5. Format Output
	const playerAbilities: Record<string, number> = {};
	for (const [name, data] of Object.entries(selectedAbilities)) {
		if (data.level > 0) {
			playerAbilities[name] = data.level;
		}
	}

	return playerAbilities;
}

function getDealbreaker(starRating: number, potential: PlayerPotential): Dealbreaker {
	const weights: Record<string, number> = {
		'Brand Exposure': 1,
		'Championship Contender': 1,
		'Coach Prestige': 1,
		'Conference Prestige': 1,
		'Playing Style': 1,
		'Playing Time': 1,
		'Pro Potential': 1,
		'Proximity to Home': 1
	};

	if (starRating >= 4 || potential === 'High') {
		weights['Pro Potential'] += 10; // #1 priority for elites
		weights['Brand Exposure'] += 8; // NIL money
		weights['Championship Contender'] += 6;
	}

	if (starRating === 4 || starRating === 3) {
		weights['Playing Time'] += 5; // Don't want to sit behind a 5-star
		weights['Conference Prestige'] += 3; // Want to play on big stage
	}

	if (starRating === 3) {
		weights['Playing Style'] += 4;
	}

	if (starRating <= 2) {
		weights['Proximity to Home'] += 6; // Just want to stay close to mom
		weights['Coach Prestige'] += 4; // Want a coach who won't get fired
		weights['Playing Time'] += 4; // Easier path to field
	}

	// 4. Weighted Random Selection
	let totalWeight = 0;
	for (const w of Object.values(weights)) totalWeight += w;

	let random = Math.random() * totalWeight;
	for (const [key, weight] of Object.entries(weights)) {
		random -= weight;
		if (random <= 0) return key as Dealbreaker;
	}
	return 'Proximity to Home'; // Fallback
}

function getTargetOvr(
	baseTeamOvr: number,
	depth: number,
	maxDepth: number,
	role: RosterRole
): number {
	let roleMod = 0;
	switch (role) {
		case 'Star':
			roleMod = 10 + (Math.random() * 6 - 3);
			break;
		case 'Quality':
			roleMod = 4 + (Math.random() * 4 - 2);
			break;
		case 'Average':
			roleMod = 0 + (Math.random() * 6 - 3);
			break;
		case 'Developing':
			roleMod = -5 + (Math.random() * 6 - 3);
			break;
		case 'Project':
			roleMod = -10 + (Math.random() * 8 - 4);
			break;
		default:
			roleMod = 0;
	}

	const plateauStart = Math.max(2, maxDepth - 2);

	let depthPenalty = 0;

	if (depth === 1) {
		// Starters: No penalty
		depthPenalty = 0;
	} else if (depth < plateauStart) {
		depthPenalty = (depth - 1) * 3;
	} else {
		const basePenalty = (plateauStart - 1) * 3;
		const deepBenchPenalty = (depth - plateauStart) * 0.5;
		depthPenalty = basePenalty + deepBenchPenalty;
	}

	depthPenalty = depthPenalty * (Math.random() * 0.2 + 0.9);
	return Math.max(45, Math.min(99, Math.round(baseTeamOvr + roleMod - depthPenalty)));
}

function getYear(targetOvr: number, depth: number): Year {
	const ovrScore = (targetOvr - 60) / 40;
	const depthScore = depth === 1 ? 1 : 0;

	const maturityScore = ovrScore * 0.7 + depthScore * 0.3;

	const rand = Math.random() + maturityScore * 0.4;

	function getYearOrRedshirt(year: Year, redshirtYear: Year) {
		const rand = Math.random();
		if (rand > 0.4) return year;
		else return redshirtYear;
	}

	if (rand > 1.3) return 'rSR';
	if (rand > 1.1) return getYearOrRedshirt('SR', 'rJR');
	else if (rand > 0.8) return getYearOrRedshirt('JR', 'rSO');
	else if (rand > 0.4) return getYearOrRedshirt('SO', 'rFR');
	else return 'FR';
}

type DevTrait = 'Normal' | 'Impact' | 'Star' | 'Elite';
function getDevTrait(targetOvr: number, year: Year, programRating: number): DevTrait {
	if (targetOvr < 75 && (year == 'SR' || year == 'JR')) return 'Normal';

	// program rating is 0 - 5 scale
	const eliteProgramBonus = (programRating * 20 - 70) / 100;
	const rand = Math.random() - eliteProgramBonus;

	if (targetOvr > 88 && rand < 0.3) return 'Elite';
	if (targetOvr > 80 && rand < 0.5) return 'Star';
	if (targetOvr > 74 && rand < 0.7) return 'Impact';
	return 'Normal';
}

function generateBellCurve(mean: number, stdDev: number = 10): number {
	const u = 1 - Math.random(); // Converting [0,1) to (0,1]
	const v = Math.random();
	const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

	// Apply mean and deviation, then clamp between 1 and 99
	return Math.max(1, Math.min(99, Math.round(z * stdDev + mean)));
}

function getPhysicals(positionData: PositionData, stats: PlayerStats, programRating: number) {
	const groupKey = positionData.positionGroup;
	const group = PositionGroups[groupKey];

	const minH = group?.heightRange?.[0] ?? 70;
	const maxH = group?.heightRange?.[1] ?? 80;
	const minW = group?.weightRange?.[0] ?? 180;
	const maxW = group?.weightRange?.[1] ?? 240;

	const spd = (stats['SPD'] || 75) as number;
	const str = (stats['STR'] || 70) as number;

	// Normalize stats to 0-1
	const normStr = Math.max(0, Math.min(1, (str - 50) / 49));
	const normSpd = Math.max(0, Math.min(1, (spd - 50) / 49));

	// Base Size Tendency derived from stats
	let sizeTendency = normStr * 0.7 + (1 - normSpd) * 0.3;

	// --- Program Rating Bias ---
	// Assuming programRating is 1-5 scale.
	// 5 Stars: +0.08 (Prefers larger prototypes)
	// 3 Stars: 0 (Neutral)
	// 1 Star: -0.08 (Settles for undersized)
	const programBias = (programRating - 3) * 0.04;

	sizeTendency += programBias;

	// Add Randomness (-8% to +8%)
	sizeTendency += Math.random() * 0.16 - 0.08;

	// Clamp between 0 and 1
	sizeTendency = Math.max(0, Math.min(1, sizeTendency));

	// Calculate Weight
	const weight = Math.round(minW + (maxW - minW) * sizeTendency);

	// Calculate Height
	// Correlated to size, but with variance so you can have short/heavy or tall/thin players
	let heightTendency = sizeTendency + (Math.random() * 0.3 - 0.15);
	heightTendency = Math.max(0, Math.min(1, heightTendency));

	const height = Math.round(minH + (maxH - minH) * heightTendency);

	return { height, weight };
}

function getPositionNumbers(positionData: PositionData): number[] {
	const availableNumbers: number[] = [];
	const positionGroup = positionData.positionGroup;
	const positionGroupData = PositionGroups[positionGroup];
	for (const [min, max] of positionGroupData.numberRanges) {
		for (let n = min; n <= max; n++) {
			availableNumbers.push(n);
		}
	}
	return availableNumbers;
}

function getAvailableNumbersForPosition(
	positionData: PositionData,
	usedNumbers: Set<number>
): number[] {
	const availableNumbers: number[] = [];

	const positionNumbers = getPositionNumbers(positionData);

	for (const number of positionNumbers) {
		if (!usedNumbers.has(number)) availableNumbers.push(number);
	}
	return availableNumbers;
}

function getJerseyNumber(positionData: PositionData, usedNumbers: Set<number>): number {
	const availableNumbers = getAvailableNumbersForPosition(positionData, usedNumbers);
	if (availableNumbers.length === 0) {
		// We can get a duplicate number just this once
		const positionNumbers = getPositionNumbers(positionData);
		return positionNumbers[Math.floor(Math.random() * positionNumbers.length)];
	}
	return availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
}

function getHSStarRating(ovr: number, year: Year, programRating: number): number {
	let freshmanRating = ovr;

	switch (year) {
		case 'SO':
			freshmanRating -= 4;
			break;
		case 'JR':
			freshmanRating -= 8;
			break;
		case 'SR':
			freshmanRating -= 12;
			break;
	}

	const bias = programRating - 3;
	const randomBias = bias + (Math.random() * 2 - 1);
	const recruitingScore = freshmanRating + randomBias;

	if (recruitingScore >= 79) return 5;
	if (recruitingScore >= 73) return 4;
	if (recruitingScore >= 66) return 3;
	if (recruitingScore >= 58) return 2;
	return 1;
}

function getStatsForArchetype(
	position: PositionType,
	archetypeKey: string,
	targetOvr: number
): PlayerStats {
	const posData = Positions[position];
	const archetypeData = posData.overallsByArchetype[archetypeKey];
	const positionGroup = posData.positionGroup;
	const posGroupData = PositionGroups[positionGroup];
	const statMeans = posGroupData.statMeans;

	if (!archetypeData || !statMeans) return {} as PlayerStats;

	const { weights, intercept } = archetypeData;
	const stats: Record<string, number> = {};

	// 1. Calculate the 'Required Mean'
	// Instead of assuming Mean = TargetOvr, we solve for Mean:
	// TargetOvr = (Mean * SumWeights) + Intercept
	// Mean = (TargetOvr - Intercept) / SumWeights
	let sumWeights = 0;
	Object.values(weights).forEach((w) => (sumWeights += w || 0));

	// Prevent divide by zero
	if (sumWeights === 0) sumWeights = 1;

	// Calculate what the stats generally need to be to achieve the target
	let requiredMean = (targetOvr - intercept) / sumWeights;

	// Clamp requiredMean to 99 so we don't try to generate stats of 150
	// (We rely on the calibration loop to push them to the absolute cap if needed)
	requiredMean = Math.min(99, Math.max(40, requiredMean));

	// 2. Generate Stats based on STAT_CATEGORIES
	Object.entries(STAT_CATEGORIES).forEach(([category, statList]) => {
		statList.stats.forEach((stat) => {
			const weight = weights[stat as keyof PlayerStats];
			const isRelevant = weight !== undefined;

			let mean: number;
			const stdDev = isRelevant ? 8 : 12; // Tighter variance for weighted stats

			if (isRelevant) {
				mean = requiredMean;
				// Keep flavor adjustments
				if (weight > 0.15) mean += 5;
				else if (weight < 0.05) mean -= 5;
			} else {
				mean = statMeans[category as keyof typeof statMeans] || 50;
			}

			stats[stat] = generateBellCurve(mean, stdDev);
		});
	});

	// 3. Safety Check: Ensure ALL weighted stats exist
	// If a stat is in 'weights' but NOT in STAT_CATEGORIES, the OVR calc will break (return NaN or low).
	// We force generate them here.
	Object.keys(weights).forEach((statKey) => {
		if (stats[statKey] === undefined) {
			const weight = weights[statKey as keyof PlayerStats];
			let mean = requiredMean;
			if (weight) mean += 5;
			stats[statKey] = generateBellCurve(mean, 8);
		}
	});

	// 4. Enhanced Calibration Loop
	let iterations = 0;
	// Increased to 500 to allow moving from a bad random seed to the target
	while (iterations < 500) {
		const currentOvr = calculatePlayerOvr({
			stats: stats as unknown as PlayerStats,
			position,
			archetype: archetypeKey
		});
		const diff = targetOvr - currentOvr;

		if (diff === 0) break;
		const direction = diff > 0 ? 1 : -1;

		// Only adjust stats that actually affect the OVR
		const relevantStats = Object.keys(weights);
		const statToAdjust = relevantStats[Math.floor(Math.random() * relevantStats.length)];

		// Ensure stat exists before adjusting
		if (stats[statToAdjust] !== undefined) {
			const currentVal = stats[statToAdjust];

			// Don't push beyond caps (1-99)
			if ((direction > 0 && currentVal < 99) || (direction < 0 && currentVal > 1)) {
				stats[statToAdjust] += direction;
			}
		}
		iterations++;
	}

	return stats as unknown as PlayerStats;
}

export function regeneratePlayer(
	player: Player,
	teamConfig: TeamConfig,
	usedJerseyNumbers: Set<number>
): Player {
	const { offensiveOVR, defensiveOVR, programRating } = teamConfig;

	const archetypeWeights = getRosterArchetypeWeights(teamConfig);
	const position = player.position;
	const baseTeamOvr = isOffense(position) ? offensiveOVR : defensiveOVR;

	const maxDepth = POSITION_COUNTS[teamConfig.preset][player.position];

	const newPlayer = generatePlayer({
		position,
		depth: player.depth,
		maxDepth,
		usedJerseyNumbers,
		archetypeWeights,
		baseTeamOvr,
		programRating
	});

	// Keep the old ID and jersey number if still valid
	newPlayer.id = player.id;

	// Remove old jersey from used set and add back
	usedJerseyNumbers.delete(player.jerseyNumber);
	if (!usedJerseyNumbers.has(player.jerseyNumber)) {
		newPlayer.jerseyNumber = player.jerseyNumber;
	} else {
		newPlayer.jerseyNumber = getJerseyNumber(Positions[player.position], usedJerseyNumbers);
	}
	usedJerseyNumbers.add(newPlayer.jerseyNumber);

	return newPlayer;
}
