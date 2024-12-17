import React from "react";
import ColouredBox from "./ColouredBox";
import { Header} from "./textComponents";

interface ColouredContentBoxProps extends React.PropsWithChildren {
    title: string;
    className?: string;
}

const ColouredContentBox = (props: ColouredContentBoxProps) => {
    const { title, className = "" } = props;

    return (
        <ColouredBox className={className}>
            <Header>{title}</Header>
            <div className="mt-1 md:mt-3 xl:mt-4">{props.children}</div>
        </ColouredBox>
    )
}

export default ColouredContentBox;