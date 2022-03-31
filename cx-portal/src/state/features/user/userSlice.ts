import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'state/store'
import { IUser } from 'types/user/UserTypes'

const initialState: IUser = {
  userName: '',
  name: '',
  email: '',
  company: '',
  tenant: '',
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
export const selectorUser = (state: RootState): IUser => state.user

export default userSlice.reducer
