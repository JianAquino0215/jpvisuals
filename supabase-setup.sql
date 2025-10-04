-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  tech TEXT[] NOT NULL,
  image TEXT NOT NULL,
  link TEXT NOT NULL,
  section_name TEXT DEFAULT 'featured_work',
  order_index INTEGER DEFAULT 0,
  statistic_text TEXT,
  statistic_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users full access" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Create portfolio sections table
CREATE TABLE portfolio_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_name TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for portfolio sections
ALTER TABLE portfolio_sections ENABLE ROW LEVEL SECURITY;

-- Create policies for portfolio sections
CREATE POLICY "Allow public read access" ON portfolio_sections
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users full access" ON portfolio_sections
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default projects
INSERT INTO projects (title, category, description, tech, image, link, section_name, order_index, statistic_text, statistic_link) VALUES
('Interactive Web Experience', 'Web Development', 'A dynamic portfolio website with custom animations and immersive user interactions.', ARRAY['React', 'Three.js', 'GSAP', 'TailwindCSS'], '/placeholder.svg', '#', 'featured_work', 0, 'Generated 19k views', 'https://analytics.example.com'),
('3D Character Design', 'Multimedia Art', 'Stylized character models for an indie game project with full rigging and animation.', ARRAY['Blender', 'Substance Painter', 'Unity'], '/placeholder.svg', '#', 'featured_work', 1, 'Downloaded 5.2k times', 'https://downloads.example.com');

-- Insert default section data
INSERT INTO portfolio_sections (section_name, title, description, order_index) VALUES
('featured_work', 'Featured Work', 'A showcase of creative projects spanning digital art, web development, and interactive experiences', 0);

-- Create stay alive table
CREATE TABLE stay_alive (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ping_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for stay alive
ALTER TABLE stay_alive ENABLE ROW LEVEL SECURITY;

-- Create policy for stay alive
CREATE POLICY "Allow public read access" ON stay_alive
  FOR SELECT USING (true);