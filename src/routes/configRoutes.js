import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout";
import AddDriver from "../components/AddDriver";
import AddMachine from "../components/AddMachine";
import ViewallMachine from "../components/ViewallMachine";
import ViewDriver from "../components/ViewDriver";
import UserLogin from "../components/UserLogin";
import MainLayout from "../layout/mainLayout";
import Home from "../components/home";
import About from "../components/about";
import Services from "../components/services";
import Contact from "../components/contact";
import UserRequest from "../components/request";
import Signup from "../components/Signup";
import ViewallRequest from "../components/viewRequest";
import MapView from "../components/mapView";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
      {
        path:'',
        element:<Home/>
      },
      {
        path:'about',
        element:<About/>
      },
      {
        path:'service',
        element:<Services/>
      },
      {
        path:'map',
        element:<MapView/>
      },
      {
        path:'contact',
        element:<Contact/>
      },
      {
        path:'request',
        element:<UserRequest/>
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/login",
        element: <UserLogin />
      }
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "add-machine",
        element: <AddMachine />
      },
      {
        path: "view-machine",
        element: <ViewallMachine />
      },
      {
        path: "add-driver",
        element: <AddDriver />
      },
      {
        path: "view-driver",
        element: <ViewDriver />
      },
      {
        path: "view-request",
        element: <ViewallRequest />
      }
    ]
  }
]);
