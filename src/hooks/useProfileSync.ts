import { useEffect } from "react";
import { useUser } from "@clerk/tanstack-react-start";
import { supabase } from "@/lib/supabase";

export function useProfileSync() {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    async function syncProfile() {
      if (!isLoaded || !isSignedIn || !user) return;

      const email = user.primaryEmailAddress?.emailAddress || "";
      
      try {
        // Try to get profile
        const { data, error } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          // If it's a network error or missing table, warn
          console.warn("Supabase profile fetch error (check if schema was run):", error.message);
          return;
        }

        // If profile does not exist, insert it
        if (!data) {
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
            console.error("Error creating user profile in Supabase:", insertError.message);
          } else {
            console.log("User profile successfully synchronized with Supabase!");
          }
        }
      } catch (err) {
        console.error("Unexpected error syncing profile:", err);
      }
    }

    syncProfile();
  }, [isLoaded, isSignedIn, user]);
}
