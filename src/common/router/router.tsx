import { App } from "../../app/App";
import { createBrowserRouter } from "react-router-dom";
import { Main } from "../../app/Main";
import { Login } from "../../fuetures/auth/ui/Login";
import { Page404 } from "common/components";
import { Faq } from "../../fuetures/faq/Faq";
import { ProtectedRoute } from "common/router/ProtectedRoute";

export const Path = {
  Login: "login"
} as const;

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Page404 />,
    element: <App />,
    children: [
      {
        path: "/",
        element:
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
      },
      {
        path: Path.Login,
        element: <Login />
      },
      {
        path: "/faq",
        element:
          <ProtectedRoute>
            <Faq />
          </ProtectedRoute>
      },
      {
        path: "*",
        element: <Page404 />
      }
    ]
  }
]);