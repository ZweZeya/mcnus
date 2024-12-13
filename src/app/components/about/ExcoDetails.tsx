import { promises as fs } from 'fs';
import ColouredContentBox from "../common/ColouredContentBox";
import S from "@/app/utils/constantString";
import ExcoMemberCard, { ExcoMember } from './ExcoMemberCard';

const ExcoDetails = async ()  => {
    const filePath = process.cwd() + '/src/data/exco.json';
    const file = await fs.readFile(filePath, 'utf8');
    const data: ExcoMember[] = JSON.parse(file);
    
    const excoMembers = data.map((e, i) => <ExcoMemberCard key={i} member={e} />);

    return (
        <ColouredContentBox className="w-full text-center" title={S.executiveCommittee}>
            <div className="w-full h-full flex flex-wrap items-center justify-center gap-10">
                { excoMembers }
            </div>
        </ColouredContentBox>
    )
}

export default ExcoDetails;