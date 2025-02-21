import React, { useEffect, useState } from 'react'
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
import success from '../../images/success-filled-svgrepo-com.svg'
import error from '../../images/error-svgrepo-com.svg'
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

const StatusBar = ({ result, ref_range, Unit, status }) => {
    const [range, setRange] = useState([])
    const [highest, setHighest] = useState(null)
    const [emojiArr, setEmojiArr] = useState(
        [
            crying_emoji, smiling_emoji, smiling_heart_emoji, disappoint_emoji
        ]
    )
    useEffect(() => {
        const refArr = ref_range.split('-')
        if (parseFloat(refArr[1]) >= parseFloat(result)) {
            setHighest(refArr[1])
            if (parseFloat(refArr[0]) === 0.0) {
                setRange([refArr[0], refArr[1]])
                setEmojiArr(
                    emojiArr.filter((_, i) => i !== 0)
                )
            } else {
                setRange(['0', refArr[0], refArr[1]])
            }
        }
        else {
            setHighest(result)
            if (parseFloat(refArr[0]) === 0.0) {
                setRange([refArr[0], refArr[1], result])
                setEmojiArr(
                    emojiArr.filter((_, i) => i !== 0)
                )
            } else {
                setRange(['0', refArr[0], refArr[1], result])
            }
        }
    }, [])

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
                                {
                                    Unit
                                }
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
                                style={i === 0 ? { width: 'fit-content' } : { width: `${(parseFloat(value) / parseFloat(highest)) * 100}%` }}
                            >
                                <img src={emojiArr[i]} alt="" className='h-[2.5rem] w-[2.5rem]' />
                            </div>
                        ))
                    }
                    <div
                        className='absolute flex flex-row-reverse bottom-0 left-0'
                        style={{ width: `${(parseFloat(result) / parseFloat(highest)) * 100}%` }}
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
                        className='h-[2rem] rounded-full flex flex-row-reverse items-center px-3'
                        style={{ width: `${(parseFloat(result) / parseFloat(highest)) * 100}%`, backgroundColor : `${status === 'Normal' ? '#5ca64f' : '#EB5757'}` }}
                    >
                    </div>
                </div>
            </div>
        </div>
    )
}

