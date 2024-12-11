const Header = (props: React.PropsWithChildren) => {
    return (
        <div className="font-extrabold text-4xl">{props.children}</div>
    )
}

export default Header;