import { Title, Text } from "./textComponents";

const ContentBox: React.FC<{title: string, content: string, contentStyle?: React.CSSProperties}> = ({title, content, contentStyle}) => {
    return (
        <div className="text-center flex flex-col gap-0.5 md:gap-3 mb-6">
            <Title>{title}</Title>
            <Text style={contentStyle}>{content}</Text>
        </div>
    )
}

export default ContentBox;