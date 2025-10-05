import React, { useEffect, useState } from 'react'
import Icons from '../constants/Icons'
import crying_emoji from '../images/crying-face-svgrepo-com.svg'
import disappoint_emoji from '../images/disappointed-face-svgrepo-com.svg'
import smiling_heart_emoji from '../images/smiling-face-with-heart-eyes-svgrepo-com.svg'
import smiling_emoji from '../images/smiling-face-with-smiling-eyes-svgrepo-com.svg'
import { motion } from 'motion/react'


const StatusBar = () => {
    const [emojiArr, setEmojiArr] = useState(
        [
            crying_emoji, smiling_emoji, smiling_heart_emoji
        ]
    )
    const range = [
        0.2, 0.8, 1
    ]
    const highest = 1
    const result = 0.9

    return (
        <div className='h-fit w-full p-[1.1rem] bg-[#d9f7d0] rounded-2xl shadow-md'>
            <div className='grid grid-cols-2 gap-2.5 w-[40%] mb-[2.5rem]'>
                {
                    range.map((item, i) => (
                        <div className='w-fit flex gap-2 items-center bg-[#fffae5] p-1.5 rounded-2xl' key={i}>
                            <img src={emojiArr[i]} alt="emoji" className='h-[2.5rem] w-[2.5rem]' />
                            <p className='text-lg font-semibold text-[#246740]'>
                                {
                                    item
                                }
                                &nbsp;
                                lakh
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className='h-[1rem] px-1 mb-1.5'>
                <div className='h-full relative text-[1.1rem] font-semibold'>
                    {
                        range.map((value, i) => (
                            <div
                                className='flex flex-row-reverse absolute bottom-0 left-0 w-fit'
                                key={i}
                                style={i === 0 ? { width: 'fit-content' } : { width: `${(value / highest) * 100}%` }}
                            >
                                <img src={emojiArr[i]} alt="" className='h-[2.5rem] w-[2.5rem]' />
                            </div>
                        ))
                    }
                    <div
                        className='absolute flex flex-row-reverse bottom-0 left-0'
                        style={{ width: `${(result / highest) * 100}%` }}
                    >
                        <div className='h-[2rem] min-w-[2.5rem] max-w-fit bg-[#F2994A] rounded-sm border-2 border-amber-700 relative text-amber-700 text-[0.9rem]'>
                            <span className='block text-center'>
                                {
                                    result
                                }
                            </span>
                            <span className='absolute triangle-down top-[115%] -translate-y-[50%] left-[50%] -translate-x-[50%] scale-[0.2]'></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <div className='w-full bg-[#fffae5] rounded-full overflow-hidden border-2 border-[#246740]'>
                    <div
                        className='h-[2rem] rounded-full flex flex-row-reverse items-center px-3 bg-amber-400'
                        style={{ width: `${(result / highest) * 100}%` }}
                    >
                    </div>
                </div>
            </div>
        </div>
    )
}


const DonationComponent = () => {
    return (
        <div className='absolute top-0 left-0 h-fit w-full flex justify-center items-center py-[7rem]'>
            <div className='min-h-[30rem] w-[70%] bg-amber-50 shadow-2xl rounded-2xl p-7 flex flex-col gap-[2.5rem]'>
                <h1 className='text-4xl font-semibold text-[#85bf78] text-center'>
                    Donate for a good cause
                </h1>
                <div className='flex flex-col gap-[2rem]'>
                    <div className='w-fit flex gap-2.5 px-2.5 py-2 rounded-full bg-[#add9a2] justify-center items-center'>
                        <img src={Icons.test_tube} alt="test_tube" className='h-[2rem]' />
                        <h2 className='text-amber-50 text-2xl font-semibold'>
                            Currrent tests
                        </h2>
                    </div>
                    <h1 className='text-8xl font-bold text-center text-shadow text-[#5ca64f]'>
                        90,000
                    </h1>
                </div>
                <div className='flex flex-col gap-[2rem]'>
                    <div className='w-fit flex gap-2.5 px-2.5 py-2 rounded-full bg-[#add9a2] justify-center items-center'>
                        <img src={Icons.test_tube} alt="test_tube" className='h-[2rem]' />
                        <h2 className='text-amber-50 text-2xl font-semibold'>
                            Currrent Donations
                        </h2>
                    </div>
                    <div>
                        <StatusBar />
                    </div>
                </div>
                <div className='h-[10rem] flex justify-center items-center'>
                    <motion.button
                        type='button'
                        className='w-fit bg-[#339c25] text-2xl font-bold text-[#fffae5] px-[2.5rem] py-[0.8rem] rounded-lg shadow-xl cursor-pointer relative'
                        whileTap={{ scale: 0.9 }}
                        // onClick={() => { navigate('/healthProtal') }}
                    // style={!isSendingFile && { filter : 'blur(3px)'}}
                    >
                        <p>
                            Donate Now ?
                        </p>
                    </motion.button>
                </div>
            </div>

        </div>
    )
}

export default DonationComponent