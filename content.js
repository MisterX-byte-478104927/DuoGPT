// DuoGPT Beta v2.4.1 by Mister X - STABLE REPAIR
console.log("DuoGPT Beta v2.4.1 - Clean Core Running");

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

// 5. INJECTARE ȘI VERIFICARE LOCKDOWN (V2.3.3 Design Upgrade)
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

    // Asigurăm un container flexibil pe părintele butoanelor pentru a controla alinierea perfectă
    if (btnDuo.parentNode && btnDuo.parentNode.style.display !== 'flex') {
        btnDuo.parentNode.style.display = 'flex';
        btnDuo.parentNode.style.alignItems = 'center';
        btnDuo.parentNode.style.justifyContent = btnDuo.parentNode.style.justifyContent || 'flex-end';
    }

    // Injectare buton EXPLAIN cu aspect premium 3D
    if (!document.getElementById('btn-explica')) {
        const btn = document.createElement('button');
        btn.id = 'btn-explica';
        btn.innerText = 'EXPLAIN';
        
        // Stilul 3D Calibrat Perfect după standardul Duolingo
        Object.assign(btn.style, {
            backgroundColor: "#1cb0f6",
            border: "none",
            borderBottom: "5px solid #1899d6", // Bordură 3D mai groasă, identică cu cea verde
            borderRadius: "16px",
            color: "white",
            padding: "0px 35px", // Scoatem padding-ul pe verticală ca să lăsăm height-ul să controleze totul
            marginRight: "50px", 
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "15px",
            fontFamily: '"FeatherBold", "DinRound", "Nunito", sans-serif',
            letterSpacing: "0.8px",
            zIndex: "9999",
            textTransform: "uppercase",
            transition: "background-color 0.2s ease, filter 0.2s ease", // Curățăm tranzicțiile ca să nu agațe
            boxShadow: "0 2px 0 rgba(0,0,0,0.05)",
            height: "50px", // Sincronizat la fix cu butonul VERIFICĂ
            minWidth: "150px", // Îl lățește ca să nu mai arate turtit
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
        });

        // Efecte mecanice calibrate pentru bordura de 5px
        btn.onmouseenter = () => {
            btn.style.backgroundColor = "#37beff";
        };
        btn.onmouseleave = () => {
            btn.style.backgroundColor = "#1cb0f6";
            btn.style.transform = "none";
            btn.style.borderBottom = "5px solid #1899d6";
        };
        btn.onmousedown = () => {
            btn.style.transform = "translateY(2px)"; // Coboară fluid
            btn.style.borderBottom = "3px solid #1899d6"; // Rămâne structura de click neschimbată
        };
        btn.onmouseup = () => {
            btn.style.transform = "none";
            btn.style.borderBottom = "5px solid #1899d6";
        };

        btn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            executaExplain();
        };

        // Injectează-l exact înaintea butonului nativ Duolingo
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
            if (!lockdownActive && !blockTimeoutActive) {
                lockdownActive = true;
                blockTimeoutActive = true; 
                document.body.classList.add('duogpt-lockdown');
                console.log("[DuoGPT Core] Lockdown activat. Se așteaptă interacțiunea cu EXPLAIN.");
            }
        } else {
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


// NEW: STATISTICS IN PROFILE PAGE
function injecteazaStatisticiInProfil() {
    // 1. Rulăm doar pe profil
    if (!window.location.href.includes('/profile/')) return;
    if (document.getElementById('duogpt-profile-stats')) return;

    // 2. Găsim elementul H2 real de pe ecran
    let titluStatistici = null;
    const h2Elements = document.querySelectorAll('h2');
    for (const h2 of h2Elements) {
        if (h2.textContent.includes('Statistici') || h2.textContent.includes('Statistics')) {
            titluStatistici = h2;
            break;
        }
    }
    if (!titluStatistici) return;

    // 3. Urcăm la părintele care ține titlul (acel <div class="_2Nu7i"> din poza ta)
    const containerTitlu = titluStatistici.parentElement;
    if (!containerTitlu) return;

    // 4. Luăm elementul IMEDIAT URMĂTOR (acel <div class> care conține gridul _37tLJ)
    const wrapperGrid = containerTitlu.nextElementSibling;
    if (!wrapperGrid) return;

    // 5. Generăm cardul
    chrome.storage.local.get(["duogpt_thumbs_up", "duogpt_thumbs_down"], (data) => {
        if (document.getElementById('duogpt-profile-stats')) return;

        const ups = data.duogpt_thumbs_up || 0;
        const downs = data.duogpt_thumbs_down || 0;
        const total = ups + downs;
        const acuratete = total > 0 ? Math.round((ups / total) * 100) : 100;

        const cardHTML = `
            <div id="duogpt-profile-stats" style="
                border: 2px solid #e5e5e5;
                border-radius: 16px;
                padding: 16px 20px;
                display: flex;
                align-items: center;
                gap: 16px;
                background: #ffffff;
                box-shadow: 0 4px 0 #e5e5e5;
                box-sizing: border-box;
                min-height: 82px;
                width: 100%;
                margin-top: 16px;
                clear: both;
            ">
                <div style="font-size: 32px; user-select: none; line-height: 1; display: flex; align-items: center;">🦉</div>
                <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; flex: 1;">
                    <span style="font-size: 19px; font-weight: 800; color: #3c3c3c; line-height: 1.2;">${acuratete}%</span>
                    <span style="font-size: 11px; font-weight: 700; color: #afafaf; text-transform: uppercase; letter-spacing: 0.8px; margin-top: 2px;">Acuracy Copilot DuoGPT</span>
                    <div style="display: flex; gap: 12px; font-size: 12px; color: #777777; font-weight: bold; margin-top: 4px;">
                        <span>👍 <span style="color: #58cc02;">${ups}</span></span>
                        <span>👎 <span style="color: #ea2b2b;">${downs}</span></span>
                    </div>
                </div>
            </div>
        `;

        // 6. Inserăm cardul nostru LA FINALUL acelui wrapper, deci fix SUB grid-ul cu cele 4 statistici!
        wrapperGrid.insertAdjacentHTML('beforeend', cardHTML);
        console.log("[DuoGPT Core] Card injectat cu laser, fix după arhitectura din DOM.");
    });
}

// Modifică linia ta de final din content.js să includă și asta:
setInterval(() => {
    adaugaButonSiVerificaLockdown();
    injecteazaStatisticiInProfil(); // <--- Adăugat aici ca să ruleze la fiecare secundă
}, 1000);


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
