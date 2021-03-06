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
  loginUser,
  verifyToken,
} from "../../Services/Axios/profileService";
import { isAuthenticated, login } from "../../Auth/Auth";
import { Redirect, withRouter } from "react-router";
import { Link } from "react-router-dom";

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    // Checks if the local storage has a token
    if (isAuthenticated()) {
      const token = getToken();
      const decoded = jwt_decode(token);
      let expTime = decoded.exp * 1000;
      expTime = new Date(expTime);
      const now = new Date();

      // if the token is not expired
      if (expTime > now) {
        // if user is logged, he's redirected to homescreen
        this.props.history.push("/tela-inicial");
      }
    }
  }

  setPassword(newPass) {
    this.setState({ password: newPass });
  }

  setEmail(newMail) {
    this.setState({ email: newMail });
  }

  async handleClick(event) {
    const user = { email: this.state.email, password: this.state.password };
    const result = await loginUser(user, toast);
    const auth = result?.auth;
    if (auth) {
      login(result.token);
      this.props.history.push("/tela-inicial");
    }
  }
  

  render() {
    return (
      <>
        <Header />
        <FormLogin>
          <form>
            <img src={Logo} alt="Logo" />
            <LoginInput
              idInput="email"
              nameInput="email"
              placeholderInput="Usuário"
              inputType="email"
              valueInput={this.state.email}
              onChangeInput={(event) => this.setEmail(event.target.value)}
            >
              <FaUserCircle />
            </LoginInput>
            <LoginInput
              idInput="password"
              nameInput="password"
              placeholderInput="Senha"
              inputType="password"
              valueInput={this.state.password}
              onChangeInput={(event) => this.setPassword(event.target.value)}
            >
              <FaLock />
            </LoginInput>
            <StyledDiv>
              <Link
                to="/esqueci-senha"
                onClick={() => {
                  //<Redirect push to="/esqueci-senha"/>
                }}
              >
                Esqueci minha senha
              </Link>
              <MainButton
                onClick={(event) => {
                  this.handleClick(event);
                }}
                title={"Entrar"}
              />
            </StyledDiv>
          </form>
          <Toaster />
        </FormLogin>
      </>
    );
  }
}

export default withRouter(LoginScreen);
