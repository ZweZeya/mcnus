const PageLayout = (props: React.PropsWithChildren) => {
    return (
        <div className="flex flex-col items-center py-8" style={{height: "86vh"}}>
            {props.children}
        </div>
    )
}

export default PageLayout;