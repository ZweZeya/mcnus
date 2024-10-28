const FooterItem: React.FC<{icon: React.ReactNode}> = ({icon}) => {
    return (
        <div className="cursor-pointer">
            {icon}
        </div>
    );
}

export default FooterItem;