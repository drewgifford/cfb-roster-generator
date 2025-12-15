// Offensive playstyles

import type { Preset } from '$lib/data/presets';
import type { DefenseScheme, OffenseScheme } from '$lib/data/schemes';

// Team configuration
export interface TeamConfig {
	preset: Preset;
	programRating: number; // 0-5 stars
	offensiveOVR: number; // 60-99
	defensiveOVR: number; // 60-99
	offensiveScheme: OffenseScheme;
	defensiveScheme: DefenseScheme;
}

// Default team configuration
export function createDefaultTeamConfig(): TeamConfig {
	return {
		preset: 'Cupcake',
		programRating: 2,
		offensiveOVR: 70,
		defensiveOVR: 70,
		offensiveScheme: 'Air Raid',
		defensiveScheme: '4-3'
	};
}
