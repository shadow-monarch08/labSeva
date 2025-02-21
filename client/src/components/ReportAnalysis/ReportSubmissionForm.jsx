import { useState } from 'react'
import upload from '../../images/upload-svgrepo-com.svg'
import image_icon from '../../images/image-picture-svgrepo-com.svg'
import { motion } from 'motion/react'
import test_tube from '../../images/test-tube-7-svgrepo-com.svg'
import { UseGlobalContext } from '../Context/Globalcontext'



const NoImage = () => {
    return (
        <div className='h-[80%] w-[80%] border-2 border-dashed border-[#5ca64f] rounded-xl flex items-center justify-center'>
            <div className='h-fit w-fit flex items-center flex-col text-[#008200]'>
                <img src={image_icon} alt="image_icon" className='h-[3rem] w-[3rem]' />
                <p className='text-lg'>
                    No image found
                </p>
                <p className='font-light text-sm'>
                    Upload image of you blood report
                </p>
            </div>
        </div>
    )
}

const ReportSubmissionForm = () => {
    const [image, setImage] = useState(null);
    const [fileData, setFileData] = useState(null)
    const { setFormData, setIsSendingFile, isSendingFile, showToast, setShowToast, toastBody, setToastBody, setCompleteUserReportOverview } = UseGlobalContext()
    const upload_image = async () => {
        const id = Date.now();
        try {
            setIsSendingFile(true)
            if (!fileData) {
                setShowToast({ ...showToast, [id]: { toast: 'error' } });
                setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: `please upload a photo` } } })
                return
            }
            setCompleteUserReportOverview({});
            setFormData([]);
            const formData = new FormData();
            formData.append("image", fileData); // Append file

            const response = await fetch("http://127.0.0.1:5000/extract_data", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                const test_data = JSON.parse(data.extracted_text.replace(/```json|```/g, "").trim())
                console.log(test_data);
                setFormData([
                    ...test_data
                ])
                setShowToast({ ...showToast, [id]: { toast: 'success' } });
                setToastBody({ ...toastBody, success: { ...toastBody.success, [id]: { title: 'Success!', message: 'data extraction complete' } } })
                setImage(null)
                setFileData(null)
                return
            }
            setShowToast({ ...showToast, [id]: { toast: 'error' } });
            setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: `some error occured` } } })
        } catch (error) {
            setShowToast({ ...showToast, [id]: { toast: 'error' } });
            setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: `can't connect to backend` } } })
            console.log(error)
        }
        finally {
            setIsSendingFile(false)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(URL.createObjectURL(file)); // Preview the image
            setFileData(file)
        } else {
            event.target.value = ""; // Reset input
        }
    };
    return (
        <div className='h-fit w-[80%] bg-[#fffae5] flex rounded-2xl overflow-hidden shadow-xl p-[1.5rem]'>
            <div className='h-[30rem] w-[27rem] bg-amber-100 rounded-xl relative flex items-center justify-center'>
                <div className='absolute top-[-3%] right-[-5%] rounded-lg h-[3rem] w-[3rem] bg-[#85bf78] flex items-center justify-center z-20 shadow-lg'>
                    <label htmlFor="file_input" className='absolute h-full w-full top-0 left-0 cursor-pointer' />
                    <input type="file" name="file_input" id="file_input" className='hidden' accept='image/*' onChange={handleFileChange} />
                    <img src={upload} alt="upload_icon" className='h-[90%] w-[90%]' />
                </div>
                {
                    image
                        ?
                        <img src={image} alt="upload_image" className='h-[90%] w-[90%] rounded-lg brightness-100 contrast-125 object-fill' />
                        :
                        <NoImage />
                }
            </div>
            <div className='flex-1 flex flex-col gap-[1.5rem] p-[3rem] h-[30rem]'>
                <p className='font-bold text-xl text-[#246740] leading-9 text-pretty'>
                    Upload your blood report to get a detailed analysis of your health metrics. Our system will process the report and provide insights based on your test results!
                </p>
                <div className='h-full flex-1 flex justify-center items-center'>
                    <motion.button
                        type='button'
                        className='w-fit bg-[#85bf78] text-2xl font-bold text-[#fffae5] px-[2.5rem] py-[0.8rem] rounded-lg shadow-xl cursor-pointer relative'
                        whileTap={{ scale: 0.9 }}
                        onClick={upload_image}
                        disabled={isSendingFile}
                    // style={!isSendingFile && { filter : 'blur(3px)'}}
                    >
                        <p>
                            Send Data to process
                        </p>
                        {
                            isSendingFile
                            &&
                            <div className='absolute w-full h-full left-0 top-[50%] -translate-y-[50%] flex justify-center items-center backdrop-blur-xs rounded-lg'>
                                <img src={test_tube} alt="test-tube" className='h-[2rem] w-[2rem] rotating' />
                            </div>

                        }
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default ReportSubmissionForm