import { navy, white } from "@/app/resources/colors"
import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react"
import RippleEffect from "./RippleEfect"

interface ButtonProps extends PropsWithChildren {
    className?: string
    style?: CSSProperties
    onClick?: MouseEventHandler<HTMLButtonElement>
    isSelected?: boolean
    disabled?: boolean
}

const CustomButton: React.FC<ButtonProps> = (props) => {
    return (
        <RippleEffect className={props.className} onClick={props.onClick}>
            <button 
                style={{
                    color: props.isSelected ? white : navy,
                    backgroundColor: props.isSelected ? navy : white,
                    ...props.style
                }} 
                disabled={props.disabled}
                className={`${props.className} px-4 py-2 rounded-lg font-medium transition`} 
            >
                { props.children }
            </button>
        </RippleEffect>
    )
}

export default CustomButton