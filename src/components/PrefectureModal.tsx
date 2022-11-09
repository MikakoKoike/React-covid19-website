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
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../redux/store";
import { fetchCovid19japanAll } from "../redux/counterSlice";

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

export const PrefectureModal = (props: any) => {
  const japanAllData = useSelector((state: any) => state.counter.japanAllData);
  const [lastUpdate, setLastUpdate] = useState([]); //更新日
  const [areaData, setAreaData] = useState([]);
  const [lastUpdateData, setLastUpdateData] = useState([]);
  const [areaInfo, setAreaInfo] = useState([]);
  let dateLists: any = [];
  let areaLists: any = [];
  let ncurrentpatientsLists: any = [];
  let ndeaths: any = [];
  const getJapanAllData = () => {
    for (let i = 0; i < japanAllData.length; i++) {
      dateLists.push(japanAllData[i].lastUpdate);
      areaLists.push(japanAllData[i].area);
    }
    setLastUpdate(dateLists);
    setAreaData(areaLists);

    for (let date of areaData) {
      for (let area of date) {
        if (area.name_jp === props.propsCityName) {
          ncurrentpatientsLists.push(area.ncurrentpatients);
          ndeaths.push(area.ndeaths);
        }
      }
    }
    setLastUpdateData(ncurrentpatientsLists);
    setAreaInfo(ndeaths);
  };

  const [propData, setPropData] = useState([
    {
      name_jp: "",
      ncurrentpatients: 0,
      npatients: 0,
      nexits: 0,
      ndeaths: 0,
    },
  ]);

  const leftBedn = props.propsBedn - propData[0]?.ncurrentpatients;

  const data = {
    labels: [
      [`現在患者数(${propData[0]?.ncurrentpatients})`],
      [`想定病床残数(${leftBedn})`],
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [[propData[0]?.ncurrentpatients], 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options: any = {
    maintainAspectRatio: false,
    responsive: false,
    padding: "200px",
  };

  const lineData = {
    labels: [...lastUpdate], //日付
    datasets: [
      {
        label: "入院治療を要する者",
        data: lastUpdateData,
        borderColor: ["rgb(80,80,205)"], //折れ線の色
        borderWidth: 2,
        yAxisID: "requirePatientsChart",
      },
      {
        label: "救急搬送困難事案数",
        data: areaInfo,
        showLine: false,
        pointBackgroundColor: ["rgb(255,0,0)"],
        pointBorderColor: ["rgb(119,119,119)"],
        yAxisID: "emargencyChart",
      },
    ],
  };

  const lineOptions: any = {
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
  const dispatch = useDispatch<AppStore>();

  useEffect(() => {
    dispatch(fetchCovid19japanAll());
  }, []);
  useEffect(() => {
    setPropData(
      props.propsPrefectureInfo.filter(
        (name: any) => name.cityName === props.propsCityName
      )
    );
    getJapanAllData();
  }, [japanAllData]);

  return (
    <div className="text-center">
      <p>
        {" "}
        {props.propsCityName} 現在患者数/対策病床数
        {Math.floor(
          (Number(propData[0]?.ncurrentpatients) / Number(props.propsBedn)) *
            100
        )}
        %
      </p>

      <div style={{ display: "inline-block" }}>
        <Pie data={data} width={"500"} height={"300"} options={options} />

        <p>
          <span>累積陽性者:{propData[0]?.npatients.toLocaleString()}人</span>
          <span> 累積退院者:{propData[0]?.nexits.toLocaleString()}人</span>
        </p>
        <p>
          <span>累積死者:{propData[0]?.ndeaths.toLocaleString()}人 </span>
          <span>対策病床数:{props.propsBedn.toLocaleString()}人</span>
        </p>
      </div>
      <Line data={lineData} width={70} height={30} options={lineOptions} />
    </div>
  );
};
