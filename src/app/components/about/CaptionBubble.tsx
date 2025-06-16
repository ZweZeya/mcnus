import { black, white } from "@/app/utils/colors"
import { TextExSm } from "../common/textComponents"
import clsx from "clsx"

const CaptionBubble: React.FC<{ caption: string; isVisible: boolean }> = ({ caption, isVisible }) => {
    return (
        <div
            style={{
                backgroundColor: white,
                color: black,
                border: `1px solid ${black}`,
            }}
            className={clsx(
                "absolute z-[2] px-1 rounded bottom-[70px] transition-opacity duration-700",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            <TextExSm>{caption}</TextExSm>
        </div>
    )
}

export default CaptionBubble
