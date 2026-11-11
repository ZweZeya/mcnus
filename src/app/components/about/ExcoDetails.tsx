import { promises as fs } from 'fs';
import path from 'path';
import { ExcoMember } from '@/model/exco';
import ExcoGrid from './ExcoGrid';

// Photos are cached for a long time (see images.minimumCacheTTL in next.config.mjs), so tag each
// one with its file's last-modified time. Replacing a photo in /public then changes its URL and
// everyone gets the new one - no renaming needed.
const withVersion = async (image: string): Promise<string> => {
    try {
        const { mtimeMs } = await fs.stat(path.join(process.cwd(), 'public', image));
        return `${image}?v=${Math.floor(mtimeMs)}`;
    } catch {
        return image;
    }
}

// Server component: reads the exco list at build/render time so the page ships with the members
// (and starts loading their photos) straight away.
const ExcoDetails = async () => {
    const file = await fs.readFile(path.join(process.cwd(), 'src/data/exco.json'), 'utf8');
    const data: ExcoMember[] = JSON.parse(file);
    const members = await Promise.all(data.map(async m => ({ ...m, image: await withVersion(m.image) })));

    return <ExcoGrid members={members} />
}

export default ExcoDetails;
