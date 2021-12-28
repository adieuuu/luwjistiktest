import { configureStore } from '@reduxjs/toolkit'
import userAcc from './reducers/userAccReducer'

const store = configureStore({
  reducer: {
    userAcc: userAcc
  }
})

export default store