import { createBrowserRouter } from "react-router-dom";
import Contact from "../pages/Contact/Contact";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import { Layouts } from "../pages/Layouts/Layouts";
import { Products } from "../pages/Products/Products";
import { Tickets } from "../pages/Tickets/Tickets";
import { AddProduct } from "../pages/addProduct/addProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/tickets",
        element: <Tickets />,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
    ],
  },
]);
