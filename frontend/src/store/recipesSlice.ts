import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RecipeType } from '../routes/home'
import axios from 'axios'

interface recipesState {
  recipes: RecipeType[]
  status: string
  error: string | undefined
}

const initialState: recipesState = {
  recipes: [],
  status: 'idle',
  error: undefined,
}

export const fetchRecipes = createAsyncThunk('recipes/fetch', async () => {
  const responce = await axios.get('http://localhost:8080/recipes')
  return responce.data
})

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    recipeAdd: (state, action) => {
      state.recipes.push(action.payload)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.recipes = action.payload
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { recipeAdd } = recipesSlice.actions

export default recipesSlice.reducer
