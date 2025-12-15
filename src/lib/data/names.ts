import { Faker, en_US, en } from '@faker-js/faker';
import { Profanity } from '@2toad/profanity';

const profanity = new Profanity();

export const faker = new Faker({
	locale: [en_US, en]
});

// Generate a full random name
export function generateRandomName(): { firstName: string; lastName: string } {
	let firstName = '';
	let lastName = '';

	do {
		firstName = faker.person
			.firstName('male')
			.replace(/[^a-zA-Z ]/g, '')
			.trim();
		lastName = faker.person
			.lastName('male')
			.replace(/[^a-zA-Z ]/g, '')
			.trim();
	} while (
		profanity.exists(firstName) ||
		profanity.exists(lastName) ||
		profanity.exists(`${firstName} ${lastName}`) ||
		profanity.exists(`${lastName} ${firstName}`)
	);

	return {
		firstName,
		lastName
	};
}
