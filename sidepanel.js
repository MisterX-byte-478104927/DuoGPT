// sidepanel.js - Logica de control pentru interfața de chat

const chatContainer = document.getElementById('chat-container');
const userQueryInput = document.getElementById('userQuery');
const sendBtn = document.getElementById('sendBtn');

/**
 * Adaugă un mesaj în interfață
 */
function appendMessage(role, content, modelName = "") {
  const msgDiv = document.createElement('div');
  msgDiv.className = `msg ${role}`;

  let htmlContent;
  try {
    htmlContent = marked.parse(content);
  } catch (e) {
    htmlContent = content.replace(/\n/g, '<br>');
  }

  msgDiv.innerHTML = `
    <div class="content">${htmlContent}</div>
    ${modelName ? `<div style="font-size: 9px; opacity: 0.5; margin-top: 5px; text-align: right;">Model: ${modelName}</div>` : ""}
  `;

  // Eliminăm indicatorul de încărcare dacă există înainte de a pune mesajul nou
  const indicator = document.getElementById('thinking-indicator');
  if (indicator) indicator.remove();

  chatContainer.appendChild(msgDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// 0. Singurul ascultător necesar pentru primirea răspunsurilor AI în iframe
window.addEventListener("message", (event) => {
    const message = event.data;
    if (message.type === "AI_RES") {
        appendMessage("ai", message.content, message.model);
    }
});

// 1. Trimiterea manuală a mesajelor din input-ul de jos
function handleManualSend() {
  const text = userQueryInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  
  // Afișăm un indicator vizual rapid până vine răspunsul
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