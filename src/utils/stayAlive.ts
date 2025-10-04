import { supabase } from "@/lib/supabase";

export const stayAlive = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already pinged today
    const { data: existing } = await supabase
      .from('stay_alive')
      .select('id')
      .eq('ping_date', today)
      .single();
    
    if (!existing) {
      await supabase
        .from('stay_alive')
        .insert({ ping_date: today });
    }
  } catch (error) {
    console.log('Stay alive ping failed:', error);
  }
};

// Auto-run stay alive on app load
if (typeof window !== 'undefined') {
  stayAlive();
  
  // Set up daily interval (24 hours)
  setInterval(stayAlive, 24 * 60 * 60 * 1000);
}