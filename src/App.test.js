import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateDepartment from "./Pages/CreateDepartment";
import CreateRecord from "./Pages/CreateRecord";
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
  test("Should render  Create Department page",async  () => {
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
