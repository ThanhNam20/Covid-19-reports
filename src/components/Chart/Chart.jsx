import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

export default function Chart() {
  const [dailyData, setDailyData] = useState([]);
  // cai tren  bang voi
  //state = {
  //     dailyData: {},
  //     setDailyData:{}
  // }

  useEffect(() => {
    // useEffect like componentDidMount
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    
    fetchAPI();
  });

    const lineChart =
        dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
              borderColor: "red",
            backgroundColor: "rgba(255, 0, 0,.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
}
