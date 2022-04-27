import React from 'react'
import { StyledListGroup, StyledBigDiv, StyledText } from './style'

const PocketUser = ({ user, searchTerm }) => {
  return (
    <StyledListGroup>
      {user
        .filter((val) => {
          if (
            searchTerm === '' ||
            val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            val.email.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return val
          }
        })
        .map((singleUser) => (
          <button
            onClick={(e) => {
              e.preventDefault()
              window.location.href = `/ver-usuario/${singleUser.id}`
            }}
            class="registerNumber"
          >
            <StyledBigDiv>
              <StyledText>{singleUser.name}</StyledText>
              <StyledText>{singleUser.email}</StyledText>
            </StyledBigDiv>
          </button>
        ))}
    </StyledListGroup>
  )
}

export default PocketUser
