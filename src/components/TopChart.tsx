import axios from "axios";
import { useRecoilState } from "recoil";
import { centerState, dataState } from "../store/Atom";

export const TopChart = () => {
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan.json"
      );
      //   console.log(res.data);
      setNcurrentpatients(res.data.ncurrentpatients);
      //   setNdeaths(res.data.ndeaths);
      // const response = res.data;
    } catch (error) {
      console.log(error);
    }
  };
  getData();

  const [center, setCenter] = useRecoilState(centerState);
  const [ncurrentpatients, setNcurrentpatients] = useRecoilState(dataState);
  //   const [ndeaths, setNdeaths] = useRecoilState(dataState);
  return (
    <div>
      TopChart
      {/* <button onClick={getData}>ボタン</button> */}
      <br />
      <button
        onClick={() => {
          setCenter("押された!");
        }}
      >
        Press Here!
      </button>
      <p>{center}</p>
      <p>現在患者数:{ncurrentpatients.toLocaleString()}</p>
      {/* <p>死者数:{ndeaths}</p> */}
      <div className="border-2 border-opacity-100 border-[#ad232f] w-2/5">
        <div className="grid grid-cols-2 text-center  ">
          <div className=" border-[#ad232f] border-2 ">
            現在患者数/対策病床数
          </div>
          <div className=" border-[#ad232f] border-2">現在患者数</div>
        </div>
        <div className="grid grid-cols-2 text-center ">
          <div className="bg-[#ad232f] text-white p-[20px] text-4xl h-14">
            5
          </div>
          <div className="bg-[#ad232f] text-white h-14 text-4xl p-[5px]">
            {ncurrentpatients.toLocaleString()}人
          </div>
          <div className="border-[#ad232f] border-2">累積退院者</div>
          <div className="border-[#ad232f] border-2">死亡者</div>
          <div className="bg-[#ad232f] text-white h-14">8</div>
          <div className="bg-[#ad232f] text-white h-14">8</div>
        </div>
        <div className="grid grid-cols-2 text-center">
          <div className="border-[#ad232f] border-2">対策病床数 ---人</div>
          <div className="border-[#ad232f] border-2">PCR検査陽性者数---人</div>
        </div>
        <div className="rid grid-cols-1 text-center">
          <div className="border-[#ad232f] border-2">
            <p>臨床工学技士 14,378人 / 人工呼吸器 28,197台 / ECMO 1,412台</p>
            <p>
              2020年2月回答 出典 一般社団法人 日本呼吸療法医学会　公益社団法人
              日本臨床工学技士会
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
