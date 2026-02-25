# Identifizierte Bugs - Sparify Website

Dies ist eine Liste der aktuell identifizierten Fehler (Bugs) in der Sparify Website.

## 🔴 Kritische Fehler (Funktionalität)

*   **Newsletter-Anmeldung (Supabase):**
    *   **Problem:** Die Anmeldung schreibt aktuell keine Daten in die Datenbank.
    *   **Ursache:** CORS-Probleme beim lokalen Testen (Module-Script) oder Timing-Probleme bei der Supabase-Initialisierung.
    *   **Datei:** [newsletter.js](file:///c:/Users/matte/OneDrive/HTL/3aHWII/BET/Sparschwein/Sparify%20Website/sparify-main/js/newsletter.js)
*   **Hardcodierte API-Keys:**
    *   **Problem:** Supabase URL und Anon Key sind direkt im Quellcode hinterlegt.
    *   **Lösung:** Auslagern in eine Konfigurationsdatei oder Umgebungsvariablen (für Production).
    *   **Datei:** [newsletter.js](file:///c:/Users/matte/OneDrive/HTL/3aHWII/BET/Sparschwein/Sparify%20Website/sparify-main/js/newsletter.js#L5-L6)

## 🟠 Visuelle Fehler & UI/UX

*   **Dangling HTML Syntax (`/>` Bug):**
    *   **Problem:** Im "Instagram Promo" Abschnitt fehlen öffnende SVG-Tags oder es gibt überschüssige schließende Tags.
    *   **Datei:** [index.html](file:///c:/Users/matte/OneDrive/HTL/3aHWII/BET/Sparschwein/Sparify%20Website/sparify-main/index.html)
*   **Header Verschiebung:**
    *   **Problem:** Beim Wechsel von der Startseite zu AGB oder Datenschutz verschiebt sich die Navigationsleiste.
    *   **Ursache:** Inkonsistente Nav-Klassen (`visible scrolled` vs. Standard) und unterschiedliche CSS-Margings.
    *   **Dateien:** [index.html](file:///c:/Users/matte/OneDrive/HTL/3aHWII/BET/Sparschwein/Sparify%20Website/sparify-main/index.html), [agb.html](file:///c:/Users/matte/OneDrive/HTL/3aHWII/BET/Sparschwein/Sparify%20Website/sparify-main/agb.html), [datenschutz.html](file:///c:/Users/matte/OneDrive/HTL/3aHWII/BET/Sparschwein/Sparify%20Website/sparify-main/datenschutz.html)
*   **Mobile Header Bugs:**
    *   **Problem:** Theme-Toggle (Sonne/Mond) wird auf kleinen Bildschirmen (< 480px) ausgeblendet.
    *   **Problem:** Hamburger-Menü ist nicht exakt ausgerichtet.
*   **Dark Mode Kontrast:**
    *   **Problem:** Das Footer-Logo ist im Dark Mode fast unsichtbar (dunkel auf dunkel).
    *   **Lösung:** Logo-Switcher oder CSS-Filter verwenden.
*   **Mobile Sticky Button:**
    *   **Problem:** Der "Jetzt starten" Button am unteren Rand überlappt Inhalte auf mobilen Geräten.

## 🟡 Sonstiges & Assets

*   **Fehlende Bilddatei (404):**
    *   **Pfad:** `assets/images/logo_white.webp`
    *   **Status:** Datei existiert nicht im Dateisystem.
*   **Tote Links:**
    *   **Problem:** Manche Links in der Navigation führen zu lokalen Pfaden (z.B. `./feature/...`), die nicht existieren.
    *   **Problem:** `app.sparify.org` ist möglicherweise noch nicht erreichbar.
*   **Footer Alignment:**
    *   **Problem:** Links (AGB, Datenschutz) im Footer sind auf mobilen Geräten nicht sauber ausgerichtet.
