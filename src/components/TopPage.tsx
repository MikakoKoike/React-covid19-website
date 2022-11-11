import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBedInfo,
  fetchUserById,
  fetchVentilatorInfo,
} from "../redux/counterSlice";
import { AppStore } from "../redux/store";
import { PrefectureChart } from "./molecules/PrefectureChart";

export const TopPage = () => {
  const ncurrentpatients = useSelector(
    (state: any) => state.counter.info.ncurrentpatients
  );

  const ndeaths = useSelector((state: any) => state.counter.info.ndeaths);
  const nexits = useSelector((state: any) => state.counter.info.nexits);
  const npatients = useSelector((state: any) => state.counter.info.npatients);
  const subBedn = useSelector((state: any) => state.counter.bedInfo);
  const ventilatorInfo = useSelector(
    (state: any) => state.counter.allVentilatorInfo
  );

  const lastUpdate = useSelector((state: any) => state.counter.info.lastUpdate);

  //病床数情報
  let subBedNum = [
    {
      bedn: 0, //病床数小計
      bedn_lastUpdate: 0, //更新日
    },
  ];

  subBedNum.splice(0);
  for (let bedTotal of subBedn) {
    subBedNum.push({
      bedn:
        Number(bedTotal.入院患者受入確保病床) +
        Number(bedTotal.宿泊施設受入可能室数),
      bedn_lastUpdate: bedTotal.更新日,
    });
  }

  const [totalBedNum, setTotalBedNum] = useState(0);

  /**
   * 全国の対策病床数（都道府県の合算）を算出する.
   */
  const getTotalBedNum = () => {
    setTotalBedNum(subBedNum.reduce((prev, current) => prev + current.bedn, 0));
  };

  const dispatch = useDispatch<AppStore>(); //actionをstoreに通知するためのdispatch

  useEffect(() => {
    dispatch(fetchUserById());
    dispatch(fetchBedInfo());
    dispatch(fetchVentilatorInfo());
  }, []);

  useEffect(() => {
    getTotalBedNum();
  }, [subBedn, ventilatorInfo]);

  return (
    <div className="p-5 md:flex md:flex-wrap justify-center ">
      {/* 左全国チャート */}
      <div className="border-opacity-100 border-[#ad232f] justify-center md:basis-1/2 md:justify-center">
        <div className="grid grid-cols-2 text-center md:grid md:justify-start ">
          <div className=" border-[#ad232f] border-2 ">
            現在患者数/対策病床数
          </div>
          <div className=" border-[#ad232f] border-2">現在患者数</div>
        </div>
        <div className="grid grid-cols-2 text-center  ">
          <div className="bg-[#ad232f] text-white h-14  text-2xl md:text-4xl">
            {Math.floor((Number(ncurrentpatients) / Number(totalBedNum)) * 100)}
            %
          </div>
          <div className="bg-[#ad232f] text-white h-14 text-2xl md:text-4xl align-middle">
            {ncurrentpatients.toLocaleString()}人
          </div>
          <div className="border-[#ad232f] border-2">累積退院者</div>
          <div className="border-[#ad232f] border-2">死亡者</div>
          <div className="bg-[#ad232f] text-white h-14 text-2xl md:text-4xl">
            {nexits.toLocaleString()}人
          </div>
          <div className="bg-[#ad232f] text-white h-14 text-2xl md:text-4xl ">
            {ndeaths.toLocaleString()}人
          </div>
        </div>
        <div className="grid grid-cols-2 text-center ">
          <div className="border-[#ad232f] border-2">
            対策病床数{totalBedNum.toLocaleString()}人
          </div>
          <div className="border-[#ad232f] border-2">
            PCR検査陽性者数{npatients.toLocaleString()}人
          </div>
        </div>
        <div className="rid grid-cols-1 text-center ">
          <div className="border-[#ad232f] border-2 h-12 text-[10px]">
            <p>
              臨床工学技士 {ventilatorInfo[47]?.ce.toLocaleString()}人 /
              人工呼吸器 {ventilatorInfo[47]?.ventilator.toLocaleString()}台 /
              ECMO
              {ventilatorInfo[47]?.ecmo.toLocaleString()}台
            </p>
            <a
              className="url"
              href="https://ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/"
            >
              2020年2月回答 出典 一般社団法人 日本呼吸療法医学会　公益社団法人
              日本臨床工学技士会
            </a>
          </div>
        </div>
      </div>
      {/* 更新日 */}
      {/* <div className="text-xs text-center md:grid md:justify-start md:order-last ">
        <div>現在患者数 更新日:{lastUpdate}</div>
        <p>対策病床数 発表日:{subBedNum[0]?.bedn_lastUpdate}</p>
        <p>
          新型コロナ対策病床数は「
          <a href="https://www.mhlw.go.jp/bunya/kenkou/kekkaku-kansenshou15/02-02.html">
            感染症指定医療機関の指定状況
          </a>
          」の下記合計と仮定
        </p>
        <div>
          <input type="checkbox" />
          特定 <input type="checkbox" />
          一種 <input type="checkbox" />
          二種（感染） <input type="checkbox" />
          二種（結核） <input type="checkbox" />
          二種（一般/精神）
        </div>
      </div> */}
      <br />
      {/* 右都道府県チャート */}
      <PrefectureChart
        className={"justify-center  md:justify-center"}
        propNcurrentpatients={ncurrentpatients}
        propBedNum={totalBedNum}
        // propVentilatorInfo={allVentilatorInfo}
      ></PrefectureChart>
    </div>
  );
};
