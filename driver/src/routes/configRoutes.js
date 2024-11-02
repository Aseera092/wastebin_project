import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/mainLayout";
import LoginLayout from "../layout/loginLayout";
import MapView from "../components/mapView";

export const routes = createBrowserRouter([
    {
      path: "/",
      element: <LoginLayout />,
      // children:[
      //   {
      //     path:"",
      //     element:<MapView />
      //   }
      // ]
    },
    {
      path: "/main",
      element: <MainLayout />,
    },
  ]);