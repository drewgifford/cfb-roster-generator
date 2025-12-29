import { mapPlayerCsvToDb, playerCsvSchema, type PlayerDb } from '../lib/types/roster-conversion';
import * as csv from '@fast-csv/parse';
import fs from 'fs';
import path from 'path';
import { analyzePosition } from './regression';
import { POSITION_ORDER, type PositionType } from '$lib/data/positions';
import type { JsonStorage, RosterAnalysisData } from '$lib/types/roster-conversion';

const ratingsFileName = 'data/player_ratings.csv';
const outputFilePath = 'static/player-data.json';

export function generatePlayerData() {
	const filePath = path.join(process.cwd(), ratingsFileName);
	if (!fs.existsSync(filePath)) {
		throw new Error(`File ${ratingsFileName} does not exist`);
	}

	const players: PlayerDb[] = [];

	csv
		.parseFile(filePath, { headers: true })
		.on('data', (row) => {
			const parsedRow = playerCsvSchema.parse(row);
			const parsedDbRow = mapPlayerCsvToDb(parsedRow);
			players.push(parsedDbRow);
		})
		.on('end', () => {
			console.log(players.length, 'players inserted.');

			const rosterAnalysisData = runAnalysis(players);
			const { firstNames, lastNames } = createNames(players);

			const jsonData: JsonStorage = {
				rosterAnalysisData,
				firstNames,
				lastNames
			};

			fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
			console.log(`Player data saved to ${outputFilePath}`);
		});
}

export function runAnalysis(players: PlayerDb[]): RosterAnalysisData {
	const data: Partial<RosterAnalysisData> = {};

	const positions = POSITION_ORDER as PositionType[];

	for (const position of positions) {
		const analysis = analyzePosition(players, position);
		data[position] = analysis;
		console.log(`Analysis for ${position} complete.`);
	}

	console.log('Analysis complete.');

	return data as RosterAnalysisData;
}

export function createNames(players: PlayerDb[]) {
	const firstNames: Record<string, number> = {};
	const lastNames: Record<string, number> = {};

	players.forEach((p) => {
		firstNames[p.firstName] = (firstNames[p.firstName] || 0) + 1;
		lastNames[p.lastName] = (lastNames[p.lastName] || 0) + 1;
	});

	return { firstNames, lastNames };
}
