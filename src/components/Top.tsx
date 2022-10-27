import axios from "axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  centerState,
  dataState,
  nbedState,
  ndeathsState,
  nexitsState,
} from "../store/Atom";
import { PrefectureChart } from "./molecules/PrefectureChart";

export const Top = () => {
  //useEffect内でgetDataを呼ぶ
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan.json"
      );
      console.log(res.data);
      setNcurrentpatients(res.data.ncurrentpatients);
      setNdeaths(res.data.ndeaths);
      setNexits(res.data.nexits);
      // const response = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  //   getData();

  const [center, setCenter] = useRecoilState(centerState);
  const [ncurrentpatients, setNcurrentpatients] = useRecoilState(dataState);
  const [ndeaths, setNdeaths] = useRecoilState(ndeathsState);
  const [nexits, setNexits] = useRecoilState(nexitsState);
  const [nbed,setNbed] = useRecoilState(nbedState)
  return (
    <div>
      {/* TopChart */}
      {/* <button onClick={getData}>ボタン</button> */}
      {/* <br />
      <button
        onClick={() => {
          setCenter("押された!");
        }}
      >
        Press Here!
      </button>
      <p>{center}</p>
      <p>現在患者数:{ncurrentpatients.toLocaleString()}</p> */}
      {/* <p>死者数:{ndeaths}</p> */}
      <br />
      <div className="border-2 border-opacity-100 border-[#ad232f] w-fit">
        <div className="grid grid-cols-2 text-center  ">
          <div className=" border-[#ad232f] border-2 ">
            現在患者数/対策病床数
          </div>
          <div className=" border-[#ad232f] border-2">現在患者数</div>
        </div>
        <div className="grid grid-cols-2 text-center ">
          <div className="bg-[#ad232f] text-white h-10 text-2xl md:text-4xl">
            {Math.floor(Number())}
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
          <div className="border-[#ad232f] border-2">対策病床数 ---人</div>
          <div className="border-[#ad232f] border-2">PCR検査陽性者数---人</div>
        </div>
        <div className="rid grid-cols-1 text-center">
          <div className="border-[#ad232f] border-2 h-12 text-xs">
            <p>臨床工学技士 14,378人 / 人工呼吸器 28,197台 / ECMO 1,412台</p>
            <p>
              2020年2月回答 出典 一般社団法人 日本呼吸療法医学会　公益社団法人
              日本臨床工学技士会
            </p>
          </div>
        </div>
      </div>
      <PrefectureChart></PrefectureChart>
    </div>
  );
};
