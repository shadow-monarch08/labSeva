import { useEffect, useState } from 'react'
import eye_open from '../images/eye-svgrepo-com.svg'
import eye_close from '../images/eye-slash-svgrepo-com.svg'

const CustomInput = ({ onChange, label, id, Type, value, name }) => {
    const [showPass, setShowPass] = useState(false)


    return (
        <div className='flex flex-col gap-[0.7rem] w-full'>
            <label htmlFor="email">
                {
                    label
                }
            </label>
            {
                Type !== 'textarea'
                    ?
                    <div className='relative w-full h-fit'>
                        <input type={!showPass ? Type : 'text'} value={value} id={id} name={name} className='px-2 py-3 bg-none border-b-2 border-[#85bf78] w-full outline-0 text-[1.1rem]' onChange={onChange} required />
                        {
                            Type === 'password'
                            &&
                            <div className='w-[1.5rem] h-[1.5rem] absolute right-1 top-[50%] -translate-y-[50%] cursor-pointer' onClick={() => setShowPass(!showPass)}>
                                {
                                    !showPass ?
                                        <img className='w-full h-full' src={eye_open} alt="eye_icon" />
                                        :
                                        <img className='w-full h-full' src={eye_close} alt="eye_icon" />
                                }
                            </div>
                        }
                    </div>
                    :
                    <textarea value={value} onChange={onChange} className='resize-y min-h-[8rem] w-full px-2 py-3 bg-none border-b-2 border-[#85bf78] outline-0 text-[1.1rem]' />
            }
        </div>
    )
}

export default CustomInput