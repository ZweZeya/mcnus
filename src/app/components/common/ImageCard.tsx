import Image from "next/image";
import ContentBox from "./ContentBox";
import ResponsiveGrid from "./ResponsiveGrid";

const ImageCard: React.FC<{
    image: string, 
    title: string, 
    content: string, 
    isImageOnRight?: boolean
}> = ({image, title, content, isImageOnRight}) => {
    
    return (
        <ResponsiveGrid className="place-items-center md:place-items-start md:items-center">
            {!isImageOnRight && <Image src={image} alt="hero" width={500} height={500} objectFit="cover" />}
            
            <ContentBox title={title} content={content} />

            {isImageOnRight && <Image className="ml-auto" src={image} alt="hero" width={500} height={500} objectFit="cover" />}
        </ResponsiveGrid>
    )
}

export default ImageCard;