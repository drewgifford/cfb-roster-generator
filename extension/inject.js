const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
	window.HTMLInputElement.prototype,
	'value'
).set;

(() => {
	if (document.getElementById('__json_importer')) return;

	const container = document.createElement('div');
	container.id = '__json_importer';
	container.style.cssText = `
    position: fixed;
    bottom: 16px;
    right: 16px;
    background: #111;
    color: white;
    padding: 12px;
    z-index: 999999;
    border-radius: 8px;
  `;

	container.innerHTML = `
    <strong>Import JSON</strong><br/>
    <input type="file" id="jsonFile" accept=".json" />
    <button id="import">Import</button>
    <p class="cfb__status" style="color: white;"></p>
    <p class="cfb__error" style="color: red;"></p>
  `;

	document.body.appendChild(container);

	container.querySelector('#import').onclick = () => importData();
})();

function importData() {
	const file = document.getElementById('jsonFile').files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = (e) => {
		const text = e.target.result;
		const importedData = JSON.parse(text);
		importRoster(importedData);
	};
	reader.readAsText(file);
}

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function setStatus(text) {
	const statusEl = document.querySelector('.cfb__status');
	if (statusEl) statusEl.textContent = text;
}

function setError(text) {
	const errorEl = document.querySelector('.cfb__error');
	if (errorEl) errorEl.textContent = text;
}

async function importRoster(data) {
	try {
		const { preset, programRating, roster } = data;

		if (!preset || !programRating || !roster || !Array.isArray(roster)) {
			alert('Invalid roster data');
			return;
		}

		setStatus('Navigating to roster page...');
		navigateToRosterPage();
		await sleep(1000);

		setStatus('Setting preset...');
		setPreset(preset);
		await sleep(1000);

		setStatus('Selecting ALL filter...');
		selectAllFilter();
		await sleep(1000);

		const buttons = getPlayerButtons();

		const queue = {};
		for (const player of roster) {
			const positionQueue = queue[player.position] || [];
			positionQueue.push(player);

			queue[player.position] = positionQueue;
		}

		let playerCount = 0;
		for (const button of buttons) {
			setStatus(`Inputting player ${playerCount + 1} of ${buttons.length}...`);

			const positionLabel = $(button).find('div.player-ticket--info .fw-400').text().trim();

			const positionQueue = queue[positionLabel] || [];
			if (positionQueue.length > 0) {
				const player = positionQueue.shift();
				await inputPlayer(button, player);
			}

			playerCount++;
		}

		setStatus('Roster imported successfully!');
	} catch (error) {
		setError('Error importing roster');
		console.error(error);
	}
}

function simulateUserInput(input, value) {
	// Focus the input
	input.focus();

	// Use the native setter to set the value (bypasses Angular's interception)
	nativeInputValueSetter.call(input, String(value));

	// Fire input event - Angular listens to this
	input.dispatchEvent(
		new Event('input', {
			bubbles: true,
			composed: true
		})
	);

	// Simulate pressing Enter key
	input.dispatchEvent(
		new KeyboardEvent('keydown', {
			key: 'Enter',
			code: 'Enter',
			keyCode: 13,
			which: 13,
			bubbles: true,
			composed: true
		})
	);
	input.dispatchEvent(
		new KeyboardEvent('keypress', {
			key: 'Enter',
			code: 'Enter',
			keyCode: 13,
			which: 13,
			bubbles: true,
			composed: true
		})
	);
	input.dispatchEvent(
		new KeyboardEvent('keyup', {
			key: 'Enter',
			code: 'Enter',
			keyCode: 13,
			which: 13,
			bubbles: true,
			composed: true
		})
	);

	// Fire change event
	input.dispatchEvent(
		new Event('change', {
			bubbles: true,
			composed: true
		})
	);

	// Blur the input
	input.blur();
}

function simulateUserSlider($input, value) {
	const input = $($input).get(0);
	input.value = value;
	input.dispatchEvent(
		new Event('change', {
			bubbles: true,
			composed: true
		})
	);
	input.blur();
}

