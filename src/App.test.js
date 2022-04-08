import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateDepartment from "./Pages/CreateDepartment";
import CreateUser from "./Pages/CreateUser";
import HomePage from "./Pages/HomePage"
import RegistrationScreen from "./Pages/RegistrationScreen"
import ViewAllFields from "./Pages/ViewAllFields"
import App from "./App";
import MainButton from "./Components/MainButton";
import HeaderWithButtons from "./Components/HeaderWithButtons";
import { StyledAlertDialog, TagList } from "./Components/AddTagDialog/styles";
import GenericBlueButton from "./Components/GenericBlueButton";
import { Checkbox, Modal } from "antd";
import GenericWhiteButton from "./Components/GenericWhiteButton";
import { StyledBlueRectangle, StyledWhiteRectangle } from "./Pages/CreateRecord/styles";
import { StyledListGroup } from "./Components/Departments/style";


test("renders main app component", () => {
  render(<App />);
});

test("renders main button component", () => {
  render(<MainButton />);
});

test("renders header with buttons component", () => {
  render(<HeaderWithButtons/>);
});

describe("CreateDepartment test", () => {
  test("Should render  Create Department page",  () => {
    render(<CreateDepartment/>)
    const cadastrarButton = screen.getByText("Cadastrar")
    const voltarButton = screen.getByText("Voltar")
    const departamentoField = screen.getByPlaceholderText("Departamento")

    userEvent.paste(departamentoField, "teste")

    expect(departamentoField).toHaveValue('teste')
    
    userEvent.click(cadastrarButton)
    userEvent.click(voltarButton)
  });
  
})

describe("Create User test", () => {
  test("Should render  Create User page ",  () => {
    render(<CreateUser/>)
    const email = screen.getByPlaceholderText("william@pcgo.org.br")
    const senha = screen.getByPlaceholderText("Senha")
    const cadastrarButton = screen.getByText("Cadastrar")
    const voltarButton = screen.getByText("Voltar")


   /*  userEvent.paste(nome, "nome") */
    userEvent.paste(email, "email")
    userEvent.paste(senha, "senha")

    expect(email).toHaveValue('email')
    
    userEvent.click(cadastrarButton)
    userEvent.click(voltarButton)
  });
    
})

describe("HomePage test", () => {
  test("Should render HomePage ",  () => {
    render(<HomePage/>)
  });
})

describe("RegistrationScreen test", () => {
  test("Should render RegistrationScreen ",  () => {
    render(<RegistrationScreen/>)
  });
})

describe("ViewAllFields test", () => {
  test("Should render ViewAllFields ",  () => {
    render(<ViewAllFields/>)
  });
})


test("renders styyledalert buttons component", () => {
  render(<StyledAlertDialog/>)
});

test("renders genericbluebutton buttons component", () => {
  render(<GenericBlueButton/>)
});

test("renders genericWhiteButton compenent", () => {
  render(<GenericWhiteButton/>)
});

test("renders modal component", () => {
  render(<Modal/>)
});

test("renders checkbox compenent", () => {
  render(<Checkbox/>)
});

test("renders TagList compenent", () => {
  render(<TagList/>)
});

test("renders styledbluerectangle compenent", () => {
  render(<StyledBlueRectangle/>)
});

test("renders styledwhiterectangle compenent", () => {
  render(<StyledWhiteRectangle/>)
});

test("renders styledListGroup compenent", () => {
  render(<StyledListGroup/>)
});
