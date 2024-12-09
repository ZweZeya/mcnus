const PageLayout = (props: React.PropsWithChildren) => {
    return (
        <div className="flex flex-col items-center py-8 px-8">
            <div className="w-5/6">
                {props.children}
            </div>
        </div>
    )
}

export default PageLayout;