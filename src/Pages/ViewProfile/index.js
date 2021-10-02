import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BiUserCircle } from "react-icons/bi";
import Header from "../../Components/Header";
import {
  StyledBlueRectangle,
  StyledButtonsDiv,
  StyledBackButton,
  StyledEditButton,
  StyledForms,
  StyledViewProfile,
  StyledWhiteRectangle,
} from "./styles";

const ViewProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("");

  async function handleSubmit(event) {
    console.info(`evento: ${event}`);

    let request = axios.post("http://localhost:8000/user", {
      name: name,
      email: email,
      sector: sector,
    });

    request.then(
      async (ok) => {
        toast.success("Processo criado");
      },
      async (error) => {
        console.error(`failed to send request ${error}`);
        toast.error("Falha ao editar Usuário");
      }
    );
  }

  return (
    <>
      <Header />
      <div>
        <StyledViewProfile>
          <StyledBlueRectangle>
            <BiUserCircle size="20rem" color="white" />
          </StyledBlueRectangle>

          <StyledWhiteRectangle>
            <StyledForms>
              <form onSubmit={handleSubmit}>
                <div>
                  <h1>Name</h1>
                  <input
                    id="name"
                    type="text"
                    placeholder="William Cops"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div>
                  <h1>Email</h1>
                  <input
                    id="email"
                    type="text"
                    placeholder="william@pcgo.org.br"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div>
                  <h1>Setor</h1>
                  <input
                    id="sectorNum"
                    type="text"
                    placeholder="Setor"
                    onChange={(event) => setSector(event.target.value)}
                    value={sector}
                  />
                </div>
              </form>
            </StyledForms>
            <StyledButtonsDiv>
              <StyledBackButton onClick={() => window.history.back()}>
                Voltar
              </StyledBackButton>
              <StyledEditButton onClick={handleSubmit}>
                Editar
              </StyledEditButton>
            </StyledButtonsDiv>
          </StyledWhiteRectangle>
        </StyledViewProfile>
        <Toaster />
      </div>
    </>
  );
};

export default ViewProfile;