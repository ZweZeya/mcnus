const PageLayout = (props: React.PropsWithChildren) => {
    return (
        <div className="flex flex-col items-center py-8 px-3 md:px-20 xl:px-32">
            {props.children}
        </div>
    )
}

export default PageLayout;