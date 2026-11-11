export type BubbleSide = "left" | "right";
export type BubbleState = { visible: boolean; side: BubbleSide };

/**
 * Decide which speech bubbles are shown and on which side, so that bubbles of neighbouring
 * avatars in the same row never overlap.
 *
 * A bubble on the RIGHT of avatar i reaches into the gap towards i+1, and a bubble on the LEFT of
 * avatar i+1 reaches back into that same gap - so that pair must not coexist. Every other
 * combination is safe.
 *
 * - Bubbles that are already showing (and still wanted) are never moved or hidden.
 * - A newly wanted bubble gets a random side among the ones that don't clash with a visible
 *   neighbour. If neither side is free it simply isn't shown this round.
 *
 * @param wanted       per avatar: should a caption be shown right now?
 * @param prev         previous result (same length, or shorter on first call)
 * @param rowOf        per avatar: index of the row it sits in (neighbours = same row, adjacent index)
 * @param avoidOverlap pass false when bubbles are centred above avatars (small screens): no clashes possible
 */
export const assignBubbleSides = (
    wanted: boolean[],
    prev: BubbleState[],
    rowOf: number[],
    avoidOverlap: boolean,
    random: () => number = Math.random,
): BubbleState[] => {
    const next: BubbleState[] = wanted.map((isWanted, i) =>
        isWanted && prev[i]?.visible ? prev[i] : { visible: false, side: prev[i]?.side ?? "right" }
    );

    // Random order so no avatar is systematically favoured when two neighbours appear together.
    const newcomers = wanted.map((_, i) => i).filter(i => wanted[i] && !next[i].visible);
    for (let k = newcomers.length - 1; k > 0; k--) {
        const j = Math.floor(random() * (k + 1));
        [newcomers[k], newcomers[j]] = [newcomers[j], newcomers[k]];
    }

    const clashes = (i: number, side: BubbleSide) => {
        const neighbour = side === "right" ? i + 1 : i - 1;
        const facing: BubbleSide = side === "right" ? "left" : "right";
        return (
            neighbour >= 0 && neighbour < next.length &&
            rowOf[neighbour] === rowOf[i] &&
            next[neighbour].visible && next[neighbour].side === facing
        );
    };

    for (const i of newcomers) {
        const order: BubbleSide[] = random() < 0.5 ? ["left", "right"] : ["right", "left"];
        const side = order.find(s => !avoidOverlap || !clashes(i, s));
        if (side) next[i] = { visible: true, side };
    }

    return next;
};
