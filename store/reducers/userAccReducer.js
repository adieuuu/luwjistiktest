import { createReducer } from '@reduxjs/toolkit'
import { userAcc } from '../actions/userAcc'

const initialState = {
  userAcc: {}
}

const userAccReducer = createReducer(initialState, (builder) => {
  builder.addCase(userAcc, (state, action) => {
    state.userAcc = action.payload
  })
})

export default userAccReducer