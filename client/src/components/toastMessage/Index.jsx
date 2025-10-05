import { useEffect } from "react"
import { UseGlobalContext } from "../Context/Globalcontext"
import Error from "./Error"
import { AnimatePresence } from "motion/react"
import Success from "./Success"

const ToastWrapper = () => {
    const { showToast, toastBody } = UseGlobalContext()

    // useEffect(() => {
    //     console.log(showToast);
    //     console.log(toastBody)
    // }, [showToast])
    

    return (
        <div className='fixed top-0 right-0 h-[100svh] w-fit z-[999] overflow-hidden pointer-events-none' style={{ paddingBlock: '3rem', paddingInline: '2rem' }}>
            <ul className="flex flex-col-reverse gap-[1.5rem] h-full w-fit items-end">
                <AnimatePresence>
                    {
                        Object.entries(showToast).map(([key, value]) => (
                            value.toast === 'error'
                                ?
                                <Error key={key} identification={key} />
                                :
                                <Success key={key} identification={key}/>
                        ))
                    }
                </AnimatePresence>
            </ul>
        </div>
    )
}

export default ToastWrapper