# DuoGPT Beta v2.2.1 by Mister X
🦉 DuoGPT is an advanced, ultra-optimized Chrome Extension (Manifest V3) that acts as an AI copilot for Duolingo. Features a native 3D UI button, isolated floating chat, smart toggle controls, dynamic 50+ language support, and context-aware grammar explanations powered directly by Gemini 2.5 Flash. 🚀

## ✨ Alfa Edition: Key Features

* **⚡ Native 3D Integration:** The `EXPLAIN` button perfectly matches Duolingo's official visual identity (rounded fonts, thick 3D borders, and fluid hover/active states).
* **🧠 High-Performance AI Engine:** Direct connection via Google AI Studio API to the cutting-edge **Gemini 2.5 Flash** model, delivering concise, highly structured, and blazing-fast explanations.
* **🌍 Dynamic Polyglot Support:** An intelligent settings popup that dynamically populates over **50 universal target languages** (alphabetically sorted) for localized explanations.
* **🛡️ Complete Visual Isolation:** The chat interface runs completely sandboxed. The custom `>>` and `<<` toggle buttons leverage an absolute maximum `zIndex` (`2147483647`) to stay accessible without breaking the web layout.
* **📝 Advanced Formatting (Markdown & Tables):** AI responses are beautifully rendered using custom Duolingo green accents (`#58cc02`), inline key-phrases highlighted in red code-blocks, and fully responsive grammar tables.
* **🚀 Anti-Spam & Debounce Control:** Native asynchronous state lock prevents double-submission while the AI is computing requests (`THINKING...`).

## ✨ Beta Edition: New Features Coming Soon

* **💬 Chat Evolution:** Integrating interactive dynamic buttons for every AI response:
  1. **📋 Copy Button** — Instantly save explanations to your clipboard.
  2. **🔊 Text-to-Speech Button** — Listen to native grammar pronunciations via the browser's TTS engine.
  3. **👍/👎 Feedback System** — Rate responses to train and refine local context prompts.
  4. **🔄 Regenerate Button** — Re-roll the AI output on the fly for the same exercise context.
  5. **🚨 Report Button** — Streamline prompt failures and bugs directly to a dedicated Discord Webhook.

* **💬 More AI robots available** — Adding a list in the popup with several Gemini models
* **📝 Native Support** — Introducing this extension in the Chrome Web Store so you no longer need to install/update manually
* **₿ Donation Crypto Section** — Your support will help the extension upgrade
* **📷 Adjusting design** — To make the extension to look more professional
* **🚀 More Functionalities** coming soon!

## 🛠️ Step-by-Step Installation (Developer Mode)

Until the extension is uploaded to Chrome Web Store, please download it from this oficial repository and upload it manually to Chrome:

1. **Download the Project:** Clone this repository or download the ZIP archive and extract it to a local folder on your PC.

2. **Access Chrome Extensions:** Open Google Chrome and navigate to: `chrome://extensions/`

3. **Enable Developer Mode:** In the top-right corner of the extensions page, toggle the "Developer mode" switch to ON.

4. **Load the Extension:** Click the "Load unpacked" button in the top-left corner.

5. **Select Folder:** Choose the root directory of the extracted project (the folder containing `manifest.json`).

## ⚙️ Initial Configuration
1. Obtain a free API key directly from Google AI Studio.

2. Click the DuoGPT icon in your browser's extension bar to open the settings menu.

3. Paste your API key (`AIzaSy...`) into the designated field.

4. Select your preferred explanation language from the dynamic dropdown list (e.g., English, Română, Español).

5. Click *SAVE SETTINGS*. The status will display `✓ Saved settings`, and the button will briefly lock for 2 seconds to prevent accidental double-saving.

## 🎮 How to Use
1. Go to Duolingo and launch any active lesson or exercise.

2. When a text question or challenge appears, the extension automatically injects the blue `EXPLAIN` button right next to the native "Check" / "Continue" button.

3. Click `EXPLAIN`. The button state updates to `THINKING...`, and the side panel smoothly reveals itself on the right.

4. Gemini inspects the captured challenge DOM data, generating structural grammar analysis, common mistakes, and exact translations.

5. **Screen Management:** Need a full view of the lesson? Click the circular `>>` button on the top-left of the panel. The panel instantly collapses, leaving a low-profile green `<<` tab anchored to the screen edge for rapid retrieval without losing chat history.

6. You cand also send massages **manually** using the text box in the side panel with the chat for quick explications

## 🔍 Troubleshooting
If you encounter issues during use, check these quick fixes:

1. **The EXPLAIN button is missing:** Duolingo updates its DOM classes frequently. Ensure you are inside an active learning session (not the main profile dashboard). If it fails to render, open the browser console (F12 -> Console tab) to look for exceptions. A simple page refresh (F5) usually re-initializes the script hooks successfully.

2. **The panel displays ⚠️ Missing API Key in Popup!:** Open the extension popup from the Chrome toolbar, re-paste your Google AI Studio token, and click SAVE SETTINGS. Ensure no leading or trailing whitespaces are present.

3. **The widget hangs indefinitely on Thinking...:** Verify your network connection or check if you hit the free tier rate limits on Google AI Studio. Additionally, confirm that aggressive ad-blockers or local network firewalls aren't trapping the API endpoints.

4. **Captured challenge text is corrupted or incomplete:** The extension utilizes fallback algorithms (grabbing the last 300 characters of the readable body text) if Duolingo alters its challenge container classes. Feel free to open an Issue ticket if selectors require an emergency patch.

## 🤝 Contributing
Contributions of any kind are highly encouraged! To improve the codebase or deploy new features:

1. **Fork** this repository.

2. Create your feature branch:
`git checkout -b feature/exploit-nou`

3. Commit your changes:
`git commit -m "Fix: added new dynamic DOM container fallback"`

4. Push to your branch:
`git push origin feature/exploit-nou`

5. Open a **Pull Request** explaining your optimization.

## 🔒 Security & Privacy
**Secure Local Storage**: Your API key and language choices are stored strictly within your browser via `chrome.storage.local`. No data ever hits third-party tracking infrastructure.

**Direct Handshakes**: AI inference payload traffic flows directly from your local client to the official Google Generative Language API endpoint, keeping latency low and isolation high.

**Zero Telemetry**: The extension collects absolutely zero analytics, click tracking, or user telemetry logs.
