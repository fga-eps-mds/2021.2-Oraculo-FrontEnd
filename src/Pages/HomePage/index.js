import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import HeaderWithButtons from "../../Components/HeaderWithButtons";
import { getInfoUser } from "../../Services/Axios/profileService";
import { 
  StyledBody, 
  StyledOrganizeButtons, 
  StyledBigButton, 
  StyledDatePicker, 
  DateForm, 
} from "./styles";
import Process from "../../Components/Process";
import Pagination from "../../Components/Pagination/index";
import DatePicker from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import 'react-datepicker/dist/react-datepicker.css'
import {
  getProcessTotalNumber,
  getProcessByPage,
} from "../../Services/Axios/processService";
import RenderFilters from "../../Components/Filters";

const HomePage = (props) => {
  // Setar estados de processos e paginação

  const [process, setProcess] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [processPerPage] = useState(30);
  const [dateStart, setDateStart] = useState(undefined)
  const [dateEnd, setDateEnd] = useState(undefined)
  const [allProcesses, setAllProcesses] = useState(0);
  const [department, setDepartment] = useState("");
  const [admin, setAdmin] = useState("");
  const [where, setWhere] = useState({});

  async function setAll() {
    const temp = await getProcessTotalNumber(toast);
    setAllProcesses(temp.count);
  }

  const userType = {
    admin: 1,
    common: 2,
  };

  const fetchProcess = async () => {
    // Fetch user info
    const user = await getInfoUser(toast);

    let dateStartString = undefined;
    let dateEndString = undefined;
    if (user.levels == undefined) {
      window.location.reload();
      return;
    }

    if(dateStart != undefined) 
      dateStartString = dateStart.toLocaleDateString('pt-br');
    if(dateEnd != undefined) 
      dateEndString = dateEnd.toLocaleDateString('pt-br');

    //Check if user is admin
    setAdmin(userType.admin === user.levels[0].id);
    //Set the name of user's department
    setDepartment(user.departments[0].name);

    const temp = await getProcessByPage(currentPage, toast, {
      department_id: user.departments[0].id,
      where,
    }, dateStartString, dateEndString);
    setProcess(temp);
    console.log(temp)
  };

  useEffect(() => {
    fetchProcess();
  }, [currentPage, admin, where, dateStart, dateEnd]);

  window.onload = function () {
    setAll();
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <HeaderWithButtons />
      <StyledBody>
      <h1>Pesquisar Registro</h1>
      <DateForm>
      <div>
        <p>De:</p>
        <DatePicker
            id="documentDateInput"
            selected={dateStart}
            className="form-div"
            locale={pt}
            placeholderText="dd/mm/aaaa"
            disabledKeyboardNavigation
            dateFormat="dd/MM/yyyy"
            strictParsing
            maxDate={new Date()}
            onChange={(date) => {
              setDateStart(date)
            }}
            customInput={<StyledDatePicker lang={'pt-BR'} />}
            />
        </div>
        <div>
        <p>Até:</p>
        <DatePicker
          id="documentDateInput"
          selected={dateEnd}
          className="form-div"
          locale={pt}
          placeholderText="dd/mm/aaaa"
          disabledKeyboardNavigation
          dateFormat="dd/MM/yyyy"
          strictParsing
          maxDate={new Date()}
          onChange={(date) => {
            setDateEnd(date)
          }}
          customInput={<StyledDatePicker lang={'pt-BR'} />}
        />
        </div>
        </DateForm>
        <div className="flex-mt-2">
        {/* Fazer botão atualizar com registros */}
        <RenderFilters handleWhere={{ where, setWhere }} />
        <h1>Departamento: {department}</h1>
        <StyledOrganizeButtons>
          <StyledBigButton>Nº de Registro</StyledBigButton>
          <StyledBigButton>Cidade</StyledBigButton>
          <StyledBigButton>UF</StyledBigButton>
          <StyledBigButton>Solicitante</StyledBigButton>
          <StyledBigButton>Inclusão</StyledBigButton>
          <StyledBigButton>Nº do SEI</StyledBigButton>
          <StyledBigButton>Tag</StyledBigButton>
          <StyledBigButton />
        </StyledOrganizeButtons>
        {/* fazer registro atualizar com SearchTerm */}
        {process.length > 0 ? (
          <Process process={process} />
        ) : (
          <h1 class="zero-registros">
            Não há registros cadastrados no sistema
          </h1>
        )}
        {/* paginar registros */}
        <Pagination
          processPerPage={processPerPage}
          totalProcess={allProcesses}
          paginate={paginate}
        />
        </div>
      </StyledBody>
    </>
  );
};

export default HomePage;
