import React, { useState } from "react";
import DivSelectSetor from "./styles";

const DropDownButton = ({ onChangeOpt }) => {
  return (
    <DivSelectSetor>
      <select onChange={onChangeOpt}>
        <option selected value="criminal">
          Criminal
        </option>
        <option value="tecnologia">Tecnologia</option>
        <option value="administrativa">Administrativo</option>
        <option value="civil">civil</option>
      </select>
    </DivSelectSetor>
  );
};

export default DropDownButton;