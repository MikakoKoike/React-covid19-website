import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { PrimaryButton } from "./components/atoms/button/PrimaryButton";
import { SecondaryButton } from "./components/atoms/button/SecondaryButton";
import { SearchInput } from "./components/molecules/SearchInput";
import { Header } from "./components/Header";
import { Top } from "./components/Top";
import { RecoilRoot } from "recoil";
import { Sample } from "./components/Sample";
import { TopPage } from "./components/TopPage";
import { fetchUserById } from "./redux/counterSlice";
import { AppStore } from "./redux/store";

export const App = () => {
  //state.counterはstore.jsのcounter
  // const ncurrentpatients = useSelector(
  //   (state: any) => state.counter.info.ncurrentpatients
  // );
  // const ndeaths = useSelector((state: any) => state.counter.info.ndeaths);
  // const nexits = useSelector((state: any) => state.counter.info.nexits);

  // const dispatch = useDispatch<AppStore>(); //actionをstoreに通知するためのdispatch

  // useEffect(() => {
  //   dispatch(fetchUserById());
  // }, []);

  return (
    <div>
      {/* <RecoilRoot> */}
      <Header></Header>
      {/* <div>{ncurrentpatients.toLocaleString()}</div>
      <div>{ndeaths}</div>
      <div>{nexits}</div> */}
      {/* <Top></Top> */}
      <TopPage></TopPage>
      {/* <Sample></Sample>
        <PrimaryButton>テスト</PrimaryButton>
        <SecondaryButton>検索</SecondaryButton>
        <br />
        <SearchInput></SearchInput> */}
      {/* </RecoilRoot> */}
    </div>
  );
};
export default App;
