import DonationComponent from '../components/DonationComponent'
import Navbar from '../components/Navbar'
import Icons from '../constants/Icons'
import Images from '../constants/Images'

const DonationPage = () => {
    return (
        <>
        <Navbar/>
            <div className='min-h-[100svh] w-full bg-[#d9f7d0] relative'>
                <div className='h-[60svh] w-full shadow-2xl'>
                    <img src={Images.nature_bg} alt="nature_bg" className='h-full w-full object-cover' />
                </div>
                <DonationComponent />
            </div>
        </>
    )
}

export default DonationPage