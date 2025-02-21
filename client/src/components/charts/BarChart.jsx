import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { UseGlobalContext } from "../Context/Globalcontext";

// Register required components for Chart.js
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ScoreBarChart = () => {
  const { userScores } = UseGlobalContext()
  // Extract latest score for each test type
  const [dataSet, setDataSet] = useState([])

  const addLablesAndData = () => {
    if (Object.entries(userScores).length !== 0) {

      const latestScores = userScores.map(score => {
        // Sort instances by timestamp and get the latest score
        const latestInstance = score.instances.sort((a, b) =>
          new Date(b.timestamp) - new Date(a.timestamp)
        )[0];

        return {
          label: score.type, // Each test type as a separate dataset
          data: [latestInstance ? latestInstance.value : 0], // Only the latest score
          borderWidth: 1,
        };
      });
      setDataSet(latestScores)
    }
  }


  // Data for the bar chart
  const data = {
    labels: ["Latest Scores"],
    datasets : dataSet
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Score",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        text: "Health score comparision graph",
      },
    },
  };

  useEffect(() => {
    addLablesAndData()
  }, [userScores])


  return (
    <Bar data={data} options={options} />
  );
};

export default ScoreBarChart;
