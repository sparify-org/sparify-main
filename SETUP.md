# Sparify Website Setup Guide

Diese Anleitung hilft dir, die Sparify Website vollständig einzurichten.

## 📋 Inhaltsverzeichnis

1. [Voraussetzungen](#voraussetzungen)
2. [Supabase Setup](#supabase-setup)
3. [API-Konfiguration](#api-konfiguration)
4. [Deployment](#deployment)
5. [Fehlerbehebung](#fehlerbehebung)

---

## Voraussetzungen

- Ein Supabase-Konto (kostenlos bei [supabase.com](https://supabase.com))
- Ein Texteditor (z.B. VS Code)
- Optional: Git für Versionskontrolle

---

## Supabase Setup

### 1. Supabase-Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com) und erstelle ein kostenloses Konto
2. Klicke auf "New Project"
3. Gib deinem Projekt einen Namen (z.B. "Sparify")
4. Wähle ein sicheres Passwort für die Datenbank
5. Wähle eine Region (am besten in deiner Nähe, z.B. "Europe Central")
6. Klicke auf "Create new project"

### 2. Datenbank-Migration ausführen

1. Warte, bis dein Supabase-Projekt erstellt wurde
2. Gehe im Supabase-Dashboard zum "SQL Editor" (linkes Menü)
3. Klicke auf "New query"
4. Öffne die Datei `migration.sql` aus diesem Repository
5. Kopiere den gesamten Inhalt und füge ihn in den SQL Editor ein
6. Klicke auf "Run" (oder drücke Strg/Cmd + Enter)
7. Du solltest die Meldung "Success. No rows returned" sehen

### 3. API-Schlüssel abrufen

1. Gehe im Supabase-Dashboard zu "Settings" → "API"
2. Du findest dort zwei wichtige Informationen:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: Ein langer String beginnend mit `eyJ...`

⚠️ **WICHTIG**: Kopiere diese Werte an einen sicheren Ort!

---

## API-Konfiguration

### 1. Konfigurationsdatei erstellen

1. Erstelle eine neue Datei im Projektordner: `js/config.js`
2. Füge folgenden Code ein:

```javascript
// ═══════════════════ SUPABASE CONFIGURATION ═══════════════════
// WICHTIG: Diese Datei sollte NICHT in die Versionskontrolle (Git) eingecheckt werden!
// Füge sie zu .gitignore hinzu!

const SUPABASE_CONFIG = {
  url: 'DEINE_SUPABASE_PROJECT_URL',
  anonKey: 'DEIN_SUPABASE_ANON_KEY'
};

// Export für ES6 Module
export default SUPABASE_CONFIG;
```

3. Ersetze `DEINE_SUPABASE_PROJECT_URL` mit deiner Project URL
4. Ersetze `DEIN_SUPABASE_ANON_KEY` mit deinem anon public key

**Beispiel:**

```javascript
const SUPABASE_CONFIG = {
  url: 'https://abcdefghijklmno.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ubyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjg5NzU4NDAwLCJleHAiOjIwMDUzMzQ0MDB9.example_signature'
};
```

### 2. Supabase Client Library einbinden

Öffne `index.html` und füge **VOR** dem `<script src="js/newsletter.js"></script>` Tag folgende Zeile ein:

```html
<!-- Supabase Client Library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Config (erstelle diese Datei!) -->
<script type="module" src="js/config.js"></script>

<!-- Newsletter Script -->
<script type="module" src="js/newsletter.js"></script>
```

### 3. Newsletter-Integration aktivieren

Die `js/newsletter.js` wurde bereits für Supabase vorbereitet. Stelle sicher, dass die Datei existiert und die Supabase-Integration verwendet.

---

## Deployment

### Option 1: Netlify

1. Pushe dein Projekt auf GitHub
2. Gehe zu [netlify.com](https://netlify.com)
3. Klicke auf "New site from Git"
4. Wähle dein GitHub-Repository
5. Klicke auf "Deploy site"

⚠️ **Umgebungsvariablen setzen:**
- Gehe zu "Site settings" → "Build & deploy" → "Environment"
- Füge hinzu:
  - `SUPABASE_URL`: Deine Project URL
  - `SUPABASE_ANON_KEY`: Dein anon public key

### Option 2: Vercel

1. Pushe dein Projekt auf GitHub
2. Gehe zu [vercel.com](https://vercel.com)
3. Klicke auf "New Project"
4. Importiere dein GitHub-Repository
5. Klicke auf "Deploy"

⚠️ **Umgebungsvariablen setzen:**
- Gehe zu "Settings" → "Environment Variables"
- Füge die gleichen Variablen wie bei Netlify hinzu

### Option 3: Manuell (FTP/SFTP)

1. Lade alle Dateien auf deinen Webserver hoch
2. Stelle sicher, dass `js/config.js` die korrekten API-Schlüssel enthält
3. Die Website sollte sofort funktionieren

---

## Sicherheitshinweise

### 🔒 Wichtige Sicherheitspraktiken:

1. **Niemals** deine `js/config.js` in ein öffentliches Git-Repository pushen!
2. Erstelle eine `.gitignore`-Datei und füge hinzu:
   ```
   js/config.js
   .env
   .env.local
   ```
3. Verwende **nur** den `anon public` Key (nicht den `service_role` Key!)
4. Aktiviere RLS (Row Level Security) in Supabase (bereits in `migration.sql` enthalten)

---

## Fehlerbehebung

### Problem: "Failed to fetch" Fehler beim Newsletter-Submit

**Lösung:**
1. Überprüfe, ob die Supabase-URL korrekt ist
2. Stelle sicher, dass der API-Key richtig kopiert wurde
3. Öffne die Browser-Konsole (F12) und suche nach detaillierten Fehlermeldungen
4. Verifiziere, dass die `migration.sql` erfolgreich ausgeführt wurde

### Problem: Newsletter-Anmeldung funktioniert nicht

**Lösung:**
1. Gehe zu Supabase → "Table Editor" → "subscribers"
2. Überprüfe, ob die Tabelle existiert
3. Teste, ob du manuell eine Zeile einfügen kannst
4. Überprüfe die RLS-Policies unter "Authentication" → "Policies"

### Problem: CORS-Fehler

**Lösung:**
1. Gehe zu Supabase → "Settings" → "API"
2. Scrolle zu "CORS origins"
3. Füge deine Website-Domain hinzu (z.B. `https://sparify.org`)
4. Für lokale Entwicklung: Füge `http://localhost:*` hinzu

### Problem: "Invalid API key" Fehler

**Lösung:**
1. Überprüfe, ob du den `anon public` Key verwendest (nicht `service_role`)
2. Stelle sicher, dass keine zusätzlichen Leerzeichen im Key sind
3. Generiere einen neuen API-Key in Supabase falls nötig

---

## Testing

### Newsletter-Funktion testen:

1. Öffne deine Website
2. Scrolle zur Newsletter-Sektion
3. Gib eine Test-E-Mail ein (z.B. `test@example.com`)
4. Klicke auf "Anmelden"
5. Du solltest eine Erfolgsmeldung sehen
6. Überprüfe in Supabase → "Table Editor" → "subscribers", ob die E-Mail gespeichert wurde

---

## Support

Falls du Probleme hast:

1. Überprüfe die Browser-Konsole (F12) auf Fehler
2. Schaue in die Supabase-Logs: "Logs" im Dashboard
3. Lese die [Supabase-Dokumentation](https://supabase.com/docs)
4. Kontaktiere: sparify.at@gmail.com

---

## Nächste Schritte

✅ Supabase eingerichtet
✅ Newsletter funktioniert
✅ Website deployed

**Optional:**
- Email-Benachrichtigungen einrichten (Supabase Edge Functions)
- Export-Funktion für Subscriber-Liste
- Admin-Dashboard für Newsletter-Management

---

**Viel Erfolg mit Sparify! 🚀**
