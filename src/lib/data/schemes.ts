import type { PositionGroupType } from '../data/position-groups';

export type OffenseScheme = 'Air Raid' | 'Multiple' | 'Spread';
export const OffensiveSchemes: OffenseScheme[] = ['Air Raid', 'Multiple', 'Spread'];

export type DefenseScheme = '4-3' | '3-4' | '3-3-5' | '4-2-5';
export const DefenseSchemes: DefenseScheme[] = ['4-3', '3-4', '3-3-5', '4-2-5'];

export type ArchetypeWeights = Partial<Record<PositionGroupType, Record<string, number>>>;
export type SchemeData = {
	archetypeWeights: ArchetypeWeights;
};

export const OFFENSE_SCHEMES: Record<OffenseScheme, SchemeData> = {
	'Air Raid': {
		archetypeWeights: {
			Quarterback: {
				'Pocket Passer': 3,
				'Backfield Creator': 2,
				'Dual Threat': 1.5,
				'Pure Runner': 1
			},
			Halfback: {
				'Backfield Threat': 3,
				'East/West Playmaker': 2.5,
				'North/South Receiver': 2,
				'Elusive Bruiser': 1.5
			},
			Fullback: {
				Utility: 2,
				Blocking: 1
			},
			'Wide Receiver': {
				'Route Artist': 3,
				Speedster: 2.5,
				'Elusive Route Runner': 2.5,
				Gadget: 2,
				'Contested Specialist': 1.5
			},
			'Tight End': {
				'Vertical Threat': 3,
				'Physical Route Runner': 2,
				'Pure Possession': 2,
				'Pure Blocker': 1
			},
			'Offensive Line': {
				'Pass Protector': 3,
				Agile: 2.5,
				'Well Rounded': 1.5,
				'Raw Strength': 1
			}
		}
	},
	Multiple: {
		archetypeWeights: {
			Quarterback: {
				'Pocket Passer': 2.5,
				'Backfield Creator': 2.5,
				'Dual Threat': 2,
				'Pure Runner': 1
			},
			Halfback: {
				'Contact Seeker': 3,
				'North/South Blocker': 2.5,
				'Elusive Bruiser': 2,
				'North/South Receiver': 2
			},
			Fullback: {
				Blocking: 3,
				Utility: 2
			},
			'Wide Receiver': {
				'Physical Route Runner': 3,
				'Gritty Possession': 2.5,
				'Contested Specialist': 2.5,
				'Route Artist': 2
			},
			'Tight End': {
				'Pure Blocker': 2.5,
				'Pure Possession': 2.5,
				'Gritty Possession': 2,
				'Vertical Threat': 1.5
			},
			'Offensive Line': {
				'Well Rounded': 3,
				'Raw Strength': 2.5,
				'Pass Protector': 2,
				Agile: 1
			}
		}
	},
	Spread: {
		archetypeWeights: {
			Quarterback: {
				'Dual Threat': 3,
				'Pure Runner': 2.5,
				'Backfield Creator': 2,
				'Pocket Passer': 1
			},
			Halfback: {
				'East/West Playmaker': 3,
				'Elusive Bruiser': 2.5,
				'Backfield Threat': 2.5,
				'Contact Seeker': 1.5
			},
			Fullback: {
				Utility: 2,
				Blocking: 1
			},
			'Wide Receiver': {
				Speedster: 3,
				Gadget: 2.5,
				'Elusive Route Runner': 2.5,
				'Route Artist': 2
			},
			'Tight End': {
				'Vertical Threat': 2.5,
				'Physical Route Runner': 2.5,
				'Pure Blocker': 1
			},
			'Offensive Line': {
				Agile: 3,
				'Pass Protector': 2,
				'Well Rounded': 2,
				'Raw Strength': 1
			}
		}
	}
};

export const DEFENSE_SCHEMES: Record<DefenseScheme, SchemeData> = {
	'4-3': {
		archetypeWeights: {
			'Defensive Line': {
				'Speed Rusher': 3, // Defensive Ends
				'Gap Specialist': 2.5, // DTs
				'Power Rusher': 2,
				'Pure Power': 1.5
			},
			Linebacker: {
				Lurker: 3, // OLBs need coverage
				'Signal Caller': 2.5, // MLB
				Thumper: 1.5
			},
			Cornerback: {
				Zone: 3,
				Field: 2.5,
				Boundary: 2,
				'Bump and Run': 1
			},
			Safety: {
				'Coverage Specialist': 3,
				'Box Specialist': 2,
				Hybrid: 2
			},
			'Kicker/Punter': {
				Accurate: 2,
				Power: 2
			}
		}
	},
	'3-4': {
		archetypeWeights: {
			'Defensive Line': {
				'Pure Power': 3, // 3-4 DEs need size
				'Gap Specialist': 3, // Nose Tackle
				'Power Rusher': 1.5,
				'Speed Rusher': 1
			},
			Linebacker: {
				Thumper: 3, // ILBs
				'Signal Caller': 2.5, // ILBs
				Lurker: 1.5
			},
			Cornerback: {
				Boundary: 2.5,
				'Bump and Run': 2.5,
				Field: 2,
				Zone: 1.5
			},
			Safety: {
				'Box Specialist': 3, // Strong Safety
				Hybrid: 2.5,
				'Coverage Specialist': 2
			},
			'Kicker/Punter': {
				Power: 2.5,
				Accurate: 1.5
			}
		}
	},
	'3-3-5': {
		archetypeWeights: {
			'Defensive Line': {
				'Speed Rusher': 2.5,
				'Gap Specialist': 2.5, // Nose
				'Power Rusher': 2,
				'Pure Power': 1
			},
			Linebacker: {
				Lurker: 3, // Speed in space is king
				'Signal Caller': 2,
				Thumper: 1
			},
			Cornerback: {
				Field: 3,
				Zone: 2.5,
				Boundary: 2,
				'Bump and Run': 1.5
			},
			Safety: {
				Hybrid: 3, // The 3rd safety (Rover)
				'Coverage Specialist': 2.5,
				'Box Specialist': 1.5
			},
			'Kicker/Punter': {
				Accurate: 2,
				Power: 2
			}
		}
	},
	'4-2-5': {
		archetypeWeights: {
			'Defensive Line': {
				'Speed Rusher': 3,
				'Power Rusher': 2.5,
				'Gap Specialist': 2,
				'Pure Power': 1
			},
			Linebacker: {
				Lurker: 3, // Only 2 LBs, must cover ground
				'Signal Caller': 2.5,
				Thumper: 1
			},
			Cornerback: {
				Boundary: 2.5, // Often plays more Match/Man
				Field: 2.5,
				'Bump and Run': 2,
				Zone: 2
			},
			Safety: {
				Hybrid: 3, // The 5th DB (Slot/Star)
				'Box Specialist': 2.5,
				'Coverage Specialist': 2
			},
			'Kicker/Punter': {
				Power: 2.5,
				Accurate: 1.5
			}
		}
	}
};
