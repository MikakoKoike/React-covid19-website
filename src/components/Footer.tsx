import React from "react";
import styled from "styled-components";
import bannerA from "../images/bannerA.png";
import bannerB from "../images/bannerB.png";
import bannerC from "../images/bannerC.png";

export const Footer = () => {
  return (
    <div>
      <div className="flex py-4 ">
        <img src={bannerA} alt="bannerA" className="w-1/3 px-2" />
        <img
          src={bannerB}
          alt="bannerB"
          className="w-1/3 px-2 border-solid border"
        />
        <img src={bannerC} alt="bannerC" className="w-1/3 px-2" />
      </div>
    </div>
  );
};
