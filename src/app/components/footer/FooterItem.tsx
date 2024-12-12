const FooterItem: React.FC<{icon: React.ReactNode, to: string}> = ({icon, to}) => {
    return (
        <div className="cursor-pointer">
            <a href={to} target="_blank">{icon}</a>
        </div>
    );
}

export default FooterItem;