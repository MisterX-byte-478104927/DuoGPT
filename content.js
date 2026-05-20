// DuoGPT Beta v2.0.1 by Mister X - Injection Core
console.log("DuoGPT Beta v2.0.1 by Mister X - Active Lockdown Engine Loaded");

let isWaiting = false;
let lockdownActive = false;
let lockdownTimer = null;

// 1. Funcție care creează butonul discret de redeschidere "<<"
function creeazaButonRedeschidere() {
    if (document.getElementById('duogpt-open-btn')) return;

    const openBtn = document.createElement('button');
    openBtn.id = 'duogpt-open-btn';
    openBtn.innerText = '<<';
    openBtn.title = 'Open DuoGPT';
    
    Object.assign(openBtn.style, {
        position: 'fixed',
        top: '20px',
        right: '0px',
        backgroundColor: '#58cc02',
        border: 'none',
        borderLeft: '4px solid #46a302',
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
        color: 'white',
        padding: '10px 12px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        zIndex: '2147483647',
        display: 'none',
        boxShadow: '-2px 2px 5px rgba(0,0,0,0.1)'
    });

    openBtn.onclick = () => {
        const panel = document.getElementById('duogpt-frame');
        const closeBtn = document.getElementById('duogpt-close-btn');
        if (panel) panel.style.display = 'block';
        if (closeBtn) closeBtn.style.display = 'flex';
        openBtn.style.display = 'none';
    };

    document.body.appendChild(openBtn);
}

