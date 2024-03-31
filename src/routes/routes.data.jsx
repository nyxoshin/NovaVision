import { Navigate, createBrowserRouter } from "react-router-dom";
import NavBar from "./root";
// import Account from "../pages/account";
// import Consultations from "../pages/consultations";
// import NewConsultations from "../pages/consultations/new";
// import Consultation from "../pages/consultations/id/{id}";
import ErrorPage from "../pages/errorPage";
import Application from "../pages/application/{id}";
import Monitor from "../Monitor";
import Barfits from "../Barfits";
import Table from "../Table";

export const routes = createBrowserRouter([
  {
    path: "/Monitor",
    element: <Monitor />,
    errorElement: (
      <div>
        <ErrorPage />
      </div>
    ),
  },
  {
    path: "/Barfits",
    element: <Barfits />,
    errorElement: (
      <div>
        <ErrorPage />
      </div>
    ),
  },
  {
    path: "/Table",
    element: <Table />,
    errorElement: (
      <div>
        <ErrorPage />
      </div>
    ),
  },
]);
