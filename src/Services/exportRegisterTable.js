import * as XLSX from "xlsx/xlsx.mjs";

export const exportRegisterTable = (registers) => {
  const filtredInfo = registers.map((el) => {
    return {
      Id: el.id,
      "Nº do registro": el.register_number,
      Cidade: el.city,
      Estado: el.state,
      Solicitante: el.requester,
      "Tipo de Documento": el.document_type,
      "Data de Inclusão": new Date(el.inclusion_date).toLocaleDateString(
        "pt-br"
      ),
      "Descrição do Documento": el.description,
      "Nº do SEI": el.sei_number,
      "Informação de contato": el.contact_info,
    };
  });
  const worksheet = XLSX.utils.json_to_sheet(filtredInfo);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, "tabela_de_registros.xlsx");
};
