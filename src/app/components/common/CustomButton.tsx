import { navy, white } from "@/app/resources/colors"
import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react"
import RippleEffect from "./RippleEfect"

type ButtonTheme =
    | "default"
    | "primary"

const buttonThemes: Record<ButtonTheme, {
    color: string
    backgroundColor: string
}> = {
    default: {
        color: navy,
        backgroundColor: white,
    },

    primary: {
        color: white,
        backgroundColor: navy,
    },
}
interface ButtonProps extends PropsWithChildren {
    className?: string
    style?: CSSProperties
    onClick?: MouseEventHandler<HTMLButtonElement>
    theme?: ButtonTheme
    isSelected?: boolean
    disabled?: boolean
}

const CustomButton: React.FC<ButtonProps> = ({
    children,
    className,
    style,
    onClick,
    theme = "default",
    isSelected,
    disabled
}) => {
    const themeStyle = buttonThemes[theme]
    const buttonStyle = {
        ...themeStyle,
        ...(isSelected && {
            color: white,
            backgroundColor: navy
        }),
        ...style
    }
    return (
        <RippleEffect className="rounded-lg" onClick={onClick}>
            <button 
                style={buttonStyle}
                disabled={disabled}
                className={`${className} px-4 py-2 rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50`} 
            >
                { children }
            </button>
        </RippleEffect>
    )
}

export default CustomButton