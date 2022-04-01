import ViewRecord from '.ViewRecord'
import { render } from '@testing-library/react'
import React from 'react' 

test("Deve checkar se a informação renderiza na tela", () => {

  const {getByTestId} = render(<ViewRecord/ >);
  const infoUser = await getUserByEmail(email)

})