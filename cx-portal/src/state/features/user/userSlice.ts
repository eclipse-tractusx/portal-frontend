import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from 'types/user/UserTypes'

const initialState: IUser = {
  userName: '',
  name: '',
  email: '',
  company: '',
  roles: [],
  isAdmin: false,
  token: '',
  parsedToken: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (state: IUser, action: PayloadAction<IUser>) => {
      return action.payload
    },
  },
})

export const { setLoggedUser } = userSlice.actions

export default userSlice.reducer
