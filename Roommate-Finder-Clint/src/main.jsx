import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import MyListing from "./pages/MyListing";
import BrowseListing from "./pages/BrowseListing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./provider/AuthProvider";
import PrivateProvider from "./provider/PrivateProvider";
import AddRoommate from "./pages/AddRoommate";
import ListingDetails from "./pages/ListingDetails";
import { createBrowserRouter, RouterProvider } from "react-router";
import UpdatePage from "./pages/Updatepage";
import About from "./components/About";
import Dashboard from "./pages/Dashboard";
import DashboardBrowseListing from "./pages/DashboardBrowseListing";
import DashboardMyListing from "./pages/DashboardMyListing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:3000/available-roommates"),
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "add",
        element: (
          <PrivateProvider>
            <AddRoommate></AddRoommate>
          </PrivateProvider>
        ),
      },
      {
        path: "browse",
        element: <BrowseListing />,
      },
      {
        path: "my-listings/:email",
        element: (
          <PrivateProvider>
            <MyListing />
          </PrivateProvider>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/browse_listing/${params.email}`),
      },
      {
        path: "roommates-details/:id",
        element: (
          <PrivateProvider>
            <ListingDetails />
          </PrivateProvider>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/details/${params.id}`),
      },
      {
        path: "/update-listing/:id",
        element: (
          <PrivateProvider>
            <UpdatePage></UpdatePage>
          </PrivateProvider>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/details/${params.id}`),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateProvider>
        <Dashboard />
      </PrivateProvider>
    ),
    children: [
      {
        index: true,
        element: <div>Dashboard Home Content</div>,
      },
      {
        path: "add",
        element: (
          <PrivateProvider>
            <AddRoommate></AddRoommate>
          </PrivateProvider>
        ),
      },
      {
        path: "my-items/:email",
        element: (
          <PrivateProvider>
            <DashboardMyListing></DashboardMyListing>
          </PrivateProvider>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/browse_listing/${params.email}`),
      },
      {
        path: "browse",
        element: <DashboardBrowseListing></DashboardBrowseListing>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
