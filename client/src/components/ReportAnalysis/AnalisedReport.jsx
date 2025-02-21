import FieldStautsBar from './FieldStautsBar'
import { UseGlobalContext } from '../Context/Globalcontext'
import LoadingFieldStatusBar from './LoadingFieldStatusBar'
import report_icon from '../../images/report-svgrepo-com.svg'

const EmptyReportSec = () => {
    return (
        <div className='h-[25rem] w-full rounded-lg border-2 border-[#339c25] border-dashed flex justify-center items-center'>
            <div className='h-fit w-full flex justify-center items-center flex-col gap-2'>
                <img src={report_icon} alt="report-icon" className='w-[8rem]' />
                <h1 className='text-2xl font-semibold text-[#339c25]'>No data found</h1>
                <p className='font-normal text-xl text-[#339c25]'>Your report&apos;s detailed analysis will appear here</p>
            </div>

        </div>
    )
}

const AnalisedReport = () => {
    const { formData, isSendingFile } = UseGlobalContext()
    return (
        <div className='w-[80%] h-fit p-[2rem] bg-[#fffae5] rounded-2xl shadow-xl flex flex-col gap-[2rem]'>
            {
                isSendingFile
                    ?
                    <LoadingFieldStatusBar />
                    :
                    formData.map((data, i) => (
                        <FieldStautsBar key={i} test_data={data} />
                    ))
            }
            {
                (formData.length === 0 && !isSendingFile)
                &&
                <EmptyReportSec />
            }
        </div>
    )
}

export default AnalisedReport