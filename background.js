chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "ASK_AI") {
    handleGoogleStudio(request, sender);
    return true;
  }
});

async function handleGoogleStudio(request, sender) {
  try {
    const data = await chrome.storage.local.get(["apiKey", "userLang"]);
    const apiKey = (data.apiKey || "").trim();
    const limba = data.userLang || "Română";

    if (!apiKey) {
      chrome.tabs.sendMessage(sender.tab.id, { type: "AI_RES", content: "⚠️ Lipsește cheia API din Popup!" });
      return;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

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

    chrome.tabs.sendMessage(sender.tab.id, { 
      type: "AI_RES", 
      content: aiText, 
      model: "Gemini 2.5 Flash" 
    });

  } catch (e) {
    chrome.tabs.sendMessage(sender.tab.id, { 
      type: "AI_RES", 
      content: `❌ Error Google Studio: ${e.message}` 
    });
  }
}