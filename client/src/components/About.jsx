
import insta from '../images/instagram.svg';
import fb from '../images/facebook.svg';
import twitter from '../images/twitter.svg';
import user from '../images/user-circle-svgrepo-com.svg'
import GoogleTranslate from './GoogleTranslation';

const About = () => {
  return (
    <div className="about__wrapper" id='about__wrapper'>
      <div className="about-section">
        <div className="dummy-circle-1"></div>
        <div className="maincircle">
          <p className="heading-about">
            What are we?
          </p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam asperiores dolore consequatur, iusto hic et?</p>
        </div>
        <div className="dummy-circle-2"></div>
      </div>
      <div className="about__detail-section">
        <div className="siteName-teamdescription">
          <div className="heading-siteName">
            <div className="siteName">
              <img src="" alt="" />
              <p>Pharma Corp</p>
            </div>
            <p>Meet the team behind this website</p>
          </div>
        </div>
        <div className="teamMember">
          <div><img src={user} alt="" /> <p>Divy Parekh</p></div>
          <div><img src={user} alt="" /> <p>Veeral Saxena</p></div>
          <div><img src={user} alt="" /> <p>Dipanshu Choksi</p></div>
          <div><img src={user} alt="" /> <p>Narendra Samanta</p></div>
          <div><img src={user} alt="" /> <p>Kartik Varia</p></div>
        </div>
        <div className="socialMedia">
          <a href="https://www.instagram.com/" target='_blank' rel="noopener noreferrer" ><img src={insta} alt="" /></a>
          <a href="https://www.facebook.com/" target='_blank' rel="noopener noreferrer" ><img src={fb} alt="" /></a>
          <a href="https://www.twitter.com/" target='_blank' rel="noopener noreferrer" ><img src={twitter} alt="" /></a>
        </div>
        <p>&copy; 2024 All rights reserved</p>
      </div>
      <div>
        <GoogleTranslate/>
      </div>
    </div>
  )
}

export default About