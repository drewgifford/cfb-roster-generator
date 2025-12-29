import type { PlayerStats } from './stats';
import type { PositionType } from '../data/positions';

// Player year/class
export type Year = 'FR' | 'rFR' | 'SO' | 'rSO' | 'JR' | 'rJR' | 'SR' | 'rSR';

export const YEARS: Year[] = ['FR', 'rFR', 'SO', 'rSO', 'JR', 'rJR', 'SR', 'rSR'];

export const YEAR_DISPLAY: Record<Year, string> = {
	FR: 'Freshman',
	rFR: 'Redshirt Freshman',
	SO: 'Sophomore',
	rSO: 'Redshirt Sophomore',
	JR: 'Junior',
	rJR: 'Redshirt Junior',
	SR: 'Senior',
	rSR: 'Redshirt Senior'
};

export const YEAR_SHORT: Record<Year, string> = {
	FR: 'FR',
	rFR: 'rFR',
	SO: 'SO',
	rSO: 'rSO',
	JR: 'JR',
	rJR: 'rJR',
	SR: 'SR',
	rSR: 'rSR'
};

// Development traits
export type DevTrait = 'Normal' | 'Impact' | 'Star' | 'Elite';
export const DEV_TRAITS: DevTrait[] = ['Normal', 'Impact', 'Star', 'Elite'];

// Player potential - dictates skill group caps in CFB 26
export type PlayerPotential = 'Low' | 'Medium' | 'High';
export const POTENTIALS: PlayerPotential[] = ['Low', 'Medium', 'High'];

export type Handedness = 'Left' | 'Right';

export type Dealbreaker =
	| 'None'
	| 'Brand Exposure'
	| 'Championship Contender'
	| 'Coach Prestige'
	| 'Conference Prestige'
	| 'Playing Style'
	| 'Playing Time'
	| 'Pro Potential'
	| 'Proximity to Home';

export const DEALBREAKERS: Dealbreaker[] = [
	'None',
	'Brand Exposure',
	'Championship Contender',
	'Coach Prestige',
	'Conference Prestige',
	'Playing Style',
	'Playing Time',
	'Pro Potential',
	'Proximity to Home'
];

// Full player interface
export interface Player {
	id: string;
	firstName: string;
	lastName: string;
	position: PositionType;
	archetype: string;
	year: Year;
	devTrait: DevTrait;
	potential: PlayerPotential;
	jerseyNumber: number;
	handedness: Handedness;
	starRating: number;
	dealbreaker: Dealbreaker;
	height: number; // inches
	weight: number; // lbs
	stats: PlayerStats;
	ovr: number; // Calculated from stats
	depth: number;
	abilities: Record<string, number>;
	mentalAbilities: Record<string, number>;
	isLocked: boolean;
	skinTone: number;
	headIndex: number;
}
