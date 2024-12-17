interface ResponsiveGridInterface extends React.PropsWithChildren {
    className?: string
}

const ResponsiveGrid = (props: ResponsiveGridInterface) => {
    const { children, className = "" } = props;

    return (
        <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-12 my-16 ${className}`}>
            {children}
        </div>
    )
}

export default ResponsiveGrid