import Image from 'next/image'

const Logo: React.FC<{ size: number; className?: string }> = ({ size, className = "" }) => {
    return (
        <div className={className}>
            <Image src="/logo.png" alt="logo" width={size} height={size} />
        </div>
    )
}

export default Logo;