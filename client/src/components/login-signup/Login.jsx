import { useState } from 'react'
import arrow from '../../images/arrow.png'
import { Link, useNavigate } from 'react-router';
import eye_open from '../../images/eye-svgrepo-com.svg'
import eye_close from '../../images/eye-slash-svgrepo-com.svg'
import { UseGlobalContext } from '../Context/Globalcontext';

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
                    navigate('/', { replace : true })
                    // console.log(localStorage.getItem('token'));

                } else {
                    setShowToast({ ...showToast, [id]: { toast: 'error'  } });
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
                <div className="form-header">
                    <p className="heading-form">login</p>
                    <p className="info">Login to access all the features</p>
                </div>
                <form action="post" onSubmit={handleSubmit} className='login__form'>
                    <div className="email-pass-name__wrapper">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id='email' name='email' className='form-input' onChange={onChange} value={creadentials.email} required />
                    </div>
                    <div className="email-pass-name__wrapper">
                        <label htmlFor="password">Your Password</label>
                        <div className='relative'>
                            <input type={showPass ? 'text' : 'password'} name="password" id="password" className='form-input w-full' onChange={onChange} value={creadentials.password} required />
                            <div className='w-[1.5rem] h-[1.5rem] absolute right-1 top-[50%] -translate-y-[50%] cursor-pointer' onClick={() => setShowPass(!showPass)}>
                                {
                                    !showPass ?
                                        <img className='w-full h-full' src={eye_open} alt="eye_icon" />
                                        :
                                        <img className='w-full h-full' src={eye_close} alt="eye_icon" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="btn-wrapper_2">
                        <button type="submit">Submit</button>
                        <Link to='/signup'>Don&apos;t have account? Creat Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login