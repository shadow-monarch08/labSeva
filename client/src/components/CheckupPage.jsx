import { useEffect, useState } from 'react'
import LineChart from './charts/LineChart';
import Gauge from './charts/Gauge';
import { Link } from 'react-router';
import ReportSubmissionForm from './ReportAnalysis/ReportSubmissionForm';
import AnalisedReport from './ReportAnalysis/AnalisedReport';
import { motion } from 'motion/react';
import { UseGlobalContext } from './Context/Globalcontext';
import test_tube from '../images/test-tube-7-svgrepo-com.svg'
import Icons from '../constants/Icons';
import ScoreBarChart from './charts/BarChart';


// import linechart from '../images/linechar.png'

const CheckupPage = () => {
    const { user, formData, showToast, setShowToast, toastBody, setToastBody, completeUserReportOverview, setCompleteUserReportOverview, setUserScores, userScores } = UseGlobalContext()
    const [isLoading, setIsLoading] = useState(false)

    const getUserScores = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/score/fetchAllScores", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
            });
            const data = await response.json();
            if (response.ok) {
                if (data.status === 'Error') {
                    console.log('No data found')
                } else {
                    const userScores = JSON.parse(data.data);
                    setUserScores(userScores);
                    // console.log(userScores)
                }
            } else {
                console.log('Error fetching user scores')
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    const getOverAllScore = async () => {
        const id = Date.now();
        try {
            if (formData.length === 0) {
                setShowToast({ ...showToast, [id]: { toast: 'error' } });
                setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: `Please upload the report first.` } } })
                return
            }
            setIsLoading(true)
            const tempData = [
                ...formData
            ]
            const sendingForm = new FormData();
            sendingForm.append('data', JSON.stringify(tempData))
            const response = await fetch("http://127.0.0.1:5000/get_overall_score", {
                method: "POST",
                body: sendingForm,
            });
            const data = await response.json();
            if (response.ok) {
                let dummyObj = {}
                const extractedData = JSON.parse(data.final_data.replace(/```json|```/g, "").trim())
                setCompleteUserReportOverview(extractedData)

                dummyObj["value"] = extractedData.Overall_Health_Score
                dummyObj["timestamp"] = new Date()

                if (userScores.find((obj) => obj.type === extractedData.Test_Category)) {
                    setUserScores(
                        userScores.map((item) => (
                            item.type === extractedData.Test_Category
                                ?
                                {
                                    ...item,
                                    instances:
                                        [
                                            ...item.instances,
                                            dummyObj
                                        ]
                                }
                                :
                                item
                        ))
                    )
                } else {
                    setUserScores([
                        ...userScores,
                        {
                            type: extractedData.Test_Category,
                            instances: [
                                dummyObj
                            ]
                        }
                    ])
                }

                if (user.username !== '') {
                    let scoreObj = {};
                    scoreObj['scoreValue'] = extractedData.Overall_Health_Score
                    scoreObj['testType'] = extractedData.Test_Category

                    const response = await fetch("http://localhost:5000/api/score/overallScore", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token": localStorage.getItem('token')
                        },
                        body: JSON.stringify(scoreObj)
                    });

                    if (response.ok) {
                        console.log('Overall score sent successfully')
                    } else {
                        console.log('Error sending overall score')
                    }
                }



                setShowToast({ ...showToast, [id]: { toast: 'success' } });
                setToastBody({ ...toastBody, success: { ...toastBody.success, [id]: { title: 'Success!', message: 'data extraction complete' } } })
            } else {
                setShowToast({ ...showToast, [id]: { toast: 'error' } });
                setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: `some error occured` } } })
                console.log(data)
            }
        } catch (error) {
            setShowToast({ ...showToast, [id]: { toast: 'error' } });
            setToastBody({ ...toastBody, error: { ...toastBody.error, [id]: { title: 'Error!', message: `some error occured` } } })
            throw new Error(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserScores()
    }, [])


    return (
        <div className="checkupPage__wrapper">
            <div className="checkupGraph__wrapper">
                <div className="checkup-Line-Pie-Graph__wrapper shadow-xl w-full">
                    {
<<<<<<< HEAD
                        Object.entries(user).length === 0
=======
                        user.username === ''
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
                            ?
                            <div className="coverdiv">
                                <p>
                                    To access the analysis graph <br />
                                    <Link to='/login'>
                                        Login
                                    </Link>
                                    &nbsp;first
                                </p>
                            </div>
                            :
                            <LineChart />
                    }
                </div>
                <div className="wrapper">
                    <div className="checkup-Line-Pie-Graph__wrapper shadow-xl w-[50%]">
                        {
<<<<<<< HEAD
                            Object.entries(user).length === 0
=======
                            user.username === ''
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
                                ?
                                <div className="coverdiv" id='pie'>
                                    <p>
                                        To access the analysis graph <br />
                                        <Link to='/login'>
                                            Login
                                        </Link>
                                        &nbsp;first
                                    </p>
                                </div>
                                :
                                <ScoreBarChart />
                        }
                    </div>
                    <div className="results__wrapper shadow-xl w-[50%] flex flex-col items-center justify-center gap-[2.5rem] px-[2rem]">
                        {
                            Object.entries(completeUserReportOverview).length === 0
                                ?
                                <>
                                    <div className='text-3xl font-semibold text-[#5ca64f] flex flex-col items-center'>
                                        <img src={Icons.gauge} alt="gauge" className='h-[5rem]' />
                                        <p>
                                            A score gauge will appear here
                                        </p>
                                    </div>
                                    <div className='h-fit w-full flex justify-center items-center'>
                                        <motion.button
                                            type='button'
                                            className='w-fit bg-[#85bf78] text-2xl font-bold text-[#fffae5] px-[2.5rem] py-[0.8rem] rounded-lg shadow-xl cursor-pointer relative'
                                            whileTap={{ scale: 0.9 }}
                                            onClick={getOverAllScore}
                                        >
                                            <p>
                                                Get overall score ?
                                            </p>
                                            {
                                                isLoading
                                                &&
                                                <div className='absolute w-full h-full left-0 top-[50%] -translate-y-[50%] flex justify-center items-center backdrop-blur-xs rounded-lg'>
                                                    <img src={test_tube} alt="test-tube" className='h-[2rem] w-[2rem] rotating' />
                                                </div>

                                            }
                                        </motion.button>
                                    </div>
                                </>
                                :
                                <Gauge />

                        }
                    </div>
                </div>
            </div>
            <ReportSubmissionForm />
            <AnalisedReport />
        </div>
    )
}

export default CheckupPage