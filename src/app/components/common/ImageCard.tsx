import Image from "next/image";
import ContentBox from "./ContentBox";

const ImageCard: React.FC<{
    image: string, 
    title: string, 
    content: string, 
    isImageOnRight?: boolean
}> = ({image, title, content, isImageOnRight}) => {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 my-16">
            {!isImageOnRight && <Image src={image} alt="hero" width={500} height={500} objectFit="cover" />}
            
            <ContentBox title={title} content={content} />

            {isImageOnRight && <Image className="ml-auto" src={image} alt="hero" width={500} height={500} objectFit="cover" />}
        </div>
    )
}

export default ImageCard;