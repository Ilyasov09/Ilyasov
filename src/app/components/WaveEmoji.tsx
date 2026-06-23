import { useRef, useState, useCallback, useEffect } from "react";

// Particle colors cycling through cyan/violet palette
const PARTICLE_COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#22d3ee",
  "#a78bfa",
  "#67e8f9",
  "#c4b5fd",
  "#f59e0b",
  "#10b981",
];

interface Particle {
  id: number;
  color: string;
  dx: string;
  dy: string;
}

let particleCounter = 0;

function spawnParticles(): Particle[] {
  const count = 8;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360;
    const rad = (angle * Math.PI) / 180;
    const dist = 24 + Math.random() * 20;
    const dx = `${(Math.cos(rad) * dist).toFixed(1)}px`;
    const dy = `${(Math.sin(rad) * dist).toFixed(1)}px`;
    return {
      id: particleCounter++,
      color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
      dx,
      dy,
    };
  });
}

interface WaveEmojiProps {
  /** The emoji character, e.g. "👋" or "🎵" */
  emoji: string;
  size?: number;
  className?: string;
}

/**
 * WaveEmoji — renders any emoji as an iPhone-style Twemoji image.
 * On hover: bounce animation + colour-shift + ping ring + colour particles.
 */
export default function WaveEmoji({ emoji, size = 32, className = "" }: WaveEmojiProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isBouncing, setIsBouncing] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showPing, setShowPing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build Twemoji image URL from the emoji codepoint(s)
  const getTwemojiUrl = (emojiChar: string): string => {
    const codePoints = Array.from(emojiChar)
      .map((c) => c.codePointAt(0)!.toString(16))
      .filter((cp) => cp !== "fe0f") // strip variation selector
      .join("-");
    return `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15/assets/svg/${codePoints}.svg`;
  };

  // If the SVG fails (unknown emoji), fall back to native text
  const [useFallback, setUseFallback] = useState(false);

  const url = getTwemojiUrl(emoji);

  const triggerAnimation = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setIsBouncing(false);
    setShowPing(false);
    setParticles([]);

    // Needs a tiny frame so re-triggering re-starts the animation
    requestAnimationFrame(() => {
      setIsBouncing(true);
      setShowPing(true);
      setParticles(spawnParticles());

      timeoutRef.current = setTimeout(() => {
        setIsBouncing(false);
        setShowPing(false);
        setParticles([]);
      }, 650);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      ref={wrapRef}
      className={`emoji-wrapper${isBouncing ? " is-bouncing" : ""} ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
      onMouseEnter={triggerAnimation}
      onClick={triggerAnimation}
      role="img"
      aria-label={emoji}
    >
      {useFallback ? (
        <span style={{ fontSize: size }}>{emoji}</span>
      ) : (
        <img
          ref={imgRef}
          src={url}
          alt={emoji}
          draggable={false}
          onError={() => setUseFallback(true)}
          style={{
            width: size,
            height: size,
            display: "inline-block",
            verticalAlign: "middle",
            userSelect: "none",
          }}
        />
      )}

      {/* Ping ring */}
      {showPing && <span className="ping-ring" />}

      {/* Colour particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={
            {
              background: p.color,
              "--dx": p.dx,
              "--dy": p.dy,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
