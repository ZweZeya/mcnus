export const TextSm = (props: React.PropsWithChildren) => {
    return (
        <p className="text-sm">{props.children}</p>
    )
}

export const Text = (props: React.PropsWithChildren) => {
    return (
        <p className="text-sm md:text-lg xl:text-xl">{props.children}</p>
    )
}

export const Title = (props: React.PropsWithChildren) => {
    return (
        <p className="font-extrabold text-2xl md:text-4xl xl:text-7xl">
            {props.children}
        </p>
    )
}

export const Header = (props: React.PropsWithChildren) => {
    return (
        <div className="font-extrabold text-xl md-text-2xl xl:text-4xl">{props.children}</div>
    )
}
