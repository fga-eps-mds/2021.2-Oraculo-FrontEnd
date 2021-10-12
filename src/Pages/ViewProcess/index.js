import React, { useState } from "react";
import Header from "../../Components/Header";
import {
  StyledDivInfoProcess,
  StyledDivShowProcess,
  StyledDivSupProcess,
  StyledDivButtons,
} from "./style";
import { FaUserCircle, FaTelegramPlane, FaPen } from "react-icons/fa";
import DropDownButton from "../../Components/DropDownButton";
import FowardSector from "../../Components/FowardSetor";
import GenericWhiteButton from "../../Components/GenericWhiteButton";
import GenericRedButton from "../../Components/GenericRedButton";
import toast, { Toaster } from "react-hot-toast";
import { getProcessByID } from "../../Services/Axios/processService";

const ViewProcess = (props) => {
  const [sector, setSector] = useState("criminal");
  const [foward, setFoward] = useState([]);
  const [seiNumber, setSeiNumber] = useState("");
  const [documentDate, setDocumentDate] = useState("");

  window.onload = async function getProcess() {
    const process = await getProcessByID(props.id, toast);
    setSeiNumber(process.sei_number);
    setDocumentDate(process.document_date);
  };

  const handleButtonProcess = () => {
    alert("Função ainda nao implementada");
  };

  const handleFoward = () => {
    const newFoward = [
      ...foward,
      {
        setor: sector,
        setorOrigin: "criminal",
        date: "15/02/2021",
        dateFoward: "15/02/2021",
        name: "nome default encarregado",
      },
    ];
    setFoward(newFoward);
  };

  return (
    <>
      <Header />
      <Toaster />
      <StyledDivSupProcess>
        <StyledDivShowProcess>
          <div className="infoProcess">
            <div className="infoProcessicon">
              <p>{seiNumber}</p>
              <FaPen />
            </div>
            <span>Data de Emissão: {documentDate}</span>
          </div>
          <FowardSector foward={foward} />

          <StyledDivButtons>
            <GenericWhiteButton title="voltar" onClick={handleButtonProcess} />
            <GenericRedButton title="concluir" onClick={handleButtonProcess} />
          </StyledDivButtons>
        </StyledDivShowProcess>
        <StyledDivInfoProcess>
          <h2>Joana Depolice</h2>
          <hr></hr>
          <span>Emissor:</span>
          <div className="issuerIcon">
            <FaUserCircle />
            <p>Willian Cops</p>
          </div>
          <span>Setor:</span>

          <DropDownButton
            onChangeOpt={(event) => setSector(event.target.value)}
          />

          <div className="fowardIcon">
            <p onClick={handleFoward}>Encaminhar</p>
            <FaTelegramPlane />
          </div>
          <span>Tags:</span>
          <div className="tagsTest">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <a className="historic" href="//">
            Histórico de alterações
          </a>
        </StyledDivInfoProcess>
      </StyledDivSupProcess>
    </>
  );
};

export default ViewProcess;