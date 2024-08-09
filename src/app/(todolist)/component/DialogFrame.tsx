import ReactDOM from "react-dom"

export default function DialogFrame({ children, onConfirm, onCancle }: {
    children: React.ReactNode,
    onConfirm?: () => void,
    onCancle?: () => void
}) {
    return (
        <>
            <div className=" absolute h-screen w-screen bg-black bg-opacity-30 top-0 left-0">
                <div className=" pl-2 bg-background rounded-lg anima-fadein flex flex-col justify-between absolute outline outline-pink-400 w-96  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div>
                        <div className=" flex justify-end"><div className=" bg-red-300">close</div></div>
                        <div className=" p-3">{children}</div>
                    </div>

                    <div><button onClick={onConfirm}>好</button><button onClick={onCancle}>取消</button></div>
                </div>
            </div>
        </>
    )
}