"use client"

import { navy, white } from "@/app/resources/colors"
import { CSSProperties, MouseEventHandler, PropsWithChildren, useState } from "react"

interface ButtonProps extends PropsWithChildren {
    className?: string
    style?: CSSProperties
    onClick?: MouseEventHandler<HTMLButtonElement>
    isSelected?: boolean
    disabled?: boolean
}

interface Ripple {
    x: number
    y: number
    size: number
}

const CustomButton: React.FC<ButtonProps> = (props) => {
    const [ripple, setRipple] = useState<Ripple | null>(null);

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        const button = event.currentTarget
        const rect = button.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height) * 2

        setRipple({
            x: event.clientX - rect.left - size / 2,
            y: event.clientY - rect.top - size / 2,
            size,
        })

        props.onClick?.(event)
    }

    return (
        <button 
            style={{
                color: props.isSelected ? white : navy,
                backgroundColor: props.isSelected ? navy : white,
                ...props.style
            }} 
            disabled={props.disabled}
            className={`${props.className} px-4 py-2 rounded-lg font-medium transition relative overflow-hidden`} 
            onClick={handleClick}
        >
            { props.children }
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
        </button>
    )
}

export default CustomButton