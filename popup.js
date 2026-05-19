document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const userLangSelect = document.getElementById('userLang');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');

  // Matricea cu cele 50 de limbi universale pentru GitHub release
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

  // 1. Populăm dinamic select-ul cu cele 50 de opțiuni
  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    userLangSelect.appendChild(option);
  });

  // 2. Încărcăm setările salvate anterior când deschidem popup-ul
  chrome.storage.local.get(['apiKey', 'userLang'], (data) => {
    if (data.apiKey) {
      apiKeyInput.value = data.apiKey;
    }
    // Dacă există limbă salvată, o selectăm, altfel punem Română ca default
    if (data.userLang) {
      userLangSelect.value = data.userLang;
    } else {
      userLangSelect.value = "Română";
    }
  });

  // 3. Salvarea datelor la click pe buton + efectul de 2 secunde
  saveBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    const userLang = userLangSelect.value;

    chrome.storage.local.set({ apiKey, userLang }, () => {
      // Afișăm textul de succes în interiorul div-ului de status
      statusDiv.innerText = "✓ Saved settings";
      
      // Dezactivăm temporar butonul ca să prevenim spam-ul la click
      saveBtn.disabled = true;

      // După fix 2000 de milisecunde (2 secunde), curățăm textul și reactivăm butonul
      setTimeout(() => {
        statusDiv.innerText = "";
        saveBtn.disabled = false;
      }, 2000);
    });
  });
});