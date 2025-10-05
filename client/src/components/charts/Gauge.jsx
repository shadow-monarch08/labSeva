import { useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { UseGlobalContext } from '../Context/Globalcontext'

const Gauge = () => {
    const { formData, completeUserReportOverview } = UseGlobalContext()
    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            scale: {
                ticks: {
                    min: 0,
                    max: 100
                }
            },
            title: {
                text: "Your overall health score",
                color : '#339c25'
            },
        },
    }
    // gaugeChartText Pulgin Block
    const gaugeChartText = {
        id: 'gaugeChartText',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { r } } = chart;
            ctx.save();

            const xcord = chart.getDatasetMeta(0).data[0].x
            const ycord = chart.getDatasetMeta(0).data[0].y
            let min = 0;
            let max = 100;
            let status = ''
            const score = data.datasets[0].data[0];

            if(90<=  score <= 100){
                status = 'Excellent'
            } else if(75 <= score <= 89){
                status = 'Good'
            } else if(50 <= score <= 74){
                status = 'Moderate'
            }else{
                status = 'Poor'
            }
        

            const textLable = (text, x, y, fontSize, textBaseLine, textAlign) => {
                ctx.font = `${fontSize} 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif`;
                ctx.fillStyle = '#666';
                ctx.textBaseLine = textBaseLine;
                ctx.textAlign = textAlign;
                ctx.fillText(text, x, y);
            }
            textLable(min, left, ycord + 20, "1.5em", 'top', 'left');
            textLable(max, right, ycord + 20, "1.5em", 'top', 'right');
            textLable(score, xcord, ycord, "4em", 'bottom', 'center');
            textLable(status, xcord, ycord - 80, "2em", 'bottom', 'center');
        }
    }

    // const { nafldScore } = props

    // useEffect(() => {

    //     console.log(nafldScore);

    // }, [nafldScore])
    return (
        <Doughnut
            data={{
                labels: ['Mon', 'Tue'],
                datasets: [{
                    label: 'Weekly Sales',
                    data: [completeUserReportOverview.Overall_Health_Score, 100 - completeUserReportOverview.Overall_Health_Score],
                    backgroundColor: [
                        'rgb(133, 191, 120)',
                        'rgba(255, 26, 104, 0.2)',
                    ],
                    borderColor: [
                        'rgb(0, 130, 0)',
                        'rgba(255, 26, 104, 0.2)',
                    ],
                    borderWidth: 2,
                    borderRadius: 0,
                    cutout: "90%",
                    circumference: "180",
                    rotation: '-90',
                }]
            }}
            options={options}
            plugins={[gaugeChartText]}
        />
    )
}

export default Gauge