import { useState } from 'react'
import { useEffect, useRef } from "react";
import arrow from '../images/arrow.png'
import Userinfo from './Userinfo';
import home_dark from '../images/home-1-svgrepo-com.svg'
import home_light from '../images/home-1-svgrepo-com-2.svg'
import voting_light from '../images/voting-hand-send-drop-svgrepo-com.svg'
import voting_dark from '../images/voting-with-a-ballot-hand-send-drop-svgrepo-com.svg'
import { Link } from 'react-router';
import { UseGlobalContext } from './Context/Globalcontext';
<<<<<<< HEAD
import Icons from '../constants/Icons';
import GoogleTranslate from './GoogleTranslation';
=======
>>>>>>> d793f951326096cdb28314716fb9557a3606c751




const Navbar = () => {
  const boxRef = useRef(null);
  const dropRef = useRef(null);
<<<<<<< HEAD
  const { user, setUser, setUserCart } = UseGlobalContext()
=======
  const { user, setUser } = UseGlobalContext()
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
  const uncapitalize = (word) => {
    return word[0].toLowerCase() + word.slice(1);
  }
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (localStorage.getItem('token')) {
          const response = await fetch('http://localhost:5000/api/auth/fetchuser', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              "auth-token": localStorage.getItem('token')
            }
          })
<<<<<<< HEAD
          let data = await response.json()
          // console.log(data);
          setUser({
            ...data.user
          })

          const response2 = await fetch(`http://localhost:5000/api/cart/${data.user._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          })

          let cartData = await response2.json();
          setUserCart(cartData.cart.labTests)
=======
          let json = await response.json()
          // console.log(json);
          setUser({
            username: json.user.name,
            useremail: json.user.email
          })
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserData()
  }, [])


  const preventDefault = async (event) => {
    event.preventDefault();
    event.stopPropagation();
  }
  const [timeoutid, setTimeoutid] = useState(0)

  const toggleDropDown = () => {
    let dropDownW = document.getElementsByClassName('dropDown-wrapper')[0];
    let dropDownW2 = document.getElementsByClassName('dropDown-wrapper-2')[0];
    let dropDown = document.getElementsByClassName('dropDown')[0];
    let dropDownWIn = false
    dropDownW.addEventListener('mouseenter', (event) => {
      clearTimeout(timeoutid);
      dropDown.style.display = 'grid'
      dropDownW2.classList.add('active');
      // console.log(dropDownW2[0])
      dropDownWIn = event.isTrusted;
      document.addEventListener('mousewheel', preventDefault, { passive: false }); // For modern browsers
    })
    dropDownW.addEventListener('mouseleave', () => {
      let dropDownIn = false;
      dropDown.addEventListener('mouseenter', (event) => {
        dropDownIn = event.isTrusted;
      })
      if (dropDownIn) {
        return;
      }
      dropDownWIn = false;
      document.removeEventListener('mousewheel', preventDefault);
      dropDownW2.classList.remove('active');
      // dropDownW2.addEventListener('transitionend', () => {
      // })
      setTimeoutid(setTimeout(() => {
        dropDown.style.display = 'none';
      }, 300));
    })
    dropDown.addEventListener('mouseleave', () => {
      if (dropDownWIn) {
        return
      }
      document.removeEventListener('mousewheel', preventDefault);
      dropDownW2.classList.remove('active');
      // dropDownW2.addEventListener('transitionend', () => {
      //   dropDown.style.display = 'none';
      // })
      setTimeoutid(setTimeout(() => {
        dropDown.style.display = 'none';
      }, 300));
    })
    // console.log(dropDownW);
  }
  useEffect(() => {
    toggleDropDown();
  }, []);


  useEffect(() => {
    const navChangeStyle = () => {
      const navbar = document.querySelector('.header___navbar')
      const scrollerWatcher = document.createElement('div');
      scrollerWatcher.setAttribute('data-scroll-watcher', '')
      navbar.before(scrollerWatcher)
      const navObserve = new IntersectionObserver((entries) => {
        navbar.classList.toggle('header__navbar-scrolled', !entries[0].isIntersecting)
      })
      navObserve.observe(scrollerWatcher);
    }
    navChangeStyle();
  }, [])
  const dropDownValue = ['mission', 'News', 'Contact', 'About'];
  return (

    <nav className='header___navbar' ref={boxRef}>
      <div className="header__navbar-logo-cover">
<<<<<<< HEAD
        <p><Link to="/">LabSeva</Link></p>
=======
        <p><Link to="/">Local Governance</Link></p>
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
      </div>
      <ul className="header__navigation">
        <li className='navigation-lists dropDown-wrapper'>
          <div className="vartical-img-wrapper">
            <div className="vertical-img-gallery">
              <img src={home_light} alt="" />
              <img src={home_dark} alt="" />
            </div>
          </div>
          <Link to="/">Home</Link>
          <img id='arrow' src={arrow} alt="" />
          <div className="dropDown-wrapper-2">
            <div className="dropDown" ref={dropRef}>
              {dropDownValue.map((value, index) => (
                <a key={index} className={`navlink-light`} href={`#${uncapitalize(value) + '__wrapper'}`}>
                  {value}
                </a>
              ))}
            </div>
          </div>
        </li>
<<<<<<< HEAD
        <li className='navigation-lists dropDown-wrapper'>
          <div className="vartical-img-wrapper">
            <div className="vertical-img-gallery">
              <img src={Icons.test_dark} alt="testtube" />
              <img src={Icons.test_light} alt="testtube" />
            </div>
          </div>
          <Link to="/selectTest">Select Test</Link>
        </li>
        <li className='navigation-lists dropDown-wrapper'>
          <div className="vartical-img-wrapper">
            <div className="vertical-img-gallery">
              <img src={Icons.give_dark} alt="testtube" />
              <img src={Icons.give_light} alt="testtube" />
            </div>
          </div>
          <Link to="/publicDonation">Donate</Link>
        </li>
      </ul>
      <div className="user-login-logout">
        {
          Object.entries(user).length === 0
=======
      </ul>
      <div className="user-login-logout">
        {
          user.username === ''
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
            ?
            <div className="login-out-btns" id='login'>
              <Link to='/login'>Login</Link>
            </div> :
            <div className="user-logo">
              <Userinfo />
            </div>
        }
      </div>
    </nav >
  )
}
export default Navbar
<<<<<<< HEAD


=======
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
