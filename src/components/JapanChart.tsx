import {} from "../redux/counterSlice";
import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const JapanChart = (props: any) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const ncurrentpatients = useSelector(
    (state: any) => state.counter.info.ncurrentpatients
  );
  const ndeaths = useSelector((state: any) => state.counter.info.ndeaths);
  const nexits = useSelector((state: any) => state.counter.info.nexits);
  const npatients = useSelector((state: any) => state.counter.info.npatients);
  const subBedn = useSelector((state: any) => state.counter.bedInfo);

  const leftBedn = props.propsTotalBedn - ncurrentpatients;

  const data = {
    labels: [
      [`現在患者数(${ncurrentpatients})`],
      [`想定病床残数(${leftBedn})`],
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [[ncurrentpatients], 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options: any = {
    maintainAspectRatio: false,
    responsive: false,
    padding: "200px",
  };

  return (
    <div className="text-center">
      <p>
        全国 現在患者数/対策病床数
        {Math.floor(
          (Number(ncurrentpatients) / Number(props.propsTotalBedn)) * 100
        )}
        %
      </p>
      <div style={{ display: "inline-block" }}>
        <Pie data={data} width={"500"} height={"350"} options={options} />
      </div>
      <p>
        <span>累積陽性者:{npatients.toLocaleString()}人</span>
        <span> 累積退院者:{nexits.toLocaleString()}人</span>
      </p>
      <p>
        <span>累積死者:{ndeaths.toLocaleString()}人 </span>
        <span>対策病床数:{props.propsTotalBedn.toLocaleString()}人</span>
      </p>
      {/* <button>とじる</button> */}
    </div>
  );
};
