export type Position = {
    x: number,
    y: number,
    vx: number
    vy: number
}

export default class Gravity {
    private static acceleration = -9.81 * 3;

    private constructor() {}

    public static act(position: Position, t: number): Position {
        const new_vy = position.vy + t * Gravity.acceleration;
        const new_y = position.y + position.vy * t + 0.5 * Gravity.acceleration * t * t
        return {x: position.x, y: Math.max(0, new_y), vx: position.vx, vy: new_vy}
    }
}