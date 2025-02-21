import React from 'react'
import IntroductionCard from './IntroductionCard'
import Images from '../../constants/Images'
import Icons from '../../constants/Icons'


const IntroductionContainer = () => {
    const infoArr = [
        {
            imageLink: Images.laboratoryImage,
            text: 'Upload the picture of your blood report for analysis',
            borderColor: '#008200'
        },
        {
            imageLink: Images.aiImage,
            text: 'Let our brillient A.I model analyze your report throughly',
            borderColor: '#333333'
        },
        {
            imageLink: Images.analysisImage,
            text: 'Get a detailed analysis of your report along with visual recommendations and graphs',
            borderColor: '#EB5757'
        },

    ]

    return (
        <div className='h-[100svh] w-full flex flex-col justify-center items-center mt-[5.5rem] gap-[5rem]'>
            <div className='h-fit w-full'>
                <div className='flex gap-5 items-center mb-4 w-full justify-center'>
                    <img src={Icons.questionMarkHuman} alt="questionMark" className='h-[3.5rem]' />
                    <h1 className='text-5xl font-bold'>
                        How it works?
                    </h1>
                </div>
                <div>
                    <p className='text-xl text-center'>
                        Get started with how to leverage our tech to analyse your report
                    </p>
                </div>
            </div>
            <div className='h-fit w-full flex justify-center gap-[2rem]'>
                {
                    infoArr.map((info, index) => (
                        <IntroductionCard key={index} info={info} />
                    ))
                }
            </div>
        </div >
    )
}

export default IntroductionContainer