import Image from "next/image";
import ContentBox from "./ContentBox";

const ImageCard: React.FC<{
    image: string, 
    title: string, 
    content: string, 
    isImageOnRight?: boolean
}> = ({image, title, content, isImageOnRight}) => {

    const imageElement = <div>
            <Image src={image} alt="hero" width={500} height={500} objectFit="cover" />
        </div>
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {!isImageOnRight && imageElement}
            
            <ContentBox title={title} content={content} />

            {isImageOnRight && imageElement}
        </div>
    )
}

export default ImageCard;