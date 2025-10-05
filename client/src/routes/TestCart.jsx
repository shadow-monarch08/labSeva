import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import { AnimatePresence, motion } from 'motion/react'
import Navbar from '../components/Navbar'
import Icons from '../constants/Icons'
import { UseGlobalContext } from '../components/Context/Globalcontext'


const MiniCartCard = ({ item: { testName, price } }) => {
    const { user, setUserCart, userCart } = UseGlobalContext()
    const handleRemoveItem = async () => {
        try {
            const tempCartData = {
                userId: user._id,
                testName: testName,
            }
            const response2 = await fetch(`http://localhost:5000/api/cart/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempCartData)
            })
            if (response2.ok) {
                setUserCart(userCart.filter(obj => obj.testName != testName))
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    return (
        <motion.div
            className='w-full h-fit py-[1rem] px-[1.5rem] bg-white rounded-lg shadow-sm relative'
            layout
        >
            <div className='border-b-2 border-[#5ca64f] py-[1rem] flex gap-1.5'>
                <p className='flex-1 text-lg'>
                    {
                        testName
                    }
                </p>
                <p>
                    ₹{
                        price
                    }
                </p>
            </div>
            <div className='h-[2rem] w-[2rem] absolute top-[-1rem] right-[-1rem] bg-[#e5fbd9] rounded-lg cursor-pointer' onClick={handleRemoveItem}>
                <img src={Icons.cross} alt="cross" className='h-full' />
            </div>
        </motion.div>
    )
}


const TestCart = () => {
    const { user, userCart } = UseGlobalContext()
    const [userAge, setUserAge] = useState(null)
    const [totalCost, setTotalCost] = useState(0)
    const calculateAge = (dob) => {
        // Convert the DOB string to a Date object
        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        if (Object.entries(user).length !== 0) {
            setUserAge(calculateAge(user.dateOfBirth))
            let tempSum = 0
            userCart.forEach(element => {
                tempSum += element.price
            });
            setTotalCost(tempSum)
        }
    }, [user, userCart])



    return (
        <>
            <Navbar />
            <div className='min-h-[100svh] w-full flex justify-center'>
                <div className='w-[70%] h-full flex flex-col justify-center items-center py-[3rem] pt-[7rem] gap-[4rem]'>
                    <div className='w-[70%] h-fit py-[4rem] px-[2rem] bg-[#85bf78] shadow-xl rounded-2xl text-amber-50 text-xl'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora laboriosam ipsam aliquid velit? Ipsum fuga nisi odit assumenda dolore neque!
                    </div>
                    <div className='flex flex-col gap-[1.5rem] w-[70%]'>
                        <div className='w-fit flex gap-2.5 px-2.5 py-2 rounded-full bg-[#add9a2] justify-center items-center'>
                            <img src={Icons.test_tube} alt="test_tube" className='h-[2rem]' />
                            <h2 className='text-amber-50 text-2xl font-semibold'>
                                Ordered Tests
                            </h2>
                        </div>
                        <AnimatePresence>
                            <div className='grid grid-cols-2 gap-5'>
                                {
                                    userCart.map((item, i) => (
                                        <MiniCartCard key={i} item={item} />
                                    ))
                                }
                            </div>
                        </AnimatePresence>
                    </div>
                    <div className="w-[70%] mx-auto p-6 bg-white rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Summary</h2>

                        <div className="space-y-3">
                            {
                                userCart.map((item, i) => (
                                    <div className="flex justify-between text-gray-600" key={i}>
                                        <span>
                                            {
                                                item.testName
                                            }
                                        </span>
                                        <span>
                                            ₹
                                            {
                                                item.price
                                            }
                                        </span>
                                    </div>
                                ))
                            }

                            <div className="border-t border-[#5ca64f] pt-3 flex justify-between text-lg font-semibold text-gray-800">
                                <span>Total</span>
                                <span>
                                    ₹{
                                        totalCost
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='w-[70%] h-fit bg-white shadow-xl rounded-2xl p-[2rem] flex flex-col gap-[1.5rem]'>
                        <div className='w-full flex gap-[1.5rem]'>
                            <CustomInput name='name' label='Your Name' id='name' Type='text' value={user.name} />
                            <CustomInput name='email' label='Your Email' id='email' Type='email' value={user.email} />
                        </div>
                        <div className='w-full flex gap-[1.5rem]'>
                            <CustomInput name='phone' label='Your Number' id='phone' Type='text' value={user.phoneNumber} />
                            <CustomInput name='dob' label='Birth Date' id='dob' Type='text' value={userAge} />
                        </div>
                        <CustomInput name='address' label='Your Address' id='address' Type='textarea' />
                    </div>
                    <div className='flex-1 flex justify-center items-center'>
                        <motion.button
                            type='button'
                            className='w-fit bg-[#339c25] text-2xl font-bold text-[#fffae5] px-[2.5rem] py-[0.8rem] rounded-lg shadow-xl cursor-pointer relative'
                            whileTap={{ scale: 0.9 }}
                            onClick={()=>{
                                window.open("https://buy.stripe.com/test_5kAeXLdZA3NXeswbIL", "_blank")
                            }}
                        // style={!isSendingFile && { filter : 'blur(3px)'}}
                        >
                            <p>
                                Proceed to checkout ?
                            </p>
                        </motion.button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestCart