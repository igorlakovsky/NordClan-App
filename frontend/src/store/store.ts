import { configureStore } from '@reduxjs/toolkit'
import recipesReducer from './recipesSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
