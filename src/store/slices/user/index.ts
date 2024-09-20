import { users } from '@/config'
import { IArticle } from '@/interfaces/article.interface'
import { IFlat } from '@/interfaces/flat.interface'
import { IUser } from '@/interfaces/user.interface'
import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  user: IUser
}

const initialState: UserState = {
  user: users.find(user => user.id === 1)!
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCity: (state, { payload }: { payload: string }) => { state.user.city = payload },
    deleteAll: (state) => { state.user.notifications = [] },
    readAll: (state) => {
      state.user.notifications.map(n => n[2] = true)
    },
    addToFavourites: (state, { payload }: { payload: { type: "users" | "flats" | "articles", value: IUser | IFlat | IArticle } }) => {
      if (payload.type === "flats") {
        if (state.user.favourites.flats.find(el => el.id === payload.value.id)) {
          state.user.favourites.flats = state.user.favourites.flats.filter(el => el.id != payload.value.id)
        } else {
          state.user.favourites.flats.push(payload.value as IFlat)
        }
      }
      else if (payload.type === "users") {
        if (state.user.favourites.users.find(el => el.id === payload.value.id)) {
          state.user.favourites.users = state.user.favourites.users.filter(el => el.id != payload.value.id)
        } else {
          state.user.favourites.users.push(payload.value as IUser)
        }
      }
      else if (payload.type === "articles") {
        if (state.user.favourites.articles.find(el => el.id === payload.value.id)) {
          state.user.favourites.articles = state.user.favourites.articles.filter(el => el.id != payload.value.id)
        } else {
          state.user.favourites.articles.push(payload.value as IArticle)
        }
      }
    },
    removeAllFavourites: (state) => { state.user.favourites = { flats: [], users: [], articles: [] } }
  },
})

export const { setCity, deleteAll, readAll, addToFavourites, removeAllFavourites } = userSlice.actions

export default userSlice.reducer