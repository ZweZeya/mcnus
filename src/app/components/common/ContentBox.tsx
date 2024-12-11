import Title from "./Title";
import Text from "./Text";

const ContentBox: React.FC<{title: string, content: string}> = ({title, content}) => {
    return (
        <div className="text-center flex flex-col gap-3">
            <Title>{title}</Title>
            <Text>{content}</Text>
        </div>
    )
}

export default ContentBox;