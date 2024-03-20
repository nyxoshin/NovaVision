import { Navigate, createBrowserRouter } from "react-router-dom";
import NavBar from "./root";
// import Account from "../pages/account";
// import Consultations from "../pages/consultations";
// import NewConsultations from "../pages/consultations/new";
// import Consultation from "../pages/consultations/id/{id}";
import ErrorPage from "../pages/errorPage";
import MainPage from "../pages/main";

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
        errorElement: (
          <ErrorPage errorText={"Ошибка получения данных о консультациях"} />
        ),
      },
      {
        path: "main",
        element: <MainPage />,
        errorElement: (
          <ErrorPage errorText={"Ошибка получения данных о консультациях"} />
        ),
      },
      // {
      //   path: "lk/consultations/new",
      //   element: <NewConsultations />,
      //   errorElement: <ErrorPage children={"Ошибка создания консультации"} />,
      // },
      // {
      //   path: "lk/account",
      //   element: <Account />,
      //   errorElement: (
      //     <ErrorPage
      //       children={"Ошибка получения данных аккаунта пользователя"}
      //     />
      //   ),
      // },
      // {
      //   path: "lk/about",
      //   element: <About />,
      //   errorElement: (
      //     <ErrorPage children={"Ошибка получения данных о сервисе"} />
      //   ),
      // },
      // {
      //   path: "lk",
      //   element: <Navigate to={"/"} replace={true} />,
      //   errorElement: (
      //     <ErrorPage children={"Ошибка получения данных о консультациях"} />
      //   ),
      // },
      // {
      //   path: "login",
      //   element: <Navigate to={"/"} replace={true} />,
      //   errorElement: (
      //     <ErrorPage children={"Ошибка получения данных о консультациях"} />
      //   ),
      // },
      // {
      //   path: "*",
      //   element: <Navigate to={"/"} replace={true} />,
      //   errorElement: (
      //     <ErrorPage children={"Ошибка получения данных о консультациях"} />
      //   ),
      // },
      // {
      //   element: <Consultation />,
      //   path: "lk/consultations/item/:id",
      //   errorElement: (
      //     <ErrorPage children={"Ошибка получения данных о консультации"} />
      //   ),
      // },
      // {
      //   element: <NewConsultations />,
      //   path: "lk/consultations/item/:id/edit",
      //   errorElement: (
      //     <ErrorPage children={"Ошибка получения данных о консультации"} />
      //   ),
      // },
    ],
  },
]);
