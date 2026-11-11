"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { navy } from "../../resources/colors";
import type { MenuItem } from "./Menu";

const ACTIVE_PILL = "#FFF8EC";

const isActivePath = (pathname: string, to: string) =>
    pathname === to || (to !== "/" && pathname.startsWith(`${to}/`));

// Desktop nav. One "active" pill slides between links as the route changes,
// and a softer "hover" pill follows the cursor.
const NavLinks: React.FC<{ items: MenuItem[] }> = ({ items }) => {
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();
    const [hovered, setHovered] = useState<string | null>(null);

    const spring = reduceMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.8 };

    return (
        <LayoutGroup id="main-nav">
            <nav
                aria-label="Main"
                className="flex items-center gap-1"
                onMouseLeave={() => setHovered(null)}
            >
                {items.map(item => {
                    const isActive = isActivePath(pathname, item.to);
                    const isHovered = hovered === item.to && !isActive;

                    return (
                        <Link
                            key={item.to}
                            href={item.to}
                            aria-current={isActive ? "page" : undefined}
                            className="relative rounded-full px-4 py-1.5 text-[15px] font-medium outline-none transition-transform duration-150 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#093653]/60"
                            style={{ color: navy }}
                            onMouseEnter={() => setHovered(item.to)}
                            onFocus={() => setHovered(item.to)}
                            onBlur={() => setHovered(null)}
                        >
                            {isHovered && (
                                <motion.span
                                    layoutId="nav-hover-pill"
                                    className="absolute inset-0 rounded-full bg-white/40"
                                    transition={spring}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                />
                            )}
                            {isActive && (
                                <motion.span
                                    layoutId="nav-active-pill"
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        backgroundColor: ACTIVE_PILL,
                                        boxShadow: "0 2px 10px rgba(9, 54, 83, 0.18), inset 0 0 0 1px rgba(255, 255, 255, 0.6)",
                                    }}
                                    transition={spring}
                                />
                            )}
                            <span className="relative z-10">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </LayoutGroup>
    );
};

export default NavLinks;
