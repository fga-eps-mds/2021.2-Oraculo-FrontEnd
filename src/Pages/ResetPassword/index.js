import React from "react";
import { FaLock, FaUserCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../Assets/logo-dark.svg";
import Header from "../../Components/Header";
import LoginInput from "../../Components/LoginInput/index";
import MainButton from "../../Components/MainButton";
import { FormLogin, StyledDiv } from "./styles";
import jwt_decode from "jwt-decode";
import {
  getInfoUser,
  getToken,
  sendEmailToRecoverPassword,
  verifyToken,
} from "../../Services/Axios/profileService";
import { isAuthenticated, login } from "../../Auth/Auth";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class ResetPassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: ''
        };
    }

    async handleClick(event) {
        const email = this.state.email ;
        const result = await sendEmailToRecoverPassword(email, toast);
        if(result){
            this.props.history.push("/recuperar-senha")
        }
      }

    setEmail(newMail) {
        this.setState({ email: newMail });
      }

    render (){
        return (
            <>
            <Header />
            <FormLogin>
                <form>
                    <img src={Logo} alt="Logo" />
                    <LoginInput
                    idInput="email"
                    nameInput="email"
                    placeholderInput="Digite seu e-mail cadastrado no sistema"
                    inputType="email"
                    valueInput={this.state.email}
                    onChangeInput={(event) => this.setEmail(event.target.value)}
                    >
                    <FaUserCircle />
                
                    </LoginInput>
                    <StyledDiv>
                        <MainButton
                            onClick={(event) => {
                                this.handleClick(event);
                            }}
                            title={"Enviar"}
                        />
                    </StyledDiv>
            </form>
            </FormLogin>
                
            </>
          
        );
    }
}


export default withRouter(ResetPassword)