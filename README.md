# 🚀 Sparify Website

Die offizielle Website für Sparify - Die smarte Verbindung zwischen deiner physischen Sparbox und deiner digitalen Finanzwelt.

![Sparify Logo](https://i.ibb.co/3y5wkF5w/LOGO-white-transparent-bg.webp)

## 📋 Überblick

Sparify ist eine innovative Lösung, die das traditionelle Sparen mit moderner Technologie verbindet. Die Website präsentiert unser Produkt, erklärt die Funktionen und ermöglicht die Newsletter-Anmeldung für unsere Warteliste.

## ✨ Features

### 🎨 Visuelle Modernisierung
- **Hochwertige SVG-Illustrationen**: Detaillierte 3D-isometrische Darstellungen der Sparbox
- **Realistische App-Mockups**: Authentische Screenshots der App-Funktionen (Dashboard, Sparziele, Analysen)
- **Enhanced Hero-Sektion**: Moderne Illustration mit animierten Verbindungslinien
- **Instagram-Promo**: Gefüllter Social Media Mockup mit echtem Content

### 🎭 Interaktivität & Animation
- **Scroll-Animationen mit Staggering**: Gestaffelte Einblendeffekte für bessere UX
- **Parallax-Effekte**: Dynamische Background-Bewegungen basierend auf Mausposition
- **Enhanced Hover-Effekte**:
  - Buttons mit Shimmer-Effekt
  - Karten mit Glow und Scale-Transformation
  - 3D-Transform-Effekte auf Team-Mitgliedern
- **Smooth Transitions**: Cubic-Bezier Easing für professionelle Animationen

### 🔧 Funktionalität
- **Supabase Newsletter-Integration**:
  - Vollständig funktionales Newsletter-System
  - Datenbank-Speicherung mit Row Level Security
  - Duplicate-Email-Handling
  - Fehlerbehandlung und Validierung
- **FAQ Accordion**: Optimiert mit automatischem Schließen anderer Items
- **Mobile-optimiert**: Responsive Design für alle Bildschirmgrößen
- **Dark Mode**: Vollständig implementierter Dunkel-Modus

### 🔍 SEO & Performance
- **JSON-LD Structured Data**:
  - SoftwareApplication Schema
  - Organization Schema
  - FAQPage Schema
  - Product Schema
- **Meta Tags**: Vollständige OG und Twitter Card Tags
- **Lazy Loading**: Optimierte Bildladung
- **Alt-Texte**: Alle Bilder mit beschreibenden Alt-Texten
- **Performance**: Optimierte Animationen mit `will-change` und `requestAnimationFrame`

## 📁 Projektstruktur

```
sparify-main/
├── index.html              # Hauptdatei
├── agb.html               # AGB
├── datenschutz.html       # Datenschutzerklärung
├── SETUP.md               # Setup-Anleitung für Supabase
├── README.md              # Diese Datei
├── migration.sql          # Supabase Datenbank-Migration
├── .gitignore            # Git Ignore-Regeln
├── css/
│   ├── variables.css      # Design-Tokens (Farben, Spacing, etc.)
│   ├── components.css     # Wiederverwendbare Komponenten
│   ├── sections.css       # Section-spezifische Styles
│   └── style.css          # Base Styles & Animationen
└── js/
    ├── script.js          # Hauptlogik (Scroll, Parallax, Reveal)
    ├── mobile-menu.js     # Mobile Navigation
    ├── faq.js             # FAQ Accordion
    ├── newsletter.js      # Newsletter mit Supabase
    └── config.js          # API-Konfiguration (nicht in Git!)
```

## 🚀 Quick Start

### 1. Repository klonen

```bash
git clone https://github.com/yourusername/sparify-website.git
cd sparify-website
```

### 2. Supabase einrichten

Folge der detaillierten Anleitung in [SETUP.md](SETUP.md):

1. Erstelle ein kostenloses Supabase-Projekt
2. Führe `migration.sql` im SQL-Editor aus
3. Kopiere deine API-Credentials
4. Erstelle `js/config.js` mit deinen Keys

### 3. Lokal testen

Da dies eine statische Website ist, kannst du sie direkt öffnen:

```bash
# Mit Live Server (VS Code Extension)
# Oder mit Python
python -m http.server 8000

# Oder mit Node.js
npx serve
```

Öffne dann `http://localhost:8000` in deinem Browser.

### 4. Deployment

Die Website kann auf verschiedenen Plattformen gehostet werden:

- **Netlify**: Automatisches Deployment via Git
- **Vercel**: Serverless Hosting
- **GitHub Pages**: Kostenlos für öffentliche Repos
- **Traditionelles Hosting**: Via FTP/SFTP

Siehe [SETUP.md](SETUP.md) für detaillierte Deployment-Anleitungen.

## 🛠️ Technologie-Stack

- **HTML5**: Semantisches Markup
- **CSS3**: Custom Properties, Grid, Flexbox, Animations
- **Vanilla JavaScript**: Kein Framework, pure Performance
- **Supabase**: Backend-as-a-Service für Newsletter
- **SVG**: Skalierbare Vektorgrafiken
- **JSON-LD**: Structured Data für SEO

## 🎨 Design-System

### Farben

```css
--color-primary:        #00b1b7  /* Teal - Hauptfarbe */
--color-secondary-a:    #e77938  /* Orange - Akzente */
--color-secondary-b:    #f5db6f  /* Gelb - Highlights */
```

### Typography

- **Font**: Montserrat (Google Fonts)
- **Gewichte**: 300, 400, 500, 600, 700, 800
- **Scale**: Modular Scale mit clamp() für Responsive

### Spacing

- **Base**: 8px Grid
- **Scale**: xs (8px) → sm (16px) → md (24px) → lg (32px) → xl (48px)

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Total Bundle Size**: < 200KB (ohne Bilder)

## 🔐 Sicherheit

- **Row Level Security (RLS)**: Aktiviert in Supabase
- **API-Keys**: Niemals in Git committed
- **CORS**: Konfiguriert für spezifische Domains
- **Input Validation**: Client- und Server-seitig

## 📝 Changelog

### Version 2.0.0 (2025-02-12)

**Neue Features:**
- ✅ Supabase Newsletter-Integration
- ✅ JSON-LD Structured Data
- ✅ Enhanced Parallax-Effekte
- ✅ Scroll-Animationen mit Staggering
- ✅ 3D-isometrische Box-Darstellung

**Verbesserungen:**
- ⚡ Optimierte Hover-Effekte mit Shimmer
- 🎨 Realistische App-Mockups
- 📱 Verbesserte Mobile-Navigation
- 🔍 SEO-Optimierung

**Bugfixes:**
- 🐛 FAQ Accordion schließt jetzt andere Items
- 🐛 Newsletter Duplicate-Email-Handling

## 🤝 Contributing

Beiträge sind willkommen! Bitte erstelle einen Pull Request oder öffne ein Issue.

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Commit deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 👥 Team

- **Matteo Cacic** - CEO
- **Dogukan Sentürk** - COO
- **Alperen Muratgül** - Engineer
- **Kilian Andre** - HR
- **Vlas Dvoryanov** - Developer

## 📞 Kontakt

- **Website**: [sparify.org](https://sparify.org)
- **Instagram**: [@sparify.at](https://www.instagram.com/sparify.at/)
- **Email**: sparify.at@gmail.com

## 📄 Lizenz

© 2025 Sparify. Alle Rechte vorbehalten.

---

**Gebaut mit ❤️ von Claude Code**
