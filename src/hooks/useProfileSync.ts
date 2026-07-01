import { useEffect } from "react";
import { useUser } from "@clerk/tanstack-react-start";
import { supabase } from "@/lib/supabase";

export function useProfileSync() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    async function syncProfile() {
      if (typeof window === "undefined") return;
      
      if (!isLoaded) {
        sessionStorage.setItem("supabase_sync_status", "Clerk loading...");
        return;
      }
      
      if (!isSignedIn || !user) {
        sessionStorage.setItem("supabase_sync_status", "Clerk loaded: Not signed in.");
        return;
      }

      sessionStorage.setItem("supabase_sync_status", `Clerk user identified: ${user.id}. Querying profiles table...`);
      const email = user.primaryEmailAddress?.emailAddress || "";
      
      try {
        // Try to get profile
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          sessionStorage.setItem("supabase_sync_status", `Supabase Query Error: ${error.message} (code ${error.code})`);
          console.warn("Supabase profile fetch error:", error.message);
          return;
        }

        // If profile does not exist, insert it
        if (!data) {
          sessionStorage.setItem("supabase_sync_status", `Profile not found in db. Attempting to insert...`);
          
          const { error: insertError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              email,
              first_name: user.firstName || "",
              last_name: user.lastName || "",
              avatar_url: user.imageUrl || "",
            });

          if (insertError) {
            sessionStorage.setItem("supabase_sync_status", `Supabase Insert Error: ${insertError.message} (code ${insertError.code})`);
            console.error("Error creating user profile in Supabase:", insertError.message);
          } else {
            sessionStorage.setItem("supabase_sync_status", "SUCCESS: Profile created in Supabase!");
            console.log("User profile successfully synchronized with Supabase!");
          }
        } else {
          sessionStorage.setItem("supabase_sync_status", "SUCCESS: Profile already exists in database.");
        }
      } catch (err: any) {
        sessionStorage.setItem("supabase_sync_status", `Unexpected error: ${err.message || err}`);
        console.error("Unexpected error syncing profile:", err);
      }
    }

    syncProfile();
  }, [isLoaded, isSignedIn, user]);
}
