import { promises as fs } from "fs";
import path from "path";
import RoleCard, { Role } from "./RoleCard";
import S from "@/app/resources/strings/constantStrings";

const Roles = async () => {
    const filePath = path.join(process.cwd(), "src/data/roles.json");
    const file = await fs.readFile(filePath, "utf8");
    const roles: Role[] = JSON.parse(file);

    return (
        <section className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{S.availableRoles}</h2>
            <div className="flex flex-wrap justify-center gap-x-20 gap-y-6">
                {roles.map((role, index) => (
                    <RoleCard key={index} role={role} />
                ))}
            </div>
        </section>
    );
};

export default Roles;