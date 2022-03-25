import styled from "styled-components";
import { fonts } from "../../style";

export const CircleColor = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 1px solid #000000;
`;

export const StyledCreateTag = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: black;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .input-section {
    width: 100%;
    justify-content: space-around;
    align-items: center;
    display: flex;
    margin-bottom: 1rem;
    input {
      padding: 1rem 5rem 1rem 1rem;
      border-radius: ${fonts.sizeSm};
      font-size: 1rem;
    }
    div {
      align-items: center;
      p {
        margin-right: 1rem;
      }
      display: flex;
    }
  }
  .endOfPageDiv {
    display: flex;
    width: 100%;
    margin-top: 4rem;
    align-content: center;
    justify-content: flex-end;
    button {
      margin-left: 1rem;
    }
  }
`;

export const ColorPickerDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
