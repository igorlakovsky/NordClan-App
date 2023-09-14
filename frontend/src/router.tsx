import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './routes/home'
import Layout from './routes/layout'
import Recipe from './routes/recipe'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'recipe/:recipeId',
        element: <Recipe />,
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
