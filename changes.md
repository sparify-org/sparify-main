# Sparify Mobile Audit: Empfohlene Änderungen

Dieses Dokument enthält alle gefundenen Fehler und Verbesserungsvorschläge für die mobile Version der Sparify-Website. Die Änderungen beziehen sich auf das Layout, die Zentrierung und die Sichtbarkeit in der Light-Version.

---

## 1. Header & Logo-Sichtbarkeit
Die Sichtbarkeit des Logos in der Light-Version ist kritisch.

- [ ] **Problem:** Das Logo (`assets/images/SparifyLogo.png`) ist auf dem hellen Navigations-Hintergrund fast unsichtbar.
- [ ] **Lösungsvorschlag A:** Dem Header (`.nav`) in der Light-Version eine leicht dunklere oder farbige Hintergrundfarbe geben (z.B. `rgba(245, 245, 245, 0.95)`).
- [ ] **Lösungsvorschlag B:** Das Logo per CSS-Filter in der Light-Version abdunkeln:
  ```css
  :root:not([data-theme="dark"]) .nav-logo img {
    filter: brightness(0.15) contrast(1.2);
  }
  ```

---

## 2. Zentrierung & Alignment (Mobil-Ansicht)
Der Nutzer wünscht eine konsequente Zentrierung auf dem Handy.

### Footer (Fußzeile)
- [ ] **Problem:** Die türkisen Zierlinien unter den Überschriften (z.B. "PRODUKT", "RECHTLICH") "kleben" links am Rand, während der Text zentriert ist. 
- [ ] **Lösung:** In `sections.css` die Regel für `.footer-col h4::after` im Media Query für Tablets/Handys (968px) anpassen:
  ```css
  .footer-col h4::after {
      left: 50% !important;
      transform: translateX(-50%) !important;
  }
  ```

### Mobile Navigations-Menü
- [ ] **Problem:** Auch im ausgezogenen Handy-Menü sind einige Linien und Abstände linksbündig, was unruhig wirkt.
- [ ] **Lösung:** `text-align: center` für `.nav-links a` sicherstellen und das Border-Bottom-Design zentrieren.

### FAQ Sektion
- [ ] **Problem:** Die Fragen in den Accordions (`.faq-question`) sind linksbündig.
- [ ] **Lösung:** Auf Mobilgeräten auf `text-align: center` und `justify-content: center` umstellen.

### Testimonials (Nutzerstimmen)
- [ ] **Problem:** Die Sterne-Bewertungen und die Autoren-Informationen (Name/Rolle) sind linksbündig innerhalb der zentrierten Karten.
- [ ] **Lösung:** `.testimonial-rating` und `.testimonial-author` auf `justify-content: center` und `align-items: center` setzen.

### Pricing Cards (Pakete)
- [ ] **Problem:** Die "APP HERUNTERLADEN" Buttons und die Feature-Listen innerhalb der Karten wirken leicht verschoben.
- [ ] **Lösung:** Sicherstellen, dass Buttons `margin: 0 auto` haben und Listen als flex-column mit `align-items: center` formatiert sind.

---

## 3. Allgemeine Responsivität & Design-Polish

### Sektions-Abstände
- [ ] **Problem:** Einige Sektionen (vor allem Hero und Problem-Sektion) haben auf dem Handy zu viel vertikalen Abstand.
- [ ] **Lösung:** Das Padding von `var(--space-4xl)` auf `var(--space-2xl)` reduzieren für Bildschirme unter 768px.

### Instagram-Mockup
- [ ] **Problem:** Das Instagram-Karten-Mockup wird auf sehr kleinen Displays (Small Phones) teilweise abgeschnitten oder überdeckt den Text.
- [ ] **Lösung:** Das Mockup auf kleinen Bildschirmen (`max-width: 480px`) komplett ausblenden oder skalieren (`transform: scale(0.8)`).

### Sticky Button
- [ ] **Problem:** Der "JETZT STARTEN" Button am unteren Rand überlagert in manchen Ansichten den Footer-Inhalt.
- [ ] **Lösung:** Ein zusätzliches `padding-bottom` (ca. 80px) für den `body` oder den `footer` hinzufügen, damit der Button nichts verdeckt.

---

*Erstellt durch Antigravity am 15.02.2026*
