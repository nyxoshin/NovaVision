import { Navigate, createBrowserRouter } from "react-router-dom";
import NavBar from "./root";
// import Account from "../pages/account";
// import Consultations from "../pages/consultations";
// import NewConsultations from "../pages/consultations/new";
// import Consultation from "../pages/consultations/id/{id}";
import ErrorPage from "../pages/errorPage";
import MainPage from "../pages/main";
import App from "../App";
import Application from "../pages/application/{id}";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: (
      <div>
        <ErrorPage />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to={"main"} replace={true} />,
        errorElement: <ErrorPage errorText={"Ошибка"} />,
      },
      {
        path: "main",
        element: <MainPage />,
        errorElement: <ErrorPage errorText={"Ошибка"} />,
      },
      // {
      //   path: "item/:id",
      //   element: <Application />,
      //   errorElement: (
      //     <ErrorPage errorText={"Ошибка загрузки просмотровщика"} />
      //   ),
      // },
    ],
  },
  {
    path: "item/:id",
    element: <Application />,
    errorElement: <ErrorPage errorText={"Ошибка загрузки просмотровщика"} />,
  },
]);
