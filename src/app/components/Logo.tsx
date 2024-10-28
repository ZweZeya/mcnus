import Image from 'next/image'

const Logo: React.FC<{size: number}> = ({size}) => {
    return (
        <div>
            <Image src="/lion.png" alt="lion" width={size} height={size} />
        </div>
    )
}

export default Logo;