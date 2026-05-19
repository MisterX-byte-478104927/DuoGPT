# DuoGPT
🦉 DuoGPT is an advanced, ultra-optimized Chrome Extension (Manifest V3) that acts as an AI copilot for Duolingo. Features a native 3D UI button, isolated floating chat, smart toggle controls, dynamic 50+ language support, and context-aware grammar explanations powered directly by Gemini 2.5 Flash. 🚀

## ✨ Caracteristici Principale

* **⚡ Integrare Nativă 3D:** Butonul `EXPLAIN` împrumută identitatea vizuală exactă a butoanelor Duolingo (fonturi rotunjite, margini groase tridimensionale, efecte fluide la apăsare).
* **🧠 Motor de Inteligență Artificială:** Conectare directă prin Google AI Studio API la modelul de ultimă generație **Gemini 2.5 Flash**, oferind răspunsuri concise, structurate și extrem de rapide.
* **🌍 Poliglot din Dinamică:** Meniu Popup inteligent care populează dinamic peste **50 de limbi universale** de traducere (de la Română și Engleză până la dialecte complexe), sortate alfabetic.
* **🛡️ Izolare Vizuală Completă:** Interfața de chat rulează într-un mediu sandbox total izolat. Butoanele `>>` și `<<` folosesc un `zIndex` maxim absolut (`2147483647`) pentru a rămâne mereu accesibile fără să strice layout-ul lecțiilor.
* **📝 Formatare Avansată (Markdown & Tabele):** Explicațiile AI-ului sunt stilizate elegant cu accente verzi Duolingo (`#58cc02`), cuvinte-cheie evidențiate în blocuri de cod roșii și tabele gramaticale optimizate pentru citire rapidă.
* **🚀 Anti-Spam & Debounce Engine:** Protecție nativă asincronă care blochează click-urile multiple în timp ce AI-ul procesează răspunsul (`THINKING...`).


## 🛠️ Instalare Pas cu Pas (Mod Dezvoltator)

Deoarece extensia este un instrument autonom avansat, aceasta se instalează direct din surse:

1. **Descarcă Proiectul:** Clonează acest depozit sau descarcă arhiva ZIP și extrage-o într-un folder pe PC-ul tău.

2. **Accesează Extensiile în Chrome:** Deschide browserul Google Chrome și navighează la adresa: chrome://extensions/

3. **Activează Developer Mode:** În colțul din dreapta-sus al paginii, comută comutatorul "Developer mode" (Mod dezvoltator) pe poziția activă.

4. **Încarcă Extensia**: Apasă pe butonul "Load unpacked" (Încarcă extensie despachetată) din colțul stânga-sus.

5. **Selectează Folderul**: Alege folderul rădăcină în care ai extras fișierele proiectului (cel care conține manifest.json).

## ⚙️ Configurarea Inițială
1. Obține o cheie API gratuită direct din Google AI Studio.

2. Dă click pe iconița DuoGPT din bara de extensii a browserului tău pentru a deschide meniul de setări.

3. Lipește cheia ta API (AIzaSy...) în câmpul dedicat.

4. Selectează limba în care dorești să primești explicațiile din lista dinamică (ex: Română).

5. Apasă pe *SAVE SETTINGS*. Statusul va afișa ✓ Saved settings, iar butonul va fi securizat timp de 2 secunde pentru a preveni salvarea accidentală.

## 🎮 Cum se Folosește
1. Intră pe Duolingo și pornește orice lecție sau exercițiu.

2. În momentul în care apare o întrebare sau un exercițiu text, extensia va injecta automat butonul albastru EXPLAIN exact lângă butonul oficial de verificare.

3. Apasă pe EXPLAIN. Butonul își va schimba starea în THINKING..., iar panoul inteligent se va deschide fluid în partea dreaptă.

4. Gemini analizează exercițiul capturat din DOM și îți livrează structura gramaticală, greșelile comune și traducerea exactă.

5. Controlul Ecranului: Dacă ai nevoie de ecran complet, apasă pe butonul rotund >> din colțul stânga-sus al panoului. Panoul dispare instantaneu și lasă locul unui tab discret << lipit de marginea ecranului pentru restaurare instantanee, fără a pierde istoricul conversației.

## 🔍 Depanare (Troubleshooting)
Dacă întâmpini probleme în timpul utilizării, verifică următoarele soluții rapide:

1. **Butonul EXPLAIN nu apare pe pagină:** Duolingo își actualizează frecvent interfața. Asigură-te că ești într-o lecție activă (nu pe pagina principală de profil). Dacă tot nu apare, deschide consola browserului (F12 -> tab-ul Console) și verifică dacă există erori. Un simplu Refresh (F5) rezolvă de obicei reinițializarea scriptului.

2. **Panoul afișează ⚠️ Lipsește cheia API din Popup!:** Apasă pe iconița extensiei din bara de Chrome, reintroduce cheia ta generată în Google AI Studio și apasă SAVE SETTINGS. Asigură-te că nu ai spații goale la începutul sau la sfârșitul cheii.

3. **Panoul rămâne blocat pe textul Thinking...:** Verifică conexiunea la internet sau dacă ai atins limitele de rată (rate limits) ale contului tău gratuit din Google AI Studio. De asemenea, asigură-te că extensia nu este blocată de un ad-blocker agresiv sau de un firewall local.

4. **Textul capturat este incomplet sau greșit:** Sistemul folosește selectoare DOM dinamice. Dacă Duolingo schimbă structura clasei unui exercițiu, extensia va folosi o metodă de fallback (ultimele 300 de caractere din pagină). Poți raporta structurile noi deschizând un Issue în acest repo.

## 🔒 Securitate și Confidențialitate
**Stocare Locală Securizată**: Cheia ta API și preferințele de limbă sunt stocate local pe dispozitivul tău prin intermediul chrome.storage.local. Nimic nu se trimite către servere terțe.

**Conexiune Directă**: Cererile AI sunt efectuate direct de pe mașina ta către endpoint-ul oficial Google Generative Language API, garantând latență minimă și confidențialitate maximă.

**Fără Analytics**: Extensia nu colectează date de utilizare, log-uri de navigare sau telemetrie.
