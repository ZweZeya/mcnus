import { grey } from "@/app/utils/colors";

const ColouredBox = (props: React.PropsWithChildren) => {
    return (
        <div className="p-5 rounded-2xl" style={{backgroundColor: grey}}>{props.children}</div>
    )
}

export default ColouredBox;