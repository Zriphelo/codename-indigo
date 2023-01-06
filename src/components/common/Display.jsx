const Display = (props) => {
    return (
        <div className={"p-3 bg-indigo-200/80 rounded-2xl text-center text-slate-800 m-4 border-double border-8 border-indigo-400/80 " + props.className}>
            <h2 className={"text-lg " + props.titlec}>
                {props.title}
            </h2>
            { props.children }
        </div>
    )
}

export default Display;