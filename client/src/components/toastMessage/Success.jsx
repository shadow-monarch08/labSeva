import { useEffect } from 'react'
import success from '../../images/success-filled-svgrepo-com.svg'
import { UseGlobalContext } from '../Context/Globalcontext'
import { motion } from 'motion/react'

const Success = ({ identification }) => {
    const { setShowToast, toastBody, setToastBody } = UseGlobalContext()

    useEffect(() => {
        const id = setTimeout(() => {
            setShowToast(prev => {
                const updatedState = { ...prev };
                delete updatedState[identification]
                return updatedState
            })
        }, 7500);

          return () => {
            clearTimeout(id);
          }
    }, [])

    return (
        <motion.li 
        className='h-fit w-fit min-w-[6rem] bg-[#A8CD89] flex gap-2 rounded-md items-center success bottom-bar overflow-hidden' 
        style={{ paddingInline: '0.7rem', paddingBlock: '0.5rem' }}
        initial={{
            opacity : 0,
            x : 50
        }}
        animate={{
            opacity: 1,
            x: 0
        }}
        exit={{
            x: 50,
            opacity : 0
        }}
        layout
        >
            <img className='w-[1.5rem] h-[1.5rem]' src={success} alt="error" />

            <div className='text-[#3E7B27] font-sans text-[1.1rem]'>
                <span className='font-bold'>
                    {
                        toastBody.success[identification].title
                    }
                    &nbsp;
                </span>
                {
                    toastBody.success[identification].message
                }
            </div>
        </motion.li>
    )
}

export default Success