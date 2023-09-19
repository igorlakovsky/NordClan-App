import { createSlice } from '@reduxjs/toolkit'

interface userState {
  login: string | undefined
  password: string | undefined
  auth: boolean
}

const initialState: userState = {
  login: undefined,
  password: undefined,
  auth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authUser: (state, action) => {
      state.login = action.payload.login
      state.password = action.payload.password
      state.auth = true
    },
    logoutUser: (state) => {
      state.login = undefined
      state.password = undefined
      state.auth = false
    },
  },
})

export const { authUser, logoutUser } = userSlice.actions

export default userSlice.reducer
