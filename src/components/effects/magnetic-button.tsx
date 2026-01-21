"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// =============================================================================
// Magnetic Button - Physics-based cursor attraction
// =============================================================================
// Unlike generic magnetic effects, this uses actual spring physics
// with configurable mass and tension for organic movement

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  mass?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  mass = 0.5,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mass affects how "heavy" the button feels
  const springConfig = { stiffness: 150 * (1 / mass), damping: 15 * mass, mass };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Inner content moves opposite direction for depth
  const innerX = useTransform(springX, (v) => v * -0.3);
  const innerY = useTransform(springY, (v) => v * -0.3);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 bg-white text-black font-medium rounded-lg overflow-hidden",
        className
      )}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span className="relative z-10 block" style={{ x: innerX, y: innerY }}>
        {children}
      </motion.span>
    </motion.button>
  );
}

// =============================================================================
// Morph Button - Shape morphs on interaction
// =============================================================================
// The button physically transforms its shape, not just animates content

interface MorphButtonProps {
  children: React.ReactNode;
  className?: string;
  morphTo?: "circle" | "pill" | "square";
  onClick?: () => void;
}

export function MorphButton({
  children,
  className,
  morphTo = "circle",
  onClick,
}: MorphButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const morphVariants = {
    pill: { borderRadius: "9999px", scaleX: 1.1, scaleY: 0.95 },
    circle: { borderRadius: "50%", scaleX: 1, scaleY: 1, aspectRatio: "1/1" },
    square: { borderRadius: "8px", scaleX: 1.05, scaleY: 1.05 },
  };

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-zinc-900 text-white font-medium overflow-hidden",
        className
      )}
      initial={{ borderRadius: "12px" }}
      animate={isHovered ? morphVariants[morphTo] : { borderRadius: "12px", scaleX: 1, scaleY: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Fluid Button - Liquid/blob that follows cursor inside button
// =============================================================================
// Not a sweep effect - an actual blob that tracks mouse position

interface FluidButtonProps {
  children: React.ReactNode;
  className?: string;
  fluidColor?: string;
  onClick?: () => void;
}

export function FluidButton({
  children,
  className,
  fluidColor = "rgba(255,255,255,0.15)",
  onClick,
}: FluidButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative px-8 py-4 bg-zinc-900 text-white font-medium rounded-xl overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* Fluid blob */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: fluidColor,
          filter: "blur(20px)",
          x: mousePos.x - 60,
          y: mousePos.y - 60,
        }}
        animate={{
          scale: isInside ? 1 : 0,
          opacity: isInside ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Split Button - Text splits and reveals on hover
// =============================================================================
// Characters physically separate to reveal secondary layer

interface SplitButtonProps {
  children: string;
  revealText?: string;
  className?: string;
  onClick?: () => void;
}

export function SplitButton({
  children,
  revealText,
  className,
  onClick,
}: SplitButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const chars = children.split("");
  const reveal = revealText || children;

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-black text-white font-medium rounded-lg overflow-hidden border border-zinc-800",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Original text that splits apart */}
      <span className="relative z-10 flex justify-center overflow-hidden">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{
              y: isHovered ? (i % 2 === 0 ? -30 : 30) : 0,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>

      {/* Revealed text */}
      <motion.span
        className="absolute inset-0 flex items-center justify-center text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {reveal}
      </motion.span>
    </motion.button>
  );
}

// =============================================================================
// Gravity Button - Elements fall when not hovered
// =============================================================================
// Letters have physics and "fall" when mouse leaves

interface GravityButtonProps {
  children: string;
  className?: string;
  onClick?: () => void;
}

export function GravityButton({
  children,
  className,
  onClick,
}: GravityButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const chars = children.split("");

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-white text-black font-medium rounded-lg overflow-hidden h-14",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="flex justify-center items-center h-full">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{
              y: isHovered ? 0 : 40 + Math.random() * 20,
              rotate: isHovered ? 0 : (Math.random() - 0.5) * 30,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: isHovered ? i * 0.03 : (chars.length - i) * 0.02,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.button>
  );
}

// =============================================================================
// Outline Draw Button - Border draws itself on hover
// =============================================================================
// SVG path animation draws the border progressively

interface OutlineDrawButtonProps {
  children: React.ReactNode;
  className?: string;
  strokeColor?: string;
  onClick?: () => void;
}

export function OutlineDrawButton({
  children,
  className,
  strokeColor = "white",
  onClick,
}: OutlineDrawButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 text-white font-medium bg-transparent",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* SVG border that draws */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="8"
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Depth Button - 3D depth with parallax layers
// =============================================================================
// Multiple layers create actual depth perception

interface DepthButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DepthButton({
  children,
  className,
  onClick,
}: DepthButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateY(x * 20);
    setRotateX(-y * 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.button
      ref={ref}
      className={cn("relative px-8 py-4 font-medium", className)}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative"
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back layer */}
        <div
          className="absolute inset-0 bg-zinc-800 rounded-xl"
          style={{ transform: "translateZ(-10px)" }}
        />
        {/* Middle layer */}
        <div
          className="absolute inset-0 bg-zinc-700 rounded-xl"
          style={{ transform: "translateZ(-5px)" }}
        />
        {/* Front layer */}
        <div
          className="relative bg-zinc-900 text-white rounded-xl px-8 py-4"
          style={{ transform: "translateZ(0px)" }}
        >
          {children}
        </div>
      </motion.div>
    </motion.button>
  );
}

// =============================================================================
// Ripple Button - Organic ripple from click point
// =============================================================================
// Not a Material Design ripple - organic, physics-based expansion

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  onClick?: () => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function RippleButton({
  children,
  className,
  rippleColor = "rgba(255,255,255,0.3)",
  onClick,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
    onClick?.();
  };

  return (
    <button
      ref={ref}
      className={cn(
        "relative px-8 py-4 bg-zinc-900 text-white font-medium rounded-xl overflow-hidden",
        className
      )}
      onClick={handleClick}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              background: rippleColor,
              transformOrigin: "center",
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ width: 400, height: 400, x: -200, y: -200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

// =============================================================================
// Scramble Button - Text scrambles through characters
// =============================================================================
// Not a simple text swap - actual character-by-character scramble

interface ScrambleButtonProps {
  children: string;
  className?: string;
  onClick?: () => void;
}

export function ScrambleButton({
  children,
  className,
  onClick,
}: ScrambleButtonProps) {
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";

  const scramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    let iteration = 0;
    const originalChars = children.split("");

    const interval = setInterval(() => {
      setDisplayText(
        originalChars
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return children[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= children.length) {
        clearInterval(interval);
        setDisplayText(children);
        setIsAnimating(false);
      }
    }, 30);
  }, [children, isAnimating, chars]);

  const unscramble = useCallback(() => {
    setDisplayText(children);
    setIsAnimating(false);
  }, [children]);

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-black text-white font-mono font-medium rounded-lg border border-zinc-700",
        className
      )}
      onMouseEnter={scramble}
      onMouseLeave={unscramble}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 tracking-wider">{displayText}</span>
    </motion.button>
  );
}

