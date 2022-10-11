import React from "react";
import { useRecoilValue } from "recoil";
import { centerState } from "../store/Atom";

export const Sample = () => {
  const center = useRecoilValue(centerState);
  return <div>Sampleコンポーネント:{center}</div>;
};
