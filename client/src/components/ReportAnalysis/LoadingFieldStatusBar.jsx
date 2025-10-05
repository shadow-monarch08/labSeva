import React from 'react'
import test_tube from '../../images/test-tube-7-svgrepo-com.svg'
import graph from '../../images/graph-svgrepo-com.svg'
import smiling_emoji from '../../images/smiling-face-with-smiling-eyes-svgrepo-com.svg'
import smiling_heart_emoji from '../../images/smiling-face-with-heart-eyes-svgrepo-com.svg'
import disappoint_emoji from '../../images/disappointed-face-svgrepo-com.svg'
import crying_emoji from '../../images/crying-face-svgrepo-com.svg'
import note from '../../images/note-fill-svgrepo-com.svg'
import food from '../../images/food-dinner-dish-plate-fork-svgrepo-com.svg'
import food_2 from '../../images/food-2-svgrepo-com.svg'
import avoid_food from '../../images/avoid-food-item.svg'
import { motion } from 'motion/react'


const loadingVarient = {
    initial: {
        background: 'linear-gradient(135deg, hsl(109, 36%, 61%) 0%, hsl(108, 42%, 74%) 100%)'
    },
    animate: {
        background: 'linear-gradient(135deg, hsl(109, 36%, 61%) 0%, hsl(108, 42%, 74%) 0%)',
        transition: {
            repeat: Infinity,
            duration: 0.8,
            ease: 'easeOut',
        }
    }
}

const loadingVarient2 = {
    initial: {
        background: 'linear-gradient(135deg, hsl(108, 42%, 74%) 0%, hsl(106, 71%, 89%) 100%)'
    },
    animate: {
        background: 'linear-gradient(135deg, hsl(108, 42%, 74%) 0%, hsl(106, 71%, 89%) 0%)',
        transition: {
            repeat: Infinity,
            duration: 0.8,
            ease: 'easeInOut',
        }
    }
}

const Loading_StatusBar = () => {
    return (
        <div className='h-fit w-full p-[1.1rem] bg-[#d9f7d0] rounded-2xl shadow-md'>
            <div className='grid grid-cols-2 gap-2.5 w-[35%] mb-[2.5rem]'>
                {
                    [...Array(4)].map((_, i) => (
                        <motion.div
                            className='bg-[#add9a2] h-[2.5rem] w-full rounded-2xl'
                            key={i}
                            variants={loadingVarient}
                            initial="initial"
                            animate="animate"
                        >

                        </motion.div>
                    ))
                }
            </div>
            <motion.div
                className='h-[1rem] px-1 mb-1.5 w-full rounded-full bg-[#add9a2]'
                variants={loadingVarient}
                initial="initial"
                animate="animate"
            >
            </motion.div>
            <div
                className='w-full h-fit'>
                <motion.div
                    className='w-full h-[2rem] bg-[#add9a2] rounded-full overflow-hidden'
                    variants={loadingVarient}
                    initial="initial"
                    animate="animate"
                >
                </motion.div>
            </div>
        </div>
    )
}

const Loading_Status_Pill = () => {
    return (
        <motion.div
            className='rounded-full bg-[#add9a2] h-[2rem] w-[5rem]'
            variants={loadingVarient}
            initial="initial"
            animate="animate"
        >
        </motion.div>
    )
}

const Loading_DietaryRecommendation = () => {
    return (
        <div className='flex flex-col gap-[2rem]'>
            <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#add9a2]'>
                <h1 className='text-xl w-fit font-semibold text-[#008200] '>Dietary Recommendations</h1>
                <img src={food} alt="test_tube" className='h-[2rem] w-[2rem]' />
            </div>
            <div className='pl-3 flex flex-col gap-5'>
                <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#ffd1d1]'>
                    <h1 className='text-lg w-fit font-semibold text-[#EB5757] '>Avoid Food Item</h1>
                    <img src={avoid_food} alt="test_tube" className='h-[1.5rem] w-[1.5rem]' />
                </div>
                <div className='grid grid-cols-5 gap-[1.5rem] pl-4'>
                    {
                        [...Array(4)].map((_, i) => (
                            <motion.div
                                className='flex flex-col gap-2.5 h-fit w-full bg-[#add9a2] rounded-lg shadow-md'
                                key={i}
                                variants={loadingVarient}
                                animate='animate'
                                initial='initial'
                            >
                                <div className='h-[12rem] w-full rounded-lg flex flex-col-reverse px-3 py-1.5 overflow-hidden relative'>
                                    <motion.p
                                        className='bg-[#d9f7d0] h-[1.5rem] w-full font-semibold z-10 rounded-full'
                                        variants={loadingVarient2}
                                        animate='animate'
                                        initial='initial'
                                    >
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>

            <div className='pl-3 flex flex-col gap-5'>
                <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-amber-200'>
                    <h1 className='text-lg w-fit font-semibold text-amber-500 '>Consume Food Item</h1>
                    <img src={food_2} alt="test_tube" className='h-[1.5rem] w-[1.5rem]' />
                </div>
                <div className='grid grid-cols-5 gap-[1.5rem] pl-4'>
                    {
                        [...Array(4)].map((_, i) => (
                            <motion.div
                                className='flex flex-col gap-2.5 h-fit w-full bg-[#add9a2] rounded-lg shadow-md'
                                key={i}
                                variants={loadingVarient}
                                animate='animate'
                                initial='initial'
                            >
                                <div className='h-[12rem] w-full rounded-lg flex flex-col-reverse px-3 py-1.5 overflow-hidden relative'>
                                    <motion.p
                                        className='bg-[#d9f7d0] h-[1.5rem] w-full font-semibold z-10 rounded-full'
                                        variants={loadingVarient2}
                                        animate='animate'
                                        initial='initial'
                                    >
                                    </motion.p>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

const LoadingFieldStatusBar = () => {
    return (
        <motion.div
            className='px-[1rem] py-[2rem] w-full h-fit bg-[#fef3c6] rounded-lg'
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: '250' }}
            viewport={{ once: true }}
        >
            <div className='w-full mb-[2rem] underline-lg flex gap-2 items-end'>
                <motion.div
                    className='w-[7rem] h-[2rem] bg-[#add9a2] rounded-full'
                    variants={loadingVarient}
                    initial="initial"
                    animate="animate"
                >
                </motion.div>
                <Loading_Status_Pill />
            </div>
            <div className='flex flex-col pl-7 gap-[2.5rem]'>
                <div className='flex flex-col gap-[1.5rem]'>
                    <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#add9a2]'>
                        <h1 className='text-xl w-fit font-semibold text-[#008200] '>Measuring Bar</h1>
                        <img src={graph} alt="test_tube" className='h-[2rem] w-[2rem]' />
                    </div>
                    <Loading_StatusBar />
                </div>
                <div className='flex flex-col gap-[1rem]'>
                    <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#add9a2]'>
                        <h1 className='text-xl w-fit font-semibold text-[#008200] '>Overview</h1>
                        <img src={note} alt="test_tube" className='h-[2rem] w-[2rem]' />
                    </div>
                    <div className='pl-4'>
                        <div className='border-l-8 border-[#246740] py-[1.5rem] px-[0.9rem] bg-[#d9f7d0] shadow-md'>
                            <motion.p
                                className='h-[1.8rem] font-normal bg-[#add9a2] rounded-full'
                                variants={loadingVarient}
                                initial="initial"
                                animate="animate"
                            >
                            </motion.p>
                        </div>
                    </div>
                </div>
                <Loading_DietaryRecommendation />
            </div>
        </motion.div>
    )
}

export default LoadingFieldStatusBar