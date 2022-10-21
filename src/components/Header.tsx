import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <div>
      <h1 className="text-white w-auto text-3xl md:text-5xl bg-[#ad232f] text-center font-bold font-sans p-[14.432px] block ">
        COVID-19 Japan
      </h1>
      <p className="text-white text-center text-base md:text-lg bg-[#ad232f] p-[5.412px]">
        新型コロナウイルス対策ダッシュボード
      </p>
    </div>
  );
};
