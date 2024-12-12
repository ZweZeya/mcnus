const ResponsiveGrid = (props: React.PropsWithChildren) => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-12 my-16">
            {props.children}
        </div>
    )
}

export default ResponsiveGrid