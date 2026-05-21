// DuoGPT Beta v2.1.1 by Mister X - STABLE REPAIR
console.log("DuoGPT Beta v2.1.1 - Clean Core Running");

let isWaiting = false;
let lockdownActive = false;
let blockTimeoutActive = false; // Flag simplu boolean, fără timere complicate

// 1. INJECTARE CSS INTELIGENT
function injecteazaStilLockdown() {
    if (document.getElementById('duogpt-lockdown-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'duogpt-lockdown-styles';
    style.innerHTML = `
        body.duogpt-lockdown [data-test="player-next"],
        body.duogpt-lockdown footer button,
        body.duogpt-lockdown button:has(span) {
            pointer-events: none !important;
            opacity: 0.3 !important;
            cursor: not-allowed !important;
        }
    `;
    document.head.appendChild(style);
}
injecteazaStilLockdown();

// 2. Funcție pentru deschiderea panoului
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

// 3. Gestionarea Iframe
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

// 4. SCRAPING STABIL ALFA ALGORITHM
function executaExplain() {
    if (isWaiting) return;

    const btn = document.getElementById('btn-explica');
    isWaiting = true; 

    if (btn) {
        btn.innerText = 'THINKING...';
        btn.style.opacity = "0.7";
    }

    const zonaChallenge = document.querySelector('[data-test^="challenge"]') 
                           || document.querySelector('._3_AmG') 
                           || document.querySelector('main');

    let textCapturat = "";
    if (zonaChallenge) {
        textCapturat = zonaChallenge.innerText.replace(/EXPLAIN/g, "").replace(/THINKING\.\.\./g, "").trim();
    }

    if (textCapturat.length < 2) {
        textCapturat = document.body.innerText.split('EXPLAIN')[0].slice(-300).trim();
    }

    toggleSidePanel();

    // HACK: Pornim numărătoarea inversă pentru deblocare DOAR acum, pentru că utilizatorul a cerut ajutorul!
    setTimeout(() => {
        document.body.classList.remove('duogpt-lockdown');
        lockdownActive = false;
        console.log("[DuoGPT Core] Cele 5 secunde de lectură au trecut. Butonul CONTINUE este acum liber!");
    }, 5000);

    setTimeout(() => {
        chrome.runtime.sendMessage({ 
            type: "ASK_AI", 
            context: `Exercițiul actual (cerință și opțiuni): ${textCapturat}` 
        });
    }, 400);
}

// 5. INJECTARE ȘI VERIFICARE LOCKDOWN
function adaugaButonSiVerificaLockdown() {
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

    // Injectare buton EXPLAIN
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

    // GESTIONARE LOCKDOWN STRATEGICĂ
    chrome.storage.local.get(['aiWrongAnswers'], (data) => {
        if (!data.aiWrongAnswers) {
            document.body.classList.remove('duogpt-lockdown');
            lockdownActive = false;
            return;
        }

        const hasError = document.querySelector('[data-test*="blame-incorrect"]') 
                        || document.getElementById('blame-incorrect')
                        || document.querySelector('._3_AmG'); 
        
        if (isWaiting) return; 

        if (hasError) {
            // Dacă e eroare și nu suntem deja în lockdown, activăm clasa pe BODY și o lăsăm acolo!
            if (!lockdownActive && !blockTimeoutActive) {
                lockdownActive = true;
                blockTimeoutActive = true; // Flag-ul ăsta ne asigură că nu blocăm din nou după cele 5 secunde pe același ecran roșu
                document.body.classList.add('duogpt-lockdown');
                console.log("[DuoGPT Core] Lockdown activat. Se așteaptă interacțiunea cu EXPLAIN.");
            }
        } else {
            // Când ecranul nu mai e roșu (s-a trecut la următorul exercițiu), curățăm toate flag-urile pentru runda următoare
            document.body.classList.remove('duogpt-lockdown');
            lockdownActive = false;
            blockTimeoutActive = false;
        }
    });
}

// 6. ADĂUGARE ASCULTĂTOR TASTĂ ENTER
window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (lockdownActive) {
            e.preventDefault();
            e.stopPropagation();
            console.log("[DuoGPT Core] Enter interceptat! Pornim AI.");
            executaExplain();
        }
    }
}, true);

setInterval(adaugaButonSiVerificaLockdown, 1000);

// 7. Răspuns AI + Debounce reset
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
