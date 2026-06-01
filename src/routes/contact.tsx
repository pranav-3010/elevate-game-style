import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — One8 Commune" },
      { name: "description", content: "Talk to the Commune team. Customer care, press, and partnerships." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-24">
      <header className="mb-14">
        <span className="text-[11px] uppercase tracking-[0.28em] text-primary">In touch</span>
        <h1 className="mt-3 font-display text-6xl leading-[0.95] tracking-[0.02em] sm:text-8xl">Contact.</h1>
      </header>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name"  placeholder="Your name" />
            <Field label="Email" type="email" placeholder="you@email.com" />
          </div>
          <Field label="Subject" placeholder="What is this about?" />
          <div>
            <label className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Message</label>
            <textarea rows={6} placeholder="Tell us a bit more…" className="mt-2 w-full rounded-md border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
          </div>
          <button className="rounded-full bg-primary px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-primary/90">
            Send message
          </button>
        </form>

        <aside className="space-y-6 rounded-lg border border-white/10 bg-card p-8">
          <Detail icon={Mail}  label="Care"  value="care@one8commune.com" />
          <Detail icon={Mail}  label="Press" value="press@one8commune.com" />
          <Detail icon={Phone} label="Phone" value="+91 80 4000 8800" />
          <Detail icon={MapPin} label="Atelier" value="HSR Layout, Bengaluru 560102" />
        </aside>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
      <input {...rest} className="mt-2 w-full rounded-md border border-white/15 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
    </label>
  );
}

function Detail({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-white/15 text-foreground"><Icon className="h-4 w-4" /></span>
      <div>
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-sm text-foreground">{value}</div>
      </div>
    </div>
  );
}
