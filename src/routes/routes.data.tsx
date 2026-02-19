import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import ErrorPage from "../pages/errorPage";

const Application = lazy(() => import("../pages/application/{id}"));
const AndroidViewer = lazy(() => import("../pages/androidViewer/{id}"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Application />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/testable",
    element: (
      <Suspense fallback={<Loader />}>
        <AndroidViewer />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);
