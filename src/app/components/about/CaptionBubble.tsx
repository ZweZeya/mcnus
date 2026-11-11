"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import clsx from "clsx"
import { navy, white } from "@/app/resources/colors"
import type { BubbleSide } from "@/utils/bubbleSides"

const BORDER = 2.5

// Comic-style speech bubble that "comes out of" an avatar. Sits at the avatar's top-right or
// top-left with the tail pointing down at the face; on small screens it centres above the avatar
// instead so it can never push past the page edge. Which side is chosen by the parent, so that
// neighbouring bubbles don't overlap (see utils/bubbleSides.ts).
const CaptionBubble: React.FC<{ caption: string; isVisible: boolean; side: BubbleSide }> = ({ caption, isVisible, side }) => {
    const reduceMotion = useReducedMotion()

    const isLeft = side === "left"

    return (
        <div
            aria-hidden={!isVisible}
            className={clsx(
                "pointer-events-none absolute z-20 -top-7 max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2",
                isLeft ? "right-[54%]" : "left-[54%]"
            )}
            style={{ filter: `drop-shadow(${isLeft ? -2 : 2}px 3px 0 rgba(9, 54, 83, 0.22))` }}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key="bubble"
                        className="relative"
                        style={{ transformOrigin: isLeft ? "80% 100%" : "20% 100%" }}
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.35, rotate: isLeft ? 8 : -8, y: 8 }}
                        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: isLeft ? 2 : -2, y: 0 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 4, transition: { duration: 0.16 } }}
                        transition={reduceMotion ? { duration: 0.15 } : { type: "spring", stiffness: 460, damping: 17, mass: 0.7 }}
                    >
                        <div
                            className="w-max max-w-[8rem] rounded-[18px] px-3 py-1.5 text-center text-[13px] font-semibold italic leading-tight"
                            style={{ backgroundColor: white, color: navy, border: `${BORDER}px solid ${navy}` }}
                        >
                            {caption}
                        </div>
                        {/* Tail: white fill hides the bubble's border where it joins; the open stroke draws the outline.
                            It's drawn leaning left and mirrored for the left-hand bubble. */}
                        <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            className={clsx(
                                "absolute overflow-visible max-sm:left-1/2 max-sm:right-auto max-sm:-ml-[8px]",
                                isLeft ? "right-4" : "left-4"
                            )}
                            style={{ top: "calc(100% - 2px)", transform: isLeft ? "scaleX(-1)" : undefined }}
                        >
                            <path d="M5 0 C 5.5 7.5, 6.5 12, 2 16 C 9 14.5, 12 8.5, 12.5 0 Z" fill={white} />
                            <path d="M5 0 C 5.5 7.5, 6.5 12, 2 16 C 9 14.5, 12 8.5, 12.5 0" stroke={navy} strokeWidth={BORDER} strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CaptionBubble
