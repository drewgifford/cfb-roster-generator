document.addEventListener('DOMContentLoaded', () => {
	const button = document.querySelector('button');
	const textarea = document.querySelector('textarea');
	let pollInterval = null;

	async function pollForResults(tabId) {
		try {
			const results = await browser.tabs.executeScript(tabId, {
				code: `
					(() => {
						const el = document.getElementById('cfb-ovr-results');
						return el ? el.textContent : null;
					})();
				`
			});

			if (results && results[0]) {
				const data = JSON.parse(results[0]);

				if (data.status === 'running') {
					textarea.value = `Status: Running\nProgress: ${data.progress}\n\nFound ${data.foundStats?.length || 0} stats`;
				} else if (data.status === 'complete') {
					clearInterval(pollInterval);
					pollInterval = null;
					textarea.value = JSON.stringify(data, null, 2);
					button.disabled = false;
					button.textContent = 'Calculate';
				} else if (data.status === 'error') {
					clearInterval(pollInterval);
					pollInterval = null;
					textarea.value = `Error: ${data.error}`;
					button.disabled = false;
					button.textContent = 'Calculate';
				}
			}
		} catch (error) {
			console.error('Poll error:', error);
		}
	}

	button.addEventListener('click', async () => {
		try {
			textarea.value = 'Starting tests...\n';
			button.disabled = true;
			button.textContent = 'Running...';

			const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

			// Inject jQuery first, then content script
			await browser.tabs.executeScript(tab.id, { file: 'jquery.min.js' });
			const initialResult = await browser.tabs.executeScript(tab.id, { file: 'content-script.js' });

			if (initialResult && initialResult[0]) {
				textarea.value = `Found ${initialResult[0].foundStats?.length || 0} stats. Running tests...\n`;
			}

			// Poll for results every 500ms
			pollInterval = setInterval(() => pollForResults(tab.id), 500);
		} catch (error) {
			textarea.value = `Error: ${error.message}`;
			button.disabled = false;
			button.textContent = 'Calculate';
			if (pollInterval) {
				clearInterval(pollInterval);
				pollInterval = null;
			}
		}
	});
});
