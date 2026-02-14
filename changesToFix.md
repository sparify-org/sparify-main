# Changes to Fix - Sparify Website Audit

Hier sind die identifizierten Probleme und die geplanten Korrekturen für die Sparify-Website:

## 🔴 Kritische Fehler (Funktionalität)

*   **Newsletter Anmeldung funktioniert nicht:**
    *   **Problem:** Die E-Mail-Adressen werden nicht in die Supabase-Datenbank geschrieben.
    *   **Ursache:** Beim Testen via `file://` blockiert CORS das Laden der JavaScript-Module (`newsletter.js`, `config.js`). Zudem scheint das Formular bei einem Fehler auf ein Standard-GET-Verhalten zurückzufallen.
    *   **Lösung:** Sicherstellen, dass die Scripte korrekt geladen werden. Fehlerbehandlung im `newsletter.js` verbessern, um das Standard-Absenden des Formulars (`e.preventDefault()`) unter allen Umständen zu verhindern.

## 🟠 Visuelle Fehler & UI/UX

*   **Textfehler in Buttons:**
    *   Sowohl der Hero-Button als auch der Newsletter-Button zeigen ein störendes `/>` am Ende des Textes (z.B. "Jetzt starten />").
*   **Mobile Header Design:**
    *   Das Hamburger-Menü klebt in der Mitte des Headers, anstatt sauber rechts oder links ausgerichtet zu sein.
*   **Lesbarkeit im Dark Mode:**
    *   Im Dark-Mode gibt es Abschnitte (z.B. "Die Lösung"), in denen dunkler Text auf dunklem Hintergrund steht. Der Kontrast muss erhöht werden.
*   **Fehlende Assets:**
    *   Die Datei `assets/images/logo_white.webp` wird vom Browser gesucht, ist aber nicht vorhanden (404).
*   **Mobile Sticky Button:**
    *   Der "JETZT STARTEN" Button am unteren Bildschirmrand überlappt auf manchen Mobilgeräten mit anderen Elementen oder wirkt deplatziert.

## 🟡 Sonstiges

*   **Inkonsistente Theme-Toggle Animation:**
    *   Der Wechsel zwischen Light und Dark Mode wirkt auf Mobilgeräten manchmal abgehakt oder reagiert verzögert.

---
Bitte reviewe diese Punkte. Sobald du grünes Licht gibst, korrigiere ich diese Fehler.
