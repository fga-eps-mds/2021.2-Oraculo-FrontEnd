import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router'
import { BiUserCircle } from 'react-icons/bi'
import HeaderWithButtons from '../../Components/HeaderWithButtons'
import { getUserById } from '../../Services/Axios/profileService'
import { getUserInfo } from '../../Services/Axios/processService'
import {
  StyledBlueRectangle,
  StyledButtonsDiv,
  StyledBackButton,
  StyledForms,
  StyledViewProfile,
  StyledWhiteRectangle,
} from './styles'

const ViewUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentName, setDepartmentName] = useState('')
  const [userForwards, setUserForwards] = useState(0)
  const [userReceivements, setUserReceivements] = useState(0)

  const { id } = useParams()
  useEffect(() => {
    async function fetchUserData() {
      const user = await getUserById(id, toast)
      const userInfo = await getUserInfo(user.email, toast)
      setName(user.name)
      setEmail(user.email)
      console.log(userInfo)
      setDepartmentName(userInfo.userDepartment.name)
      setUserForwards(userInfo.userForwards)
      setUserReceivements(userInfo.userReceivements)
    }
    fetchUserData()
  })

  return (
    <>
      <HeaderWithButtons />
      <div>
        <StyledViewProfile>
          <StyledBlueRectangle>
            <BiUserCircle size="20rem" color="white" />
          </StyledBlueRectangle>

          <StyledWhiteRectangle>
            <StyledForms>
              <form>
                <div>
                  <h1>
                    <strong>Nome:&nbsp;</strong>
                  </h1>
                  <h3>{name}</h3>
                </div>
                <div>
                  <h1>
                    <strong>Email:&nbsp;</strong>
                  </h1>
                  <h3>{email}</h3>
                </div>
                <div>
                  <h1>
                    <strong>Departamento:&nbsp;</strong>
                  </h1>
                  <h3>{departmentName}</h3>
                </div>
                <div>
                  <h1>
                    <strong>Andamentos:&nbsp;</strong>
                  </h1>
                  <h3>{userForwards}</h3>
                </div>
                <div>
                  <h1>
                    <strong>Confirmações de recebimento:&nbsp;</strong>
                  </h1>
                  <h3>{userReceivements}</h3>
                </div>
              </form>
            </StyledForms>
            <StyledButtonsDiv>
              <StyledBackButton onClick={() => window.history.back()}>
                Voltar
              </StyledBackButton>
            </StyledButtonsDiv>
          </StyledWhiteRectangle>
        </StyledViewProfile>
        <Toaster />
      </div>
    </>
  )
}

export default ViewUser
