"use client"
import { useState, useEffect, useRef } from "react";
import Bird from "./Bird";
import Gravity, { Position } from "./Gravity";
import Obstacle, { generateRandomGapHeight, OBSTACLE_WIDTH, ObstacleParams } from "./Obstacle";
import { checkCollision } from "./checkCollision";

const REFRESH_INTERVAL = 0.05
const OBSTACLE_GAP = 15
const OBSTACLE_COUNT = 5
const OBSTACLE_DELTA_X = 0.3
const FLY_DELTA_X = 2
const BACKGROUND_WIDTH = 50
export const BACKGROUND_HEIGHT = 32

const FlappyBird = () => {
    const [isGameOver, setGameOver] = useState(false);
    const [position, setPosition] = useState<Position>({x: 0, y: 16, vx: 0, vy: 0});
    const [obstacles, setObstacles] = useState<ObstacleParams[]>([])
    const birdPos = useRef(position);
    const obstaclesRef = useRef(obstacles);

    useEffect(() => {
        birdPos.current = position;
    }, [position])

    useEffect(() => {
        obstaclesRef.current = obstacles;
    }, [obstacles])

    useEffect(() => {
        const intervalId = setInterval(() => {
                if (!isGameOver) {
                    setPosition(prev => Gravity.act(prev, REFRESH_INTERVAL))

                    setObstacles(prev =>
                        prev.map(o => {
                            let newX = o.x - OBSTACLE_DELTA_X
                            let newGapHeight = o.gapHeight
                            if (newX <= -OBSTACLE_WIDTH) {
                                const maxX = Math.max(...prev.map(p => p.x))
                                newX = maxX + OBSTACLE_GAP
                                newGapHeight = generateRandomGapHeight()
                            }

                            const isVisible = newX < BACKGROUND_WIDTH
                            return { x: newX, isVisible: isVisible, gapHeight: newGapHeight }
                        })
                    )

                    obstaclesRef.current.forEach((obstacle) => {
                        if (checkCollision(birdPos.current, obstacle)) {
                            setGameOver(true);
                            console.log('collision');
                            return;
                        }
                    })
                }
        }, REFRESH_INTERVAL * 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isGameOver])

    useEffect(() => {
        setObstacles(() => {
            const initialObstacles: ObstacleParams[] = []
            for (let i = 0; i < OBSTACLE_COUNT; i++) {
                const x = (i + 1) * OBSTACLE_GAP
                const isVisible = x < BACKGROUND_WIDTH
                initialObstacles.push({ x: x, isVisible: isVisible, gapHeight: generateRandomGapHeight() })
            }
            return initialObstacles
        })
    }, [])

    const fly = () => {
        if (!isGameOver) {
            setPosition(prev => {
            return {x: prev.x, y: prev.y + FLY_DELTA_X, vx: prev.vx, vy: 0}
        })
        }
    }

    return (
        <>
        <div className="bg-blue-100 relative" 
            style={{
                height: `${BACKGROUND_HEIGHT}rem`, 
                width: `${BACKGROUND_WIDTH}rem`
            }}onClick={fly}>
            <Bird params={{x: position.x, y: position.y}} />

            <div className="h-full flex gap-[6rem]">
                { obstacles.map((o, i) => 
                    <Obstacle key={i} params={o} />) }
            </div>
        </div>
        </>
    )
}

export default FlappyBird;