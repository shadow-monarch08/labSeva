import { useState, useEffect, useRef } from 'react'
import banner1 from '../images/hero1.jpg';
import banner2 from '../images/hero2.jpg'
import banner3 from '../images/hero3.jpg'
import banner4 from '../images/hero4.jpg'
import arrorw from '../images/arrow.png';
// import arm_dumbbell from '../images/arm-dumbbell-svgrepo-com.svg';
import dumbbell from '../images/dumbbell-large-svgrepo-com.svg';
import dumbbell_2 from '../images/dumbbell-large-svgrepo-com-2.svg';
import doctor from '../images/doctor-svgrepo-com.svg';
import doctor_2 from '../images/doctor-svgrepo-com-2.svg';
import health from '../images/health-filled-svgrepo-com.svg';
import health_2 from '../images/health-svgrepo-com.svg';
import medicine from '../images/medicine-svgrepo-com.svg';
import medicine_2 from '../images/medicine-svgrepo-com-2.svg';
import { Link } from 'react-router';

const Herosection = () => {
  const slider = useRef(null);
  const intervalId = useRef(null);
  const [invervalid, setInvervalId] = useState(0);
  const [timeoutId, setTimeoutId] = useState(0);
  const moveSlider_right = () => {
    setInvervalId(0);
    clearTimeout(timeoutId);
    clearInterval(intervalId.current);
    slider.current.style.transition = 'transform 0.3s ease-in';
    slider.current.style.transform = 'translateX(-100%)'; // Assuming each slide has a width of 300px
    slider.current.addEventListener('transitionend', handleTransitionEnd_right_2);
    setTimeoutId(setTimeout(() => {
      setInvervalId(1);
    }, 5000));
  }
  const handleTransitionEnd_right_2 = () => {
    slider.current.style.transition = 'none';
    slider.current.appendChild(slider.current.firstElementChild);
    slider.current.style.transform = 'translateX(0)';
    slider.current.removeEventListener('transitionend', handleTransitionEnd_right_2)
  }
  const moveSlider_left = () => {
    setInvervalId(0);
    clearTimeout(timeoutId);
    clearInterval(intervalId.current);
    slider.current.style.transition = 'none';
    slider.current.prepend(slider.current.lastElementChild);
    slider.current.style.transform = 'translateX(-100%)'; // Assuming each slide has a width of 300px
    setTimeout(() => {
      slider.current.style.transition = 'transform 0.3s ease-in';
      slider.current.style.transform = 'translateX(0)'; // Assuming each slide has a width of 300px
    }, 100);
    setTimeoutId(setTimeout(() => {
      setInvervalId(1);
    }, 5000));
  }
  useEffect(() => {
    const moveSlider_right_2 = () => {
      slider.current.style.transition = 'transform 0.3s ease-in';
      slider.current.style.transform = 'translateX(-100%)';
      slider.current.addEventListener('transitionend', handleTransitionEnd_right);
    }
    const handleTransitionEnd_right = () => {
      slider.current.style.transition = 'none';
      slider.current.appendChild(slider.current.firstElementChild);
      slider.current.style.transform = 'translateX(0)';
      slider.current.removeEventListener('transitionend', handleTransitionEnd_right)
    }

    intervalId.current = setInterval(moveSlider_right_2, 7000);
    return () => clearInterval(intervalId.current);

  }, [invervalid])

  return (
    <div className="heroSection__wrapper">
      <div className="heroSection__gallary-container" ref={slider} id="scroller-top">
        <div className="gallery-content-wrapper" id='touchSlider'>
          <div className="gallery-info-section">
            <h1 className="heading">Book Appointment with trusted doctors</h1>
            <div className="icon-section">
              <div className="icon-wrapper">
                <img src={doctor} alt="arm_dumbbell" />
              </div>
              <div className="icon-wrapper">
                <img src={doctor_2} alt="arm_dumbbell" />
              </div>
            </div>
            <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi similique mollitia aliquam, ratione rem illum velit inventore quas porro corporis, atque exercitationem labore enim nam? Ab iste ipsam tempore? Totam assumenda maiores ad iure a?</p>
            <div className="btn-wrapper-hero">
              <a href="http://localhost:3000/login">Visit Now</a>
            </div>
          </div>
          <div className="dummy-div"></div>
          <div className="image-wrapper">
            <img src={banner1} alt="bg" />
          </div>
        </div>
        <div className="gallery-content-wrapper">
          <div className="gallery-info-section">
            <h1 className="heading">Work out a sweat while exercising</h1>
            <div className="icon-section">
              <div className="icon-wrapper">
                <img src={dumbbell} alt="arm_dumbbell" />
              </div>
              <div className="icon-wrapper">
                <img src={dumbbell_2} alt="arm_dumbbell" />
              </div>
            </div>
            <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi similique mollitia aliquam, ratione rem illum velit inventore quas porro corporis, atque exercitationem labore enim nam? Ab iste ipsam tempore? Totam assumenda maiores ad iure a?</p>
            <div className="btn-wrapper-hero">
              <a href="http://localhost:3002" target='_blank'>Visit Now</a>
            </div>
          </div>
          <div className="dummy-div"></div>

          <div className="image-wrapper">
            <img src={banner2} alt="bg" />
          </div>
        </div>
        <div className="gallery-content-wrapper">
          <div className="gallery-info-section">
            <h1 className="heading">Check out your NAFLD score to determine you liver's health</h1>
            <div className="icon-section">
              <div className="icon-wrapper">
                <img src={health} alt="arm_dumbbell" />
              </div>
              <div className="icon-wrapper">
                <img src={health_2} alt="arm_dumbbell" />
              </div>
            </div>
            <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi similique mollitia aliquam, ratione rem illum velit inventore quas porro corporis, atque exercitationem labore enim nam? Ab iste ipsam tempore? Totam assumenda maiores ad iure a?</p>
            <div className="btn-wrapper-hero">
              <Link to="/healthProtal">Visit Now</Link>
            </div>
          </div>
          <div className="dummy-div"></div>

          <div className="image-wrapper">
            <img src={banner3} alt="bg" />
          </div>
        </div>
        <div className="gallery-content-wrapper">
          <div className="gallery-info-section">
            <h1 className="heading">Buy natural and lab tested pharmacutical products</h1>
            <div className="icon-section">
              <div className="icon-wrapper">
                <img src={medicine} alt="arm_dumbbell" />
              </div>
              <div className="icon-wrapper">
                <img src={medicine_2} alt="arm_dumbbell" />
              </div>
            </div>
            <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi similique mollitia aliquam, ratione rem illum velit inventore quas porro corporis, atque exercitationem labore enim nam? Ab iste ipsam tempore? Totam assumenda maiores ad iure a?</p>
            <div className="btn-wrapper-hero">
              <a href="http://localhost:3000/">Visit Now</a>
            </div>
          </div>
          <div className="dummy-div"></div>

          <div className="image-wrapper">
            <img src={banner4} alt="bg" />
          </div>
        </div>
      </div>
      <div className="gallery-button-container">
        <div className="gallary-button-wrapper" id="next" onClick={moveSlider_right}><img src={arrorw} alt="" /></div>
        <div className="gallary-button-wrapper" id="prev" onClick={moveSlider_left}><img src={arrorw} alt="" /></div>
      </div>
    </div>
  )
}

export default Herosection