const DietaryRecommendation = ({ avoid, consume }) => {
    const [imageObj, setImageObj] = useState({
        Avoid: {},
        Consume: {}
    })
    const [isImageLoading, setIsImageLoading] = useState(false)
    const getImage = async (query) => {
        try {
            setIsImageLoading(true)
            const API_KEY = 'SA7E0YQJBh3KzA8o5yfVeoB1IHZTXKT8E-m0lD4Cqww'
            const encodedQuery = encodeURIComponent(query)
            const response = await fetch(`https://api.unsplash.com/search/photos/?query=${encodedQuery}&client_id=${API_KEY}&page=1&per_page=1`)
            const data = await response.json()
            // console.log(data)
            // console.log(encodedQuery)
            return data.results[0].urls
        } catch (error) {
            throw new Error(error)
        } finally {
            setIsImageLoading(false)
        }
    }

    const setImgObj = async () => {
        const tempObj1 = {}
        const tempObj2 = {}
        if (avoid) {
            for (let index = 0; index < avoid.slice(0, 4).length; index++) {
                const urlObj = await getImage(avoid[index])
                tempObj1[avoid[index]] = urlObj.small
                // console.log(urlObj.raw)
            }
        }
        if (consume) {
            for (let index = 0; index < consume.slice(0, 4).length; index++) {
                const urlObj = await getImage(consume[index])
                tempObj2[consume[index]] = urlObj.small
                // console.log(urlObj.raw)
            }
        }
        setImageObj({
            Avoid: {
                ...tempObj1
            },
            Consume: {
                ...tempObj2
            }
        })
    }
    useEffect(() => {
        setImgObj()
    }, [])

    // useEffect(() => {
    //   console.log(imageObj)
    // }, [imageObj])


    return (
        <div className='flex flex-col gap-[2rem]'>
            <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#add9a2]'>
                <h1 className='text-xl w-fit font-semibold text-[#008200] '>Dietary Recommendations</h1>
                <img src={food} alt="test_tube" className='h-[2rem] w-[2rem]' />
            </div>
            {
                !(avoid.length === 0)
                &&
                <div className='pl-3 flex flex-col gap-5'>
                    <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#ffd1d1]'>
                        <h1 className='text-lg w-fit font-semibold text-[#EB5757] '>Avoid Food Item</h1>
                        <img src={avoid_food} alt="test_tube" className='h-[1.5rem] w-[1.5rem]' />
                    </div>
                    <div className='grid grid-cols-5 gap-[1.5rem] pl-4'>
                        {
                            isImageLoading
                                ?
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
                                :
                                avoid.slice(0, 4).map((item, i) => (
                                    <div className='flex flex-col gap-2.5 h-fit w-full' key={i}>
                                        <div className='h-[12rem] w-full rounded-lg flex flex-col-reverse px-3 py-1.5 overflow-hidden relative shadow-md'>
                                            <img src={imageObj.Avoid[item]} alt="food img" className='absolute top-0 left-0 h-full w-full object-cover brightness-75' />
                                            <p className='text-amber-50 text-xl font-semibold z-10'>
                                                {
                                                    item
                                                }
                                            </p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>

            }
            {
                !(consume.length === 0)
                &&
                <div className='pl-3 flex flex-col gap-5'>
                    <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-amber-200'>
                        <h1 className='text-lg w-fit font-semibold text-amber-500 '>Consume Food Item</h1>
                        <img src={food_2} alt="test_tube" className='h-[1.5rem] w-[1.5rem]' />
                    </div>
                    <div className='grid grid-cols-5 gap-[1.5rem] pl-4'>
                        {
                            isImageLoading
                                ?
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
                                :
                                consume.slice(0, 4).map((item, i) => (
                                    <div className='flex flex-col gap-2.5 h-fit w-full' key={i}>
                                        <div className='h-[12rem] w-full rounded-lg flex flex-col-reverse px-3 py-1.5 overflow-hidden relative shadow-md'>
                                            <img src={imageObj.Consume[item]} alt="food img" className='absolute top-0 left-0 h-full w-full object-cover brightness-75' />
                                            <p className='text-amber-50 text-2xl font-semibold z-10'>
                                                {
                                                    item
                                                }
                                            </p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

const Status_Pill = ({ status }) => {
    return (
        <>
            {
                status === 'Normal'
                    ?
                    <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#add9a2]'>
                        <img src={success} alt="test_tube" className='h-[1.5rem] w-[1.5rem]' />
                        <h1 className='text-lg w-fit font-semibold text-[#008200] '>
                            {
                                status
                            }
                        </h1>
                    </div>
                    :
                    <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#ffd1d1]'>
                        <img src={error} alt="test_tube" className='h-[1.5rem] w-[1.5rem]' />
                        <h1 className='text-lg w-fit font-semibold text-[#EB5757] '>
                            {
                                status
                            }
                        </h1>
                    </div>
            }
        </>
    )
}

const FieldStautsBar = ({ test_data: { Test_Name, Result, Reference_Range, Unit, Health_Impact, Status, Dietary_Recommendations: { Foods_to_Consume, Foods_to_Avoid } } }) => {

    return (
        <motion.div
            className='px-[1rem] py-[2rem] w-full h-fit bg-[#fef3c6] rounded-lg'
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: '250' }}
            viewport={{ once: true }}
        >
            <div className='w-full mb-[2rem] underline-lg flex gap-2'>
                <p className='text-3xl font-bold text-[#5ca64f]'>
                    {
                        Test_Name
                    }
                </p>
                <img src={test_tube} alt="test_tube" className='h-[2rem] w-[2rem]' />
                <Status_Pill status={Status} />
            </div>
            <div className='flex flex-col pl-7 gap-[2.5rem]'>
                <div className='flex flex-col gap-[1.5rem]'>
                    <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#add9a2]'>
                        <h1 className='text-xl w-fit font-semibold text-[#008200] '>Measuring Bar</h1>
                        <img src={graph} alt="test_tube" className='h-[2rem] w-[2rem]' />
                    </div>
                    <StatusBar ref_range={Reference_Range} Unit={Unit} result={Result} status={Status}/>
                </div>
                <div className='flex flex-col gap-[1rem]'>
                    <div className='flex items-center gap-2 w-fit py-1.5 px-2.5 rounded-full bg-[#add9a2]'>
                        <h1 className='text-xl w-fit font-semibold text-[#008200] '>Overview</h1>
                        <img src={note} alt="test_tube" className='h-[2rem] w-[2rem]' />
                    </div>
                    <div className='pl-4'>
                        <div className='border-l-8 border-[#246740] py-[1.5rem] px-[0.9rem] bg-[#d9f7d0] shadow-md'>
                            <p className='text-lg font-normal text-[#246740]'>
                                {
                                    Health_Impact
                                }
                            </p>
                        </div>
                    </div>
                </div>
                {
                    Foods_to_Avoid.length === 0 && Foods_to_Consume.length === 0
                        ? <></>
                        :
                        <DietaryRecommendation avoid={Foods_to_Avoid} consume={Foods_to_Consume} />
                }
            </div>
        </motion.div>
    )
}

export default FieldStautsBar