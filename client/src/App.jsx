import { Outlet, Route, RouterProvider, createBrowserRouter } from "react-router-dom"
import Navbar from "../src/components/navbar/Navbar"
import "./app.css"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer"
import Gig from "./pages/gig/Gig"
import Gigs from "./pages/gigs/Gigs"
import Orders from "./pages/orders/Orders"
import MyGigs from "./pages/myGigs/MyGigs"
import Add from "./pages/add/Add"
import Message from "./pages/message/Message"
import Messages from "./pages/messages/Messages"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Success from "./pages/success/Success"
import Pay from "./pages/pay/Pay"

const App = () => {

  const Layout = () => {
    const queryClient = new QueryClient()

    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/gig/:id",
          element: <Gig />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/mygigs",
          element: <MyGigs />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/success",
          element: <Success />
        },
        {
          path: "/pay/:id",
          element: <Pay />
        },
        {
          path: "/success",
          element: <Success />
        },
        {
          path: "/pay/:id",
          element: <Pay />
        },
      ]
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App