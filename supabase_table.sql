  -- Create keep_alive table
  CREATE TABLE keep_alive (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Enable Row Level Security (optional)
  ALTER TABLE keep_alive ENABLE ROW LEVEL SECURITY;

  -- Create policy to allow all operations (adjust as needed)
  CREATE POLICY "Allow all operations on keep_alive" ON keep_alive
  FOR ALL USING (true);