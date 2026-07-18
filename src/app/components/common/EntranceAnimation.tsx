"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

interface EntranceAnimationProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  distance?: number;
}

// Reveal for page sections and list items. 
const EntranceAnimation = ({
  children,
  className = "",
  delay = 0,
  distance = 18,
}: EntranceAnimationProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.55,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
};

export default EntranceAnimation;
