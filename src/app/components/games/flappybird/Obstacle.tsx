import { BACKGROUND_HEIGHT } from "./FlappyBird";

export interface ObstacleParams {
    x: number,
    isVisible: boolean,
    gapHeight: number
}

export const OBSTACLE_WIDTH = 2;
const GAP_WIDTH = 6;

const Obstacle = ({params}: {params: ObstacleParams}) => {
    const topBarHeight = BACKGROUND_HEIGHT * params.gapHeight
    const bottomBarHeight = BACKGROUND_HEIGHT - GAP_WIDTH - topBarHeight
    return (
        <div className="h-full absolute flex bg-red-100">
            <div className="w-full bg-green-500 absolute" 
                style={{
                    left: `${params.x}rem`, 
                    top: 0,
                    width: `${OBSTACLE_WIDTH}rem`,
                    display: params.isVisible ? "block" : "none",
                    height: `${topBarHeight}rem`
                }}></div>
            <div className="h-2/5 w-full bg-green-500 absolute" 
                style={{
                    left: `${params.x}rem`, 
                    bottom: 0,
                    width: `${OBSTACLE_WIDTH}rem`,
                    display: params.isVisible ? "block" : "none",
                    height: `${bottomBarHeight}rem`
                }}></div>
        </div>
    )
}

export const generateRandomGapHeight = (): number => {
    return Math.random() * (BACKGROUND_HEIGHT - GAP_WIDTH) / BACKGROUND_HEIGHT
}

export default Obstacle