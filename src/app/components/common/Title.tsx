const Title = (props: React.PropsWithChildren) => {
    return (
        <p className="font-extrabold text-7xl">
            {props.children}
        </p>
    )
}

export default Title;