import styled from "styled-components";

export const styles = {};

export const StyledBigDiv = styled.div`
  width: 100%;
  height: 5rem;
  border-radius: 15px;
  background: #ffffff;
  border: 2px solid #000000;
  display: inline-block;
  align-items: center;
  text-align: center;
  .registerNumber {
    width: 16%;
  }
  .city {
    width: 15%;
  }
  .state {
    width: 7%;
  }
  .requester {
    width: 18%;
  }
  .inclusionDate {
    width: 12%;
  }
  .seiNumber {
    width: 15%;
  }
  .tag {
    width: 10%;
  }
  .extra {
    width: 7%;
    padding-left: 1.8rem;
  }
  a {
    text-decoration: none;
    color: black;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: Montserrat;
    font-style: normal;
    font-size: 26px;
  }
  button {
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: Montserrat;
    font-style: normal;
    font-size: 26px;
  }
  /* Tooltip container */
  .tooltip {
    position: relative;
    display: inline-block;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    font-size: 1rem;
    visibility: hidden;
    width: 150px;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -73px;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }

  /* Tooltip arrow */
  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export const StyledA = styled.a`
  text-decoration: none;
  color: black;
`;
