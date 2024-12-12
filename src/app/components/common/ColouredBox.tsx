import { grey } from "@/app/utils/colors";

interface ColouredBoxProps extends React.PropsWithChildren {
    className?: string;
}

const ColouredBox = (props: ColouredBoxProps) => {
    const { children, className } = props;

    return (
        <div className={`p-5 rounded-2xl ${className}`} style={{backgroundColor: grey}}>{children}</div>
    )
}

export default ColouredBox;