import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import MainButton from "./Components/MainButton";
import HeaderWithButtons from "./Components/HeaderWithButtons";
import CreateDepartment from "./Pages/CreateDepartment";

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
