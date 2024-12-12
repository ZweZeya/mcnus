import React from "react";
import ColouredBox from "./ColouredBox";
import { Header} from "./textComponents";

interface ColouredContentBoxProps extends React.PropsWithChildren {
    title: string
}

const ColouredContentBox = (props: ColouredContentBoxProps) => {
    return (
        <ColouredBox>
            <Header>{props.title}</Header>
            <div className="mt-4">{props.children}</div>
        </ColouredBox>
    )
}

export default ColouredContentBox;