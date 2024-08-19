import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import CreatePost from "./Pages/CreatePost";
import BlogsPage from "./Pages/BlogsPage";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/blog" element={<BlogsPage />}></Route>
        <Route path="/blog/edit/:postId" element={<CreatePost />}></Route>
      </Routes>
    </>
  );
}

export default App;
