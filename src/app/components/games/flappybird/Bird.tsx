interface BirdParams {
    x: number,
    y: number
}

export const BIRD_HEIGHT = 1.5;
export const BIRD_WIDTH = 1.5;

const Bird = ({ params }: { params: BirdParams }) => {
    return (
        <div className="bg-black absolute" 
            style={{left: `${params.x}rem`, 
            bottom: `${params.y}rem`,
            height: `${BIRD_HEIGHT}rem`,
            width: `${BIRD_WIDTH}rem`
        }
        }></div>
    )
}

export default Bird