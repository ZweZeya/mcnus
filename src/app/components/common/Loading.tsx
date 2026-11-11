"use client"

import { useEffect, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const ANIMATION_SRC = "/amongus.lottie";

// Kept in memory once fetched, so showing the loader never has to wait on the network.
let cachedAnimation: ArrayBuffer | null = null;
let pendingFetch: Promise<ArrayBuffer | null> | null = null;

const fetchAnimation = () => {
    if (cachedAnimation) return Promise.resolve(cachedAnimation);
    pendingFetch ??= fetch(ANIMATION_SRC)
        .then(res => res.arrayBuffer())
        .then(buffer => (cachedAnimation = buffer))
        .catch(() => null)
        .finally(() => { pendingFetch = null; });
    return pendingFetch;
};

// The explicit size keeps the canvas from ever measuring 0x0 before layout settles.
const Loading = ({ className = "w-40 h-40" }: { className?: string }) => {
    return (
        <div className={className}>
            <DotLottieReact
                {...(cachedAnimation ? { data: cachedAnimation } : { src: ANIMATION_SRC })}
                loop
                autoplay
            />
        </div>
    )
}

// Mount once near the top of the app. Downloads the animation file and the player's
// WebAssembly runtime in the background (via a tiny, paused, invisible instance) so the
// loader appears instantly even on a slow connection.
export const LoadingWarmup = () => {
    const [data, setData] = useState<ArrayBuffer | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => { fetchAnimation().then(setData); }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (!data) return null;

    return (
        <div aria-hidden className="pointer-events-none fixed left-0 top-0 h-2 w-2 overflow-hidden opacity-0">
            <DotLottieReact data={data} autoplay={false} />
        </div>
    );
}

export default Loading
