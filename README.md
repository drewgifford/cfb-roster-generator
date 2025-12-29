# CFB Roster Generator

This is a client-side web app that automatically generates a roster that can be imported into Team Builder for EA CFB 26.

You can visit the live website at https://cfb.drewgifford.com

# Browser Extension

To import your team into Team Builder, you need to download a browser extension from the [releases tab](https://github.com/drewgifford/cfb-roster-generator/releases/).

## Firefox Installation

1. Download the Firefox release from the releases tab.
2. Navigate to `about:debugging#/runtime/this-firefox` in your search bar.
3. Click "Load Temporary add-on", and import `cfb26_roster_importer-X.X-firefox.zip`
4. On Team Builder, you should see a pop-up at the bottom right-hand side of the screen.

## Chrome Installation

1. Download the Chrome release from the releases tab.
2. Unzip `cfb26_roster_importer-X.X-chrome.zip` into its own folder you can locate later.
3. Navigate to `chrome://extensions` in your search bar.
4. Enable "Developer Mode" at the top-right of the page. New buttons should appear on the left.
5. Click "Load unpacked". Locate the folder you unzipped the previous ZIP into, and select it.
6. Once loaded, you should see a pop-up at the bottom right-hand side of the screen on Team Builder.

# How to Use

1. Export your JSON file from the roster generator.
2. Install the extension for your browser if you haven't already.
3. Go to Team Builder, you should see a new popup at the bottom right. Click "Choose File", find your exported `.json` file, and click "Import".

(note): Roster importing may take a few minutes, and may rarely make mistakes. You may want to manually review its progress, or re-run the importer tool after initial completion.
