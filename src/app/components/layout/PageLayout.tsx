const PageLayout = (props: React.PropsWithChildren) => {
    return (
        <div className="flex flex-col items-center py-8 px-40">
            {props.children}
        </div>
    )
}

export default PageLayout;