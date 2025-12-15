chrome.browserAction.onClicked.addListener(async (tab) => {
	chrome.tabs.executeScript(tab.id, { file: 'inject.js' });
});
