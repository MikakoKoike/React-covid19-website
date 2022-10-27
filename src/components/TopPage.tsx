import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBedInfo,
  fetchUserById,
  fetchVentilatorInfo,
} from "../redux/counterSlice";
import { AppStore } from "../redux/store";

export const TopPage = () => {
  const ncurrentpatients = useSelector(
    (state: any) => state.counter.info.ncurrentpatients
  );
  const ndeaths = useSelector((state: any) => state.counter.info.ndeaths);
  const nexits = useSelector((state: any) => state.counter.info.nexits);
  const npatients = useSelector((state: any) => state.counter.info.npatients);
  const subBedn = useSelector((state: any) => state.counter.bedInfo);
  const ventilatorNum = useSelector(
    (state: any) => state.counter.ventilatorInfo
  );
  // console.log(ventilatorNum);

  // console.log(subBedn);
  //病床数小計
  let subBedNum = [
    {
      bedn: 0,
    },
  ];
  subBedNum.splice(0);
  for (let bedTotal of subBedn) {
    subBedNum.push({
      bedn:
        Number(bedTotal.入院患者受入確保病床) +
        Number(bedTotal.宿泊施設受入可能室数),
    });
  }
  // console.log(subBedNum);

  //人工呼吸器情報
  let allVentilatorInfo = [
    {
      ecmo: 0,
      ventilator: 0,
      ce: 0,
      cityName: "",
    },
  ];
  allVentilatorInfo.splice(0);
  for (let ventilatorInfo of ventilatorNum) {
    allVentilatorInfo.push({
      ecmo: Number(ventilatorInfo["ECMO装置取扱（台）"]),
      ventilator:
        Number(ventilatorInfo["マスク専用人工呼吸器取扱（台）"]) +
        Number(ventilatorInfo["人工呼吸器取扱（台）"]),
      ce: Number(ventilatorInfo["総CE（名）"]),
      cityName: ventilatorInfo["都道府県"],
    });
  }
  // console.log(allVentilatorInfo[47]);

  const [totalBedNum, setTotalBedNum] = useState(0);
  // const [ventilator, setVentilator] = useState({});
  /**
   * 全国の対策病床数（都道府県の合算）を算出する.
   */
  const getTotalBedNum = () => {
    setTotalBedNum(subBedNum.reduce((prev, current) => prev + current.bedn, 0));
    // setVentilator({ allVentilatorInfo });
  };
  // console.log(ventilator);

  const dispatch = useDispatch<AppStore>(); //actionをstoreに通知するためのdispatch

  useEffect(() => {
    dispatch(fetchUserById());
    dispatch(fetchBedInfo());
    dispatch(fetchVentilatorInfo());
  }, []);

  useEffect(() => {
    getTotalBedNum();
  }, [subBedn, ventilatorNum]);

  return (
    <div>
      TopPage
      {/* <div>{ncurrentpatients.toLocaleString()}</div>
      <div>{ndeaths}</div>
      <div>{nexits}</div> */}
      <div className="border-2 border-opacity-100 border-[#ad232f] w-fit">
        <div className="grid grid-cols-2 text-center  ">
          <div className=" border-[#ad232f] border-2 ">
            現在患者数/対策病床数
          </div>
          <div className=" border-[#ad232f] border-2">現在患者数</div>
        </div>
        <div className="grid grid-cols-2 text-center ">
          <div className="bg-[#ad232f] text-white h-10 text-2xl md:text-4xl">
            {Math.floor((Number(ncurrentpatients) / Number(totalBedNum)) * 100)}
            %
          </div>
          <div className="bg-[#ad232f] text-white h-10 text-2xl md:text-4xl">
            {ncurrentpatients.toLocaleString()}人
          </div>
          <div className="border-[#ad232f] border-2">累積退院者</div>
          <div className="border-[#ad232f] border-2">死亡者</div>
          <div className="bg-[#ad232f] text-white h-10 text-2xl md:text-4xl">
            {nexits.toLocaleString()}人
          </div>
          <div className="bg-[#ad232f] text-white h-10 text-2xl md:text-4xl ">
            {ndeaths.toLocaleString()}人
          </div>
        </div>
        <div className="grid grid-cols-2 text-center">
          <div className="border-[#ad232f] border-2">
            対策病床数{totalBedNum.toLocaleString()}人
          </div>
          <div className="border-[#ad232f] border-2">
            PCR検査陽性者数{npatients.toLocaleString()}人
          </div>
        </div>
        <div className="rid grid-cols-1 text-center">
          <div className="border-[#ad232f] border-2 h-12 text-xs">
            <p>
              臨床工学技士 {allVentilatorInfo[47]?.ce.toLocaleString()}人 /
              人工呼吸器 {allVentilatorInfo[47]?.ventilator.toLocaleString()}台
              / ECMO
              {allVentilatorInfo[47]?.ecmo.toLocaleString()}台
            </p>

            <a href="https://ja-ces.or.jp/info-ce/%e4%ba%ba%e5%b7%a5%e5%91%bc%e5%90%b8%e5%99%a8%e3%81%8a%e3%82%88%e3%81%b3ecmo%e8%a3%85%e7%bd%ae%e3%81%ae%e5%8f%96%e6%89%b1%e5%8f%b0%e6%95%b0%e7%ad%89%e3%81%ab%e9%96%a2%e3%81%99%e3%82%8b%e7%b7%8a/">
              2020年2月回答 出典 一般社団法人 日本呼吸療法医学会　公益社団法人
              日本臨床工学技士会
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
