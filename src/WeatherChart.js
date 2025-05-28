import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function WeatherChart({ forecastData }) {
  const days = [];
  const temps = [];

  for (let i = 0; i < forecastData.length; i += 8) {
    const date = new Date(forecastData[i].dt_txt);
    days.push(date.toLocaleDateString("en-US", { weekday: "short" }));
    temps.push(forecastData[i].main.temp);
  }

  const colors = ["#4caf50", "#2196f3", "#ff9800", "#e91e63", "#9c27b0"];

  const chartData = {
    labels: days,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "#2196f3", // consistent smooth line
        borderWidth: 2,
        fill: true,
        backgroundColor: "rgba(33, 150, 243, 0.1)", // subtle area fill
        pointBackgroundColor: colors,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBorderColor: "#fff",
        pointHoverBorderColor: "#000",
        tension: 0.3, // smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: "5-Day Weather Forecast",
        font: {
          size: 18,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "#333",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        ticks: {
          color: "#333",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default WeatherChart;
