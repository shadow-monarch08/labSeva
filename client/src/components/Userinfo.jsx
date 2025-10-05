import { motion } from 'motion/react';
import userIcon from '../images/userIcon.png'
import { UseGlobalContext } from './Context/Globalcontext';
import { useNavigate } from 'react-router';


const Userinfo = () => {
    const { showToast, setShowToast, toastBody, setToastBody, user, setUser } = UseGlobalContext()
    let navigate = useNavigate();

    const logout = () => {
        const id = Date.now();
        localStorage.removeItem('token');
        setUser({})
        setShowToast({ ...showToast, [id]: { toast: 'success' } });
        setToastBody({ ...toastBody, success: { ...toastBody.success, [id]: { title: 'Success!', message: 'loged out successfully' } } })
    }
    const toggleDisplay = () => {
        let userInfoTab = document.getElementById('userInfo');
        userInfoTab.classList.toggle('active');
    }

    return (
        <>
            <div className="userIcon-wrapper" onClick={toggleDisplay}>
                <img src={userIcon} alt="" />
            </div>
            <div className="useInfo-wrapper" id='userInfo'>
                <div className="userInfo-container">
                    <div className="userInfo__header">
                        <p>Welcome👋</p>
                    </div>
                    <div className="user-name-email">
                        <p>User Name :</p>
                        <p className='name-email'>{user.name}</p>
                    </div>
                    <div className="user-name-email">
                        <p>User Email :</p>
                        <p className='name-email'>{user.email}</p>
                    </div>
                    <div className="user-name-email">
                        <p>User DOB :</p>
                        <p className='name-email'>{user.dateOfBirth}</p>
                    </div>
                    <div className="user-name-email">
                        <p>User Phone no. :</p>
                        <p className='name-email'>{user.phoneNumber}</p>
                    </div>
                    <div className='flex justify-between'>
                        <motion.button
                            type='button'
                            className='w-fit bg-[#339c25] text-lg font-bold text-[#fffae5] px-[1rem] py-[0.5rem] rounded-lg shadow-xl cursor-pointer relative'
                            whileTap={{ scale: 0.9 }}
                            onClick={logout}
                        // style={!isSendingFile && { filter : 'blur(3px)'}}
                        >
                            <p>
                                Logout
                            </p>
                        </motion.button>
                        <motion.button
                            type='button'
                            className='w-fit bg-[#339c25] text-lg font-bold text-[#fffae5] px-[1rem] py-[0.5rem] rounded-lg shadow-lg cursor-pointer relative'
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { navigate('/testCart') }}
                        // style={!isSendingFile && { filter : 'blur(3px)'}}
                        >
                            <p>
                                Go Cart
                            </p>
                        </motion.button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userinfo