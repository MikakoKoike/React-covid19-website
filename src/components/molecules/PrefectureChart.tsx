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
import { PrefectureModal } from "../PrefectureModal";

export const PrefectureChart = (props: any) => {
  const areaData = useSelector((state: any) => state.counter.areaInfo);
  const preBedData = useSelector((state: any) => state.counter.bedInfo);
  const ratioInfo = useSelector((state: any) => state.counter.ratio);

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
  const [prefectureModalIsOpen, setprefectureModalIsOpen] =
    React.useState(false);
  const [prop, setProp] = useState("");
  const [subBednum, setSubBednum] = useState([]);

  const showModal = (name_jp: string, subBedn: any) => {
    setProp(name_jp);
    setSubBednum(subBedn);
  };
  const ventilatorInfo = props.propVentilatorInfo;

  useEffect(() => {
    dispatch(fetchPrefectureInfo());
    dispatch(fetchBedInfo());
    dispatch(fetchRatioData());
  }, []);

  useEffect(() => {
    showModal(prop, subBednum);
  }, []);

  return (
    <React.Fragment>
      <div></div>
      {/* parent */}
      <div className="md:grid md:basis-1/2">
        {/* grid_A */}
        <div className=" text-center grid grid-cols-7 text-xs gap-1 md:pl-5">
          {/* grid_B */}
          <button
            onClick={() => setIsOpen(true)}
            className="col-span-2 text-[4px]  bg-black text-white block align-middle"
          >
            <span className="text-[10px] md:text-xs">
              {props.propNcurrentpatients.toLocaleString()}
            </span>
            /
            <span className="text-[12px] md:text-sm">
              {props.propBedNum.toLocaleString()}
            </span>
            <p className="text-[10px]"> (全国)現在患者数/対策病床数</p>
          </button>
          {/* 都道府県 */}
          {prefectureInfo.map((item, index) => (
            <button
              key={item.cityName}
              className="bg-black text-white"
              onClick={() => {
                setprefectureModalIsOpen(true);
                showModal(item.cityName, subBedNum[index]?.bedn);
              }}
            >
              <p className="text-[10px] md:text-xs h-4">
                <span className="flex justify-center">
                  {item.cityName.replace("県", "")}

                  {(() => {
                    if (ratioData[index]?.dcurrentpatients > 0) {
                      return (
                        <UpArrow
                          src={require("../../images/arrow.png")}
                          alt=""
                        ></UpArrow>
                      );
                    } else {
                      return (
                        <DownArrow
                          src={require("../../images/downArrow.png")}
                          alt=""
                        ></DownArrow>
                      );
                    }
                  })()}
                </span>
              </p>
              <p className="text-[14px] md:text-xs">
                {/* //10 */}
                {Math.floor(
                  Number(
                    (item.ncurrentpatients / Number(subBedNum[index]?.bedn)) *
                      100
                  )
                )}
                %
              </p>
              <span className="font-medium text-[12px] md:text-xs">
                {/* //6 */}
                {item.ncurrentpatients.toLocaleString()}/
              </span>

              <span className="text-[12px]">
                {subBedNum[index]?.bedn.toLocaleString()}
                {/* //6 */}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* 全国のモーダル */}
      <Modal isOpen={modalIsOpen} ariaHideApp={false}>
        <JapanChart
          propsTotalBedn={props.propBedNum}
          ventilatorInfo={ventilatorInfo}
        >
          {" "}
        </JapanChart>
        <div className="text-center pt-5">
          <CloseBtn onClick={() => setIsOpen(false)}>とじる</CloseBtn>
        </div>
      </Modal>
      {/* 都道府県のモーダル */}
      <Modal isOpen={prefectureModalIsOpen} ariaHideApp={false}>
        <PrefectureModal
          propsCityName={prop}
          propsPrefectureInfo={prefectureInfo}
          propsBedn={subBednum}
          ventilatorInfo={ventilatorInfo}
        ></PrefectureModal>
        <div className="text-center pt-5">
          <CloseBtn
            // style={{ display: "inline-block" }}
            onClick={() => setprefectureModalIsOpen(false)}
          >
            とじる
          </CloseBtn>
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
