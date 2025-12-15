export interface PlayerStats {
	// Physical (applies to everyone)
	SPD: number; // Speed
	STR: number; // Strength
	AGI: number; // Agility
	ACC: number; // Acceleration

	// Durability
	INJ: number; // Injury
	TGH: number; // Toughness
	STA: number; // Stamina

	// Mental
	AWR: number; // Awareness

	// Ball Carrier
	BTK: number; // Break Tackle
	TRK: number; // Trucking
	COD: number; // Change of Direction
	BCV: number; // Ball Carrier Vision
	SFA: number; // Stiff Arm
	SPM: number; // Spin Move
	JKM: number; // Juke Move
	CAR: number; // Carrying
	JMP: number; // Jump

	// Quarterback
	THP: number; // Throw Power
	SAC: number; // Short Accuracy
	MAC: number; // Medium Accuracy
	DAC: number; // Deep Accuracy
	RUN: number; // Throw on Run
	TUP: number; // Throw Under Pressure
	BSK: number; // Break Sack
	PAC: number; // Play Action

	// Receiver
	CTH: number; // Catching
	SRR: number; // Short Route Running
	MRR: number; // Medium Route Running
	DRR: number; // Deep Route Running
	CIT: number; // Catch in Traffic
	SPC: number; // Spectacular Catch
	RLS: number; // Release

	// Blocking
	PBK: number; // Pass Block
	PBP: number; // Pass Block Power
	PBF: number; // Pass Block Finesse
	RBK: number; // Run Block
	RBP: number; // Run Block Power
	RBF: number; // Run Block Finesse
	LBK: number; // Lead Block
	IBL: number; // Impact Blocking

	// Defense
	PRC: number; // Play Recognition
	TAK: number; // Tackle
	POW: number; // Hit Power
	PMV: number; // Power Move
	FMV: number; // Finesse Move
	BSH: number; // Block Shedding
	PUR: number; // Pursuit

	// Coverage
	MCV: number; // Man Coverage
	ZCV: number; // Zone Coverage
	PRS: number; // Press

	// Kicking
	KPW: number; // Kick Power
	KAC: number; // Kick Accuracy

	// Special
	RET: number; // Return
	LSP: number; // Long Snap
}

export const STAT_NAMES = {
	SPD: 'Speed',
	STR: 'Strength',
	AGI: 'Agility',
	ACC: 'Acceleration',
	AWR: 'Awareness',
	INJ: 'Injury',
	TGH: 'Toughness',
	STA: 'Stamina',
	BTK: 'Break Tackle',
	TRK: 'Trucking',
	COD: 'Change of Direction',
	BCV: 'Ball Carrier Vision',
	SFA: 'Stiff Arm',
	SPM: 'Spin Move',
	JKM: 'Juke Move',
	CAR: 'Carrying',
	JMP: 'Jump',
	THP: 'Throw Power',
	SAC: 'Short Accuracy',
	MAC: 'Medium Accuracy',
	DAC: 'Deep Accuracy',
	RUN: 'Throw on Run',
	TUP: 'Throw Under Pressure',
	BSK: 'Break Sack',
	PAC: 'Play Action',
	CTH: 'Catching',
	SRR: 'Short Route Running',
	MRR: 'Medium Route Running',
	DRR: 'Deep Route Running',
	CIT: 'Catch in Traffic',
	SPC: 'Spectacular Catch',
	RLS: 'Release',
	PBK: 'Pass Block',
	PBP: 'Pass Block Power',
	PBF: 'Pass Block Finesse',
	RBK: 'Run Block',
	RBP: 'Run Block Power',
	RBF: 'Run Block Finesse',
	LBK: 'Lead Block',
	IBL: 'Impact Blocking',
	PRC: 'Play Recognition',
	TAK: 'Tackle',
	POW: 'Hit Power',
	PMV: 'Power Move',
	FMV: 'Finesse Move',
	BSH: 'Block Shedding',
	PUR: 'Pursuit',
	MCV: 'Man Coverage',
	ZCV: 'Zone Coverage',
	PRS: 'Press',
	KPW: 'Kick Power',
	KAC: 'Kick Accuracy',
	LSP: 'Long Snap',
	RET: 'Return'
};

// All stat keys for iteration
export const ALL_STAT_KEYS = [
	// General
	'SPD',
	'STR',
	'AGI',
	'ACC',
	'AWR',
	'INJ',
	'TGH',
	'STA',
	// Ball Carrier
	'BTK',
	'TRK',
	'COD',
	'BCV',
	'SFA',
	'SPM',
	'JKM',
	'CAR',
	'JMP',
	// Quarterback
	'THP',
	'SAC',
	'MAC',
	'DAC',
	'RUN',
	'TUP',
	'BSK',
	'PAC',
	// Receiver
	'CTH',
	'SRR',
	'MRR',
	'DRR',
	'CIT',
	'SPC',
	'RLS',
	// Blocking
	'PBK',
	'PBP',
	'PBF',
	'RBK',
	'RBP',
	'RBF',
	'LBK',
	'IBL',
	// Defense
	'PRC',
	'TAK',
	'POW',
	'PMV',
	'FMV',
	'BSH',
	'PUR',
	// Coverage
	'MCV',
	'ZCV',
	'PRS',
	// Kicking
	'KPW',
	'KAC',
	// Special
	'RET',
	'LSP'
];

export type PlayerStat = keyof PlayerStats;

export type StatCategory =
	| 'physical'
	| 'durability'
	| 'passing'
	| 'mental'
	| 'ballCarrier'
	| 'receiving'
	| 'coverage'
	| 'defense'
	| 'defensiveLine'
	| 'blocking'
	| 'kicking'
	| 'special';
export const STAT_CATEGORIES: Record<StatCategory, { name: string; stats: (keyof PlayerStats)[] }> =
	{
		physical: {
			name: 'Physical',
			stats: ['SPD', 'STR', 'AGI', 'ACC', 'JMP']
		},
		durability: {
			name: 'Durability',
			stats: ['STA', 'INJ', 'TGH']
		},
		passing: {
			name: 'Passing',
			stats: ['THP', 'SAC', 'MAC', 'DAC', 'RUN', 'TUP', 'BSK', 'PAC']
		},
		mental: {
			name: 'Mental',
			stats: ['AWR']
		},
		ballCarrier: {
			name: 'Ball Carrier',
			stats: ['BTK', 'TRK', 'COD', 'BCV', 'SPM', 'JKM', 'CAR', 'SFA']
		},
		receiving: {
			name: 'Receiving',
			stats: ['CTH', 'SRR', 'MRR', 'DRR', 'CIT', 'SPC', 'RLS', 'RET']
		},
		coverage: {
			name: 'Coverage',
			stats: ['PRS', 'ZCV', 'MCV', 'PRS']
		},
		defense: {
			name: 'Defense',
			stats: ['PRC', 'TAK', 'PUR']
		},
		defensiveLine: {
			name: 'Defensive Line',
			stats: ['PMV', 'POW', 'FMV', 'BSH']
		},
		blocking: {
			name: 'Blocking',
			stats: ['PBK', 'PBP', 'PBF', 'RBK', 'RBP', 'RBF', 'LBK', 'IBL']
		},
		kicking: {
			name: 'Kicking',
			stats: ['KAC', 'KPW']
		},
		special: {
			name: 'Special',
			stats: ['LSP']
		}
	};
