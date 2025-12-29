import type { JsonStorage } from '$lib/types/roster-conversion';

export class JsonProvider {
	private static data: JsonStorage | undefined;

	public static async initializeData(): Promise<void> {
		const response = await fetch('/player-data.json');
		const data = await response.json();
		JsonProvider.data = data as JsonStorage;
	}

	public static getData(): JsonStorage {
		if (!JsonProvider.data) {
			throw new Error('Json data not initialized');
		}
		return JsonProvider.data;
	}
}
