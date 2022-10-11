import styled from "styled-components";
import { BaseButton } from "./BaseButton";

export const PrimaryButton = (props: any) => {
  const { children } = props;
  return <SButton>{children}</SButton>;
};

//BaseButtonコンポーネントに上書き、追加する形でCSSを当てていく
const SButton = styled(BaseButton)`
  background-color: #40514e;
`;