function simulateUserSelectByNumber($input, value) {
	const input = $($input).get(0);

	const $options = $(input).find('option');
	const option = $options.get(value);

	option.selected = true;
	input.value = option.value;
	input.dispatchEvent(
		new Event('change', {
			bubbles: true,
			composed: true
		})
	);
	input.blur();
}

function simulateUserSelect($input, value) {
	value = value.toString().toLowerCase().trim();
	const input = $($input).get(0);
	const $options = $(input).find('option');
	const valueMap = {};
	for (const option of $options) {
		valueMap[option.textContent.toLowerCase().trim()] = option;
	}
	const option = valueMap[value];

  if (!option) {
    console.warn(`Option ${value} not found for input ${input.value}, skipping...`);
    return;
  }

	option.selected = true;
	input.value = option.value;
	input.dispatchEvent(
		new Event('change', {
			bubbles: true,
			composed: true
		})
	);
	input.blur();
}

function getPlayerButtons() {
	const $buttons = $('button.player-ticket');
	return $buttons;
}

function navigateToRosterPage() {
	const buttons = $('team-create-navbar button');

	for (const button of buttons) {
		if (button.textContent.toLowerCase().includes('roster')) {
			button.click();
			break;
		}
	}
}

function setPreset(preset) {
	const $input = $("app-input-select[title='Presets'] select");

	simulateUserSelect($input, preset);
}

function selectAllFilter() {
	const $button = $("app-players-tickets button[aria-label='Filter by: All']");
	$button.get(0).click();
}

async function inputPlayer(button, player) {
	$(button).get(0).click();
	await sleep(100);
	await inputPlayerBio(player);
	await sleep(100);
	await inputPlayerStats(player);
  await sleep(500);
}

async function inputPlayerStats(player) {
	const $tabButtons = $('app-roster-content button.tab-button');
	for (const button of $tabButtons) {
		if (button.textContent.toLowerCase().includes('skill ratings')) {
			button.click();
			break;
		}
	}
	await sleep(100);

	const $skillRatingContainers = $('form.playerRating-item');
	for (const container of $skillRatingContainers) {
		const label = $(container).find('label').text().trim().toUpperCase();
		const input = $(container).find('input').get(0);

		const statKey = label.substring(label.length - 4, label.length - 1);

		if (Object.keys(player.stats).includes(statKey)) {
			const statValue = player.stats[statKey];
			simulateUserInput(input, statValue);
		}
	}

  await sleep(100);

	const $selectContainers = $('app-roster-content .select-wrapper');
	for (const container of $selectContainers) {
		const select = $(container).find('select').get(0);
		const label = $(container).find('label').text().trim().toLowerCase();
		if (label.includes('archetype')) {
			let archetype = player.archetype;
			if (
				player.archetype === 'Gap Specialist' &&
				(player.position === 'REDG' || player.position === 'LEDG')
			) {
				archetype = 'Edge Setter';
			}
			simulateUserSelect(select, archetype);
		} else if (label.includes('development trait')) {
			const devTrait = player.devTrait;

			$(container).find('button').get(0).click();
			await sleep(150);

			const buttons = $('.dropdown-item');

			let index = 0;
			switch (devTrait) {
				case 'Normal':
					index = 0;
					break;
				case 'Impact':
					index = 1;
					break;
				case 'Star':
					index = 2;
					break;
				case 'Elite':
					index = 3;
					break;
			}

			const button = buttons.get(index);
			button.click();
		} else if (label.includes('potential')) {
			const potential = player.potential;
			simulateUserSelect(select, potential);
		}
	}

  await sleep(100);

	// Workaround for mental abilities not being selected correctly
	const mentalAbilityIds = ['MentalAbility0', 'MentalAbility1', 'MentalAbility2'];
	const usedMentalAbilities = [];
	for (const id of mentalAbilityIds) {
		const button = $(`#${id}`);
		button.get(0).click();
		await sleep(100);

		const buttons = $('div.mental-abilities button');
		for (const b of buttons) {
			const label = $(b).find('span').text().trim();

			const mentalAbilities = Object.keys(player.mentalAbilities);
			if (mentalAbilities.includes(label) && !usedMentalAbilities.includes(label)) {
				b.click();
				usedMentalAbilities.push(label);
				break;
			}
		}
	}

  await sleep(100);

	const $abilityContainers = $('app-abilities .flex-row.ng-star-inserted');
	for (const container of $abilityContainers) {
		const ability = $(container).find('span.ability-label').text().trim();
		const select = $(container).find('select');

		if (Object.keys(player.abilities).includes(ability)) {
			const abilityLevel = player.abilities[ability];
			simulateUserSelectByNumber(select, abilityLevel);
		}
	}

  await sleep(100);

	for (const id of mentalAbilityIds) {
		const container = $(`#${id}`);
		const select = $(container).parent().find('select');

		const mentalAbility = usedMentalAbilities.shift();
		if (mentalAbility) {
			const tier = player.mentalAbilities[mentalAbility];
			simulateUserSelectByNumber(select, tier);
		}
	}

	await sleep(100);
}

