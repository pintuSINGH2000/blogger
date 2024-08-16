import React, { useState } from "react";
import styles from "./authComponent.module.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import blog22 from "../../assest/Images/blog22.png";
import blog13 from "../../assest/Images/blog13.png";
import blog33 from "../../assest/Images/blog33.png";
import blog1 from "../../assest/Images/blog1.png";

const AuthComponent = ({ isLogin }) => {
  const [login] = useState(isLogin);

  return (
    <div className={`${styles.container} flexbox-center`}>
       <img className={styles.tech} src={blog22} alt="triangle"width={200} height={200}/>
      <img className={styles.game} src={blog13} alt="ellipse" width={200} height={200}/>
      <img className={styles.food} src={blog33} alt="ellipse" width={200} height={200}/> 
      <img className={styles.flower} src={blog1} alt="ellipse" width={200} height={200}/>
      {login ? <Login /> : <Register />}
    </div>
  );
};

export default AuthComponent;
