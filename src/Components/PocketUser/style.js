import styled from 'styled-components'

export const StyledListGroup = styled.ul`
  display: contents;
  list-style-type: none;
  button {
    display: flex;
    flex-direction: row;
    display: inline-block;
    border: none;
    width: 100%;
    background: transparent;
    cursor: pointer;
    font-family: Montserrat;
    font-style: normal;
    font-size: 26px;
  }
`

export const StyledBigDiv = styled.div`
  width: 100%;
  height: 5rem;
  border-radius: 15px;
  background: #ffffff;
  border: 2px solid #000000;
  display: inline-block;
  align-items: center;
  .registerNumber {
    width: 100%;
  }
`

export const StyledText = styled.text`
  margin: auto;
  text-align: center;
  width: 50%;
  background: transparent;
  font-family: Montserrat;
  font-style: normal;
  font-size: 26px;
`
