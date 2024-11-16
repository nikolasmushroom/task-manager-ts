import { App } from "../../app/App";
import { createBrowserRouter } from "react-router-dom";
import { Main } from "../../app/Main";
import { Login } from "../../fuetures/auth/ui/Login";
import { Page404 } from "common/components";

export const Path = {
  Login: 'login',
} as const

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement : <Page404/>,
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: '*',
        element: <Page404/>,
      },
    ],
  },
])