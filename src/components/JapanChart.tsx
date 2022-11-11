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
  const ncurrentpatients = useSelector(
    (state: any) => state.counter.info.ncurrentpatients
  );
  const ventilatorInfo = useSelector(
    (state: any) => state.counter.allVentilatorInfo
  );
  const ndeaths = useSelector((state: any) => state.counter.info.ndeaths);
  const nexits = useSelector((state: any) => state.counter.info.nexits);
  const npatients = useSelector((state: any) => state.counter.info.npatients);
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
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options: any = {
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
      <div className="md:inline-block">
        <Pie data={data} width={"500"} height={"350"} options={options} />
        <p>
          <span>累積陽性者:{npatients.toLocaleString()}人</span>
          <span> 累積退院者:{nexits.toLocaleString()}人</span>
        </p>
        <p>
          <span>累積死者:{ndeaths.toLocaleString()}人 </span>
          <span>対策病床数:{props.propsTotalBedn.toLocaleString()}人</span>
        </p>
        <br />
        <p className="text-xs">
          <a
            className="underline decoration-solid decoration-[#898989] "
            href="http://www.jibika.or.jp/members/information/info_corona.html"
          >
            一般社団法人 日本耳鼻咽喉科学会
          </a>
          定義におけるハイリスク地域(現在患者数{ncurrentpatients}名{">"}= 10名)
        </p>
        <p className="text-xs">
          (参考) 臨床工学技士:{ventilatorInfo[47]?.ce.toLocaleString()}人
          マスク専用含む人工呼吸器取扱:
          {ventilatorInfo[47]?.ventilator.toLocaleString()}台 ECMO装置取扱:
          {ventilatorInfo[47]?.ecmo.toLocaleString()}台
        </p>
        <p className="text-xs">
          2020年2月回答 出典:
          <a
            className="underline decoration-solid decoration-[#898989] "
            href="https://ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/"
          >
            一般社団法人 日本呼吸療法医学会 公益社団法人 日本臨床工学技士会
          </a>
        </p>{" "}
      </div>
    </div>
  );
};
