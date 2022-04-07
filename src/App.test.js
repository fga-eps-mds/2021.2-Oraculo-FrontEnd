import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import MainButton from "./Components/MainButton";
import HeaderWithButtons from "./Components/HeaderWithButtons";
import CreateDepartment from "./Pages/CreateDepartment";
import CreateRecord from "./Pages/CreateRecord";

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


describe("Create Record test", () => {
  test("Should render Create Record page and put fields",async  () => {
    render(<CreateRecord/>)

    const CidadeField = screen.getByPlaceholderText("Cidade (Obrigatório)")
    const SolicitanteField = screen.getByPlaceholderText("Solicitante (Obrigatório)")
    const TipodedocumentoField = screen.getByPlaceholderText("Ofício, Despacho ...")
    const NdodocumentoField = screen.getByPlaceholderText("Número do Documento")
    const DescriçãododocumentoField = screen.getByPlaceholderText("Ex: Solicita antecedentes ... (Obrigatório)")
    const NdoSEIField = screen.getByPlaceholderText("Nº do SEI")
    const RecebidoviaField = screen.getByPlaceholderText("Física, E-mail, SEI (Obrigatório)")
    const InformaçãodecontatoField = screen.getByPlaceholderText("contato@email.com")
    const LinkdedocumentoField = screen.getByPlaceholderText("Adicione o link do documento, deve começar com 'https://'")
    const PalavraschaveField = screen.getByPlaceholderText("Insira as palavras chave separadas por vírgula")

    
    userEvent.paste(CidadeField, "Cidade")
    userEvent.paste(SolicitanteField, "Solicitante")
    userEvent.paste(TipodedocumentoField, "oficio")
    userEvent.paste(NdodocumentoField, "11111")
    userEvent.paste(DescriçãododocumentoField, "Descricao")
    userEvent.paste(NdoSEIField, "323")
    userEvent.paste(RecebidoviaField, "Fisica")
    userEvent.paste(InformaçãodecontatoField, "contato@email.com")
    userEvent.paste(LinkdedocumentoField, "link")
    userEvent.paste(PalavraschaveField, "teste")


    expect(CidadeField).toHaveValue('Cidade')
    expect(SolicitanteField).toHaveValue('Solicitante')
    expect(TipodedocumentoField).toHaveValue('oficio')
    expect(NdodocumentoField).toHaveValue('11111')
    expect(DescriçãododocumentoField).toHaveValue('Descricao')
    expect(NdoSEIField).toHaveValue('323')
    expect(RecebidoviaField).toHaveValue('Fisica')
    expect(InformaçãodecontatoField).toHaveValue('contato@email.com')
    expect(LinkdedocumentoField).toHaveValue('link')
    expect(PalavraschaveField).toHaveValue('teste')
  });
  
})

