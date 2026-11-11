/**
 * Split `items` into the fewest rows that fit `maxPerRow`, with row sizes as even as possible
 * (earlier rows get the extra item), so no row is left with a lone orphan.
 *
 *   6 items, max 5 -> [3, 3]      (not 5 + 1)
 *   7 items, max 5 -> [4, 3]
 *  11 items, max 5 -> [4, 4, 3]
 */
export const balancedRowSizes = (count: number, maxPerRow: number): number[] => {
    if (count <= 0) return [];
    const perRow = Math.max(1, Math.floor(maxPerRow));
    const rows = Math.ceil(count / perRow);
    const base = Math.floor(count / rows);
    const extra = count % rows;
    return Array.from({ length: rows }, (_, i) => (i < extra ? base + 1 : base));
};

export const toBalancedRows = <T>(items: T[], maxPerRow: number): T[][] => {
    let start = 0;
    return balancedRowSizes(items.length, maxPerRow).map(size => {
        const row = items.slice(start, start + size);
        start += size;
        return row;
    });
};
