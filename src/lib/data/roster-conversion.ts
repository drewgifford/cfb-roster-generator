import type { PositionType } from './positions';

const archetypeIdToNameMap = new Map<number, string>([
	[0, 'Pocket Passer'],
	[2, 'Backfield Creator'],
	[3, 'Dual Threat'],
	[4, 'Pure Runner'],
	[5, 'Contact Seeker'],
	[6, 'East/West Playmaker'],
	[7, 'Backfield Threat'],
	[8, 'North/South Blocker'],
	[9, 'North/South Receiver'],
	[10, 'Elusive Bruiser'],
	[12, 'Blocking'],
	[13, 'Utility'],
	[14, 'Speedster'],
	[15, 'Route Artist'],
	[16, 'Physical Route Runner'],
	[17, 'Elusive Route Runner'],
	[18, 'Gritty Possession'],
	[19, 'Gadget'],
	[20, 'Contested Specialist'],
	[22, 'Pure Blocker'],
	[23, 'Vertical Threat'],
	[24, 'Physical Route Runner'],
	[25, 'Gritty Possession'],
	[26, 'Pure Possession'],
	[27, 'Pass Protector'],
	[28, 'Raw Strength'],
	[29, 'Well Rounded'],
	[30, 'Agile'],
	[31, 'Pass Protector'],
	[32, 'Raw Strength'],
	[33, 'Well Rounded'],
	[34, 'Agile'],
	[35, 'Pass Protector'],
	[36, 'Well Rounded'],
	[37, 'Raw Strength'],
	[38, 'Agile'],
	[39, 'Speed Rusher'],
	[40, 'Power Rusher'],
	[41, 'Pure Power'],
	[42, 'Edge Setter'],
	[43, 'Gap Specialist'],
	[44, 'Pure Power'],
	[45, 'Speed Rusher'],
	[46, 'Power Rusher'],
	[48, 'Signal Caller'],
	[49, 'Lurker'],
	[50, 'Thumper'],
	[51, 'Signal Caller'],
	[52, 'Lurker'],
	[53, 'Thumper'],
	[54, 'Bump and Run'],
	[55, 'Boundary'],
	[56, 'Zone'],
	[57, 'Field'],
	[58, 'Coverage Specialist'],
	[59, 'Hybrid'],
	[60, 'Box Specialist'],
	[61, 'Accurate'],
	[62, 'Power'],
	[65, 'Power'],
	[66, 'Accurate']
]);

const positionIdToPositionMap = new Map<number, string>([
	[0, 'QB'],
	[1, 'HB'],
	[2, 'FB'],
	[3, 'WR'],
	[4, 'TE'],
	[5, 'LT'],
	[6, 'LG'],
	[7, 'C'],
	[8, 'RG'],
	[9, 'RT'],
	[10, 'LEDG'],
	[11, 'REDG'],
	[12, 'DT'],
	[13, 'SAM'],
	[14, 'MIKE'],
	[15, 'WILL'],
	[16, 'CB'],
	[17, 'FS'],
	[18, 'SS'],
	[19, 'K'],
	[20, 'P']
]);

export function getPositionFromId(id: number): PositionType {
	const position = positionIdToPositionMap.get(id);
	if (!position) throw new Error(`Position with id ${id} not found`);
	return position as PositionType;
}

export function getArchetypeFromId(id: number): string {
	const archetype = archetypeIdToNameMap.get(id);
	if (!archetype) throw new Error(`Archetype with id ${id} not found`);
	return archetype;
}
