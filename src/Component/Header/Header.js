import React from "react";
import styles from "./header.module.css";
import { FaBlogger } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../apis/post";
import { toast } from "react-toastify";

const Header = ({ isPost }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleCreatePost = async () => {
    if (!user) {
      navigate("/login");
    }
    const id = toast.loading("Please wait...");
    const res = await createPost();
    if (res?.isUnauthorized) {
      localStorage.clear();
      navigate("/login");
    }
    toast.dismiss(id);
    if (res?.postId) {
      navigate(`/blog/edit/${res?.postId}`);
    }
  };

  const handleLogout = () =>{
    localStorage.clear();
    navigate("/login");
  }
  return (
    <div className={styles.container}>
      <div className={`${styles.logo}`}>
        <FaBlogger className={styles.logoIcon} /> Blogger
      </div>
      <div className={styles.btn}>
        {user ? (
          <div className={`${styles.profile} flexbox-center`}>
            <div className={styles.profilePic}></div>
            <p className={`${styles.username} ellipsis open-sans-semibold`}>
              {user?.name}
            </p>
          </div>
        ) : (
          <button
            className={`${styles.signIn} open-sans-semibold cursor-pointer`}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
        <div>
          {user && (
            <button
              className={`${styles.create} open-sans-semibold cursor-pointer`}
              style={{ backgroundColor: "red",marginRight:"10px" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          {!isPost && (
            <button
              className={`${styles.create} open-sans-semibold cursor-pointer`}
              onClick={handleCreatePost}
            >
              Create Blog
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
