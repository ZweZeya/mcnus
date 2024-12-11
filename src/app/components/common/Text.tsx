const Text = (props: React.PropsWithChildren) => {
    return (
        <p className="text-xl">{props.children}</p>
    )
}

export default Text;