(() => {
	const inputForms = document.querySelectorAll('form.playerRating-item');

	const ALL_STAT_KEYS = [
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

	// Parse stat inputs from the page
	const statInputs = {};
	for (const form of inputForms) {
		const text = form.querySelector('label')?.textContent;
		const input = form.querySelector('input[type="number"]');
		if (!text) throw new Error('Could not find label for stat group object');
		if (!input) throw new Error('Could not find input for stat group object');
		const statKey = text.substring(text.length - 4, text.length - 1);
		statInputs[statKey] = input;
	}

	// Initialize results with all required properties
	const results = {
		status: 'running',
		progress: '',
		foundStats: Object.keys(statInputs),
		totalForms: inputForms.length,
		baseline: null,
		isolationTests: {},
		sensitivityTests: {}
	};

	// Get the native value setter - this bypasses Angular's wrapper
	const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
		window.HTMLInputElement.prototype,
		'value'
	).set;

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function getPlayerOvr() {
		const ovrElement = document.querySelector('.ovr-container .fw-700');
		return parseInt(ovrElement?.textContent) || 0;
	}

	function simulateUserInput(input, value) {
		// Focus the input
		input.focus();

		// Use the native setter to set the value (bypasses Angular's interception)
		nativeInputValueSetter.call(input, String(value));

		// Fire input event - Angular listens to this
		input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

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
		input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));

		// Blur the input
		input.blur();
	}

	async function setStatToValue(stat, value) {
		const inputs = value.toString().split().map(Number);

		for (const input of inputs) {
			simulateUserInput(statInputs[stat], input);
			await sleep(1);
		}
	}

	async function setAllStatsToValue(value = 0) {
		await Promise.all(ALL_STAT_KEYS.map((key) => setStatToValue(key, value)));
	}

	function sendProgress(message) {
		console.log(message);
		results.progress = message;
		//updateResults(results);
	}

	/* Phase 1: Sensitivity Tests */
	async function runSensitivityTests() {
		try {
			await setAllStatsToValue(50);

			const affectedStats = [];
			const baseOvr = getPlayerOvr();
			for (const stat of ALL_STAT_KEYS) {
				await setStatToValue(stat, 99);
				const newOvr = getPlayerOvr();
				if (newOvr !== baseOvr) {
					affectedStats.push(stat);
				}
				await setStatToValue(stat, 50);
			}

			sendProgress('Sensitivity tests complete!' + affectedStats.join(', '));
			return affectedStats;
		} catch (error) {
			results.status = 'error';
			results.error = error.message;
			return [];
		}
	}

	async function collectData(activeStats, count = 500) {
		const data = [];

		for (let i = 0; i < count; i++) {
			const inputs = {};
			const inputsArray = [];

			await Promise.all(
				activeStats.map(async (stat) => {
					const val = Math.floor(Math.random() * 60) + 20;
					inputs[stat] = val;
					inputsArray.push(val);
					await setStatToValue(stat, val);
				})
			);

			await sleep(1);
			const ovr = getPlayerOvr();

			if (ovr > 12 && ovr < 99) {
				data.push({ x: inputsArray, y: ovr });
			}
		}
		return data;
	}

	function solve(activeStats, data) {
		sendProgress('Solving...');

		if (data.length < activeStats.length + 2) {
			throw new Error('Not enough data to solve');
		}

		const X = data.map((d) => d.x);
		const y = data.map((d) => d.y);
		const nFeatures = activeStats.length;

		const means = X[0].map((_, i) => X.reduce((a, r) => a + r[i], 0) / X.length);
		const stds = X[0].map(
			(_, i) => Math.sqrt(X.reduce((a, r) => a + (r[i] - means[i]) ** 2, 0) / X.length) || 1
		);
		const X_norm = X.map((row) => row.map((v, i) => (v - means[i]) / stds[i]));

		let weights = new Array(nFeatures).fill(0);
		let bias = 0;
		const lr = 0.01;
		const iterations = 40000;

		for (let iter = 0; iter < iterations; iter++) {
			console.log(`Iteration ${iter}...`);

			let wGrad = new Array(nFeatures).fill(0);
			let bGrad = 0;

			for (let i = 0; i < X.length; i++) {
				const pred = X_norm[i].reduce((sum, v, idx) => sum + v * weights[idx], 0) + bias;
				const err = pred - y[i];

				bGrad += err;
				for (let j = 0; j < nFeatures; j++) {
					wGrad[j] += err * X_norm[i][j];
				}
			}

			bias -= (lr / X.length) * bGrad;
			for (let j = 0; j < nFeatures; j++) {
				weights[j] -= (lr / X.length) * wGrad[j];
			}
		}

		// de normalize
		const finalWeights = weights.map((w, i) => w / stds[i]);
		let finalBias = bias;
		finalWeights.forEach((w, i) => (finalBias -= w * means[i]));

		const weightsByStat = {};
		activeStats.forEach((stat, i) => {
			const w = finalWeights[i];
			weightsByStat[stat] = w.toFixed(4);
		});

		const object = {
			intercept: finalBias.toFixed(4),
			weights: weightsByStat
		};

		console.log(JSON.stringify(object, null, 2).replaceAll('"', ''));
	}

	// Start the tests
	runSensitivityTests().then((activeStats) => {
		const count = Math.max(activeStats.length * 12, 30);
		collectData(activeStats, count).then((data) => {
			sendProgress(data);
			solve(activeStats, data);
			return data;
		});
	});
})();
