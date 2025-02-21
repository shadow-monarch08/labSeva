
const IntroductionCard = ({ info : { imageLink, text, borderColor } }) => {
    return (
        <div
            className='h-[25rem] w-[24rem] bg-[#85bf78] rounded-xl border-[3px] shadow-xl relative flex items-end p-5'
            style={{ borderColor: borderColor }}
        >
            <img src={imageLink} alt="loading" className='absolute left-0 top-0 h-full w-full brightness-75 blur-sm' />
            <p className='font-bold text-2xl text-amber-50 text-pretty text-left z-20'>
                {
                    text
                }
            </p>
        </div>
    )
}

export default IntroductionCard