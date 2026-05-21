document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const geminiModelSelect = document.getElementById('geminiModel');
  const userLangSelect = document.getElementById('userLang');
  const aiWrongAnswersCheckbox = document.getElementById('aiWrongAnswers');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');
  const versionCheckDiv = document.getElementById('version-check');

  const currentVersion = "2.3.3"; // Versiunea curentă a extensiei

  // 1. Populăm limbile universale
  const languages = [
    "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani",
    "Bengali", "Bosnian", "Bulgarian", "Catalan", "Chinese", "Croatian", 
    "Czech", "Danish", "Dutch", "English", "Estonian", "Finnish", 
    "French", "Georgian", "German", "Greek", "Gujarati", "Hebrew", 
    "Hindi", "Hungarian", "Icelandic", "Indonesian", "Italian", "Japanese", 
    "Javanese", "Kannada", "Korean", "Latvian", "Lithuanian", "Macedonian", 
    "Malay", "Malayalam", "Marathi", "Norwegian", "Persian", "Polish", 
    "Portuguese", "Punjabi", "Română", "Russian", "Serbian", "Slovak", 
    "Slovenian", "Spanish", "Swahili", "Swedish", "Tamil", "Telugu", 
    "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh"
  ];

  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    userLangSelect.appendChild(option);
  });

  // 2. Verificarea Versiunii prin algoritm SemVer corectat
  async function checkExtensionVersion() {
    try {
      const repoManifestUrl = 'https://raw.githubusercontent.com/MisterX-byte-478104927/DuoGPT/refs/heads/main/manifest.json';
      
      // Adăugăm un timestamp la URL pentru a fenta cache-ul agresiv al browserului/GitHub
      const response = await fetch(`${repoManifestUrl}?t=${Date.now()}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const remoteManifest = await response.json();
      const remoteVersion = remoteManifest.version; 

      if (currentVersion === remoteVersion) {
        versionCheckDiv.style.color = "#58cc02";
        versionCheckDiv.innerText = `✅ Up to date (v${currentVersion})`;
        return;
      }

      const localParts = currentVersion.split('.').map(Number);
      const remoteParts = remoteVersion.split('.').map(Number);

      // Algoritm SemVer Bulletproof
      let isNewer = false;
      let isMajor = false;

      if (remoteParts[0] > localParts[0]) {
        isNewer = true;
        isMajor = true;
      } else if (remoteParts[0] === localParts[0]) {
        if (remoteParts[1] > localParts[1]) {
          isNewer = true;
        } else if (remoteParts[1] === localParts[1]) {
          if (remoteParts[2] > localParts[2]) {
            isNewer = true;
          }
        }
      }

      if (isNewer) {
        if (isMajor) {
          versionCheckDiv.style.color = "#ff4b4b";
          versionCheckDiv.innerText = `🚨🚨 Major update available: v${remoteVersion}`;
        } else {
          versionCheckDiv.style.color = "#ffb900";
          versionCheckDiv.innerText = `⚠️ Minor update available: v${remoteVersion}`;
        }
      } else {
        // În caz că versiunea din repo e mai veche decât ce ai local în dev mode
        versionCheckDiv.style.color = "#58cc02";
        versionCheckDiv.innerText = `🛠️ Dev Mode Active (v${currentVersion})`;
      }

    } catch (err) {
      console.error("[DuoGPT Debug] Eroare la verificarea versiunii:", err);
      versionCheckDiv.style.color = "#afafaf";
      versionCheckDiv.innerText = `⚠️ Can't check version (Offline)`;
    }
  }

  checkExtensionVersion();

  // 3. Încărcăm setările din local storage
  chrome.storage.local.get(['apiKey', 'geminiModel', 'userLang', 'aiWrongAnswers'], (data) => {
    if (data.apiKey) apiKeyInput.value = data.apiKey;
    if (data.geminiModel) geminiModelSelect.value = data.geminiModel;
    if (data.userLang) userLangSelect.value = data.userLang; else userLangSelect.value = "Română";
    if (data.aiWrongAnswers !== undefined) aiWrongAnswersCheckbox.checked = data.aiWrongAnswers;
  });

  // 4. Salvarea datelor
  saveBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    const geminiModel = geminiModelSelect.value;
    const userLang = userLangSelect.value;
    const aiWrongAnswers = aiWrongAnswersCheckbox.checked;

    chrome.storage.local.set({ apiKey, geminiModel, userLang, aiWrongAnswers }, () => {
      statusDiv.innerText = "✓ Saved settings";
      saveBtn.disabled = true;

      setTimeout(() => {
        statusDiv.innerText = "";
        saveBtn.disabled = false;
      }, 2000);
    });
  });
});
