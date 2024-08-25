import React from "react";
import styles from "./homepageSection3.module.css";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../../apis/post";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const HomepageSection3 = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleCreatePost = async () => {
     if(!user){
       navigate("/login");
     }
     const id = toast.loading("Please wait...")
     const res = await createPost();
     if (res?.isUnauthorized) {
      localStorage.clear();
      navigate("/login");
    }
     toast.dismiss(id);
     if(res?.postId){
       navigate(`/blog/edit/${res?.postId}`);
     }
  }
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.content}>
          <div className={`${styles.heading} outfit-700`}>
          Join millions of others
          </div>
          <div className={`${styles.text} open-sans`}>Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on Blogger. Sign up to discover why millions of people have published their passions here.</div>

          <button
            className={`${styles.create} open-sans-semibold primary-btn border-none cursor-pointer`}
            onClick={handleCreatePost}
          >
            Create Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomepageSection3;
