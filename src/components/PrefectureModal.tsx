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
  const ventilatorInfo = useSelector(
    (state: any) => state.counter.allVentilatorInfo
  );
  const [lastUpdate, setLastUpdate] = useState([]); //更新日
  const [areaData, setAreaData] = useState([]);
  const [lastUpdateData, setLastUpdateData] = useState([]);
  const [areaInfo, setAreaInfo] = useState([]);
  let dateLists: any = [];
  let areaLists: any = [];
  let ncurrentpatientsLists: any = [];
  let ndeaths: any = [];

  /**
   * 棒グラフ（都道府県）作成のためのデータを取得する.
   */
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

  const [ventilatorNum, setVentilatorNum] = useState([
    {
      ecmo: 0,
      ventilator: 0,
      ce: 0,
      bedTotal: 0,
      cityName: "",
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
    maintainAspectRatio: true,
    responsive: true,
    // padding: "200px",
    height: "100px",
    width: "100px",
  };

  const lineData = {
    labels: [...lastUpdate], //日付
    datasets: [
      {
        label: "入院治療を要する者",
        font: {
          size: 5,
        },
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
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      emargencyChart: {
        type: "linear",
        position: "left",
        title: {
          display: window.screen.width > 414,
          text: "PCR検査陽性者数・累計死亡者数・緊急搬送困難事案数",
          font: {
            size: 10,
          },
        },
      },
      requirePatientsChart: {
        type: "linear",
        position: "right",
        title: {
          display: window.screen.width > 414,
          text: "PCR検査実施件数・現在入院治療を要する者",
          font: {
            size: 10,
          },
        },
      },
      plugins: {
        // font: function (context: any) {
        //   var width = context.chart.width;
        //   var size = Math.round(width / 32);
        //   return {
        //     size: size,
        //   };
        // },
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
    setVentilatorNum(
      ventilatorInfo.filter(
        (ventilator: any) => ventilator.cityName === props.propsCityName
      )
    );

    getJapanAllData();
  }, [japanAllData, ventilatorInfo]);

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

      <div className="md:inline-block">
        <Pie data={data} width={"500"} height={"300"} options={options} />

        <p>
          <span>累積陽性者:{propData[0]?.npatients.toLocaleString()}人</span>
          <span> 累積退院者:{propData[0]?.nexits.toLocaleString()}人</span>
        </p>
        <p>
          <span>累積死者:{propData[0]?.ndeaths.toLocaleString()}人 </span>
          <span>対策病床数:{props.propsBedn.toLocaleString()}人</span>
        </p>
        <p className="text-xs">
          <a
            className="underline decoration-solid decoration-[#898989] "
            href="http://www.jibika.or.jp/members/information/info_corona.html"
          >
            一般社団法人 日本耳鼻咽喉科学会
          </a>
          定義におけるハイリスク地域(現在患者数{propData[0]?.ncurrentpatients}名
          {">"}= 10名)
        </p>
        <p className="text-xs">
          (参考) 臨床工学技士:{ventilatorNum[0]?.ce}人
          マスク専用含む人工呼吸器取扱:
          {ventilatorNum[0]?.ventilator}台 ECMO装置取扱:
          {ventilatorNum[0]?.ecmo}台
        </p>
        <p className="text-xs">
          2020年2月回答 出典:
          <a
            className="underline decoration-solid decoration-[#898989] "
            href="https://ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/"
          >
            一般社団法人 日本呼吸療法医学会 公益社団法人 日本臨床工学技士会
          </a>
        </p>
        <br />
        <div className="relative w-auto h-auto">
          <Line
            data={lineData}
            width={500}
            height={350}
            options={lineOptions}
          />
        </div>
      </div>
      {/* <Line data={lineData} options={lineOptions} /> */}
    </div>
  );
};
