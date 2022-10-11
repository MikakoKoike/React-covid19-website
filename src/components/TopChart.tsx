import axios from "axios";
import { useRecoilState } from "recoil";
import { centerState, dataState } from "../store/Atom";

export const TopChart = () => {
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://www.stopcovid19.jp/data/covid19japan.json"
      );
      console.log(res.data);
      setData(res.data.description);

      // const response = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const [center, setCenter] = useRecoilState(centerState);
  const [data, setData] = useRecoilState(dataState);

  return (
    <div>
      TopChart
      <button onClick={getData}>ボタン</button>
      <br />
      <button
        onClick={() => {
          setCenter("押された!");
        }}
      >
        Press Here!
      </button>
      <p>{center}</p>
      <p>{data}</p>
    </div>
  );
};
