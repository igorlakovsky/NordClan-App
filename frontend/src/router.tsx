import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './routes/home'
import Login from './routes/login'
import Recipe from './routes/recipe'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'recipe/:recipeId',
    element: <Recipe />,
  },
  {
    path: 'login',
    element: <Login />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
