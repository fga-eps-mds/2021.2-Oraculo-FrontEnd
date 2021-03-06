import styled from "styled-components";
import { colors, fonts } from "../../style";

export const StyledBody = styled.div`
  display: -ms-flexbox;
  align-items: center;
  margin-inline: 15rem;
  div {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
  }
`;

export const StyledOrganizeButtons = styled.div`
  background: ${colors.header};
  border: 0px solid #5e5e5e;
  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
  height: 4rem;
  align-items: center;
`;

export const StyledSmallButton = styled.button`
  width: 10%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.font};
  color: ${colors.white};
  font-style: normal;
  font-size: ${fonts.sizeXXlg};
  text-align: center;
  background: transparent;
  cursor: pointer;
  border: none;
`;

export const StyledBigButton = styled.button`
  width: 18%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.font};
  color: ${colors.white};
  font-style: normal;
  font-size: ${fonts.sizeXXlg};
  line-height: 20px;
  text-align: center;
  background: transparent;
  cursor: pointer;
  border: none;
`;
