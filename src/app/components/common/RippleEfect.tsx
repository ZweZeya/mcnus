"use client"

import { useState, MouseEventHandler, PropsWithChildren, CSSProperties } from "react"

interface Ripple {
    x: number
    y: number
    size: number
}

export interface RippleEffectProps extends PropsWithChildren {
    className?: string
    style?: CSSProperties
    onClick?: MouseEventHandler
    rippleColor?: string
}

const RippleEffect: React.FC<RippleEffectProps> = ({
    children,
    className,
    style,
    onClick,
    rippleColor = "rgba(0, 0, 0, 0.2)",
}) => {
    const [ripple, setRipple] = useState<Ripple | null>(null);

    const handlePointerDown = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        const element = event.currentTarget
        const rect = element.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height) * 2

        setRipple({
            x: event.clientX - rect.left - size / 2,
            y: event.clientY - rect.top - size / 2,
            size,
        })
    }

    return (
        <div
            className={`relative overflow-hidden bg-transparent ${className ?? ""}`}
            style={style}
            onPointerDown={handlePointerDown}
            onClick={onClick}
        >
            {children}
            {ripple && (
                <span
                    key={`${ripple.x}-${ripple.y}`}
                    className="absolute rounded-full bg-black/20 pointer-events-none animate-ripple"
                    style={{
                        width: ripple.size,
                        height: ripple.size,
                        left: ripple.x,
                        top: ripple.y,
                        backgroundColor: rippleColor,
                    }}
                    onAnimationEnd={() => setRipple(null)}
                />
            )}
        </div>
    )
}

export default RippleEffect;