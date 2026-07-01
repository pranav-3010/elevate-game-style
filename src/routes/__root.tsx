import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ClerkProvider } from "@clerk/tanstack-react-start";
import { useProfileSync } from "../hooks/useProfileSync";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { CursorGlow } from "../components/CursorGlow";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl tracking-[0.04em] text-primary">404</h1>
        <h2 className="mt-4 font-display text-2xl tracking-[0.04em]">Off the pitch.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl tracking-[0.04em]">This page didn't load.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "One8 Commune — Athletic Luxury" },
      { name: "description", content: "Cinematic athletic luxury. Sneakers, tailoring and gear engineered for those who own the game off the pitch." },
      { property: "og:title", content: "One8 Commune — Athletic Luxury" },
      { property: "og:description", content: "Cinematic athletic luxury. Sneakers, tailoring and gear engineered for those who own the game off the pitch." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "One8 Commune — Athletic Luxury" },
      { name: "twitter:description", content: "Cinematic athletic luxury. Sneakers, tailoring and gear engineered for those who own the game off the pitch." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f6f8433b-8521-432f-a6ea-7618bc35ce78/id-preview-0063807b--cc94e322-64b4-4621-97e6-25cb743c9580.lovable.app-1780330644154.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f6f8433b-8521-432f-a6ea-7618bc35ce78/id-preview-0063807b--cc94e322-64b4-4621-97e6-25cb743c9580.lovable.app-1780330644154.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (window.innerWidth < 1024) {
                  var metas = document.getElementsByTagName('meta');
                  for (var i = 0; i < metas.length; i++) {
                    if (metas[i].name === 'viewport') {
                      metas[i].parentNode.removeChild(metas[i]);
                    }
                  }
                  var meta = document.createElement('meta');
                  meta.name = 'viewport';
                  meta.content = 'width=1280, initial-scale=' + (window.screen.width / 1280) + ', maximum-scale=1.0, user-scalable=yes';
                  document.head.appendChild(meta);
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ProfileSyncHandler() {
  useProfileSync();
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [syncStatus, setSyncStatus] = useState<string>("Initializing...");

  const isSupabaseConfigured = 
    !!import.meta.env.VITE_SUPABASE_URL && 
    !import.meta.env.VITE_SUPABASE_URL.includes("your-project");

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined") {
        const val = sessionStorage.getItem("supabase_sync_status") || "Waiting for Clerk...";
        setSyncStatus(val);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <ProfileSyncHandler />
        <div className="relative flex min-h-screen flex-col bg-background pt-10">
          <div className="fixed top-0 left-0 right-0 z-[100] bg-zinc-950/95 text-white text-center text-[10px] py-2 border-b border-white/10 shadow-lg flex items-center justify-center gap-4 font-mono">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              DB Sync Status: <strong className="text-amber-400">{syncStatus}</strong>
            </span>
            {!isSupabaseConfigured && (
              <span className="text-red-500 font-bold bg-red-950/50 px-2 py-0.5 rounded border border-red-800">
                ⚠️ VITE_SUPABASE_URL MISSING!
              </span>
            )}
          </div>
          <div className="noise-layer" aria-hidden />
          <CursorGlow />
          <Header />
          <main className="relative z-[3] flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
