import S from "@/app/utils/constantString";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import ContentBox from "../common/ContentBox";

const JoinUs = () => {
    return (
        <div className="flex flex-col items-center gap-5 mt-7">
            <ContentBox title={S.bePartOf} content={S.bePartOfDescription} />
            <Button asChild>
                <Link href="/recruitment">Login</Link>
            </Button>
        </div>
    )
}

export default JoinUs;