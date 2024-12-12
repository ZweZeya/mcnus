export const Text = (props: React.PropsWithChildren) => {
    return (
        <p className="text-xl">{props.children}</p>
    )
}

export const Title = (props: React.PropsWithChildren) => {
    return (
        <p className="font-extrabold text-7xl">
            {props.children}
        </p>
    )
}

export const Header = (props: React.PropsWithChildren) => {
    return (
        <div className="font-extrabold text-4xl">{props.children}</div>
    )
}
