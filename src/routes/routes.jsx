import { RouterProvider } from "react-router-dom";
import { routes } from "./routes.data";

const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;
