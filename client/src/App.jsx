import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PostTable from "./Components/PostTable/PostTable";
import { PostDetails } from "./Components/PostDetails/PostDetails";
import { Navbar } from "./Components/Navbar/Navbar";
import Login from "./Components/Auth/Login";
import withAuthProtection from "./hoc/withAuthProtection";
import Signup from "./Components/Auth/Signup";

function App() {
  const Layout = () => (
    <div className="box-border">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );

  const ProtectedPostTable = withAuthProtection(PostTable);
  const ProtectedPostDetails = withAuthProtection(PostDetails);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProtectedPostTable />,
        },
        {
          path: "post-details/:id",
          element: <ProtectedPostDetails />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
