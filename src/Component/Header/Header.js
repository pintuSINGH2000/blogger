import React, { useState } from "react";
import styles from "./header.module.css";
import { FaBlogger } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../apis/post";
import { toast } from "react-toastify";

const Header = ({isPost}) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleCreatePost = async () => {
       if(!user){
         navigate("/login");
       }
       const id = toast.loading("Please wait...")
       const res = await createPost();
       toast.dismiss(id);
       if(res?.postId){
         navigate(`/blog/edit/${res?.postId}`);
       }
    }
  return (
    <div className={styles.container}>
      <div className={`${styles.logo}`}>
        <FaBlogger className={styles.logoIcon} /> Blogger
      </div>
      <div className={styles.btn}>
        {user?(<div className={`${styles.profile} flexbox-center`}><div className={styles.profilePic}></div><p className={`${styles.username} ellipsis open-sans-semibold`}>{user?.name}</p></div>):( <button className={styles.signIn}>Sign In</button>)}
        {!isPost&&<button className={`${styles.create} cursor-pointer`} onClick={handleCreatePost}>Create Blog</button>}
      </div>
    </div>
  );
};

export default Header;
