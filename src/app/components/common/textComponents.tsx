interface TextProps extends React.PropsWithChildren {
    className?: string
    style?: React.CSSProperties
}


export const TextExSm = (props: TextProps) => {
    return (
        <p className={`${props.className} text-xs md:text-base`} style={props.style}>
            {props.children}
        </p>
    )
}

export const TextSm = (props: TextProps) => {
    return (
        <p className={`${props.className} text-sm md:text-base`} style={props.style}>
            {props.children}
        </p>
    )
}

export const TextMd = (props: TextProps) => {
    return (
        <p className={`${props.className} text-base md:text-lg`} style={props.style}>
            {props.children}
        </p>
    )
}

export const Text = (props: TextProps) => {
    return (
        <p className={`${props.className} text-sm md:text-lg xl:text-xl`} style={props.style}>{props.children}</p>
    )
}

export const Title = (props: TextProps) => {
    return (
        <p className={`${props.className} font-extrabold text-2xl md:text-4xl xl:text-7xl`} style={props.style}>
            {props.children}
        </p>
    )
}

export const Header = (props: TextProps) => {
    return (
        <div className={`${props.className} font-extrabold text-xl md-text-2xl xl:text-4xl`} style={props.style}>{props.children}</div>
    )
}
