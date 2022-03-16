import { useEffect, useState } from "react";
import { getDepartments } from "../../Services/Axios/profileService";
import DivSelectSetor from "./DivSelectSetor";

const DropDownButton = ({ onChangeOpt, departments }) => {

  return (
    <DivSelectSetor>
      <select onChange={onChangeOpt}>
        {departments.map(
          (item) =>
            item.name !== "none" && <option value={item.id}>{item.name}</option>
        )}
      </select>
    </DivSelectSetor>
  );
};

export default DropDownButton;
