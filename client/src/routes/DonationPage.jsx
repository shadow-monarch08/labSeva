import DonationComponent from '../components/DonationComponent'
<<<<<<< HEAD
import Navbar from '../components/Navbar'
=======
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
import Icons from '../constants/Icons'
import Images from '../constants/Images'

const DonationPage = () => {
    return (
<<<<<<< HEAD
        <>
        <Navbar/>
            <div className='min-h-[100svh] w-full bg-[#d9f7d0] relative'>
                <div className='h-[60svh] w-full shadow-2xl'>
                    <img src={Images.nature_bg} alt="nature_bg" className='h-full w-full object-cover' />
                </div>
                <DonationComponent />
            </div>
        </>
=======
        <div className='min-h-[100svh] w-full bg-[#d9f7d0] relative'>
            <div className='h-[60svh] w-full shadow-2xl'>
                <img src={Images.nature_bg} alt="nature_bg" className='h-full w-full object-cover' />
            </div>
            <DonationComponent/>
        </div>
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
    )
}

export default DonationPage