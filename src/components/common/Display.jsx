const Display = (props) => {
    return (
        <div className={"p-3 bg-indigo-400/20 rounded-3xl text-center my-4 border-8 border-indigo-200/80 border-double " + props.className}>
            <h2 className={"text-lg " + props.titlec}>
                {props.title}
            </h2>
            { props.children }
        </div>
    )
}

export default Display;