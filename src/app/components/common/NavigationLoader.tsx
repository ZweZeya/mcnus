"use client";

import { createContext, Suspense, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Loading, { LoadingWarmup } from "./Loading";

// Don't flash the loader for navigations that finish almost instantly.
const SHOW_AFTER_MS = 150;
// Safety net: never leave the loader up if a navigation silently never completes.
const GIVE_UP_AFTER_MS = 15000;

type NavigationContextValue = { begin: (href?: string) => void };
const NavigationContext = createContext<NavigationContextValue>({ begin: () => {} });

// Hides the loader once the route (path or query string) has actually changed.
const RouteChangeWatcher = ({ onChange }: { onChange: () => void }) => {
    const pathname = usePathname();
    const search = useSearchParams().toString();

    useEffect(() => {
        onChange();
    }, [pathname, search, onChange]);

    return null;
};

/**
 * Shows the Among Us loader over the page while a navigation is in flight.
 * - `<a>` / `<Link>` clicks are picked up automatically.
 * - Programmatic navigation should go through `useNavigate()` below.
 */
export const NavigationProvider = ({ children }: React.PropsWithChildren) => {
    const [isVisible, setVisible] = useState(false);
    const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const giveUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimers = () => {
        if (showTimer.current) clearTimeout(showTimer.current);
        if (giveUpTimer.current) clearTimeout(giveUpTimer.current);
        showTimer.current = null;
        giveUpTimer.current = null;
    };

    const end = useCallback(() => {
        clearTimers();
        setVisible(false);
    }, []);

    const begin = useCallback((href?: string) => {
        if (href) {
            const target = new URL(href, window.location.href);
            const isSameUrl = target.pathname === window.location.pathname && target.search === window.location.search;
            if (target.origin !== window.location.origin || isSameUrl) return;
        }
        clearTimers();
        showTimer.current = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
        giveUpTimer.current = setTimeout(end, GIVE_UP_AFTER_MS);
    }, [end]);

    // Capture phase: Next's <Link> calls preventDefault in its own handler, so listen before it.
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;
            begin(anchor.href);
        };
        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, [begin]);

    useEffect(() => clearTimers, []);

    const value = useMemo(() => ({ begin }), [begin]);

    return (
        <NavigationContext.Provider value={value}>
            <Suspense fallback={null}>
                <RouteChangeWatcher onChange={end} />
            </Suspense>
            {children}
            <LoadingWarmup />
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key="navigation-loader"
                        role="status"
                        aria-live="polite"
                        aria-label="Loading"
                        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex items-center justify-center backdrop-blur-[2px]"
                        style={{ top: "7vh", backgroundColor: "rgba(251, 244, 231, 0.78)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                    >
                        <Loading />
                    </motion.div>
                )}
            </AnimatePresence>
        </NavigationContext.Provider>
    );
};

// Drop-in replacement for router.push / router.replace that also shows the loader.
export const useNavigate = () => {
    const router = useRouter();
    const { begin } = useContext(NavigationContext);

    return useMemo(() => ({
        push: (href: string, options?: Parameters<typeof router.push>[1]) => {
            begin(href);
            router.push(href, options);
        },
        replace: (href: string, options?: Parameters<typeof router.replace>[1]) => {
            begin(href);
            router.replace(href, options);
        },
    }), [router, begin]);
};
