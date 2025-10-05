import { motion } from 'motion/react'
import { useState } from 'react'

const Toggle = () => {
    const [position, setPosition] = useState('left')
    return (
        <div 
        className='w-full h-full bg-[#85bf78] rounded-xl relative p-2 flex'
        style={{
            flexDirection : position === 'left' ? 'row' : 'row-reverse'
        }}
        >
            <div className='absolute cursor-pointer h-full w-full flex justify-between font-semibold text-amber-50 p-2 text-2xl items-center left-0 top-0 z-10'
            >
                <p className='h-fit w-[50%] flex justify-center' onClick={() => setPosition('left')}>
                    General
                </p>
                <p className='h-fit w-[50%] flex justify-center' onClick={() => setPosition('right')}>
                    Doctor
                </p>
            </div>
            <motion.div 
            className='bg-[#339c25] h-full w-[50%] rounded-lg z-0'
            layout
            >

            </motion.div>
        </div>
    )
}

export default Toggle