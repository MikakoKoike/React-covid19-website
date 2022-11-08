import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchBedInfo,
  fetchPrefectureInfo,
  fetchRatioData,
} from "../../redux/counterSlice";
import { AppStore } from "../../redux/store";
import Modal from "react-modal";
import { JapanChart } from "../JapanChart";
import { TopChart } from "../TopChart";

export const PrefectureChart = (props: any) => {
  const areaData = useSelector((state: any) => state.counter.areaInfo);
  const preBedData = useSelector((state: any) => state.counter.bedInfo);
  const ratioInfo = useSelector((state: any) => state.counter.ratio);
  // console.log(ratioInfo);

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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  useEffect(() => {
    dispatch(fetchPrefectureInfo());
    dispatch(fetchBedInfo());
    dispatch(fetchRatioData());
  }, []);

  return (
    <React.Fragment>
      <div></div>
      {/* parent */}
      <div className="md:grid md:basis-1/2">
        {/* grid_A */}
        <div className=" text-center grid grid-cols-7 text-xs gap-1 pl-5">
          {/* grid_B */}
          <button
            onClick={() => setIsOpen(true)}
            className="col-span-2 text-[4px]  bg-black text-white block align-middle"
          >
            <span className="text-base">
              {props.propNcurrentpatients.toLocaleString()}
            </span>
            /
            <span className="text-base">
              {props.propBedNum.toLocaleString()}
            </span>
            <p> (全国)現在患者数/対策病床数</p>
          </button>

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
      <Modal isOpen={modalIsOpen} ariaHideApp={false}>
        <JapanChart propsTotalBedn={props.propBedNum}></JapanChart>
        {/* <TopChart></TopChart> */}
        <div className="text-center pt-5">
          <CloseBtn onClick={() => setIsOpen(false)}>とじる</CloseBtn>
        </div>
      </Modal>
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

const CloseBtn = styled.button`
  display: inline-block;
  text-align: center;
  margin: 0 auto;
`;
