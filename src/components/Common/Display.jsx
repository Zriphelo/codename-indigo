const Display = (props) => {
    return (
        <div className={"p-3 bg-indigo-200/80 rounded-2xl text-center text-slate-800 m-4 border-indigo-400/80 " + props.className}>
            <h2 className={"text-lg border-b-2 border-indigo-500/60 " + props.titlec}>
                {props.title}
            </h2>
            <div className="py-3">
                { props.children }
            </div>
        </div>
    )
}

export default Display;