import { useActionState, useEffect, useRef } from "react";
import DialogFrame from "../DialogFrame";
import { add_lists } from "@/lib/action";

export default function AddListDialog({ onConfirm, onCancle }:
    {
        onConfirm: () => void,
        onCancle: () => void
    }) {
    const form = useRef<HTMLFormElement>(null)
    const [state,action,panding] = useActionState(add_lists,{message:''})
    function handleConfirm() {
        form.current?.requestSubmit()
    }
    useEffect(() => {
        if(state.message == 'ok'){
            onConfirm()
        }
    },[state])
    return (
        <DialogFrame onCancle={onCancle} onConfirm={handleConfirm}>
            <form ref={form} action={action}>
                列表名：<input type="text" name="list_name" className=" w-48" placeholder="列表名" />
            </form>
        </DialogFrame>
    )
}