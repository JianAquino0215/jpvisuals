import { createClient } from '@supabase/supabase-js';

interface KeepAliveData {
  id?: string;
  timestamp: number;
  created_at?: string;
}

class KeepAliveService {
  private supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || '',
    import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  );
  private maxEntries = 10;

  private async getData(): Promise<KeepAliveData[]> {
    const { data, error } = await this.supabase
      .from('keep_alive')
      .select('*')
      .order('timestamp', { ascending: true });
    
    if (error) {
      console.error('Error fetching data:', error);
      return [];
    }
    return data || [];
  }

  private async shouldSendToday(): Promise<boolean> {
    const data = await this.getData();
    const today = new Date().toDateString();
    return !data.some(entry => new Date(entry.timestamp).toDateString() === today);
  }

  public async sendKeepAlive(): Promise<void> {
    if (!(await this.shouldSendToday())) return;

    const data = await this.getData();
    
    if (data.length >= this.maxEntries) {
      const { error } = await this.supabase
        .from('keep_alive')
        .delete()
        .eq('id', data[0].id);
      
      if (error) console.error('Error deleting old entry:', error);
    }

    const { error } = await this.supabase
      .from('keep_alive')
      .insert({ timestamp: Date.now() });

    if (error) {
      console.error('Error inserting keep alive:', error);
    } else {
      console.log('Keep alive sent to Supabase');
    }
  }

  public startKeepAlive(): void {
    this.sendKeepAlive();
    setInterval(() => {
      this.sendKeepAlive();
    }, 24 * 60 * 60 * 1000);
  }
}

export const keepAliveService = new KeepAliveService();