async function inputPlayerBio(player) {
	const $tabButtons = $('app-roster-content button.tab-button');
	for (const button of $tabButtons) {
		if (button.textContent.toLowerCase().includes('bio')) {
			button.click();
			break;
		}
	}
	await sleep(500);

	const $textInputContainers = $('app-roster-content .text-input');

	for (const container of $textInputContainers) {
		const input = $(container).find('input').get(0);
		const label = $(container).find('label').text().trim().toLowerCase();

		if (label.includes('first name')) {
			simulateUserInput(input, player.firstName);
		} else if (label.includes('last name')) {
			simulateUserInput(input, player.lastName);
		}
	}

	const $selectContainers = $('app-roster-content .select-wrapper');
	for (const container of $selectContainers) {
		const select = $(container).find('select').get(0);
		const label = $(container).find('label').text().trim().toLowerCase();
		if (label.includes('year')) {
			let year = player.year.replace('r', '');

			let yearDisplay = 'Freshman';
			switch (year) {
				case 'FR':
					yearDisplay = 'Freshman';
					break;
				case 'SO':
					yearDisplay = 'Sophomore';
					break;
				case 'JR':
					yearDisplay = 'Junior';
					break;
				case 'SR':
					yearDisplay = 'Senior';
					break;
			}

			simulateUserSelect(select, yearDisplay);
		} else if (label.includes('redshirt')) {
			const isRedshirt = player.year.includes('r');
			const value = isRedshirt ? 'Yes' : 'No';
			simulateUserSelect(select, value);
		} else if (label.includes('handedness')) {
			const value = player.handedness;
			simulateUserSelect(select, value);
		} else if (label.includes('number')) {
			const value = player.jerseyNumber;
			simulateUserSelect(select, value);
		} else if (label.includes('dealbreaker')) {
			const value = player.dealbreaker;
			simulateUserSelect(select, value);
		}
	}

	const $sliderContainers = $('app-roster-content .grade-slider').parent().parent();
	for (const container of $sliderContainers) {
		const slider = $(container).find('input').get(0);
		const label = $(container).find('label').text().trim().toLowerCase();
		if (label.includes('weight')) {
			simulateUserSlider(slider, player.weight);
		} else if (label.includes('height')) {
			simulateUserSlider(slider, player.height);
		}
	}

	// Select star rating
	const $starRatingContainer = $('app-roster-content .grade-wrapper button');
	const button = $starRatingContainer.get(player.starRating - 1);
	button.click();

	// Select skin tone
	// TODO: Make skin tone on the player object
	const $skinToneContainer = $('app-player-appearance .filterGroup--colors button');
	const skinRand = Math.floor(Math.random() * $skinToneContainer.length);
	const skinToneButton = $skinToneContainer.get(skinRand);
	skinToneButton.click();

	// Select head
	const $headContainer = $('app-player-appearance .filterGroup--design--xl button');
	const headRand = Math.floor(Math.random() * $headContainer.length);
	const headButton = $headContainer.get(headRand);
	headButton.click();

	await sleep(2000);

	const $errorTexts = $('.error-text--active');
	if ($errorTexts.length > 0) {
		alert('Error inputting player bio. Will continue with next players, but the script may stop.');
	}
}
