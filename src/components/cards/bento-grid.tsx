"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  title: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  const colSpanClasses = {
    1: "md:col-span-1",
    2: "md:col-span-2",
    3: "md:col-span-3",
  };

  const rowSpanClasses = {
    1: "md:row-span-1",
    2: "md:row-span-2",
  };

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 overflow-hidden",
        "hover:border-zinc-700 transition-colors duration-300",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header content (image, animation, etc.) */}
      {header && (
        <div className="mb-4 rounded-lg overflow-hidden">{header}</div>
      )}

      {/* Icon */}
      {icon && <div className="mb-4 text-zinc-400 group-hover:text-zinc-300 transition-colors">{icon}</div>}

      {/* Title */}
      <h3 className="font-bold text-lg text-zinc-100 mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
          {description}
        </p>
      )}
    </motion.div>
  );
}

// Feature card variant
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index?: number;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  index = 0,
  className,
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative rounded-2xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8",
        "hover:border-zinc-700/50 transition-all duration-500",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Top shine */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      {/* Icon */}
      {icon && (
        <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 text-purple-400 group-hover:text-purple-300 transition-colors">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
        {description}
      </p>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent group-hover:via-purple-500/50 transition-colors duration-500" />
    </motion.div>
  );
}
