import S from "@/app/utils/constantString";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import ContentBox from "../common/ContentBox";

const JoinUs = () => {
    return (
        <div className="flex flex-col items-center gap-5 my-16">
            <ContentBox title={S.bePartOf} content={S.bePartOfDescription} />
            <Button className="font-extrabold drop-shadow-xl hover:bg-secondary" asChild>
                <Link href="/recruitment">{S.joinUs}</Link>
            </Button>
        </div>
    )
}

export default JoinUs;