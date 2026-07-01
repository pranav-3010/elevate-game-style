import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

console.log("SUPABASE URL ENVIROMENT RESOLUTION:", {
  url: supabaseUrl,
  anonKeyLength: supabaseAnonKey ? supabaseAnonKey.length : 0,
});

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your-project") || supabaseAnonKey.includes("your-supabase-anon-key")) {
  console.warn("Supabase credentials are missing or using placeholder values. Database queries will fail.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
