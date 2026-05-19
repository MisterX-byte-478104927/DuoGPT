console.log("DuoGPT Alfa v1.2.1 by Mister X - AI Help - Succesfully loaded");

let isWaiting = false;

// Funcție care creează butonul mic de redeschidere "<<" în colțul paginii
function creeazaButonRedeschidere() {
    if (document.getElementById('duogpt-open-btn')) return;

    const openBtn = document.createElement('button');
    openBtn.id = 'duogpt-open-btn';
    openBtn.innerText = '<<';
    openBtn.title = 'Open DuoGPT';
    
    // Stil discret Duolingo-style, poziționat fix în dreapta-sus a ecranului
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
        display: 'none', // Ascuns implicit, apare doar când panoul e închis
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

function toggleSidePanel() {
    let panel = document.getElementById('duogpt-frame');
    let closeBtn = document.getElementById('duogpt-close-btn');
    
    creeazaButonRedeschidere();
    const openBtn = document.getElementById('duogpt-open-btn');

    if (panel) {
        // Dacă există deja, îl facem vizibil și resetăm butoanele
        panel.style.display = 'block';
        if (closeBtn) closeBtn.style.display = 'flex';
        if (openBtn) openBtn.style.display = 'none';
        return;
    }

    // 1. Creăm Iframe-ul plutitor standard
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
        zIndex: '2147483646', // Cu 1 mai mic decât butoanele ca să nu le acopere
        backgroundColor: '#ffffff',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(panel);

    // 2. Creăm butonul de închidere ">>" în colțul stânga-sus al panoului
    closeBtn = document.createElement('button');
    closeBtn.id = 'duogpt-close-btn';
    closeBtn.innerText = '>>';
    closeBtn.title = 'Hide Panel';

    Object.assign(closeBtn.style, {
        position: 'fixed',
        top: '35px', // Aliniat frumos în interiorul zonei de sus a widget-ului
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
        if (openBtn) openBtn.style.display = 'block'; // Afișăm butonul de salvare "<<"
    };

    document.body.appendChild(closeBtn);
}

function adaugaButon() {
    if (document.getElementById('btn-explica')) return;

    const butoane = document.querySelectorAll('button');
    let btnDuo = null;
    for (let b of butoane) {
        const t = b.innerText.toUpperCase();
        if (t === "VERIFICĂ" || t === "CHECK" || t === "CONTINUĂ" || t === "CONTINUE") {
            btnDuo = b;
            break;
        }
    }

    if (btnDuo) {
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
            if (isWaiting) return;

            e.preventDefault();
            e.stopPropagation();

            isWaiting = true; 
            btn.innerText = 'THINKING...';
            btn.style.opacity = "0.7";

            const zonaChallenge = document.querySelector('[data-test^="challenge"]') 
                               || document.querySelector('._3_AmG') 
                               || document.querySelector('main');

            let textCapturat = "";
            if (zonaChallenge) {
                textCapturat = zonaChallenge.innerText.replace(/EXPLICĂ/g, "").trim();
            }

            if (textCapturat.length < 2) {
                textCapturat = document.body.innerText.split('EXPLICĂ')[0].slice(-300).trim();
            }

            toggleSidePanel();

            setTimeout(() => {
                chrome.runtime.sendMessage({ 
                    type: "ASK_AI", 
                    context: `Exercițiul actual: ${textCapturat}` 
                });
            }, 400);
        };

        btnDuo.parentNode.insertBefore(btn, btnDuo);
    }
}

setInterval(adaugaButon, 1000);

// Iframe communication + Debounce reset
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