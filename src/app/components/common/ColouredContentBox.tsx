import React from "react";
import ColouredBox from "./ColouredBox";
import { Header} from "./textComponents";

interface ColouredContentBoxProps extends React.PropsWithChildren {
    title?: string;
    className?: string;
    style?: React.CSSProperties
}

const ColouredContentBox = (props: ColouredContentBoxProps) => {
    const { title, className = "", style } = props;

    return (
        <ColouredBox className={className} style={style}>
            {title && <Header>{title}</Header>}
            <div className="mt-1 md:mt-3 xl:mt-4">{props.children}</div>
        </ColouredBox>
    )
}

export default ColouredContentBox;