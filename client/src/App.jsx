import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PostTable from "./Components/PostTable/PostTable";
import { PostDetails } from "./Components/PostDetails/PostDetails";
import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  const Layout = () => {
    return (
      <div className="box-border">
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
