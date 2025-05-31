import Image from "next/image";
import { Text } from "../common/textComponents";

export interface Role {
    name: string;
    icon: string;
    description: string;
}

const RoleCard: React.FC<{ role: Role }> = ({ role }) => {
    return (
        <div className="w-[340px] h-40 px-4 py-3 bg-white rounded-xl shadow-md flex items-center gap-4">
            <div className="relative w-14 h-14 flex-shrink-0">
                <Image src={role.icon} alt={role.name} fill className="object-contain" />
            </div>
            <div className="text-left">
                <h3 className="text-base font-semibold text-gray-900 mb-1">{role.name}</h3>
                <Text className="text-sm text-gray-600">{role.description}</Text>
            </div>
        </div>
    );
};

export default RoleCard;