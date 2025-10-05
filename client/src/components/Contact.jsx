import { useEffect, useState } from 'react'
import call from '../images/call-svgrepo-com.svg'
import mail from '../images/mail-svgrepo-com.svg'
import location from '../images/location-pin-svgrepo-com.svg';
import chat from '../images/chat-message-phone-svgrepo-com.svg'
import { UseGlobalContext } from './Context/Globalcontext';

const Contact = () => {
    const { showToast, setShowToast, toastBody, setToastBody, user } = UseGlobalContext()
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: '',
        subject: "",
        message: ""
    })
    useEffect(() => {
      setUserInfo({
        ...userInfo,
        name: user.name,
        email: user.email
      })
    }, [user])
    
    const id = Date.now()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch("http://localhost:5000/api/contact/contactInfo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: userInfo.name, email: userInfo.email, subject: userInfo.subject, message: userInfo.message })
            });
            const json = await response.json();
            // console.log(json.error[0]);
            if (!json.success) {
                setShowToast({ ...showToast, [id]: { toast: 'error' } });
                setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error', message: 'Some error occcured' } } })
            } else {
                let newstate = {}
                for (const key in userInfo) {
                    newstate[key] = ""
                }
                setUserInfo(newstate);
                setShowToast({ ...showToast, [id]: { toast: 'success' } });
                setToastBody({ ...toastBody, success: { ...toastBody.success, [id]: { title: 'Success!', message: 'team will contact you shortly' } } })
                console.log('contaact you shortly')
            }
        } catch (error) {
            setShowToast({ ...showToast, [id]: { toast: 'error' } });
            setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: 'Some error occcured' } } })
            console.log(error)
        }
    }
    const onChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    return (
        <div className="contact__wrapper" id='contact__wrapper'>
            <div className="contact-heading">
                <div className="heading">
                    <img src={chat} alt="" />
                    <p>Your Service Our Duty</p>
                </div>
                <p>Feel free to reach out to us anytime, we're here to help and happy to assist you with any questions or concerns you may have. </p>
            </div>
            <div className="contact__form-wrapper">
                <div className="contact_detail">
                    <div className="contact_detail-header">
                        <h6 className="heading-contact">Contact Information</h6>
                        <p className="detail-contact">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolor quidem nihil, expedita ex harum quasi et! Veniam, atque eos.</p>
                    </div>
                    <div className="contact-info">
                        <img src={call} alt="" />
                        <ul>
                            <li className="num1">+91 8849799557</li>
                            <li className="num2">+91 9537554862</li>
                        </ul>
                    </div>
                    <div className="contact-email">
                        <img src={mail} alt="" />
                        <p>Support@gmail.com</p>
                    </div>
                    <div className="contact-location">
                        <img src={location} alt="" />
                        <p>Vadodara, Gujarat, India</p>
                    </div>
                </div>
                <form method="post" onSubmit={handleSubmit} className='contact__form'>
                    <div className="form__name-email-wrapper">
                        <div className="name-email-innerWrapper">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" disabled name='name' id='name' value={userInfo.name} className='name-email form-input' placeholder='Enter Name' required />
                        </div>
                        <div className="name-email-innerWrapper">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" disabled id='email' name="email" value={userInfo.email} className='name-email form-input' placeholder='Enter Email' required />
                        </div>
                    </div>
                    <div className="form_subject-wrapper">
                        <label htmlFor="subject">Your Subject</label>
                        <input type="text" id='subject' name='subject' value={userInfo.subject} className='subject form-input' onChange={onChange} placeholder='Enter Subject' required />
                    </div>
                    <div className="form__message-wrapper">
                        <label htmlFor="subject">Message</label>
                        <textarea id="message" name="message" value={userInfo.message} className='from__message' onChange={onChange} placeholder='Write your messge here' required></textarea>
                    </div>
                    <div className="form__submit-wrapper">
                        <button type="submit" className='sbt-btn'>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact