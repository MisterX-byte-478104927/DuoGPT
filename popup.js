document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('apiKey');
  const geminiModelSelect = document.getElementById('geminiModel');
  const userLangSelect = document.getElementById('userLang');
  const aiWrongAnswersCheckbox = document.getElementById('aiWrongAnswers');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');
  const versionCheckDiv = document.getElementById('version-check');

  const currentVersion = "2.4.2"; // Versiunea curentă a extensiei

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
  // ==========================================
  // SISTEM DONAȚII CRYPTO TOP 10 (Mister X Official)
  // ==========================================
  const donateBtn = document.getElementById('donateBtn');
  const donationPanel = document.getElementById('donationPanel');
  const cryptoSelect = document.getElementById('cryptoSelect');
  const addressBox = document.getElementById('addressBox');
  const cryptoAddress = document.getElementById('cryptoAddress');
  const copyAddressBtn = document.getElementById('copyAddressBtn');

  const cryptoWallets = {
      BTC: "bc1qxvmsctzkdtxm24qe2uy9zsg2y0k4vcfs0nku7k",
      ETH: "0x2EB958Cf6385D08916055a2A77eA06F945c22412",
      SOL: "3Lb96csVtizzaLQJCauNqM97JGFqunsFPJmZHzCefZG5",
      USDT_TRC20: "TMhp7dYf24JkKCUC6eRsRqEDSpnUsm4E9S",
      USDT_ERC20: "0x2EB958Cf6385D08916055a2A77eA06F945c22412",
      BNB: "0x2EB958Cf6385D08916055a2A77eA06F945c22412",
      XRP: "rhCyxxDqUj7dDDsaqvLJMyZkLnYGBEp92g",
      ADA: "addr1qyjxr0n0amms3rt2smat04sudumjpa2a9yad35ads0w7llyvr8fxezmdusy0x29cffp2ex327h9qfxt2zpcryr4q7zvqs3lwdz",
      LTC: "ltc1qzdajc9ccuz005xyvm0ftp0wunqjl5rslzp6kfe",
      DOGE: "DF6eUpjYw6jexJt3JnR8wV87h4Lw7u7yo5"
  };

  // 1. Afișare/Ascundere panou principal la click pe butonul portocaliu
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      if (donationPanel.style.display === 'none') {
        donationPanel.style.display = 'block';
        donateBtn.innerText = "🔼 Hide Donation Menu";
      } else {
        donationPanel.style.display = 'none';
        donateBtn.innerText = "Donate Crypto";
      }
    });
  }

  // 2. Schimbarea monedei din drop-down
  if (cryptoSelect) {
    cryptoSelect.addEventListener('change', (e) => {
      const coin = e.target.value;
      const address = cryptoWallets[coin];
      
      if (address) {
        cryptoAddress.innerText = address;
        addressBox.style.display = 'block';
        
        // Resetăm starea butonului de copy la design-ul monedei alese
        copyAddressBtn.innerHTML = "📋 Copy Address";
        copyAddressBtn.style.backgroundColor = getCoinColor(coin);
        copyAddressBtn.style.borderBottom = `4px solid ${getCoinBorderColor(coin)}`;
      }
    });
  }

  // 3. Funcții ajutătoare pentru culorile brandurilor crypto
  function getCoinColor(coin) {
    switch(coin) {
      case 'BTC': return '#ff9900';
      case 'ETH': return '#627eea';
      case 'SOL': return '#14f195';
      case 'USDT_TRC20':
      case 'USDT_ERC20': return '#26a17b';
      case 'BNB': return '#f3ba2f';
      case 'XRP': return '#23292f';
      case 'ADA': return '#0033ad';
      case 'LTC': return '#bfbfbf';
      case 'DOGE': return '#ba9f33';
      default: return '#58cc02';
    }
  }

  function getCoinBorderColor(coin) {
    switch(coin) {
      case 'BTC': return '#cc7a00';
      case 'ETH': return '#3b52b8';
      case 'SOL': return '#0eb872';
      case 'USDT_TRC20':
      case 'USDT_ERC20': return '#1a6f54';
      case 'BNB': return '#b88d22';
      case 'XRP': return '#15191c';
      case 'ADA': return '#002275';
      case 'LTC': return '#8c8c8c';
      case 'DOGE': return '#8c7726';
      default: return '#46a302';
    }
  }

  // 4. Copiere în Clipboard securizată (Hybrid System)
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addressText = cryptoAddress.innerText;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addressText)
          .then(() => afiseazaSuccesCopiereAddress())
          .catch(() => fallbackCopiereAddress(addressText));
      } else {
        fallbackCopiereAddress(addressText);
      }
    });
  }

  function fallbackCopiereAddress(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      afiseazaSuccesCopiereAddress();
    } catch (err) {
      copyAddressBtn.innerHTML = "❌ Error copying";
    }
    document.body.removeChild(textArea);
  }

  function afiseazaSuccesCopiereAddress() {
    copyAddressBtn.innerHTML = "✅ Address Copied!";
    copyAddressBtn.style.backgroundColor = "#58cc02";
    copyAddressBtn.style.borderBottom = "4px solid #46a302";
    
    setTimeout(() => {
      const currentCoin = cryptoSelect.value;
      copyAddressBtn.innerHTML = "📋 Copy Address";
      copyAddressBtn.style.backgroundColor = getCoinColor(currentCoin);
      copyAddressBtn.style.borderBottom = `4px solid ${getCoinBorderColor(currentCoin)}`;
    }, 2000);
  }
});
