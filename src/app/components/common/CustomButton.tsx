import { navy, white } from "@/app/utils/colors"
import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react"

interface ButtonProps extends PropsWithChildren {
    className?: string
    style?: CSSProperties
    onClick: MouseEventHandler
    isSelected?: boolean
    disabled?: boolean
}

const CustomButton: React.FC<ButtonProps> = (props) => {
    return (
        <button 
            style={{
                color: props.isSelected ? white : navy,
                backgroundColor: props.isSelected ? navy : white,
                ...props.style
            }} 
            disabled={props.disabled}
            className={`${props.className} px-4 py-2 rounded-lg font-medium transition`} 
            onClick={props.onClick}
        >
            { props.children }
        </button>
    )
}

export default CustomButton