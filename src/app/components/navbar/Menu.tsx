"use client"

import { useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useNavigate } from "../common/NavigationLoader";
import S from "@/app/resources/strings/constantStrings";
import { frangipani, navy } from "../../resources/colors"

export interface MenuItem {
    name: string;
    to: string
}

const PANEL_BG = "#FFF8EC";

// Three bars that morph into an "X" while the menu is open.
const HamburgerIcon: React.FC<{ isOpen: boolean; reduceMotion: boolean }> = ({ isOpen, reduceMotion }) => {
    const transition = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 500, damping: 34 };
    const bar = "absolute left-0 block h-[2.5px] w-full rounded-full";

    return (
        <span className="relative block h-5 w-6" aria-hidden>
            <motion.span
                className={bar}
                style={{ backgroundColor: navy, top: 1 }}
                animate={isOpen ? { y: 7.75, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={transition}
            />
            <motion.span
                className={bar}
                style={{ backgroundColor: navy, top: "50%", marginTop: -1.25 }}
                animate={isOpen ? { opacity: 0, scaleX: 0.3 } : { opacity: 1, scaleX: 1 }}
                transition={transition}
            />
            <motion.span
                className={bar}
                style={{ backgroundColor: navy, bottom: 1 }}
                animate={isOpen ? { y: -7.75, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={transition}
            />
        </span>
    );
};

const Menu: React.FC<{items: MenuItem[]}> = ({items}) => {
    const navigate = useNavigate();
    const pathname = usePathname();
    const reduceMotion = useReducedMotion() ?? false;
    const [open, setOpen] = useState(false);

    const panelVariants: Variants = {
        hidden: reduceMotion
            ? { opacity: 0, transition: { duration: 0 } }
            : { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.14, ease: "easeIn", when: "afterChildren" } },
        show: reduceMotion
            ? { opacity: 1, transition: { duration: 0 } }
            : {
                opacity: 1, scale: 1, y: 0,
                transition: { type: "spring", stiffness: 520, damping: 32, mass: 0.8, staggerChildren: 0.045, delayChildren: 0.04 },
            },
    };

    const itemVariants: Variants = {
        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12, transition: { duration: 0.1 } },
        show: reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, transition: { type: "spring", stiffness: 520, damping: 34 } },
    };

    return (
        <DropdownMenuPrimitive.Root open={open} onOpenChange={setOpen} modal={false}>
            <DropdownMenuPrimitive.Trigger asChild>
                <button
                    type="button"
                    aria-label={S.menu}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full outline-none transition-colors duration-150 hover:bg-white/40 focus-visible:ring-2 focus-visible:ring-[#093653]/60 data-[state=open]:bg-white/40"
                >
                    <HamburgerIcon isOpen={open} reduceMotion={reduceMotion} />
                </button>
            </DropdownMenuPrimitive.Trigger>

            <DropdownMenuPrimitive.Portal forceMount>
                <AnimatePresence>
                    {open && (
                        <DropdownMenuPrimitive.Content forceMount asChild align="end" sideOffset={8} collisionPadding={12}>
                            <motion.div
                                className="relative z-50 min-w-52 rounded-2xl p-2 outline-none"
                                style={{
                                    backgroundColor: PANEL_BG,
                                    color: navy,
                                    boxShadow: "0 12px 32px rgba(9, 54, 83, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.7)",
                                    transformOrigin: "var(--radix-dropdown-menu-content-transform-origin)",
                                }}
                                variants={panelVariants}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                            >
                                <motion.div variants={itemVariants} className="px-3 pb-1 pt-1.5 text-xs font-semibold uppercase tracking-wider opacity-60">
                                    {S.menu}
                                </motion.div>
                                {items.map(item => {
                                    const isActive = pathname === item.to;
                                    return (
                                        <DropdownMenuPrimitive.Item
                                            key={item.to}
                                            asChild
                                            onSelect={() => navigate.push(item.to)}
                                        >
                                            <motion.div
                                                variants={itemVariants}
                                                className="cursor-pointer select-none rounded-full px-4 py-2 text-[15px] font-medium outline-none transition-colors duration-150 data-[highlighted]:bg-[#ECBA6F]/35"
                                                style={isActive ? { backgroundColor: frangipani } : undefined}
                                                aria-current={isActive ? "page" : undefined}
                                            >
                                                {item.name}
                                            </motion.div>
                                        </DropdownMenuPrimitive.Item>
                                    );
                                })}
                            </motion.div>
                        </DropdownMenuPrimitive.Content>
                    )}
                </AnimatePresence>
            </DropdownMenuPrimitive.Portal>
        </DropdownMenuPrimitive.Root>
    )
}

export default Menu;
