import { Title, Text } from "./textComponents";

const ContentBox: React.FC<{title: string, content: string}> = ({title, content}) => {
    return (
        <div className="text-center flex flex-col gap-3 mb-6">
            <Title>{title}</Title>
            <Text>{content}</Text>
        </div>
    )
}

export default ContentBox;