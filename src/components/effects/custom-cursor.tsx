"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  className?: string;
  variant?: "dot" | "ring" | "blend" | "trail";
  color?: string;
  size?: number;
}

export function CustomCursor({
  className,
  variant = "dot",
  color = "#8B5CF6",
  size = 20,
}: CustomCursorProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (variant === "dot") {
    return (
      <>
        {/* Main dot */}
        <motion.div
          className={cn(
            "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference",
            className
          )}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: isHovering ? size * 2 : size,
            height: isHovering ? size * 2 : size,
            backgroundColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </>
    );
  }

  if (variant === "ring") {
    return (
      <>
        {/* Center dot */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
          style={{
            x: cursorX,
            y: cursorY,
            width: 8,
            height: 8,
            backgroundColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
        {/* Outer ring */}
        <motion.div
          className={cn(
            "fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2",
            className
          )}
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            width: isHovering ? size * 2.5 : size * 1.5,
            height: isHovering ? size * 2.5 : size * 1.5,
            borderColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </>
    );
  }

  if (variant === "blend") {
    return (
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-exclusion",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? size * 4 : size * 2,
          height: isHovering ? size * 4 : size * 2,
          backgroundColor: "#ffffff",
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    );
  }

  return null;
}

// Cursor trail effect
export function CursorTrail({
  color = "#8B5CF6",
  trailLength = 10,
}: {
  color?: string;
  trailLength?: number;
}) {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTrail((prev) => [
        ...prev.slice(-trailLength + 1),
        { x: e.clientX, y: e.clientY, id: idCounter.current++ },
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [trailLength]);

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{
            x: point.x,
            y: point.y,
            width: 10 - index * 0.5,
            height: 10 - index * 0.5,
            backgroundColor: color,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      ))}
    </>
  );
}

// Spotlight cursor
export function SpotlightCursor({ size = 300 }: { size?: number }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9997] transition-opacity duration-300"
      style={{
        background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, transparent, rgba(0, 0, 0, 0.8))`,
      }}
    />
  );
}
