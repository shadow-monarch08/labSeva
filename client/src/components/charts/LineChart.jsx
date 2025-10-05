import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { UseGlobalContext } from '../Context/Globalcontext';
// import sourceData from '../../Data/SourceData.json'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const { userScores } = UseGlobalContext()
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  function formatDate(isoString) {
    const date = new Date(isoString);

    // Extract day, month, and year using UTC methods
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }

  let options = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    plugins: {
      title: {
        text: "Health score analysis graph",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: "Score",
        },
      }
    },
    animation: {
      duration: 1000, // Animation duration in milliseconds (1s)
      easing: "easeInOutQuad", // Easing function
    },
  }

  const addLableAndData = () => {
    if (Object.entries(userScores).length !== 0) {
      const tempLabels = [...new Set(userScores.flatMap(score =>
        score.instances.map(instance => formatDate(instance.timestamp))
      ))];
      setLabels(tempLabels)

      const datasets = userScores.map(score => ({
        label: score.type,
        data: tempLabels.map(label => {
          const instance = score.instances.find(inst =>
            formatDate(inst.timestamp) === label
          );
          return instance ? instance.value : null;
        }),
      }));

      setData(datasets)
    }
  }


  useEffect(() => {
    addLableAndData()
  }, [userScores])



  return (
    <Line
      data={{
        labels: labels,
        datasets: data
      }}
      options={options}
    />
  )
}

export default LineChart