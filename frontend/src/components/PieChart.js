import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const PieChart = ({ chartData }) => {
  console.log(chartData);
  const [userData, setuserData] = useState({
    labels: ["present", "absent"],
    datasets: [{ label: "", data: [chartData.present, chartData.absent] }],
    backgroundColor: ["green", "red"],
  });
  useEffect(() => {
    setuserData({
      labels: ["present", "absent"],
      datasets: [{ label: "", data: [chartData.present, chartData.absent] }],
      backgroundColor: ["green", "red"],
    });
  }, [chartData]);
  return (
    <div
      style={{
        maxWidth: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pie data={userData}></Pie>
    </div>
  );
};

export default PieChart;
