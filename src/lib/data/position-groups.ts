import type { PlayerStat, StatCategory } from '$lib/types/stats';

export type Archetype = {
	name: string;
	abilities: {
		name: string;
		requirements: Partial<Record<PlayerStat, [number, number, number, number]>>;
	}[];
};

export type MentalAbility =
	| 'Road Dog'
	| 'Field General'
	| 'Headstrong'
	| 'Fan Favorite'
	| 'Clearheaded'
	| 'Winning Time'
	| 'The Natural'
	| 'Best Friend'
	| 'OL Rally'
	| 'DL Rally'
	| 'Legion'
	| 'Clutch Kicker';
export const MentalAbilities: MentalAbility[] = [
	'Road Dog',
	'Field General',
	'Headstrong',
	'Fan Favorite',
	'Clearheaded',
	'Winning Time',
	'The Natural',
	'Best Friend',
	'OL Rally',
	'DL Rally',
	'Legion',
	'Clutch Kicker'
];

export type PositionGroup = {
	name: string;
	mentalAbilities: MentalAbility[];
	archetypes: Archetype[];
	statMeans: Record<StatCategory, number>;
	heightRange: [number, number];
	weightRange: [number, number];
	numberRanges: number[][];
};

export type PositionGroupType =
	| 'Quarterback'
	| 'Halfback'
	| 'Fullback'
	| 'Wide Receiver'
	| 'Tight End'
	| 'Offensive Line'
	| 'Defensive Line'
	| 'Linebacker'
	| 'Cornerback'
	| 'Safety'
	| 'Kicker/Punter';