// 2. Gestionarea Side-Panelului Iframe
function toggleSidePanel() {
    let panel = document.getElementById('duogpt-frame');
    let closeBtn = document.getElementById('duogpt-close-btn');
    
    creeazaButonRedeschidere();
    const openBtn = document.getElementById('duogpt-open-btn');

    if (panel) {
        panel.style.display = 'block';
        if (closeBtn) closeBtn.style.display = 'flex';
        if (openBtn) openBtn.style.display = 'none';
        return;
    }

    panel = document.createElement('iframe');
    panel.id = 'duogpt-frame';
    panel.src = chrome.runtime.getURL('sidepanel.html');
    
    Object.assign(panel.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '360px',
        height: 'calc(100vh - 40px)',
        border: 'none',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        zIndex: '2147483646',
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(panel);

    closeBtn = document.createElement('button');
    closeBtn.id = 'duogpt-close-btn';
    closeBtn.innerText = '>>';
    closeBtn.title = 'Hide Panel';

    Object.assign(closeBtn.style, {
        position: 'fixed',
        top: '35px',
        right: '345px', 
        backgroundColor: '#fff',
        border: '2px solid #e5e5e5',
        borderBottomWidth: '4px',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#afafaf',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2147483647',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    });

    closeBtn.onmouseenter = () => { closeBtn.style.color = '#1cb0f6'; closeBtn.style.borderColor = '#1cb0f6'; };
    closeBtn.onmouseleave = () => { closeBtn.style.color = '#afafaf'; closeBtn.style.borderColor = '#e5e5e5'; };

    closeBtn.onclick = () => {
        panel.style.display = 'none';
        closeBtn.style.display = 'none';
        if (openBtn) openBtn.style.display = 'block';
    };

    document.body.appendChild(closeBtn);
}

// 3. Funcția principală care execută apelul AI
function executaExplain() {
    if (isWaiting) return;

    const btn = document.getElementById('btn-explica');
    isWaiting = true; 
    if (btn) {
        btn.innerText = 'THINKING...';
        btn.style.opacity = "0.7";
    }

    // Algoritm de scraping robust (Beta) - evită clasele dinamice obfuscate
    const challengeContainer = document.querySelector('[data-test*="challenge"]') || document.querySelector('main article') || document.querySelector('main');
    let textCapturat = "";

    if (challengeContainer) {
        const clone = challengeContainer.cloneNode(true);
        const ignora = clone.querySelectorAll('button, [aria-hidden="true"], #btn-explica, #duogpt-frame');
        ignora.forEach(el => el.remove());
        textCapturat = clone.innerText.replace(/EXPLAIN/g, "").trim();
    }

    if (textCapturat.length < 2) {
        textCapturat = document.body.innerText.split('EXPLAIN')[0].slice(-300).trim();
    }

    toggleSidePanel();

    setTimeout(() => {
        chrome.runtime.sendMessage({ 
            type: "ASK_AI", 
            context: `Exercițiul actual: ${textCapturat}` 
        });
    }, 400);
}

// 4. Injectarea Butonului EXPLAIN și Sistemul de Lockdown (Mecanica Diabolică)
function adaugaButonSiVerificaLockdown() {
    // Căutăm butonul nativ Duolingo
    const butoane = document.querySelectorAll('button');
    let btnDuo = null;
    for (let b of butoane) {
        const t = b.innerText.toUpperCase();
        if (t === "VERIFICĂ" || t === "CHECK" || t === "CONTINUĂ" || t === "CONTINUE") {
            btnDuo = b;
            break;
        }
    }

    if (!btnDuo) return;

    // Injectăm butonul EXPLAIN dacă nu există
    if (!document.getElementById('btn-explica')) {
        const btn = document.createElement('button');
        btn.id = 'btn-explica';
        btn.innerText = 'EXPLAIN';
        
        Object.assign(btn.style, {
            backgroundColor: "#1cb0f6",
            border: "none",
            borderBottom: "4px solid #1899d6",
            borderRadius: "12px",
            color: "white",
            padding: "12px 24px",
            marginRight: "20px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "17px",
            zIndex: "9999"
        });

        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            executaExplain();
        };

        btnDuo.parentNode.insertBefore(btn, btnDuo);
    }

    // VERIFICARE BLOCARE (Lockdown Engine pentru erori)
    chrome.storage.local.get(['aiWrongAnswers'], (data) => {
        if (!data.aiWrongAnswers) {
            // Dacă opțiunea e dezactivată, ne asigurăm că totul e deblocat normal
            if (lockdownActive) deblocheazaSistemul(btnDuo);
            return;
        }

        // Detectăm dacă a apărut caseta roșie de eroare a lui Duolingo
        const hasError = document.querySelector('[data-test*="blame-incorrect"]') || document.querySelector('._3_AmG'); 
        
        if (hasError && !lockdownActive && !isWaiting) {
            console.log("[DuoGPT Core] S-a detectat o greșeală! Inițiem faza de Lockdown.");
            lockdownActive = true;
            
            // Înghețăm butonul nativ Continue (îl facem gri și inactiv)
            btnDuo.disabled = true;
            btnDuo.style.backgroundColor = "#e5e5e5";
            btnDuo.style.borderBottomColor = "#ccc";
            btnDuo.style.color = "#afafaf";
            btnDuo.style.cursor = "not-allowed";

            // Pornește cronometrul de siguranță de 5 secunde pentru deblocare automată
            if (lockdownTimer) clearTimeout(lockdownTimer);
            lockdownTimer = setTimeout(() => {
                deblocheazaSistemul(btnDuo);
            }, 5000);
        } 
        // Resetăm starea dacă eroarea a dispărut din pagină (utilizatorul a trecut mai departe)
        else if (!hasError && lockdownActive && !isWaiting) {
            lockdownActive = false;
        }
    });
}

function deblocheazaSistemul(btnDuo) {
    if (!lockdownActive) return;
    console.log("[DuoGPT Core] Cele 5 secunde au trecut. Se restabilesc controalele.");
    lockdownActive = false;
    if (btnDuo) {
        btnDuo.disabled = false;
        btnDuo.style.backgroundColor = "#58cc02"; // Reset în verdele nativ
        btnDuo.style.borderBottomColor = "#46a302";
        btnDuo.style.color = "#ffffff";
        btnDuo.style.cursor = "pointer";
    }
}

// 5. Interceptarea evenimentelor globale de tastatură (Deturnarea tastei Enter)
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (lockdownActive) {
            // Stopăm complet acțiunea nativă Duolingo (care ar fi dat Skip/Continue)
            e.preventDefault();
            e.stopPropagation();
            console.log("[DuoGPT Lockdown] Tasta Enter a fost deturnată! Forțăm execuția AI.");
            
            // Rulăm AI-ul în loc de Continue
            executaExplain();
        }
    }
}, true); // Folosim 'true' pentru capturing-phase, ca să prindem evenimentul înaintea scripturilor Duolingo

// Scanăm DOM-ul în fiecare secundă pentru butoane și stări
setInterval(adaugaButonSiVerificaLockdown, 1000);

// 6. Comunicarea asincronă cu Iframe-ul și resetarea stărilor globale
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const iframe = document.getElementById('duogpt-frame');
    const btnExplica = document.getElementById('btn-explica');
    
    if (message.type === "AI_RES") {
        isWaiting = false;
        if (btnExplica) {
            btnExplica.innerText = 'EXPLAIN';
            btnExplica.style.opacity = "1";
        }

        if (iframe) {
            iframe.contentWindow.postMessage(message, "*");
        }
    }
});
