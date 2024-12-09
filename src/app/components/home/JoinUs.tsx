import Title from "../common/Title";
import S from "@/app/utils/constantString";
import { Button } from "@/components/ui/button"

const JoinUs = () => {
    return (
        <div className="flex flex-col items-center gap-5 mt-7">
            <Title>{S.bePartOf}</Title>
            <p className="text-lg text-center">
                {S.bePartOfDescription}
            </p>
            <Button>{S.joinUs}</Button>
        </div>
    )
}

export default JoinUs;