import Image from "next/image";
import ContentBox from "./ContentBox";
import ResponsiveGrid from "./ResponsiveGrid";

const ImageCard: React.FC<{
    image: string, 
    title: string, 
    content: string, 
    isImageOnRight?: boolean
}> = ({image, title, content, isImageOnRight}) => {
    const itemPlacement = "place-items-center " + (isImageOnRight ? "md:place-items-end" : "md:place-items-start");

    return (
        <ResponsiveGrid className={`${itemPlacement} md:items-center`}>
            {!isImageOnRight && <Image src={image} alt="hero" width={500} height={500} objectFit="cover" />}
            
            <ContentBox title={title} content={content} />

            {isImageOnRight && <Image src={image} alt="hero" width={500} height={500} objectFit="cover" />}
        </ResponsiveGrid>
    )
}

export default ImageCard;