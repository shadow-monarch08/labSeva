import { useState } from 'react'
import arrow from '../../images/arrow.png'
import { Link, useNavigate } from 'react-router';
import eye_open from '../../images/eye-svgrepo-com.svg'
import eye_close from '../../images/eye-slash-svgrepo-com.svg'
import { UseGlobalContext } from '../Context/Globalcontext';
import ToggleWrapper from '../TopToggleBar/Index';
import CustomInput from '../CustomInput';

const Login = () => {
    let navigate = useNavigate();
    const [creadentials, setCreadentials] = useState({
        email: "",
        password: ""
    })
    const { showToast, setShowToast, toastBody, setToastBody } = UseGlobalContext()
    const [showPass, setShowPass] = useState(false)
    const handleSubmit = async (e) => {
        const id = Date.now()
        try {
            e.preventDefault();
            if (localStorage.getItem('token')) {
                setShowToast({ ...showToast, [id]: { toast: 'success' } });
                setToastBody({ ...toastBody, success: { ...toastBody.success, [id]: { title: 'Bravo!', message: 'user Already loged in' } } })
            }
            else {

                const response = await fetch("http://localhost:5000/api/auth/loginUser", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: creadentials.email, password: creadentials.password })
                })
                const json = await response.json()
                // console.log(json.success);
                if (json.success) {
                    let newstate = {}
                    for (const key in creadentials) {
                        newstate[key] = ""
                    }
                    localStorage.setItem('token', json.authToken);
                    setCreadentials(newstate)
                    setShowToast({ ...showToast, [id]: { toast: 'success' } });
                    setToastBody({ ...toastBody, success: { ...toastBody.success, [id]: { title: 'Success!', message: 'loged in successfully' } } })
                    navigate('/', { replace: true })
                    // console.log(localStorage.getItem('token'));

                } else {
                    setShowToast({ ...showToast, [id]: { toast: 'error' } });
                    setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: 'Some error occcured' } } })
                }
            }
        } catch (error) {
            setShowToast({ ...showToast, [id]: { toast: 'error' } });
            setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: `can't connect to backend` } } })
            console.log(error)
        }
    }
    const onChange = (e) => {
        setCreadentials({ ...creadentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="login__wrapper">
            <Link to='/' title='Home' className='home-link'>
                <div className="return__home">
                    <img src={arrow} alt="" />
                </div>
            </Link>
            <div className="login__form-wrapper">
                <div className='flex flex-col gap-[3rem] justify-center w-full items-center pl-[3rem]'>
                    {/* <ToggleWrapper /> */}
                    <div className="form-header">
                        <p className="heading-form">login</p>
                        <p className="info">Login to access all the features</p>
                    </div>
                    <form action="post" onSubmit={handleSubmit} className='login__form'>
                        <CustomInput onChange={onChange} name='email' label='Your Email' id='email' Type='email'/>
                        <CustomInput onChange={onChange} name='password' label='Your Password' id='password' Type='password'/>
                        <div className="btn-wrapper_2">
                            <button type="submit">Submit</button>
                            <Link to='/signup'>Don&apos;t have account? Creat Now</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login