import React, { useEffect, useState } from "react";
import HeaderWithButtons from "../../Components/HeaderWithButtons";
import {
  StyledDivInfoProcess,
  StyledDivShowProcess,
  StyledDivSupProcess,
  StyledDivButtons,
  StyledInfoDiv,
} from "./style";
import { FaUserCircle, FaTelegramPlane, FaPen } from "react-icons/fa";
import DropDownButton from "../../Components/DropDownButton";
import ForwardSector from "../../Components/ForwardSector";
import GenericWhiteButton from "../../Components/GenericWhiteButton";
import GenericBlueButton from "../../Components/GenericBlueButton";
import toast, { Toaster } from "react-hot-toast";
import { history } from "../../history";
import {
  closeRecord,
  forwardRecordInfo,
  getProcessByID,
  getRecordHistory,
  setStatusRecord,
  getUserByEmail,
  reopenRecord,
  confirmReceivement,
} from "../../Services/Axios/processService";
import { getRecordTagColors } from "../../Services/Axios/tagsService";
import {
  getDepartments,
  getInfoUser,
} from "../../Services/Axios/profileService";
import { useParams } from "react-router";
import {
  ModalDoubleCheck,
  ModalReasonProcess,
} from "../../Components/ModalDoubleCheck";
import { TagsList } from "./tags";
import { ModalReopenProcess } from "../../Components/ModalDoubleCheck";

