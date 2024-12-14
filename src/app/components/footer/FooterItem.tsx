import SelectableIcon from "../common/SelectableIcon";

const FooterItem: React.FC<{icon: React.ReactNode, to: string}> = ({icon, to}) => {
    return (
        <SelectableIcon>
            <a href={to} target="_blank">{icon}</a>
        </SelectableIcon>
    );
}

export default FooterItem;