import { frangipani } from "@/app/utils/colors";
import { FaInstagram, FaTelegram, FaLinkedin } from "react-icons/fa";
import FooterItem from "./FooterItem";
import Logo from "../Logo";

const Footer = () => {
    return (
        <div className="flex items-center py-4 px-6 mt-auto" style={{backgroundColor: frangipani, height: "7vh"}}>
            <Logo size={40} />
            <div className="flex gap-x-5 ml-auto">
                <FooterItem icon={<FaInstagram size={30} />} />
                <FooterItem icon={<FaTelegram size={30} />} />
                <FooterItem icon={<FaLinkedin size={30} />} />
            </div>
        </div>
    );
}

export default Footer;