import React from 'react'
import { FaLock, FaUserCircle } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import Logo from '../../Assets/logo-dark.svg'
import Header from '../../Components/Header'
import LoginInput from '../../Components/LoginInput/index'
import MainButton from '../../Components/MainButton'
import { FormLogin, StyledDiv } from './styles'
import jwt_decode from 'jwt-decode'
import {
  getInfoUser,
  getToken,
  passwordRecovery,
  verifyToken,
} from '../../Services/Axios/profileService'
import { isAuthenticated, login } from '../../Auth/Auth'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class RecoveryPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      password: '',
    }
  }

  async handleClick(event) {
    const passwordReq = {
      token: this.state.token,
      password: this.state.password,
    }
    const result = await passwordRecovery(passwordReq, toast)
    if (result) {
      this.props.history.push('/login')
    }
  }

  setToken(newToken) {
    this.setState({ token: newToken })
  }

  setPassword(newPassword) {
    this.setState({ password: newPassword })
  }

  render() {
    return (
      <>
        <Header />
        <FormLogin>
          <form>
            <img src={Logo} alt="Logo" />
            <LoginInput
              idInput="token"
              nameInput="token"
              placeholderInput="Digite o token enviado no email"
              inputType="token"
              valueInput={this.state.token}
              onChangeInput={(event) => this.setToken(event.target.value)}
            >
              <FaUserCircle />
            </LoginInput>
            <LoginInput
              idInput="password"
              nameInput="password"
              placeholderInput="Digite a nova senha"
              inputType="password"
              valueInput={this.state.password}
              onChangeInput={(event) => this.setPassword(event.target.value)}
            >
              <FaUserCircle />
            </LoginInput>
            <StyledDiv>
              <MainButton
                onClick={(event) => {
                  this.handleClick(event)
                }}
                title={'Enviar'}
              />
            </StyledDiv>
          </form>
        </FormLogin>
      </>
    )
  }
}

export default withRouter(RecoveryPassword)
