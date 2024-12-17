import { frangipani } from "@/app/utils/colors";
import { FaInstagram, FaTelegram, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import FooterItem from "./FooterItem";
import Logo from "../Logo";
import S from "@/app/utils/constantString";

const Footer = () => {
    return (
        <div className="flex items-center py-4 px-6 mt-auto justify-center" style={{backgroundColor: frangipani, height: "7vh"}}>
            <div className="hidden md:inline">
                <Logo size={40} />
            </div>
            <div className="flex gap-x-5 md:ml-auto">
                <FooterItem icon={<FaInstagram size={30} />} to={S.instagramLink}/>
                <FooterItem icon={<FaTelegram size={30} />} to={S.telegramLink} />
                <FooterItem icon={<FaLinkedin size={30} />} to={S.linkedinLink} />
                <FooterItem icon={<FaFacebook size={30} />} to={S.facebookLink} />
                <FooterItem icon={<FaYoutube size={30} />} to={S.youtubeLink} />
            </div>
        </div>
    );
}

export default Footer;