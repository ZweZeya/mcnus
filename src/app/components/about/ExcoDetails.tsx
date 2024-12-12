import { promises as fs } from 'fs';
import ColouredContentBox from "../common/ColouredContentBox";
import S from "@/app/utils/constantString";

interface ExcoMember {
    name: string;
}

const ExcoDetails = async ()  => {
    const filePath = process.cwd() + '/src/data/exco.json';
    const file = await fs.readFile(filePath, 'utf8');
    const data: ExcoMember[] = JSON.parse(file);
    console.log(data);

    return (
        <ColouredContentBox className="w-full text-center" title={S.executiveCommittee}>

        </ColouredContentBox>
    )
}

export default ExcoDetails;