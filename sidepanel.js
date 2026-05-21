// sidepanel.js - DuoGPT Beta v2.3.1 - Clean Messaging Core by Mister X
const chatContainer = document.getElementById('chat-container');
const userQueryInput = document.getElementById('userQuery');
const sendBtn = document.getElementById('sendBtn');

let ultimulContextCapturat = ""; // Păstrăm contextul pentru funcția de Re-roll

/**
 * Adaugă un mesaj în interfață și atașează butoanele interactive pentru AI
 */
function appendMessage(role, content, modelName = "") {
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${role}`;
  msgDiv.style.marginBottom = "15px";

  let htmlContent;
  try {
    htmlContent = marked.parse(content);
  } catch (e) {
    htmlContent = content.replace(/\n/g, '<br>');
  }

  // Injectăm textul de bază al mesajului
  msgDiv.innerHTML = `<div class="content">${htmlContent}</div>`;

  // Dacă mesajul vine de la AI, îi construim bara de unelte inteligentă
  if (role === "ai") {
    // 1. Label-ul pentru modelul folosit
    const metaDiv = document.createElement("div");
    metaDiv.style.cssText = "font-size: 9px; opacity: 0.5; margin-top: 5px; text-align: right;";
    metaDiv.innerText = `Model: ${modelName || "Gemini AI"}`;
    msgDiv.appendChild(metaDiv);

    // 2. Creare Bară Acțiuni
    const actionsBar = document.createElement("div");
    actionsBar.className = "ai-actions";

    // --- BUTONUL COPY (📋) ---
    const copyBtn = document.createElement("button");
    copyBtn.className = "action-btn";
    copyBtn.innerHTML = "📋 Copy";
    copyBtn.onclick = () => {
      // Încercăm prima dată metoda modernă nativă
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(content)
          .then(() => afiseazaSuccesCopy())
          .catch(() => executafallbackCopy(content));
      } else {
        executafallbackCopy(content);
      }
    
      // Funcție internă pentru fallback (Hacker Style)
      function executafallbackCopy(textToCopy) {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // Îl poziționăm în afara ecranului ca să fie invizibil
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          afiseazaSuccesCopy();
        } catch (err) {
          console.error("[DuoGPT] Fallback-ul de copy a eșuat:", err);
          copyBtn.innerHTML = "❌ Failed";
        }
        
        document.body.removeChild(textArea);
      }

      function afiseazaSuccesCopy() {
        copyBtn.innerHTML = "✅ Copied!";
        setTimeout(() => copyBtn.innerHTML = "📋 Copy", 2000);
      }
    };
    actionsBar.appendChild(copyBtn);

    // --- BUTONUL TEXT-TO-SPEECH (🔊) ---
    const ttsBtn = document.createElement("button");
    ttsBtn.className = "action-btn";
    ttsBtn.innerHTML = "🔊 Listen";
    ttsBtn.onclick = () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        ttsBtn.innerHTML = "🔊 Listen";
        return;
      }
      ttsBtn.innerHTML = "🛑 Stop";
      const utterance = new SpeechSynthesisUtterance(content.replace(/[*#`]/g, ""));
      
      chrome.storage.local.get(["userLang"], (data) => {
        if (data.userLang === "Română") utterance.lang = "ro-RO";
        else if (data.userLang === "English") utterance.lang = "en-US";
        
        utterance.onend = () => { ttsBtn.innerHTML = "🔊 Listen"; };
        window.speechSynthesis.speak(utterance);
      });
    };
    actionsBar.appendChild(ttsBtn);

    // --- SISTEM FEEDBACK (👍/👎) ---
    const thumbsUp = document.createElement("button");
    thumbsUp.className = "action-btn";
    thumbsUp.innerHTML = "👍";
    const thumbsDown = document.createElement("button");
    thumbsDown.className = "action-btn";
    thumbsDown.innerHTML = "👎";

    thumbsUp.onclick = () => {
      thumbsUp.classList.toggle("active-up");
      thumbsDown.classList.remove("active-down");
    };
    thumbsDown.onclick = () => {
      thumbsDown.classList.toggle("active-down");
      thumbsUp.classList.remove("active-up");
    };
    actionsBar.appendChild(thumbsUp);
    actionsBar.appendChild(thumbsDown);

    // --- BUTONUL REGENERATE / RE-ROLL (🔄) ---
    const regenBtn = document.createElement("button");
    regenBtn.className = "action-btn";
    regenBtn.innerHTML = "🔄 Re-roll";
    regenBtn.onclick = () => {
      regenBtn.innerHTML = "⏳ Rolling...";
      regenBtn.disabled = true;
      showThinking();
      chrome.runtime.sendMessage({ 
        type: "ASK_AI", 
        context: ultimulContextCapturat || content 
      });
    };
    actionsBar.appendChild(regenBtn);

    // --- REPORT BUG DISCORD (🚨) ---
    const reportBtn = document.createElement("button");
    reportBtn.className = "action-btn btn-report";
    reportBtn.innerHTML = "🚨 Report Bug";
    reportBtn.onclick = () => {
      reportBtn.innerHTML = "Sending...";
      reportBtn.disabled = true;
      
      const discordWebhookUrl = "https://discord.com/api/webhooks/1507042373052399756/B5cozERpxaL-VmKRfcP6jCDSRwe69Ijh020XimJ1VWuNtE-yw9B1qjUfk2xm-_Zv0hj5";
      
      const payload = {
        embeds: [{
          title: "🚨 DuoGPT Beta - Prompt Failure Report",
          color: 16711680,
          fields: [
            { name: "Model utilizat", value: modelName || "Gemini AI", inline: true },
            { name: "Versiune Extensie", value: "2.3.3 (Beta)", inline: true },
            { name: "Prompt trimis (Exercițiu)", value: `\`\`\`${ultimulContextCapturat || "Nespecificat"}\`\`\`` },
            { name: "Răspuns AI defectuos", value: `\`\`\`${content.slice(0, 500)}...\`\`\`` }
          ],
          footer: { text: "Mister X Bug Tracker System" }
        }]
      };

      fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(() => {
        reportBtn.innerHTML = "🚀 Sent!";
        reportBtn.style.borderColor = "#58cc02";
      })
      .catch(() => {
        reportBtn.innerHTML = "❌ Failed";
        reportBtn.disabled = false;
      });
    };
    actionsBar.appendChild(reportBtn);

    msgDiv.appendChild(actionsBar);
  }

  // Eliminăm indicatorul de încărcare înainte de a pune noul mesaj
  const indicator = document.getElementById('thinking-indicator');
  if (indicator) indicator.remove();

  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// FIX DE DUPLICARE: Ascultăm DOAR prin canalul runtime al extensiei (fără window.addEventListener)
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "AI_RES") {
    appendMessage("ai", message.content, message.model);
  }
  
  // Salvăm contextul când content.js trimite un exercițiu proaspăt
  if (message.type === "ASK_AI" || message.context) {
    if (message.context) ultimulContextCapturat = message.context;
  }
});

// Trimiterea manuală a mesajelor din input-ul de jos
function handleManualSend() {
  const text = userQueryInput.value.trim();
  if (!text) return;

  ultimulContextCapturat = text; // Salvăm textul manual ca fiind ultimul context valid
  appendMessage("user", text);
  showThinking();

  chrome.runtime.sendMessage({
    type: "ASK_AI",
    context: text
  });

  userQueryInput.value = "";
}

function showThinking() {
  if (document.getElementById('thinking-indicator')) return;
  const thinkingDiv = document.createElement('div');
  thinkingDiv.id = "thinking-indicator";
  thinkingDiv.className = "msg ai";
  thinkingDiv.innerText = "🤖 Thinking...";
  chatContainer.appendChild(thinkingDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener('click', handleManualSend);
userQueryInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleManualSend();
  }
});
