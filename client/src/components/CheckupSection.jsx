import { motion } from 'motion/react';
import checkupimg from '../images/blood research-pana.svg'
import { useNavigate } from 'react-router';

const CheckupSection = () => {
    let navigate = useNavigate();
    return (
        <div className="checkDisease mt-[10rem]">
            <div className='w-full h-[60%] bg-[#85bf78] border-[3px] border-[#008200] rounded-2xl self-center p-[3rem]  shadow-2xl flex flex-col'>
                <p className='text-2xl font-semibold text-amber-50 leading-10'>
                    So what&apos;s the hold up go and check out our report 🤖 analysis system and get a detailed overview of your 🧪 blood report with proper 📊 visualization.
                </p>
                <div className='flex-1 flex justify-center items-center'>
                    <motion.button
                        type='button'
                        className='w-fit bg-[#339c25] text-2xl font-bold text-[#fffae5] px-[2.5rem] py-[0.8rem] rounded-lg shadow-xl cursor-pointer relative'
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { navigate('/healthProtal') }}
                    // style={!isSendingFile && { filter : 'blur(3px)'}}
                    >
                        <p>
                            Visit the page ?
                        </p>
                    </motion.button>
                </div>
            </div>
            <div className="checkdisease__image-container">
                <img src={checkupimg} alt="" />
            </div>
        </div>
    )
}

export default CheckupSection