const ViewRecord = () => {
  const naoCadastrada = "Informação não cadastrada".toLocaleUpperCase();
  const { id } = useParams();
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [forward, setForward] = useState([]);
  const [forwardData, setForwardData] = useState("");

  const [registerNumber, setRegisterNumber] = useState("");
  const [requester, setRequester] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [receiptForm, setReceiptForm] = useState("");
  const [seiNumber, setSeiNumber] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentContactInfo, setDocumentContactInfo] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userSectorNum, setUserSectorNum] = useState("");
  const [tags, setTags] = useState([]);
  const [reason, setReason] = useState("");
  const [reasonForward, setReasonForward] = useState("");
  const [physicalObject, setPhysicalObject] = useState(false);
  const [link, setLink] = useState("");
  const [keyWord, setKeyWord] = useState("");
  const [buttonModalConfirmForward, setButtonModalConfirmForward] =
    useState("");
  const [buttonModalConfirmReceivement, setButtonModalConfirmReceivement] =
    useState(false);
  const [buttonModal, setButtonModal] = useState("");
  const [buttonDone, setButtonDone] = useState(false);
  const [buttonModalReopen, setbuttonModalReopen] = useState(false);
  const [wasReceived, setWasReceived] = useState(true);
  const [receivedId, setReceivedId] = useState(0);

  useEffect(() => {
    async function fetchRecordData() {
      // get all records data by process by id
      const record = await getProcessByID(id, toast);

      setRegisterNumber(record.register_number);
      setSeiNumber(record.sei_number);
      setDocumentDate(record.document_date);
      setRequester(record.requester);
      setCity(record.city);
      setState(record.state);
      setDescription(record.description);
      setState(record.state);
      setReceiptForm(record.receipt_form);
      setDocumentNumber(record.document_number);
      setDocumentContactInfo(record.contact_info);
      setDocumentType(record.document_type);
      setPhysicalObject(record.have_physical_object);
      setLink(record.link);
      setKeyWord(record.key_words);
      const user = await getInfoUser(toast);
      setUserName(user.name);
      setUserEmail(user.email);
      setUserSectorNum(user.departments[0].id);

      record.receivements.forEach((receivement) => {
        if (receivement.department_id === user.departments[0].id) {
          setReceivedId(receivement.id);
          if (receivement.received === false) setWasReceived(false);
        }
      });

      const responseHR = await getRecordHistory(toast, id);
      const arrInfoForward = await Promise.all(
        responseHR.map((post) => previousForward(post))
      );

      await setForward(arrInfoForward);

      if (record.situation === "finished") {
        setButtonDone(true);
        document.querySelector(".forwardIcon").style.display = "none";
      }
    }

    async function fetchTagsData() {
      const [httpCode, recordTags] = await getRecordTagColors(id);
      if (httpCode === 200 && recordTags.length > 0) {
        setTags(recordTags);
      }
    }
    async function fetchDepartments() {
      const departmentsList = await getDepartments();
      setDepartments(departmentsList);
      if (department === "") {
        setDepartment(departmentsList[0].id);
      }
    }

    fetchTagsData();
    fetchRecordData();
    fetchDepartments();
  }, [buttonModalConfirmForward, wasReceived]);

  const confirmReceivementButton = () => {
    if (wasReceived === false) {
      return (
        <button
          className="processButton"
          onClick={async () => {
            setButtonModalConfirmReceivement(true);
          }}
        >
          <b>Confirmar recebimento deste registro</b>
        </button>
      );
    }
  };

  const getDate = () => {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, "0");
    var mes = String(data.getMonth() + 1).padStart(2, "0");
    var ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
  };

  const handleButtonProcessDone = () => {
    setButtonModal(true);
  };

  const handleButtonProcessReopen = () => {
    setbuttonModalReopen(true);
  };
  // used only in closed

  const handleClickModalBlueReopen = async () => {
    //check if the reason has been added
    if (reason) {
      //setting data of who reopened the record
      const infoRecord = {
        id: id,
        reopened_by: userEmail,
        reason: reason,
      };

      //send request to reopen the record
      await reopenRecord(infoRecord);

      const newForward = [
        ...forward,
        {
          setor: " ",
          setorOrigin: " ",
          name: userName,
          defaultText: "Registro reaberto",
          reason: "Motivo:",
          reasonText: reason,
          date: getDate(),
        },
      ];

      await setStatusRecord(id, "pending", toast);
      setForward(newForward);
      setbuttonModalReopen(false);
      setButtonDone(false);

      document.querySelector(".forwardIcon").style.display = "flex";
      setForwardData(infoRecord);
    } else toast.error("É obrigatório inserir a descrição");
  };

  const handleForward = async () => {
    setButtonModalConfirmForward(true);
  };

  const handleClickModalConfirmForward = async () => {
    const forwardRecInfo = {
      id: id,
      forwarded_by: userEmail,
      origin_id: userSectorNum,
      destination_id: department,
      reason: reasonForward,
    };
    await forwardRecordInfo(toast, forwardRecInfo);
    setButtonModalConfirmForward(false);
  };

  const handleClickModalWhite = () => {
    setButtonModal(false);
    setButtonModalConfirmForward(false);
    setButtonModalConfirmReceivement(false);
    setbuttonModalReopen(false);
  };

  const handleClickModalBlue = async () => {
    //setting data of who forwarded the record
    const infoRecord = {
      id: id,
      closed_by: userEmail,
      reason: reasonForward,
    };

    //send request to close record
    await closeRecord(infoRecord, toast);

    const newForward = [
      ...forward,
      {
        setor: " ",
        setorOrigin: " ",
        name: userName,
        defaultText: "Registro concluido",
        date: getDate(),
      },
    ];

    await setStatusRecord(id, "finished", toast);
    setForward(newForward);
    setButtonModal(false);
    setButtonDone(true);

    document.querySelector(".forwardIcon").style.display = "none";
    setForwardData(infoRecord);
  };

  const formatedDate = (infoDate) => {
    const dataDone = new Date(infoDate);
    return (
      dataDone.getDate() +
      "/" +
      (dataDone.getMonth() + 1) +
      "/" +
      dataDone.getFullYear()
    );
  };

  const previousForward = async (response) => {
    let newForward = {};
    const email = response.forwarded_by;

    if (email != null) {
      const infoUser = await getUserByEmail(email);
      const destinationID = response.destination_id;
      const originSecID = response.origin_id;
      const allDepartments2 = await getDepartments();

      const destinationSection = allDepartments2.filter((indice) => {
        return indice.id === destinationID;
      });

      const originSection = allDepartments2.filter((indice) => {
        return indice.id === originSecID;
      });

      const dataFormatadaCreatedAt = formatedDate(response.createdAt);
      const dataFormatadaUpdatedAt = formatedDate(response.updatedAt);

      newForward = {
        setor: destinationSection[0].name,
        setorOrigin: originSection[0].name,
        date: dataFormatadaCreatedAt,
        dateForward: dataFormatadaUpdatedAt,
        name: infoUser.name,
      };
    } else if (response.closed_by != null) {
      const dateDoneReg = formatedDate(response.closed_at);
      const infoUserDone = await getUserByEmail(response.closed_by);
      newForward = {
        setor: " ",
        setorOrigin: response.origin_name,
        defaultText: "Registro Concluído",
        date: dateDoneReg,
        dateForward: " ",
        name: infoUserDone.name,
      };
    } else if (response.reopened_by != null) {
      const dateReopenReg = formatedDate(response.reopened_at);
      const infoUserDone = await getUserByEmail(response.reopened_by);
      newForward = {
        setor: " ",
        setorOrigin: " ",
        defaultText: "Registro reaberto",
        reason: "Motivo:",
        reasonText: response.reason,
        date: dateReopenReg,
        dateForward: " ",
        name: infoUserDone.name,
      };
    } else {
      const infoUser = await getUserByEmail(response.created_by);
      const createDate = formatedDate(response.created_at);
      newForward = {
        setor: " ",
        setorOrigin: response.origin_name,
        defaultText: "Registro criado em: ",
        date: createDate,
        dateForward: " ",
        name: infoUser.name,
      };
    }
    return newForward;
  };

  function handleEditRegister() {
    history.push(`/editar-registro/${id}`);
    window.location.reload();
  }
  function handleViewHistoric() {
    history.push(`/historico-registro/${id}`);
    window.location.reload();
  }
  function hasLink() {
    if (link)
      return (
        <div class="link">
          <h3>Link:&nbsp;</h3>
          <h3 id="link">
            <a href={link} target="_blank">
              {link}
            </a>
          </h3>
        </div>
      );
  }

  const handleClickConfirmReceivement = async () => {
    const receivementInfo = {
      received_by: userEmail,
      received_id: receivedId,
      record_id: id,
      department_id: userSectorNum,
    };
    const res = await confirmReceivement(toast, receivementInfo);
    if (res.status === 200) setWasReceived(true);
    setButtonModalConfirmReceivement(false);
  };
  return (
    <>
      <HeaderWithButtons />
      <StyledDivSupProcess>
        <StyledDivShowProcess>
          <StyledInfoDiv>
            <div>
              <h2>Nº do registro:&nbsp;</h2>
              <h2>{registerNumber ? registerNumber : "Erro"}</h2>
              <FaPen
                size="2rem"
                onClick={handleEditRegister}
                class="info-icon"
              />
            </div>
            <div>
              <h3>Localidade:&nbsp;</h3>
              <h3>{city ? city : "Erro"}</h3>
              <h3>-</h3>
              <h3>{state ? state : "Erro"}</h3>
            </div>
            <div>
              <h3>Solicitante:&nbsp;</h3>
              <h3>{requester ? requester : "Erro"}</h3>
            </div>
            <div>
              <h3>Recebido via:&nbsp;</h3>
              <h3>{receiptForm ? receiptForm : "Erro"}</h3>
            </div>
            <div>
              <h3>Tipo de documento:&nbsp;</h3>
              <h3>{documentType ? documentType : naoCadastrada}</h3>
            </div>
            <div>
              <h3>Nº do documento:&nbsp;</h3>
              <h3>{documentNumber ? documentNumber : naoCadastrada}</h3>
            </div>
            <div>
              <h3>Nº do SEI:&nbsp;</h3>
              <h3>{seiNumber ? seiNumber : naoCadastrada}</h3>
            </div>
            <div>
              <h3>Data do documento:&nbsp;</h3>
              <h3>{documentDate ? documentDate : naoCadastrada}</h3>
            </div>
            <div>
              <h3>Informações de contato:&nbsp;</h3>
              <h3 id="contact-info">
                {documentContactInfo ? documentContactInfo : naoCadastrada}
              </h3>
            </div>
            <div>
              <h3>Acompanha objeto físico:&nbsp;</h3>
              <h3 id="physicalObject">{physicalObject ? "SIM" : "NÃO"}</h3>
            </div>
            {hasLink()}
            <div class="description">
              <h3>Descrição:&nbsp;</h3>
              <h3>{description ? description : "Erro"}</h3>
            </div>
            <div class="Palavras-chave">
              <h3>palavra-chave:&nbsp;</h3>
              <h3> {keyWord ? keyWord : naoCadastrada}</h3>
            </div>
          </StyledInfoDiv>
          {/* <ForwardSector forward={forward} /> */}
          <StyledDivButtons>
            <GenericWhiteButton
              title="Voltar"
              onClick={() => window.history.back()}
            />
            <GenericBlueButton
              title={buttonDone ? "Reabrir" : "Concluir"}
              onClick={
                buttonDone ? handleButtonProcessReopen : handleButtonProcessDone
              }
            />
          </StyledDivButtons>
        </StyledDivShowProcess>
        <StyledDivInfoProcess>
          <span>Servidor:</span>
          <div className="issuerIcon">
            <FaUserCircle />
            <p>{userName === "" ? "Policia Federal (mock)" : userName}</p>
          </div>
          <button onClick={handleForward} className="forwardIcon">
            <p>Encaminhar para</p>
            <FaTelegramPlane />
          </button>

          <DropDownButton
            departments={departments}
            onChangeOpt={(event) => setDepartment(event.target.value)}
          />

          <span>Tags:</span>
          <div className="tagsTest">
            <TagsList id={id} />
          </div>

          <div>
            <button className="processButton" onClick={handleViewHistoric}>
              <b>Histórico de alterações</b>
            </button>
            {confirmReceivementButton()}
          </div>
        </StyledDivInfoProcess>
        <ModalDoubleCheck
          content="Você tem certeza que quer concluir esse Registro?"
          trigger={buttonModal}
          titleBlueButton="Concluir"
          titleWhiteButton="Cancelar"
          onClickBlueButton={handleClickModalBlue}
          onClickWhiteButton={handleClickModalWhite}
        />
        <ModalReasonProcess
          content="Deseja realmente encaminhar esse registro?"
          trigger={buttonModalConfirmForward}
          titleBlueButton="Confirmar"
          titleWhiteButton="Cancelar"
          onClickBlueButton={handleClickModalConfirmForward}
          onClickWhiteButton={handleClickModalWhite}
          onChange={(event) => setReasonForward(event.target.value)}
        />
        <ModalDoubleCheck
          content="Deseja realmente confirmar o recebimento desse registro?"
          trigger={buttonModalConfirmReceivement}
          titleBlueButton="Confirmar"
          titleWhiteButton="Cancelar"
          onClickBlueButton={handleClickConfirmReceivement}
          onClickWhiteButton={handleClickModalWhite}
        />
        <ModalReopenProcess
          trigger={buttonModalReopen}
          titleBlueButton="Reabrir"
          titleWhiteButton="Cancelar"
          onClickBlueButton={handleClickModalBlueReopen}
          onClickWhiteButton={handleClickModalWhite}
          onChange={(event) => setReason(event.target.value)}
        />
      </StyledDivSupProcess>
      <Toaster />
    </>
  );
};

export default ViewRecord;
