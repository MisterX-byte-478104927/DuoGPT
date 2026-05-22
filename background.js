// DuoGPT Beta v2.4.1 by Mister X - DYNAMIC BACKGROUND CORE
console.log("DuoGPT Beta v2.4.1 - Dynamic Model Routing Engine Loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "ASK_AI") {
    handleGoogleStudio(request, sender);
    return true;
  }
});

async function handleGoogleStudio(request, sender) {
  try {
    // Extragere dinamică: adăugăm și geminiModel în listă
    const data = await chrome.storage.local.get(["apiKey", "userLang", "geminiModel"]);
    const apiKey = (data.apiKey || "").trim();
    const limba = data.userLang || "Română";
    // Fallback inteligent în caz că valoarea nu e încă salvată în storage
    const modelSelectat = data.geminiModel || "gemini-2.5-flash"; 

    if (!apiKey) {
      chrome.tabs.sendMessage(sender.tab.id, { type: "AI_RES", content: "⚠️ Lipsește cheia API din Popup!" });
      return;
    }

    // CONSTRUIRE URL DINAMIC: Injectăm modelul selectat direct în endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelSelectat}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Ești un profesor poliglot. Explică scurt în limba ${limba} următorul exercițiu de pe Duolingo: ${request.context}`
          }]
        }]
      })
    });

    if (!response.ok) {
      const errBox = await response.json();
      throw new Error(errBox.error?.message || `HTTP ${response.status}`);
    }

    const result = await response.json();
    const aiText = result.candidates[0].content.parts[0].text;

    // Mapare curată pentru un afișaj frumos în UI-ul din sidepanel
    const numeModelFrumos = modelSelectat === "gemini-2.5-pro" ? "Gemini 2.5 Pro" : "Gemini 2.5 Flash";

    chrome.tabs.sendMessage(sender.tab.id, { 
      type: "AI_RES", 
      content: aiText, 
      model: numeModelFrumos 
    });

  } catch (e) {
    chrome.tabs.sendMessage(sender.tab.id, { 
      type: "AI_RES", 
      content: `❌ Error Google Studio: ${e.message}` 
    });
  }
}
