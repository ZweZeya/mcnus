import { frangipani } from "@/app/resources/colors";
import { FaInstagram, FaTelegram, FaWhatsapp, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import FooterItem from "./FooterItem";
import Logo from "../Logo";
import S from "@/app/resources/strings/constantStrings";
import { MenuItem } from "../navbar/Menu";
import FooterLink from "./FooterLink";

const Footer = () => {
    const menuItems: MenuItem[] = [
        { name: S.whoWeAre, to: "/about" },
        { name: S.joinUs, to: "/recruitment" },
    ];
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start py-6 px-4 sm:px-6 md:px-8 mt-auto gap-10 md:gap-0" style={{ backgroundColor: frangipani }}>
            {/* Left Portion */}
            <div className="flex-1 flex justify-center md:justify-start items-center md:items-start order-3 md:order-1">
                <div className="flex flex-row items-start gap-4">
                    <Logo size={100} className="hidden md:block -mt-5" />
                    <div className="text-center md:text-left text-sm leading-snug">
                        <h3 className="font-semibold mb-1">{S.aboutUs}</h3>
                        <p>{S.fullName}</p>
                        <p>{S.aboutUsDescription}</p>
                    </div>
                </div>
            </div>

            {/* Middle Portion */}
            <div className="flex-1 flex justify-center order-2 md:order-2">
                <div className="flex flex-col text-center w-full items-center mt-6 md:mt-0">
                    <h3 className="font-semibold">{S.quickLinks}</h3>
                    <ul className="text-sm space-y-1">
                        {menuItems.map((e, i) => (
                            <li key={i}>
                                <FooterLink name={e.name} to={e.to} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right Portion */}
            <div className="flex-1 flex justify-center md:justify-end pr-4 md:pr-8 order-1 md:order-3">
                <div className="flex flex-col text-center md:text-left">
                    <h3 className="font-semibold mb-2">{S.followUs}</h3>
                    <div className="flex gap-x-5">
                        <FooterItem icon={<FaInstagram size={30} />} to={S.instagramLink} />
                        <FooterItem icon={<FaTelegram size={30} />} to={S.telegramLink} />
                        <FooterItem icon={<FaWhatsapp size={30} />} to={S.whatsappLink} />
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