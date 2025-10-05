import { useState } from 'react'
import arrow from '../../images/arrow.png'
import { Link, useNavigate } from 'react-router'
import eye_open from '../../images/eye-svgrepo-com.svg'
import eye_close from '../../images/eye-slash-svgrepo-com.svg'
import { UseGlobalContext } from '../Context/Globalcontext'
import ToggleWrapper from '../TopToggleBar/Index'
import CustomInput from '../CustomInput'
import CustomDatePicker from '../CustomeDatePicker'


const Signup = () => {
  let navigate = useNavigate()

  const [creadentials, setCreadentials] = useState({
    name: "",
    email: "",
    phone : "",
    dateOfBirth : "",
    password: "",
  })
  const { showToast, setShowToast, toastBody, setToastBody } = UseGlobalContext()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Date.now()
    try {
      const tempObj = {
        ...creadentials
      }

      const response = await fetch("http://localhost:5000/api/auth/createUser", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tempObj)
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
        navigate('/', { replace: true })
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
      <div className="bg-[#d9f7d0] overflow-auto h-[100svh] w-[55%] justify-self-end py-[3rem]">
          <div className='flex flex-col gap-[3rem] justify-center w-full h-fit items-center pl-[3rem]'>
            {/* <ToggleWrapper /> */}
            <div className="form-header">
              <p className="heading-form">SignUp</p>
              <p className="info">Create an account to activate all the benifits</p>
            </div>
            <form action="post" onSubmit={handleSubmit} className='signup__form'>
            <CustomInput onChange={onChange} name='name' label='Your Name' id='name' Type='text'/>
            <CustomInput onChange={onChange} name='email' label='Your Email' id='email' Type='email'/>
            <CustomInput onChange={onChange} name='phone' label='Phone Number' id='phone' Type='text'/>
            <CustomInput onChange={onChange} name='password' label='Your Password' id='password' Type='password'/>
            <CustomDatePicker label='Enter DOB' setDate={setCreadentials}/>
              <div className="btn-wrapper_2">
                <button type="submit">Submit</button>
                <Link to='/login'>Have an account? Login</Link>
              </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Signup