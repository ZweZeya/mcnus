interface BirdParams {
    x: number,
    y: number
}

const Bird = ({ params }: { params: BirdParams }) => {
    return (
        <div className="bg-black h-[1.5rem] w-[1.5rem] absolute" 
            style={{left: `${params.x}rem`, bottom: `${params.y}rem`}}></div>
    )
}

export default Bird