export default function TagPage({params,searchParams}:
    {params:{tagnames:string[]},searchParams:{exceptTagnames:string|null}}) {
    return (
        <div>
            tag {params.tagnames&&params.tagnames.map(x=>{
                return <div key={x}>{ decodeURIComponent(x)}</div>
            })}
            {/* {searchParams.exceptTagnames?.split('#').map(x => <div key={x}>excep{x}</div>)}
             */}
             {searchParams.exceptTagnames?.split('-').map(x => <div key={x}>except{ (x)}</div>)}
        </div>
    )
}