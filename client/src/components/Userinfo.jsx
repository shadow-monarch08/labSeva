import userIcon from '../images/userIcon.png'
import { UseGlobalContext } from './Context/Globalcontext';

const Userinfo = () => {
    const { showToast, setShowToast, toastBody, setToastBody, user, setUser } = UseGlobalContext()

    const logout = () => {
        const id = Date.now();
        localStorage.removeItem('token');
        setUser({
            username : '',
            useremail : ''
        })
        setShowToast({ ...showToast, [id]: { toast: 'success' } });
        setToastBody({ ...toastBody, success: { ...toastBody.success, [id]: { title: 'Success!', message: 'loged in successfully' } } })
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
                        <p className='name-email'>{user.username}</p>
                    </div>
                    <div className="user-name-email">
                        <p>User Email :</p>
                        <p className='name-email'>{user.useremail}</p>
                    </div>
                    <div className="logout-btn-wrapper">
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userinfo