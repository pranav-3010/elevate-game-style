import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project") || supabaseAnonKey.includes("your-supabase-anon-key")) {
  console.warn("Supabase credentials are missing or using placeholder values. Database queries will fail.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