export const PositionGroups: Record<PositionGroupType, PositionGroup> = {
	Quarterback: {
		name: 'Quarterback',
		numberRanges: [[0, 19]],
		mentalAbilities: [
			'Road Dog',
			'Field General',
			'Clearheaded',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 75,
			passing: 60, // Baseline only, overridden by OVR
			mental: 65,
			durability: 83,
			ballCarrier: 50,
			receiving: 25,
			defense: 25,
			defensiveLine: 20,
			coverage: 20,
			blocking: 20,
			kicking: 20,
			special: 10
		},
		heightRange: [69, 78],
		weightRange: [190, 250],
		archetypes: [
			{
				name: 'Backfield Creator',
				abilities: [
					{
						name: 'Off Platform',
						requirements: {
							THP: [90, 92, 94, 96],
							SAC: [82, 83, 84, 86]
						}
					},
					{
						name: 'Pull Down',
						requirements: {
							CAR: [72, 75, 79, 83]
						}
					},
					{
						name: 'On Time',
						requirements: {
							SAC: [89, 90, 92, 94]
						}
					},
					{
						name: 'Sleight of Hand',
						requirements: {
							PAC: [84, 86, 90, 93]
						}
					},
					{
						name: 'Mobile Deadeye',
						requirements: {
							RUN: [84, 88, 92, 94]
						}
					}
				]
			},
			{
				name: 'Dual Threat',
				abilities: [
					{
						name: 'Downhill',
						requirements: {
							BTK: [80, 82, 84, 88]
						}
					},
					{
						name: 'Extender',
						requirements: {
							BSK: [83, 86, 89, 93]
						}
					},
					{
						name: 'Option King',
						requirements: {
							BTK: [80, 83, 86, 90]
						}
					},
					{
						name: 'Dot!',
						requirements: {
							DAC: [85, 87, 90, 93]
						}
					},
					{
						name: 'Mobile Resistance',
						requirements: {
							TUP: [80, 83, 84, 86]
						}
					}
				]
			},
			{
				name: 'Pocket Passer',
				abilities: [
					{
						name: 'Resistance',
						requirements: {
							TUP: [81, 87, 91, 93]
						}
					},
					{
						name: 'Step Up',
						requirements: {
							MAC: [83, 87, 90, 93]
						}
					},
					{
						name: 'Sleight of Hand',
						requirements: {
							PAC: [84, 86, 90, 93]
						}
					},
					{
						name: 'Dot!',
						requirements: {
							DAC: [85, 87, 90, 93]
						}
					},
					{
						name: 'On Time',
						requirements: {
							SAC: [86, 90, 92, 94]
						}
					}
				]
			},
			{
				name: 'Pure Runner',
				abilities: [
					{
						name: 'Magician',
						requirements: {
							SPD: [84, 86, 91, 92]
						}
					},
					{
						name: 'Option King',
						requirements: {
							BTK: [80, 83, 86, 90]
						}
					},
					{
						name: 'Shifty',
						requirements: {
							COD: [83, 85, 87, 89],
							SPD: [89, 90, 91, 92]
						}
					},
					{
						name: 'Side Step',
						requirements: {
							JKM: [86, 87, 91, 93]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					}
				]
			}
		]
	},
	Halfback: {
		name: 'Halfback',
		numberRanges: [[0, 49]],
		mentalAbilities: [
			'Road Dog',
			'Headstrong',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 90,
			passing: 25,
			mental: 60,
			durability: 83,
			ballCarrier: 60, // Baseline only
			receiving: 50,
			defense: 25,
			defensiveLine: 20,
			coverage: 20,
			blocking: 40,
			kicking: 20,
			special: 10
		},
		heightRange: [66, 75],
		weightRange: [180, 240],
		archetypes: [
			{
				name: 'Backfield Threat',
				abilities: [
					{
						name: '360',
						requirements: {
							SPM: [85, 86, 87, 89]
						}
					},
					{
						name: 'Safety Valve',
						requirements: {
							CTH: [73, 76, 80, 85]
						}
					},
					{
						name: 'Takeoff',
						requirements: {
							ACC: [95, 96, 97, 98]
						}
					},
					{
						name: 'Side Step',
						requirements: {
							JKM: [87, 88, 91, 93]
						}
					},
					{
						name: 'Recoup',
						requirements: {
							STA: [95, 96, 97, 98]
						}
					}
				]
			},
			{
				name: 'Contact Seeker',
				abilities: [
					{
						name: 'Downhill',
						requirements: {
							BTK: [84, 87, 92, 94]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					},
					{
						name: 'Battering Ram',
						requirements: {
							TGH: [90, 91, 92, 94],
							AWR: [88, 89, 90, 91]
						}
					},
					{
						name: 'Ball Security',
						requirements: {
							CAR: [90, 91, 92, 94]
						}
					},
					{
						name: 'Balanced',
						requirements: {
							STR: [83, 85, 87, 92]
						}
					}
				]
			},
			{
				name: 'East/West Playmaker',
				abilities: [
					{
						name: 'Recoup',
						requirements: {
							STA: [95, 96, 97, 98]
						}
					},
					{
						name: 'Shifty',
						requirements: {
							COD: [87, 88, 89, 90],
							SPD: [92, 93, 94, 95]
						}
					},
					{
						name: 'Side Step',
						requirements: {
							JKM: [87, 88, 91, 93]
						}
					},
					{
						name: '360',
						requirements: {
							SPM: [83, 85, 87, 89]
						}
					},
					{
						name: 'Arm Bar',
						requirements: {
							SFA: [83, 86, 90, 96]
						}
					}
				]
			},
			{
				name: 'Elusive Bruiser',
				abilities: [
					{
						name: 'Shifty',
						requirements: {
							COD: [87, 88, 89, 90],
							SPD: [92, 93, 94, 95]
						}
					},
					{
						name: 'Headfirst',
						requirements: {
							TRK: [85, 88, 92, 95]
						}
					},
					{
						name: 'Side Step',
						requirements: {
							JKM: [87, 88, 91, 93]
						}
					},
					{
						name: 'Downhill',
						requirements: {
							BTK: [84, 87, 92, 94]
						}
					},
					{
						name: 'Arm Bar',
						requirements: {
							SFA: [83, 86, 90, 93]
						}
					}
				]
			},
			{
				name: 'North/South Blocker',
				abilities: [
					{
						name: 'Headfirst',
						requirements: {
							TRK: [85, 88, 92, 95]
						}
					},
					{
						name: 'Balanced',
						requirements: {
							SFA: [81, 86, 91, 96]
						}
					},
					{
						name: 'Sidekick',
						requirements: {
							PBK: [63, 65, 67, 70]
						}
					},
					{
						name: 'Ball Security',
						requirements: {
							CAR: [90, 91, 92, 94]
						}
					},
					{
						name: 'Strong Grip',
						requirements: {
							STR: [83, 85, 87, 92]
						}
					}
				]
			},
			{
				name: 'North/South Receiver',
				abilities: [
					{
						name: 'Balanced',
						requirements: {
							STR: [83, 85, 87, 92]
						}
					},
					{
						name: 'Arm Bar',
						requirements: {
							SFA: [81, 85, 90, 93]
						}
					},
					{
						name: 'Safety Valve',
						requirements: {
							CTH: [73, 76, 80, 85]
						}
					},
					{
						name: 'Headfirst',
						requirements: {
							TRK: [83, 86, 89, 91]
						}
					},
					{
						name: 'Downhill',
						requirements: {
							BTK: [84, 87, 92, 94]
						}
					}
				]
			}
		]
	},
	Fullback: {
		name: 'Fullback',
		numberRanges: [
			[0, 49],
			[80, 89]
		],
		mentalAbilities: ['Road Dog', 'Fan Favorite', 'Clearheaded', 'Winning Time', 'The Natural'],
		statMeans: {
			physical: 75,
			passing: 25,
			mental: 60,
			durability: 83,
			ballCarrier: 55,
			receiving: 45,
			defense: 40, // Often play special teams
			defensiveLine: 35,
			coverage: 25,
			blocking: 60,
			kicking: 20,
			special: 50
		},
		heightRange: [69, 75],
		weightRange: [210, 260],
		archetypes: [
			{
				name: 'Blocking',
				abilities: [
					{
						name: 'Strong Grip',
						requirements: {
							STR: [86, 90, 94, 98]
						}
					},
					{
						name: 'Second Level',
						requirements: {
							LBK: [84, 89, 93, 97]
						}
					},
					{
						name: 'Pocket Shield',
						requirements: {
							PBP: [69, 71, 73, 75]
						}
					},
					{
						name: 'Sidekick',
						requirements: {
							PBK: [75, 80, 86, 93]
						}
					},
					{
						name: 'Screen Enforcer',
						requirements: {
							IBL: [75, 80, 86, 93]
						}
					}
				]
			},
			{
				name: 'Utility',
				abilities: [
					{
						name: 'Safety Valve',
						requirements: {
							CTH: [73, 76, 80, 85]
						}
					},
					{
						name: 'Balanced',
						requirements: {
							STR: [87, 91, 94, 98]
						}
					},
					{
						name: 'Screen Enforcer',
						requirements: {
							IBL: [75, 80, 86, 94]
						}
					},
					{
						name: 'Sidekick',
						requirements: {
							PBK: [75, 80, 86, 93]
						}
					},
					{
						name: 'Recoup',
						requirements: {
							STA: [81, 88, 95, 99]
						}
					}
				]
			}
		]
	},
	'Wide Receiver': {
		name: 'Wide Receiver',
		numberRanges: [
			[0, 49],
			[80, 89]
		],
		mentalAbilities: [
			'Road Dog',
			'Best Friend',
			'Headstrong',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 75,
			passing: 30,
			mental: 60,
			durability: 83,
			ballCarrier: 60, // YAC ability
			receiving: 60, // Baseline only
			defense: 25,
			defensiveLine: 15,
			coverage: 20,
			blocking: 35,
			kicking: 20,
			special: 10
		},
		heightRange: [68, 76],
		weightRange: [160, 220],
		archetypes: [
			{
				name: 'Contested Specialist',
				abilities: [
					{
						name: '50/50',
						requirements: {
							SPC: [89, 91, 94, 96]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					},
					{
						name: 'Balanced',
						requirements: {
							BTK: [80, 82, 86, 90]
						}
					},
					{
						name: 'Headfirst',
						requirements: {
							TRK: [85, 88, 92, 95]
						}
					},
					{
						name: 'Downhill',
						requirements: {
							BTK: [80, 82, 84, 88]
						}
					}
				]
			},
			{
				name: 'Elusive Route Runner',
				abilities: [
					{
						name: '360',
						requirements: {
							SPM: [83, 85, 87, 89]
						}
					},
					{
						name: 'Cutter',
						requirements: {
							MRR: [86, 88, 91, 93]
						}
					},
					{
						name: 'Double Dip',
						requirements: {
							DRR: [84, 86, 88, 90]
						}
					},
					{
						name: 'Recoup',
						requirements: {
							STA: [95, 96, 97, 98]
						}
					},
					{
						name: 'Side Step',
						requirements: {
							JKM: [86, 87, 91, 93]
						}
					}
				]
			},
			{
				name: 'Gadget',
				abilities: [
					{
						name: 'Side Step',
						requirements: {
							JKM: [85, 87, 90, 93]
						}
					},
					{
						name: 'Shifty',
						requirements: {
							COD: [94, 95, 96, 97],
							ACC: [90, 91, 93, 96]
						}
					},
					{
						name: 'Dot!',
						requirements: {
							DAC: [85, 87, 90, 93]
						}
					},
					{
						name: 'Cutter',
						requirements: {
							MRR: [86, 88, 91, 93]
						}
					},
					{
						name: 'Extender',
						requirements: {
							BSK: [83, 86, 89, 93]
						}
					}
				]
			},
			{
				name: 'Gritty Possession',
				abilities: [
					{
						name: 'Second Level',
						requirements: {
							IBL: [83, 85, 87, 91]
						}
					},
					{
						name: 'Outside Shield',
						requirements: {
							RBF: [69, 70, 72, 78]
						}
					},
					{
						name: 'Strong Grip',
						requirements: {
							STR: [85, 89, 93, 97]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					},
					{
						name: 'Sure Hands',
						requirements: {
							CIT: [86, 88, 91, 94]
						}
					}
				]
			},
			{
				name: 'Physical Route Runner',
				abilities: [
					{
						name: 'Downhill',
						requirements: {
							BTK: [80, 82, 84, 88]
						}
					},
					{
						name: 'Press Pro',
						requirements: {
							RLS: [80, 86, 88, 90]
						}
					},
					{
						name: 'Sure Hands',
						requirements: {
							CIT: [86, 88, 91, 94]
						}
					},
					{
						name: '50/50',
						requirements: {
							SPC: [89, 91, 94, 96]
						}
					},
					{
						name: 'Cutter',
						requirements: {
							MRR: [86, 88, 91, 93]
						}
					}
				]
			},
			{
				name: 'Route Artist',
				abilities: [
					{
						name: 'Cutter',
						requirements: {
							MRR: [86, 88, 91, 93]
						}
					},
					{
						name: 'Lay Out',
						requirements: {
							SPC: [88, 89, 92, 94]
						}
					},
					{
						name: 'Recoup',
						requirements: {
							STA: [95, 96, 97, 98]
						}
					},
					{
						name: 'Double Dip',
						requirements: {
							DRR: [84, 86, 88, 90]
						}
					},
					{
						name: 'Sure Hands',
						requirements: {
							CIT: [86, 88, 91, 94]
						}
					}
				]
			},
			{
				name: 'Speedster',
				abilities: [
					{
						name: 'Side Step',
						requirements: {
							JKM: [86, 87, 91, 93]
						}
					},
					{
						name: 'Double Dip',
						requirements: {
							DRR: [84, 86, 88, 90]
						}
					},
					{
						name: 'Takeoff',
						requirements: {
							ACC: [95, 96, 97, 98]
						}
					},
					{
						name: 'Recoup',
						requirements: {
							STA: [95, 96, 97, 98]
						}
					},
					{
						name: 'Shifty',
						requirements: {
							COD: [94, 95, 96, 97],
							ACC: [90, 91, 93, 96]
						}
					}
				]
			}
		]
	},
	'Tight End': {
		name: 'Tight End',
		numberRanges: [
			[10, 49],
			[80, 89]
		],
		mentalAbilities: [
			'Road Dog',
			'Best Friend',
			'Headstrong',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 70,
			passing: 30,
			mental: 60,
			durability: 83,
			ballCarrier: 50,
			receiving: 55,
			defense: 35,
			defensiveLine: 30,
			coverage: 25,
			blocking: 55,
			kicking: 20,
			special: 75
		},
		heightRange: [72, 80],
		weightRange: [220, 280],
		archetypes: [
			{
				name: 'Pure Blocker',
				abilities: [
					{
						name: 'Strong Grip',
						requirements: {
							STR: [94, 95, 96, 97]
						}
					},
					{
						name: 'Quick Drop',
						requirements: {
							ACC: [83, 85, 87, 89]
						}
					},
					{
						name: 'Outside Shield',
						requirements: {
							RBF: [69, 70, 72, 78]
						}
					},
					{
						name: 'Pocket Shield',
						requirements: {
							PBP: [69, 71, 73, 75]
						}
					},
					{
						name: 'Second Level',
						requirements: {
							IBL: [89, 91, 93, 94]
						}
					}
				]
			},
			{
				name: 'Vertical Threat',
				abilities: [
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					},
					{
						name: 'Balanced',
						requirements: {
							BTK: [82, 84, 87, 90]
						}
					},
					{
						name: 'Takeoff',
						requirements: {
							ACC: [95, 96, 97, 98]
						}
					},
					{
						name: 'Recoup',
						requirements: {
							STA: [95, 96, 97, 98]
						}
					},
					{
						name: '50/50',
						requirements: {
							SPC: [86, 88, 92, 94]
						}
					}
				]
			},
			{
				name: 'Physical Route Runner',
				abilities: [
					{
						name: 'Balanced',
						requirements: {
							STR: [83, 85, 87, 92]
						}
					},
					{
						name: '50/50',
						requirements: {
							SPC: [86, 88, 92, 94]
						}
					},
					{
						name: 'Cutter',
						requirements: {
							MRR: [82, 84, 85, 90]
						}
					},
					{
						name: 'Downhill',
						requirements: {
							BTK: [80, 82, 84, 88]
						}
					},
					{
						name: 'Sure Hands',
						requirements: {
							CIT: [83, 84, 88, 90]
						}
					}
				]
			},
			{
				name: 'Gritty Possession',
				abilities: [
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					},
					{
						name: 'Strong Grip',
						requirements: {
							STR: [83, 85, 87, 92]
						}
					},
					{
						name: 'Sure Hands',
						requirements: {
							CIT: [83, 84, 88, 90]
						}
					},
					{
						name: 'Outside Shield',
						requirements: {
							RBF: [69, 70, 72, 78]
						}
					},
					{
						name: 'Battering Ram',
						requirements: {
							TGH: [90, 91, 92, 94],
							AWR: [88, 89, 90, 91]
						}
					}
				]
			},
			{
				name: 'Pure Possession',
				abilities: [
					{
						name: 'Sure Hands',
						requirements: {
							CIT: [83, 84, 88, 90]
						}
					},
					{
						name: 'Wear Down',
						requirements: {
							PBK: [84, 88, 93, 97]
						}
					},
					{
						name: 'Strong Grip',
						requirements: {
							STR: [87, 91, 95, 99]
						}
					},
					{
						name: 'Outside Shield',
						requirements: {
							RBF: [69, 70, 72, 78]
						}
					},
					{
						name: 'Balanced',
						requirements: {
							BTK: [82, 84, 87, 90]
						}
					}
				]
			}
		]
	},
	'Offensive Line': {
		name: 'Offensive Line',
		numberRanges: [[50, 79]],
		mentalAbilities: [
			'Road Dog',
			'OL Rally',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 55, // High STR, low SPD
			passing: 15,
			mental: 65,
			durability: 83,
			ballCarrier: 20,
			receiving: 20,
			defense: 30,
			defensiveLine: 30,
			coverage: 15,
			blocking: 65, // Baseline only
			kicking: 15,
			special: 60
		},
		heightRange: [74, 82],
		weightRange: [270, 400],
		archetypes: [
			{
				name: 'Pass Protector',
				abilities: [
					{
						name: 'Pocket Shield',
						requirements: {
							PBK: [84, 86, 91, 95]
						}
					},
					{
						name: 'Quick Drop',
						requirements: {
							ACC: [82, 82, 83, 84],
							SPD: [68, 69, 69, 70]
						}
					},
					{
						name: 'PA Shield',
						requirements: {
							PBP: [84, 86, 91, 95]
						}
					},
					{
						name: 'Strong Grip',
						requirements: {
							STR: [94, 95, 96, 97]
						}
					},
					{
						name: 'Wear Down',
						requirements: {
							PBK: [85, 88, 93, 95]
						}
					}
				]
			},
			{
				name: 'Raw Strength',
				abilities: [
					{
						name: 'Strong Grip',
						requirements: {
							STR: [94, 95, 96, 97]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					},
					{
						name: 'Second Level',
						requirements: {
							IBL: [89, 91, 93, 94]
						}
					},
					{
						name: 'Inside Shield',
						requirements: {
							RBP: [86, 88, 91, 93]
						}
					},
					{
						name: 'Ground N Pound',
						requirements: {
							RBK: [83, 85, 88, 91]
						}
					}
				]
			},
			{
				name: 'Well Rounded',
				abilities: [
					{
						name: 'Pocket Shield',
						requirements: {
							PBP: [84, 86, 91, 95]
						}
					},
					{
						name: 'Outside Shield',
						requirements: {
							RBF: [88, 89, 92, 93]
						}
					},
					{
						name: 'Strong Grip',
						requirements: {
							STR: [94, 95, 96, 97]
						}
					},
					{
						name: 'Option Shield',
						requirements: {
							RBF: [88, 89, 91, 93]
						}
					},
					{
						name: 'Inside Shield',
						requirements: {
							RBP: [86, 88, 91, 93]
						}
					}
				]
			},
			{
				name: 'Agile',
				abilities: [
					{
						name: 'Screen Enforcer',
						requirements: {
							IBL: [88, 89, 91, 94]
						}
					},
					{
						name: 'Quick Step',
						requirements: {
							ACC: [79, 81, 83, 84]
						}
					},
					{
						name: 'Option Shield',
						requirements: {
							RBF: [88, 89, 91, 93]
						}
					},
					{
						name: 'Quick Drop',
						requirements: {
							ACC: [82, 82, 83, 84],
							SPD: [68, 69, 69, 70]
						}
					},
					{
						name: 'Outside Shield',
						requirements: {
							RBF: [88, 89, 92, 93]
						}
					}
				]
			}
		]
	},
	'Defensive Line': {
		name: 'Defensive Line',
		numberRanges: [
			[50, 79],
			[90, 99]
		],
		mentalAbilities: [
			'Road Dog',
			'DL Rally',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 70,
			passing: 15,
			mental: 60,
			durability: 83,
			ballCarrier: 25,
			receiving: 20,
			defense: 60, // Tackling/Hit Power
			defensiveLine: 60, // Moves
			coverage: 25, // DEs drop to zone rarely
			blocking: 30,
			kicking: 15,
			special: 10
		},
		heightRange: [71, 79],
		weightRange: [250, 330],
		archetypes: [
			{
				name: 'Gap Specialist', // Edge Setter for EDGEs
				abilities: [
					{
						name: 'Grip Breaker',
						requirements: {
							STR: [94, 95, 96, 97]
						}
					},
					{
						name: 'Inside Disruptor',
						requirements: {
							BSH: [88, 90, 93, 94]
						}
					},
					{
						name: 'Outside Disruptor',
						requirements: {
							BSH: [88, 90, 93, 94]
						}
					},
					{
						name: 'Option Disruptor',
						requirements: {
							PRC: [85, 88, 90, 94]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [85, 89, 93, 98]
						}
					}
				]
			},
			{
				name: 'Pure Power',
				abilities: [
					{
						name: 'Grip Breaker',
						requirements: {
							STR: [94, 95, 96, 97]
						}
					},
					{
						name: 'Pocket Distruptor',
						requirements: {
							PMV: [88, 89, 91, 94]
						}
					},
					{
						name: 'Inside Disruptor',
						requirements: {
							BSH: [87, 89, 92, 94]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [80, 85, 90, 97]
						}
					},
					{
						name: 'Hammer',
						requirements: {
							POW: [86, 88, 91, 93]
						}
					}
				]
			},
			{
				name: 'Speed Rusher',
				abilities: [
					{
						name: 'Quick Jump',
						requirements: {
							ACC: [89, 91, 93, 94]
						}
					},
					{
						name: 'Duress',
						requirements: {
							PMV: [88, 89, 91, 94],
							FMV: [88, 89, 91, 94]
						}
					},
					{
						name: 'Take Down',
						requirements: {
							TAK: [82, 87, 91, 97]
						}
					},
					{
						name: 'Pocket Disruptor',
						requirements: {
							FMV: [88, 89, 91, 94]
						}
					},
					{
						name: 'Recoup',
						requirements: {
							STA: [86, 88, 90, 92]
						}
					}
				]
			},
			{
				name: 'Power Rusher',
				abilities: [
					{
						name: 'Pocket Disruptor',
						requirements: {
							PMV: [88, 89, 91, 94]
						}
					},
					{
						name: 'Duress',
						requirements: {
							PMV: [88, 89, 91, 94],
							FMV: [88, 89, 91, 94]
						}
					},
					{
						name: 'Grip Breaker',
						requirements: {
							STR: [84, 89, 94, 99]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [86, 88, 90, 94]
						}
					},
					{
						name: 'Take Down',
						requirements: {
							TAK: [88, 89, 91, 94]
						}
					}
				]
			}
		]
	},
	Linebacker: {
		name: 'Linebacker',
		numberRanges: [[0, 59]],
		mentalAbilities: ['Road Dog', 'Fan Favorite', 'Clearheaded', 'Winning Time', 'The Natural'],
		statMeans: {
			physical: 80,
			passing: 20,
			mental: 65,
			durability: 83,
			ballCarrier: 35, // Return ability
			receiving: 35, // Hands for INTs
			defense: 65,
			defensiveLine: 50, // Blitzing
			coverage: 55,
			blocking: 35,
			kicking: 20,
			special: 10
		},
		heightRange: [70, 77],
		weightRange: [200, 260],
		archetypes: [
			{
				name: 'Lurker',
				abilities: [
					{
						name: 'Knockout',
						requirements: {
							POW: [84, 86, 88, 92]
						}
					},
					{
						name: 'House Call',
						requirements: {
							CTH: [71, 73, 75, 78]
						}
					},
					{
						name: 'Robber',
						requirements: {
							ACC: [91, 92, 94, 95]
						}
					},
					{
						name: 'Bouncer',
						requirements: {
							ZCV: [82, 84, 86, 90]
						}
					},
					{
						name: 'Wrap Up',
						requirements: {
							TAK: [88, 90, 92, 93]
						}
					}
				]
			},
			{
				name: 'Signal Caller',
				abilities: [
					{
						name: 'Take Down',
						requirements: {
							STR: [84, 86, 88, 92]
						}
					},
					{
						name: 'Wrap Up',
						requirements: {
							TAK: [88, 90, 92, 93]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					},
					{
						name: 'Blow Up',
						requirements: {
							BSH: [80, 82, 85, 88]
						}
					},
					{
						name: 'Hammer',
						requirements: {
							POW: [86, 88, 90, 93]
						}
					}
				]
			},
			{
				name: 'Thumper',
				abilities: [
					{
						name: 'Grip Breaker',
						requirements: {
							STR: [87, 90, 93, 95]
						}
					},
					{
						name: 'Wrap Up',
						requirements: {
							TAK: [88, 90, 92, 93]
						}
					},
					{
						name: 'Aftershock',
						requirements: {
							POW: [88, 90, 92, 94]
						}
					},
					{
						name: 'Blow Up',
						requirements: {
							BSH: [80, 82, 85, 88]
						}
					},
					{
						name: 'Hammer',
						requirements: {
							BSH: [83, 85, 87, 89]
						}
					}
				]
			}
		]
	},
	Cornerback: {
		name: 'Cornerback',
		numberRanges: [[0, 49]],
		mentalAbilities: [
			'Road Dog',
			'Legion',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 83,
			passing: 25,
			mental: 60,
			durability: 83,
			ballCarrier: 50, // Return ability
			receiving: 45, // Hands for INTs
			defense: 45, // Tackling lower than LBs
			defensiveLine: 20,
			coverage: 60,
			blocking: 30,
			kicking: 20,
			special: 10
		},
		heightRange: [69, 75],
		weightRange: [170, 210],
		archetypes: [
			{
				name: 'Boundary',
				abilities: [
					{
						name: 'Jammer',
						requirements: {
							PRS: [82, 84, 87, 91]
						}
					},
					{
						name: 'Blanket Coverage',
						requirements: {
							MCV: [84, 86, 88, 92]
						}
					},
					{
						name: 'Lay Out',
						requirements: {
							SPC: [72, 74, 77, 80]
						}
					},
					{
						name: 'Wrap Up',
						requirements: {
							TAK: [88, 90, 92, 93]
						}
					},
					{
						name: 'Quick Jump',
						requirements: {
							ACC: [92, 93, 95, 96]
						}
					}
				]
			},
			{
				name: 'Bump and Run',
				abilities: [
					{
						name: 'Blanket Coverage',
						requirements: {
							MCV: [84, 86, 88, 92]
						}
					},
					{
						name: 'Jammer',
						requirements: {
							PRS: [82, 84, 87, 91]
						}
					},
					{
						name: 'House Call',
						requirements: {
							CTH: [75, 78, 81, 83]
						}
					},
					{
						name: 'Ballhawk',
						requirements: {
							AWR: [86, 88, 91, 94]
						}
					},
					{
						name: 'Knockout',
						requirements: {
							MCV: [86, 88, 90, 94],
							ZCV: [86, 88, 90, 94]
						}
					}
				]
			},
			{
				name: 'Field',
				abilities: [
					{
						name: 'Wrap Up',
						requirements: {
							TAK: [88, 90, 92, 93]
						}
					},
					{
						name: 'Robber',
						requirements: {
							COD: [89, 90, 92, 93]
						}
					},
					{
						name: 'Knockout',
						requirements: {
							MCV: [86, 88, 90, 94],
							ZCV: [86, 88, 90, 94]
						}
					},
					{
						name: 'Blanket Coverage',
						requirements: {
							MCV: [84, 86, 88, 92]
						}
					},
					{
						name: 'Ballhawk',
						requirements: {
							AWR: [86, 88, 91, 94]
						}
					}
				]
			},
			{
				name: 'Zone',
				abilities: [
					{
						name: 'Knockout',
						requirements: {
							MCV: [86, 88, 90, 94],
							ZCV: [86, 88, 90, 94]
						}
					},
					{
						name: 'Lay Out',
						requirements: {
							SPC: [72, 74, 77, 80]
						}
					},
					{
						name: 'House Call',
						requirements: {
							CTH: [75, 78, 81, 83]
						}
					},
					{
						name: 'Ballhawk',
						requirements: {
							AWR: [86, 88, 91, 94]
						}
					},
					{
						name: 'Bouncer',
						requirements: {
							ZCV: [86, 90, 94, 95]
						}
					}
				]
			}
		]
	},
	Safety: {
		name: 'Safety',
		numberRanges: [[0, 49]],
		mentalAbilities: [
			'Road Dog',
			'Legion',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 83,
			passing: 25,
			mental: 65,
			durability: 83,
			ballCarrier: 50,
			receiving: 45,
			defense: 60, // Better tacklers than CBs
			defensiveLine: 30,
			coverage: 60,
			blocking: 30,
			kicking: 20,
			special: 10
		},
		heightRange: [69, 76],
		weightRange: [175, 215],
		archetypes: [
			{
				name: 'Box Specialist',
				abilities: [
					{
						name: 'Aftershock',
						requirements: {
							POW: [88, 90, 92, 94]
						}
					},
					{
						name: 'Wrap Up',
						requirements: {
							TAK: [88, 90, 92, 93]
						}
					},
					{
						name: 'Hammer',
						requirements: {
							POW: [88, 90, 91, 93]
						}
					},
					{
						name: 'Blow Up',
						requirements: {
							PUR: [84, 85, 86, 89]
						}
					},
					{
						name: 'Workhorse',
						requirements: {
							TGH: [92, 93, 94, 96]
						}
					}
				]
			},
			{
				name: 'Coverage Specialist',
				abilities: [
					{
						name: 'Ballhawk',
						requirements: {
							AWR: [86, 88, 91, 94]
						}
					},
					{
						name: 'Lay Out',
						requirements: {
							SPC: [72, 74, 77, 80]
						}
					},
					{
						name: 'House Call',
						requirements: {
							CTH: [75, 78, 81, 83]
						}
					},
					{
						name: 'Robber',
						requirements: {
							COD: [89, 90, 92, 93]
						}
					},
					{
						name: 'Knockout',
						requirements: {
							MCV: [86, 88, 90, 94],
							ZCV: [86, 88, 90, 94]
						}
					}
				]
			},
			{
				name: 'Hybrid',
				abilities: [
					{
						name: 'Wrap Up',
						requirements: {
							TAK: [88, 90, 92, 93]
						}
					},
					{
						name: 'Hammer',
						requirements: {
							POW: [88, 90, 91, 93]
						}
					},
					{
						name: 'Knockout',
						requirements: {
							MCV: [86, 88, 90, 94],
							ZCV: [86, 88, 90, 94]
						}
					},
					{
						name: 'Aftershock',
						requirements: {
							POW: [88, 90, 92, 94]
						}
					},
					{
						name: 'Blow Up',
						requirements: {
							PUR: [84, 85, 86, 89]
						}
					}
				]
			}
		]
	},
	'Kicker/Punter': {
		name: 'Kicker/Punter',
		numberRanges: [
			[0, 49],
			[90, 99]
		],
		mentalAbilities: [
			'Road Dog',
			'Clutch Kicker',
			'Fan Favorite',
			'Clearheaded',
			'Winning Time',
			'The Natural'
		],
		statMeans: {
			physical: 55,
			passing: 40, // Fake FG potential
			mental: 55,
			durability: 80,
			ballCarrier: 30,
			receiving: 20,
			defense: 25,
			defensiveLine: 15,
			coverage: 15,
			blocking: 15,
			kicking: 70,
			special: 10
		},
		heightRange: [68, 77],
		weightRange: [160, 230],
		archetypes: [
			{
				name: 'Accurate',
				abilities: [
					{
						name: 'Chip Shot',
						requirements: {
							KPW: [87, 90, 92, 94]
						}
					},
					{
						name: 'Deep Range',
						requirements: {
							KAC: [86, 88, 91, 95]
						}
					},
					{
						name: 'Mega Leg',
						requirements: {
							KPW: [93, 95, 96, 97]
						}
					}
				]
			},
			{
				name: 'Power',
				abilities: [
					{
						name: 'Deep Range',
						requirements: {
							KAC: [86, 88, 91, 95]
						}
					},
					{
						name: 'Mega Leg',
						requirements: {
							KPW: [93, 95, 96, 97]
						}
					},
					{
						name: 'Coffin Corner',
						requirements: {
							KPW: [85, 88, 91, 93]
						}
					}
				]
			}
		]
	}
};