// =============================================================================
// Elastic Button - Stretches and snaps back
// =============================================================================
// Actual elastic physics, not just scale

interface ElasticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ElasticButton({
  children,
  className,
  onClick,
}: ElasticButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className={cn(
        "relative px-8 py-4 bg-white text-black font-medium rounded-full",
        className
      )}
      animate={{
        scaleX: isPressed ? 1.2 : 1,
        scaleY: isPressed ? 0.85 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 15,
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// =============================================================================
// Border Flow Button - Animated gradient border that flows
// =============================================================================
// Conic gradient animation, not the standard linear gradient border

interface BorderFlowButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function BorderFlowButton({
  children,
  className,
  onClick,
}: BorderFlowButtonProps) {
  return (
    <motion.button
      className={cn("relative p-[2px] rounded-xl group", className)}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated conic gradient border */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "conic-gradient(from 0deg, #ff0080, #7928ca, #ff0080)",
          animation: "spin 3s linear infinite",
        }}
      />
      <div
        className="absolute inset-[1px] rounded-xl bg-black"
      />
      <span className="relative z-10 block px-8 py-4 text-white font-medium">
        {children}
      </span>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.button>
  );
}

// =============================================================================
// Invert Button - Colors invert on hover with clip path
// =============================================================================
// Clip-path reveal, not opacity transition

interface InvertButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function InvertButton({
  children,
  className,
  onClick,
}: InvertButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn("relative px-8 py-4 font-medium rounded-lg overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Default state */}
      <span className="relative z-10 text-white">{children}</span>
      <div className="absolute inset-0 bg-zinc-900" />

      {/* Inverted state with clip */}
      <motion.div
        className="absolute inset-0 bg-white flex items-center justify-center"
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{
          clipPath: isHovered ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="text-black font-medium">{children}</span>
      </motion.div>
    </motion.button>
  );
}
