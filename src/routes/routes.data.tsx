import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/Loader";
import Application from "../pages/application/{id}";
import ErrorPage from "../pages/errorPage";

// const [searchParams, setSearchParams] = useSearchParams(); // Query параметры
// const loaderName = searchParams.get("loader");
///// Посмотреть скорость загрузки и статус Pending на загрузке модели

const AndroidViewer = lazy(() => import("../pages/androidViewer/{id}"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Application />,
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
  {
    path: "/test",
    element: <div> TESTING PAGE </div>,
    errorElement: <div>TESTING PAGE FAILED</div>,
  },
]);
