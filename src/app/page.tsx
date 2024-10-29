import Image from "next/image";

export default function Home() {
    return (
        <div className="flex justify-center my-4">
            <div className="overflow-hidden border border-transparent rounded-[85px]">
                <Image src="/hero.jpg" alt="hero" width="1350" height="1350" objectFit="cover" />
            </div>
        </div>
    );
}
