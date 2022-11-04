import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { parse } from "date-fns";
import {
  fetchEmergencyData,
  fetchRequiringCareData,
} from "../redux/counterSlice";
import { AppStore } from "../redux/store";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//救急搬送困難事案数

export const TopChart = () => {
  const emergencyTransport = [
    {
      x: "",
      y: 0,
    },
  ];

  const requiringCareData = useSelector(
    (state: any) => state.counter.requiringCare
  );
  //   console.log(requiringCareData);
  let dateLists = [];
  for (let date of requiringCareData) {
    dateLists.push(date.Date);
  }

  //入院治療を要する者
  let requiring_inpatient_care: never[] = [];
  for (let info of requiringCareData) {
    requiring_inpatient_care.push(
      info["(ALL) Requiring inpatient care"] as never
    );
  }
  //   console.log(requiring_inpatient_care);

  const emergencyData = useSelector(
    (state: any) => state.counter.emergencyTransportData
  );
  //   console.log(emergencyData);

  //不要な配列を削除
  [...emergencyData].splice(0, 5);

  //救急搬送困難事案数
  emergencyTransport.splice(0);
  for (let emgInfo of emergencyData) {
    let formatData = parse(emgInfo.終了日, "yyyy-MM-dd", new Date());
    //配列の一番最後を削除
    if (emgInfo.終了日 === undefined) {
      continue;
    }
    emergencyTransport.push({
      x: format(new Date(formatData), "yyyy/M/d"),
      y: emgInfo.救急搬送困難事案数,
    });
  }

  const dispatch = useDispatch<AppStore>();
  useEffect(() => {
    dispatch(fetchRequiringCareData());
    dispatch(fetchEmergencyData());
  }, []);

  const data = {
    labels: [...dateLists], //日付
    datasets: [
      {
        label: "入院治療を要する者",
        data: requiring_inpatient_care,
        borderColor: ["rgb(80,80,205)"], //折れ線の色
        borderWidth: 2,
        yAxisID: "requirePatientsChart",
      },
      {
        label: "救急搬送困難事案数",
        data: emergencyTransport,
        showLine: false,
        pointBackgroundColor: ["rgb(255,0,0)"],
        pointBorderColor: ["rgb(119,119,119)"],
        yAxisID: "emargencyChart",
      },
    ],
  };
  const options: any = {
    scales: {
      emargencyChart: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "PCR検査陽性者数・累計死亡者数・緊急搬送困難事案数",
        },
      },
      requirePatientsChart: {
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "PCR検査実施件数・現在入院治療を要する者",
        },
      },
    },
  };
  return (
    <div>
      {" "}
      <Line data={data} width={100} height={50} options={options} />
    </div>
  );
};
