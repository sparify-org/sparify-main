# Audit-Ergebnisse & Fehlerbehebung (Sparify Website)

Ich habe die Website auf dem PC und in der mobilen Ansicht (Handy) sowie im Light- und Dark-Mode getestet. Hier sind die identifizierten Probleme:

## 🔴 Kritische Fehler (Funktionalität)

*   **Newsletter-Anmeldung (Supabase):**
    *   **Status:** Schreibt aktuell nichts in die Datenbank beim Testen.
    *   **Ursachen:**
        1.  **CORS/Module Issue:** Da `newsletter.js` als Modul geladen wird, blockieren viele Browser das Laden via `file://` (lokal).
        2.  **Initialisierungs-Timing:** Die Supabase-Initialisierung in `newsletter.js` läuft sofort beim Laden, evtl. bevor das globale `window.supabase`-Objekt der Library vollständig verfügbar ist.
    *   **Lösung:** Umstellung auf reguläre Scripte oder verbesserte Initialisierungs-Logik mit Check auf Verfügbarkeit.

## 🟠 Visuelle Fehler & UI/UX

*   **Dangling HTML Syntax (`/>` Bug):**
    *   **Problem:** Es tauchen störende `/>` Symbole auf oder Textabschnitte wirken verschoben.
    *   **Ursache:** Im Abschnitt "Instagram Promo" fehlt ein öffnendes `<svg>`-Tag, aber es gibt ein schließendes `</svg>`. Dies verwirrt den Browser und führt zu Render-Fehlern.
*   **Mobile Header (Handy-Ansicht):**
    *   **Problem:** Der Theme-Toggle (Sonne/Mond) wird auf kleinen Bildschirmen (< 480px) komplett ausgeblendet.
    *   **Problem:** Das Hamburger-Menü ist nicht sauber ausgerichtet.
    *   **Lösung:** CSS-Media-Queries anpassen, um den Toggle auch mobil anzuzeigen und die Abstände zu optimieren.
*   **Lesbarkeit & Kontrast (Dark Mode):**
    *   **Problem:** Im "Lösung" Abschnitt ist der Text teilweise schwer lesbar auf dem dunklen Hintergrund.
    *   **Problem:** Das Footer-Logo ist im Dark Mode fast unsichtbar, da es dunkel auf dunkel steht.
    *   **Lösung:** Anpassung der CSS-Variablen für den Dark Mode und Hinzufügen eines Filters/Logoswitchers.
*   **Mobile Sticky Button:**
    *   **Problem:** Der "Jetzt starten" Button am unteren Rand überlappt teilweise Inhalte oder wirkt unproportional.

## 🟡 Sonstiges & Assets

*   **Fehlende Bilddatei:**
    *   Der Browser meldet einen 404-Fehler für `assets/images/logo_white.webp`.
*   **Konsistenz:**
    *   Harte Farbcodes in JavaScript (`newsletter.js`) anstatt CSS-Variablen.

---
**Nächste Schritte:** Sobald dieses Dokument reviewt wurde, erstelle ich einen Implementierungsplan.
