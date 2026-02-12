-- ═══════════════════════════════════════════════
-- SPARIFY SUPABASE DATABASE MIGRATION
-- Newsletter Subscribers Table
-- ═══════════════════════════════════════════════

-- Create subscribers table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    source TEXT DEFAULT 'website',
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON public.subscribers(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON public.subscribers(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (for newsletter signup)
CREATE POLICY "Allow public inserts" ON public.subscribers
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Create policy to allow authenticated users to read all subscribers
CREATE POLICY "Allow authenticated reads" ON public.subscribers
    FOR SELECT
    TO authenticated
    USING (true);

-- Create policy to allow authenticated users to update subscribers
CREATE POLICY "Allow authenticated updates" ON public.subscribers
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.subscribers
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.subscribers TO anon;
GRANT SELECT, UPDATE ON public.subscribers TO authenticated;

-- Add comment to table
COMMENT ON TABLE public.subscribers IS 'Newsletter subscribers for Sparify website';
COMMENT ON COLUMN public.subscribers.email IS 'Subscriber email address';
COMMENT ON COLUMN public.subscribers.status IS 'Subscription status: active or unsubscribed';
COMMENT ON COLUMN public.subscribers.source IS 'Source of subscription (e.g., website, app)';
COMMENT ON COLUMN public.subscribers.metadata IS 'Additional metadata about the subscriber';
