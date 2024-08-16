import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";


function App() {
  return (
   <>
     <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        ></Route>
         <Route
          path="/register"
          element={
            <RegisterPage />
          }
        ></Route>
      </Routes>
   </>
  );
}

export default App;
