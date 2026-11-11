"use client"

import ColouredContentBox from "../common/ColouredContentBox";
import S from "@/app/resources/strings/constantStrings";
import ExcoMemberCard from './ExcoMemberCard';
import { ExcoMember } from '@/model/exco';
import { useEffect, useMemo, useRef, useState } from 'react';
import EntranceAnimation from "../common/EntranceAnimation";
import { isNotEmptyString } from "@/utils/validators";
import { balancedRowSizes, toBalancedRows } from "@/utils/balancedRows";
import { assignBubbleSides, type BubbleState } from "@/utils/bubbleSides";

// Card width / horizontal gap; narrow containers (phones) use compact cards so two fit per row.
const REGULAR = { cardWidth: 176, gap: 32 };
const COMPACT = { cardWidth: 144, gap: 16 };
const COMPACT_BELOW = 520;
const DEFAULT_MAX_PER_ROW = 5;

// How often captions are re-rolled, and the chance that a member with a caption is "speaking" each time.
const CAPTION_TICK_MS = 1500;
const CAPTION_SHOW_CHANCE = 0.4;
// Photos in the first rows are above the fold on most screens, so load them eagerly.
const EAGER_IMAGE_COUNT = 6;

// The member list arrives with the page (rendered on the server), so photos start downloading
// immediately. Captions are shuffled here in the browser - no API calls.
const ExcoGrid: React.FC<{ members: ExcoMember[] }> = ({ members }) => {
    const [maxPerRow, setMaxPerRow] = useState<number>(DEFAULT_MAX_PER_ROW);
    const [sizing, setSizing] = useState(REGULAR);
    const [bubbles, setBubbles] = useState<BubbleState[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    // Latest values for the caption timer (which lives inside a long-running interval).
    const maxPerRowRef = useRef(DEFAULT_MAX_PER_ROW);
    const bubblesRef = useRef<BubbleState[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (document.hidden) return;

            // Which avatars are speaking, and on which side, without bubbles overlapping neighbours.
            const rowOf: number[] = [];
            balancedRowSizes(members.length, maxPerRowRef.current).forEach((size, row) => {
                for (let k = 0; k < size; k++) rowOf.push(row);
            });
            // Below the `sm` breakpoint bubbles are centred above each avatar, so they can't clash.
            const avoidOverlap = window.matchMedia("(min-width: 640px)").matches;
            const wanted = members.map(m => isNotEmptyString(m.caption) && Math.random() < CAPTION_SHOW_CHANCE);
            const nextBubbles = assignBubbleSides(wanted, bubblesRef.current, rowOf, avoidOverlap);
            bubblesRef.current = nextBubbles;
            setBubbles(nextBubbles);
        }, CAPTION_TICK_MS)

        return () => clearInterval(interval)
    }, [members])

    // How many cards fit on one line at the current container width.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const update = () => {
            const next = el.clientWidth < COMPACT_BELOW ? COMPACT : REGULAR;
            const fit = Math.floor((el.clientWidth + next.gap) / (next.cardWidth + next.gap));
            const perRow = Math.max(1, fit);
            maxPerRowRef.current = perRow;
            setSizing(next);
            setMaxPerRow(perRow);
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, [])

    const rows = useMemo(() => toBalancedRows(members, maxPerRow), [members, maxPerRow]);

    return (
        <ColouredContentBox className="w-full text-center" title={S.executiveCommittee}>
            <div ref={containerRef} className="w-full h-full flex flex-col items-center gap-y-10 pt-8">
                { rows.map((row, r) => {
                    const startIndex = rows.slice(0, r).reduce((sum, prev) => sum + prev.length, 0);
                    return (
                        <div key={r} className="flex justify-center" style={{ columnGap: sizing.gap }}>
                            { row.map((e, i) => (
                                <div key={e.name} style={{ width: sizing.cardWidth }}>
                                    <EntranceAnimation delay={Math.min(startIndex + i, 5) * 0.06}>
                                        <ExcoMemberCard member={e} bubble={bubbles[startIndex + i]} preload={startIndex + i < EAGER_IMAGE_COUNT} />
                                    </EntranceAnimation>
                                </div>
                            )) }
                        </div>
                    )
                }) }
            </div>
        </ColouredContentBox>
    )
}

export default ExcoGrid;
