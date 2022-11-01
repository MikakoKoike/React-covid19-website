import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchBedInfo,
  fetchPrefectureInfo,
  fetchRatioData,
} from "../../redux/counterSlice";
import { AppStore } from "../../redux/store";

export const PrefectureChart = () => {
  const areaData = useSelector((state: any) => state.counter.areaInfo);
  const preBedData = useSelector((state: any) => state.counter.bedInfo);
  const ratioInfo = useSelector((state: any) => state.counter.ratio);
  console.log(ratioInfo);

  let prefectureInfo = [
    {
      cityName: "",
      ncurrentpatients: 0,
      ndeaths: 0,
      nexits: 0,
      ninspections: 0,
      npatients: 0,
    },
  ];
  prefectureInfo.splice(0);
  for (let eachInfo of areaData) {
    prefectureInfo.push({
      cityName: eachInfo.name_jp,
      ncurrentpatients: eachInfo.ncurrentpatients,
      ndeaths: eachInfo.ndeaths,
      nexits: eachInfo.nexits,
      ninspections: eachInfo.ninspections,
      npatients: eachInfo.npatients,
    });
  }
  // console.log(prefectureInfo);

  const [subBedNum, setSubBedNum] = useState([
    {
      bedn: 0, //病床数小計
    },
  ]);
  subBedNum.splice(0);
  for (let bedTotal of preBedData) {
    subBedNum.push({
      bedn:
        Number(bedTotal.入院患者受入確保病床) +
        Number(bedTotal.宿泊施設受入可能室数),
    });
  }
  //前日比データ
  let ratioData = [
    {
      dcurrentpatients: 0,
    },
  ];
  ratioData.splice(0);
  for (let yesterdayData of ratioInfo) {
    ratioData.push({
      dcurrentpatients: yesterdayData.dcurrentpatients,
    });
  }

  const dispatch = useDispatch<AppStore>();

  useEffect(() => {
    dispatch(fetchPrefectureInfo());
    dispatch(fetchBedInfo());
    dispatch(fetchRatioData());
  }, []);

  return (
    <React.Fragment>
      PrefectureChart
      {/* parent */}
      <div className="">
        {/* grid_A */}
        <div className=" text-center grid grid-cols-7 text-xs gap-1">
          {/* grid_B */}
          <div className="col-span-2 text-[4px]  bg-black text-white block align-text-bottom">
            (全国)現在患者数/対策病床数
          </div>
          {prefectureInfo.map((item, index) => (
            <div key={item.cityName} className="bg-black text-white">
              <p className="text-xs h-4">
                <span className="flex justify-center">
                  {item.cityName.replace("県", "")}

                  {(() => {
                    if (ratioData[index]?.dcurrentpatients > 0) {
                      return (
                        <UpArrow
                          className=""
                          src={require("../../images/arrow.png")}
                        ></UpArrow>
                      );
                    } else {
                      return (
                        <DownArrow
                          src={require("../../images/downArrow.png")}
                        ></DownArrow>
                      );
                    }
                  })()}
                </span>
              </p>
              <p className="text-xs">
                {Math.floor(
                  Number(
                    (item.ncurrentpatients / Number(subBedNum[index]?.bedn)) *
                      100
                  )
                )}
                %
              </p>
              <span className="font-medium text-[5px]">
                {item.ncurrentpatients.toLocaleString()}
              </span>
              /
              <span className="text-[3px]">
                {subBedNum[index]?.bedn.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
const UpArrow = styled.img`
  height: 13px;
  width: 13px;
  margin-top: 2px;
`;
const DownArrow = styled.img`
  height: 13px;
  width: 13px;
  margin-top: 2px;
  transform: rotate(90deg);
`;
