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
}

const RippleEffect: React.FC<RippleEffectProps> = ({
    children,
    className,
    style,
    onClick,
}) => {
    const [ripple, setRipple] = useState<Ripple | null>(null);

    const handleClick: MouseEventHandler = (event) => {
        const element = event.currentTarget as HTMLElement
        const rect = element.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height) * 2

        setRipple({
            x: event.clientX - rect.left - size / 2,
            y: event.clientY - rect.top - size / 2,
            size,
        })

        onClick?.(event)
    }

    return (
        <div
            className={`relative overflow-hidden ${className ?? ""}`}
            style={style}
            onClick={handleClick}
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
                    }}
                    onAnimationEnd={() => setRipple(null)}
                />
            )}
        </div>
    )
}

export default RippleEffect;