import { useEffect, useRef, useState, useCallback } from "react";
import { RotateCw, Pause, Play, Maximize2, MousePointer2 } from "lucide-react";

type Props = {
  /** Ordered frame URLs for a real 360° spin. If omitted, a 3D fallback is used. */
  frames?: string[];
  /** Fallback hero image used when `frames` is not provided. */
  image: string;
  alt: string;
  badge?: string;
};

/**
 * Premium 360° product viewer.
 * - Lazy mounts via IntersectionObserver (frames only load when in view).
 * - Progressive frame preloading with a load-progress ring.
 * - Mouse + touch drag to rotate, inertia-free for precision.
 * - Auto-spin toggle, reset, frame counter, fullscreen.
 * - Graceful fallback: CSS 3D rotateY on the hero image when no frames exist.
 */
export function Product360({ frames, image, alt, badge }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [angle, setAngle] = useState(0); // for fallback
  const [dragging, setDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [autoSpin, setAutoSpin] = useState(true);
  const [loaded, setLoaded] = useState(0);
  const startXRef = useRef(0);
  const startIndexRef = useRef(0);
  const startAngleRef = useRef(0);

  const hasFrames = !!frames && frames.length > 1;
  const totalFrames = frames?.length ?? 1;

  // Lazy mount when scrolled into view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Progressive frame preload
  useEffect(() => {
    if (!inView || !hasFrames || !frames) return;
    let cancelled = false;
    let count = 0;
    const queue = [...frames];
    const next = () => {
      if (cancelled || queue.length === 0) return;
      const url = queue.shift()!;
      const im = new Image();
      im.onload = im.onerror = () => {
        if (cancelled) return;
        count += 1;
        setLoaded(count);
        next();
      };
      im.src = url;
    };
    // Two parallel loaders for speed without saturating the network
    next();
    next();
    return () => {
      cancelled = true;
    };
  }, [inView, hasFrames, frames]);

  // Auto-spin until the user interacts
  useEffect(() => {
    if (!inView || !autoSpin || hasInteracted || dragging) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      last = t;
      if (hasFrames) {
        setFrameIndex((i) => (i + (dt * 0.012)) % totalFrames);
      } else {
        setAngle((a) => (a + dt * 0.04) % 360);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, autoSpin, hasInteracted, dragging, hasFrames, totalFrames]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      (e.target as Element).setPointerCapture?.(e.pointerId);
      setDragging(true);
      setHasInteracted(true);
      startXRef.current = e.clientX;
      startIndexRef.current = frameIndex;
      startAngleRef.current = angle;
    },
    [frameIndex, angle],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      const el = wrapRef.current;
      const width = el?.clientWidth ?? 600;
      const dx = e.clientX - startXRef.current;
      if (hasFrames) {
        // One full rotation per drag across the viewer width
        const delta = (dx / width) * totalFrames;
        let next = (startIndexRef.current + delta) % totalFrames;
        if (next < 0) next += totalFrames;
        setFrameIndex(next);
      } else {
        setAngle(startAngleRef.current + (dx / width) * 360);
      }
    },
    [dragging, hasFrames, totalFrames],
  );

  const onPointerUp = useCallback(() => setDragging(false), []);

  const reset = () => {
    setHasInteracted(false);
    setAutoSpin(true);
    setFrameIndex(0);
    setAngle(0);
  };

  const goFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  const renderedIndex = Math.floor(frameIndex) % totalFrames;
  const progress = hasFrames ? Math.round((loaded / totalFrames) * 100) : 100;
  const ready = !hasFrames || loaded >= Math.min(totalFrames, 6);

  return (
    <div
      ref={wrapRef}
      className="group relative aspect-[4/5] w-full select-none overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "none" }}
    >
      {/* Studio backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(255,255,255,0.06), transparent 60%), radial-gradient(ellipse 80% 30% at 50% 95%, rgba(255,0,46,0.18), transparent 70%)",
        }}
      />

      {/* Frame stack (only mounted when in view) */}
      {inView && hasFrames && frames ? (
        <div className="absolute inset-0 flex items-center justify-center">
          {frames.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={i === 0 ? alt : ""}
              aria-hidden={i !== renderedIndex}
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain p-6 transition-opacity duration-75"
              style={{ opacity: i === renderedIndex ? 1 : 0 }}
            />
          ))}
        </div>
      ) : (
        // Fallback: CSS 3D rotateY on hero image
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "1400px" }}
        >
          <img
            src={image}
            alt={alt}
            draggable={false}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            style={{
              transform: `rotateY(${angle}deg)`,
              transformStyle: "preserve-3d",
              transition: dragging ? "none" : "transform 200ms cubic-bezier(.2,.7,.2,1)",
              willChange: "transform",
            }}
          />
        </div>
      )}

      {/* Loading veil */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3 text-xs uppercase tracking-[0.28em] text-white/80">
            <div className="relative h-12 w-12">
              <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <circle
                  cx="18" cy="18" r="16" fill="none"
                  stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round"
                  strokeDasharray={`${(progress / 100) * 100.5} 100.5`}
                />
              </svg>
            </div>
            Loading 360° · {progress}%
          </div>
        </div>
      )}

      {/* Badge */}
      {badge && (
        <span className="absolute left-5 top-5 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_8px_24px_-8px_rgba(255,0,46,0.7)]">
          {badge}
        </span>
      )}

      {/* 360° pill */}
      <div className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
        <RotateCw className="h-3 w-3" /> 360°
      </div>

      {/* Drag hint */}
      {!hasInteracted && ready && (
        <div className="pointer-events-none absolute inset-x-0 bottom-24 z-10 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/85 backdrop-blur-md animate-pulse">
            <MousePointer2 className="h-3 w-3" /> Drag to rotate
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 px-4">
        <div className="flex items-center gap-1 rounded-full border border-white/12 bg-black/45 p-1 backdrop-blur-md">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setAutoSpin((s) => !s); setHasInteracted(true); }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
            aria-label={autoSpin ? "Pause rotation" : "Auto-rotate"}
          >
            {autoSpin && !hasInteracted ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); reset(); }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
            aria-label="Reset rotation"
          >
            <RotateCw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goFullscreen(); }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/90 transition hover:bg-white/10"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          {hasFrames && (
            <span className="ml-1 mr-3 font-mono text-[10px] tracking-[0.18em] text-white/70">
              {String(renderedIndex + 1).padStart(2, "0")} / {String(totalFrames).padStart(2, "0")}
            </span>
          )}
        </div>
      </div>

      {/* Scrub progress */}
      {hasFrames && (
        <div className="absolute inset-x-6 bottom-2 z-10 h-px overflow-hidden bg-white/10">
          <div
            className="h-full bg-[var(--crimson)]"
            style={{ width: `${((renderedIndex + 1) / totalFrames) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}
