import { createBrowserRouter, useSearchParams } from "react-router-dom";
import SmartSuspense from "../components/SuspenseCustom";
import React, { Suspense } from "react";
import { lazy } from "react";
import Loader from "../components/Loader";
import Application from "../pages/application/{id}";

// const [searchParams, setSearchParams] = useSearchParams(); // Query параметры
// const loaderName = searchParams.get("loader");
///// Посмотреть скорость загрузки и статус Pending на загрузке модели

const ErrorPage = lazy(() => import("../pages/errorPage"));
// const Application = lazy(() => import("../pages/application/{id}"));
const AndroidViewer = lazy(() => import("../pages/androidViewer/{id}"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Application />,
    errorElement: (
      <div>
        <ErrorPage />
      </div>
    ),
  },
  {
    path: "/testable",
    element: <AndroidViewer />,
    errorElement: (
      <div>
        <ErrorPage />
      </div>
    ),
  },
  {
    path: "/test",
    element: <div> TESTING PAGE </div>,
    errorElement: <div>TESTING PAGE FAILED</div>,
  },
]);
