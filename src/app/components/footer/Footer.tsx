import { frangipani } from "@/app/utils/colors";
import { FaInstagram, FaTelegram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import FooterItem from "./FooterItem";
import Logo from "../Logo";
import S from "@/app/utils/constantString";
import { MenuItem } from "../navbar/Menu";
import FooterLink from "./FooterLink";

const Footer = () => {
    const menuItems: MenuItem[] = [
        { name: S.whoWeAre, to: "/about" },
        { name: S.joinUs, to: "/recruitment" },
    ];
    return (
        <div className="flex items-center py-4 px-6 mt-auto" style={{ backgroundColor: frangipani }}>
            {/* Left Portion */}
            <div className="flex-1 flex justify-center">
                <div className="flex flex-col text-left">
                    <div className="flex items-center mb-1">
                        <Logo size={40} />
                        <strong className="ml-2">MC@NUS</strong>
                    </div>
                    <p className="text-sm">
                        Myanmar Community @ National University of Singapore<br />
                        A community established by Myanmar Students in NUS for NUS networks.
                    </p>
                </div>
            </div>

            {/* Middle Portion */}
            <div className="flex-1 flex justify-center">
                <div className="flex flex-col text-center">
                    <h3 className="font-semibold">Quick Links</h3>
                    <ul className="text-sm space-y-1 mt-1">
                        {menuItems.map((e, i) => (
                            <li key={i}>
                                <FooterLink name={e.name} to={e.to} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Portion */}
            <div className="flex-1 flex justify-center">
                <div className="flex flex-col text-left">
                    <h3 className="font-semibold mb-2">Follow us</h3>
                    <div className="flex gap-x-5">
                        <FooterItem icon={<FaInstagram size={30} />} to={S.instagramLink} />
                        <FooterItem icon={<FaTelegram size={30} />} to={S.telegramLink} />
                        <FooterItem icon={<FaLinkedin size={30} />} to={S.linkedinLink} />
                        <FooterItem icon={<FaFacebook size={30} />} to={S.facebookLink} />
                        <FooterItem icon={<FaYoutube size={30} />} to={S.youtubeLink} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;