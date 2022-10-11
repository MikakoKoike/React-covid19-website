import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { PrimaryButton } from "./components/atoms/button/PrimaryButton";
import { SecondaryButton } from "./components/atoms/button/SecondaryButton";
import { SearchInput } from "./components/molecules/SearchInput";
import { Header } from "./components/Header";
import { TopChart } from "./components/TopChart";
import { RecoilRoot } from "recoil";
import { Sample } from "./components/Sample";

export const App = () => {
  return (
    <div>
      <RecoilRoot>
        <Header></Header>
        <TopChart></TopChart>
        <Sample></Sample>
        <PrimaryButton>テスト</PrimaryButton>
        <SecondaryButton>検索</SecondaryButton>
        <br />
        <SearchInput></SearchInput>
      </RecoilRoot>
    </div>
  );
};
export default App;
