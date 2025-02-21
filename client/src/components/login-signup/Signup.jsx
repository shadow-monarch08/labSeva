import { useState } from 'react'
import arrow from '../../images/arrow.png'
import { Link, useNavigate } from 'react-router'
import eye_open from '../../images/eye-svgrepo-com.svg'
import eye_close from '../../images/eye-slash-svgrepo-com.svg'
import { UseGlobalContext } from '../Context/Globalcontext'


const Signup = () => {
  let navigate = useNavigate()

  const [creadentials, setCreadentials] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [showPass, setShowPass] = useState(false)
  const { showToast, setShowToast, toastBody, setToastBody } = UseGlobalContext()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Date.now()
    try {

      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: creadentials.name, email: creadentials.email, password: creadentials.password })
      })
      const json = await response.json()
      console.log(json);
      if (json.success) {
        let newstate = {}
        for (const key in creadentials) {
          newstate[key] = ""
        }
        localStorage.setItem('token', json.authToken);
        setCreadentials(newstate);
        setShowToast({ ...showToast, [id]: { toast: 'success' } });
        setToastBody({ ...toastBody, success: { ...toastBody.success, [id]: { title: 'Success!', message: 'loged in successfully' } } })
        navigate('/', { replace : true })
      } else {
        setShowToast({ ...showToast, [id]: { toast: 'error' } });
        setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: 'Some error occcured' } } })
      }
    } catch (error) {
      setShowToast({ ...showToast, [id]: { toast: 'error' } });
      setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: `can't connect to backend` } } })
      console.error(error)
    }
  }
  const onChange = (e) => {
    setCreadentials({ ...creadentials, [e.target.name]: e.target.value })
  }


  return (
    <div className="signup__wrapper">
      <Link to='/' title="Home" className='home-link'>
        <div className="return__home">
          <img src={arrow} alt="" />
        </div>
      </Link>
      <div className="signup__form-wrapper">
        <div className="form-header">
          <p className="heading-form">SignUp</p>
          <p className="info">Create an account to activate all the benifits</p>
        </div>
        <form action="post" onSubmit={handleSubmit} className='signup__form'>
          <div className="email-pass-name__wrapper">
            <label htmlFor="name">Your Name</label>
            <input type="text" id='name' name='name' className='form-input' onChange={onChange} value={creadentials.name} required />
          </div>
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
            <Link to='/login'>Have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup