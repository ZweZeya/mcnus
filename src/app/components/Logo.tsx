import Image from 'next/image'

const Logo: React.FC<{ width: number, height: number }> = ({ width, height }) => {
    return (
        <div>
            <Image src="/logo.png" alt="lion" width={width} height={height} />
        </div>
    )
}

export default Logo;