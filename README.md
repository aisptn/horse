# Horse

Horse is a playful browser extension that overlays a full-screen horse image on every webpage, gradually increasing its opacity over two minutes. The overlay is persistent and resists removal or style changes, making it a fun and stubborn addition to your browsing experience.

## Features
- Displays a full-screen horse image overlay on all websites
- Gradually increases opacity over 2 minutes
- Overlay cannot be easily removed or hidden
- Works on all URLs

## Installation
1. Clone or download [this repository](https://github.com/aisptn/horse).
2. Open your browser's extensions page:
   - **Chrome**: Go to `chrome://extensions/`
   - **Firefox**: Go to `about:addons`
3. Enable "Developer mode" (Chrome) or "Debug Add-ons" (Firefox).
4. Installation method:
   - **Chrome**: Click "Load unpacked" and select the project folder.
   - **Firefox**: Click "Load Temporary Add-on" and select the ZIP file you downloaded (do not extract it; use the ZIP file directly).

## Usage
Once installed, the extension will automatically activate on every page you visit. The horse overlay will appear and gradually become fully opaque over two minutes.

## Files
- `manifest.json`: Extension manifest (MV3)
- `content.js`: Main script that injects and protects the overlay
- `style.css`: Styles for the overlay and image
- `horse.jpeg`: The horse image (ensure this file is present)
- `icons/`: Extension icons

## License
MIT License. See [LICENSE](LICENSE) for details.
