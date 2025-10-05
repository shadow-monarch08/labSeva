import { useEffect, useState } from 'react'
import error from '../../images/error-svgrepo-com.svg'
import { UseGlobalContext } from '../Context/Globalcontext'
import { motion } from 'motion/react'

const Error = ({ identification }) => {
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
        className='h-fit w-fit min-w-[6rem] bg-red-200 flex gap-2 rounded-md items-center error bottom-bar overflow-hidden' 
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
            <img className='w-[1.5rem] h-[1.5rem]' src={error} alt="error" />

            <div className='text-red-400 font-sans text-[1.1rem]'>
                <span className='font-bold'>
                    {
                        toastBody.error[identification].title
                    }
                    &nbsp;
                </span>
                {
                    toastBody.error[identification].message
                }
            </div>
        </motion.li>
    )
}

export default Error