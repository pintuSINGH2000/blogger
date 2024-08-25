import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CreatePost from "./Pages/CreatePost";
import BlogsPage from "./Pages/BlogsPage";
import PublicBlogPage from "./Pages/PublicBlogPage";
import Empty from "./Component/Empty/Empty";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={  <ProtectedRoute Component={Homepage} isAuthenticate={true} />}></Route>
        <Route
          path="/login"
          element={
            <ProtectedRoute Component={LoginPage} isAuthenticate={true} />
          }
        ></Route>
        <Route
          path="/register"
          element={
            <ProtectedRoute Component={RegisterPage} isAuthenticate={true} />
          }
        ></Route>
        <Route
          path="/blog"
          element={<ProtectedRoute Component={BlogsPage} />}
        ></Route>
        <Route
          path="/blog/edit/:postId"
          element={<ProtectedRoute Component={CreatePost} />}
        ></Route>
        <Route path="/blog/:postId" element={<PublicBlogPage />}></Route>

        <Route path="/*" element={<Empty />}></Route>
      </Routes>
    </>
  );
}

export default App;
