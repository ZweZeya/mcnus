"use client"
import { useState, useEffect } from "react";

type Coordinates = {
    x: number,
    y: number,
    vx: number
    vy: number
}

const Box = () => {
    const [position, setPosition] = useState<Coordinates>({x: 0, y: 10, vx: 0, vy: 0});

    useEffect(() => {
        const t = 0.05;
        const g = -9.81 * 3;
        const intervalId = setInterval(() => {
            setPosition(prev => {
                const new_vy = prev.vy + t * g;
                const new_y = prev.y + prev.vy * t + 0.5 * g * t * t
                return {x: prev.x, y: Math.max(0, new_y), vx: prev.vx, vy: new_vy}
            })
        }, t * 1000);

        const moveHorizontally = (amount: number) => {
            setPosition(prev => {
                return {x: Math.max(0, prev.x + amount), y: prev.y, vx: prev.vx, vy: prev.vy}
            })
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'a' || event.key === 'A') {
                moveHorizontally(-20)
            } else if (event.key === 'd' || event.key === 'D') {
                moveHorizontally(20)
            } 
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [])

    const jump = () => {
        if (position.y > 0) return

        setPosition(prev => {
            return {x: prev.x, y: 3, vx: prev.vx, vy: 0}
        })
    }

    return (
        <div className="bg-blue-100 h-[32rem] w-64 relative" onClick={jump}>
            <div className="bg-black h-[2rem] w-[2rem] absolute" style={{left: position.x, bottom: position.y}}></div>
        </div>
    )
}

export default Box;