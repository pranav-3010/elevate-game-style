import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="cursor-glow hidden lg:block"
      style={{ left: pos.x, top: pos.y, opacity: visible ? 1 : 0 }}
    />
  );
}
