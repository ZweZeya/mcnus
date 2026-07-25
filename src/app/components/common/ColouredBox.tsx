import { grey } from "@/app/resources/colors";

interface ColouredBoxProps extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties
}

const ColouredBox = (props: ColouredBoxProps) => {
    const { children, className, style } = props;

    return (
        <div className={`p-4 rounded-2xl ${className}`} style={{backgroundColor: grey, ...style}}>{children}</div>
    )
}

export default ColouredBox;