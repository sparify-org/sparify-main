-- ═══════════════════════════════════════════════
-- SPARIFY SUPABASE DATABASE MIGRATION
-- Newsletter Subscribers Table (MIT SICHERHEIT)
--
-- ANLEITUNG:
-- 1. Gehe zu Supabase Dashboard -> SQL Editor
-- 2. Kopiere diesen gesamten Code
-- 3. Klicke auf "Run"
-- ═══════════════════════════════════════════════

-- Lösche existierende Tabelle und Policies
DROP TABLE IF EXISTS public.subscribers CASCADE;

-- Erstelle subscribers Tabelle
CREATE TABLE public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    source TEXT DEFAULT 'website',
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Erstelle Index für schnellere Email-Suche
CREATE INDEX idx_subscribers_email ON public.subscribers(email);

-- Aktiviere Row Level Security
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Policy: Anonyme Benutzer dürfen NUR neue Einträge hinzufügen
CREATE POLICY "anon_insert_only" ON public.subscribers
    AS PERMISSIVE
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Policy: Authentifizierte Benutzer haben vollen Zugriff (Admin)
CREATE POLICY "authenticated_full_access" ON public.subscribers
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Berechtigungen
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.subscribers TO anon;
GRANT ALL ON public.subscribers TO authenticated;

-- Fertig! Die Tabelle ist jetzt sicher:
-- - Anonyme Benutzer können NUR einfügen (nicht lesen/ändern/löschen)
-- - Authentifizierte Benutzer haben vollen Zugriff
