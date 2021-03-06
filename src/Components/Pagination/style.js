import styled from "styled-components";
import { colors } from "../../style";

export const StyledNavigation = styled.nav``;
export const StyledPagination = styled.ul`
  border-radius: 0px 0px 10px 10px;
  list-style-type: none;
  overflow: hidden;
  background-color: ${colors.header};
`;
export const StyledPageItems = styled.li`
  float: left;
`;
export const StyledPageLink = styled.button`
  cursor: pointer;
  display: block;
  color: white;
  background-color: transparent;
  border: none;
  text-align: center;
  padding: 16px;
  text-decoration: none;
  :focus {
    background-color: ${colors.blue};
  }
`;
