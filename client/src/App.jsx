import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PostTable from "./Componenets/PostTable/PostTable";
import { PostDetails } from "./Componenets/PostDetails/PostDetails";
import { Navbar } from "./Componenets/Navbar/Navbar";
// import Navbar from "./Components/Navbar/Navbar";
// import PostTable from "./PostTable/PostTable";

function App() {
  const Layout = () => {
    return (
      <div className="box-border">
        {/* Main Content Container */}
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <PostTable />,
        },
        {
          path: "/post-details/:id",
          element: <PostDetails />,
        },
      ],
    },
    // {
    //   path: "/login",
    //   element: (
    //     <AuthGuard>
    //       <Login />
    //     </AuthGuard>
    //   ),
    // },
    // {
    //   path: "/signup",
    //   element: (
    //     <AuthGuard>
    //       <Signup />
    //     </AuthGuard>
    //   ),
    // },
    // {
    //   path: "/forgotPassword/:token",
    //   element: <ForgotPassword />,
    // },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
