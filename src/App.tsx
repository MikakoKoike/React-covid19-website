import "./App.css";
import { Header } from "./components/Header";
import { TopPage } from "./components/TopPage";
import { Footer } from "./components/Footer";
import { TopChart } from "./components/TopChart";
import styled from "styled-components";

export const App = () => {
  return (
    <div>
      <Header></Header>
      <TopPage></TopPage>

      <div className="text-xs text-center">
        新型コロナウイルス感染症（国内事例） 現在患者数 / 対策病床数
        ※軽症者等は自宅療養など、病床を使用しないことがあります
        <a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000164708_00001.html">
          （詳細）
        </a>
        <span style={{ display: "flex", justifyContent: "center" }}>
          （現在患者数&nbsp;&nbsp;
          <img
            src={require("../src/images/arrow.png")}
            alt="upArrow"
            style={{
              height: "12px",
              width: "12px",
              marginTop: "2px",
              verticalAlign: "middle",
            }}
          />
          前日より増加&nbsp;&nbsp;
          <img
            src={require("../src/images/downArrow.png")}
            alt="upArrow"
            style={{
              height: "10px",
              width: "10px",
              marginTop: "3px",
              verticalAlign: "middle",
              transform: "rotate(90deg)",
            }}
          />
          前日より減少）
        </span>
      </div>

      <Footer></Footer>
      <TopChart></TopChart>
    </div>
  );
};
export default App;
