import { Faker, en_US, en } from '@faker-js/faker';
import { Profanity } from '@2toad/profanity';
import { JsonProvider } from '$lib/util/db-provider';

const profanity = new Profanity();

export const faker = new Faker({
	locale: [en_US, en]
});

export function getWeightedRandomName(names: Record<string, number>): string {
	let total = 0;

	for (const weight of Object.values(names)) {
		if (weight > 0 && Number.isFinite(weight)) {
			total += weight;
		}
	}

	if (total === 0) {
		throw new Error('All weights are zero or invalid');
	}

	let r = Math.random() * total;

	for (const [name, weight] of Object.entries(names)) {
		if (weight <= 0 || !Number.isFinite(weight)) continue;

		if (r < weight) {
			return name;
		}

		r -= weight;
	}

	// Floating-point fallback
	return Object.keys(names)[Object.keys(names).length - 1];
}

// Generate a full random name
export function generateRandomName(): { firstName: string; lastName: string } {
	const data = JsonProvider.getData();
	const firstNames = data.firstNames;
	const lastNames = data.lastNames;

	let firstName = '';
	let lastName = '';

	do {
		firstName = getWeightedRandomName(firstNames);
		lastName = getWeightedRandomName(lastNames);
	} while (
		profanity.exists(firstName) ||
		profanity.exists(lastName) ||
		profanity.exists(`${firstName} ${lastName}`) ||
		profanity.exists(`${lastName} ${firstName}`) ||
		firstName.includes("'") ||
		lastName.includes("'")
	);

	return {
		firstName,
		lastName
	};
}
