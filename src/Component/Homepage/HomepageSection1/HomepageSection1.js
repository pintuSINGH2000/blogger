import React from "react";
import styles from "./homepageSection1.module.css";
import blog12 from "../../../assest/Images/blog12.png";
import blog38 from "../../../assest/Images/blog38.png";
import blog24 from "../../../assest/Images/blog24.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createPost } from "../../../apis/post";
import { toast } from "react-toastify";

const HomepageSection1 = () => {
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
        <img src={blog12} alt="family" width={300} height={300} style={{rotate:"45deg"}}/>
        <div className={styles.content}>
          <div className={`${styles.heading} outfit-700`}>
            Publish your passions, your way
          </div>
          <div className={`${styles.text} open-sans`}>
            Create a unique and beautiful blog easily.
          </div>
          <button
            className={`${styles.create} open-sans-semibold primary-btn border-none cursor-pointer white`}
            onClick={handleCreatePost}
          >
            Create your blog
          </button>
        </div>
        <img src={blog24} alt="technology" width={300} height={300} style={{rotate:"315deg"}}/>
      </div>
      <div className={styles.formImg}>
        <div className={`${styles.circle} ${styles.circle1}`}></div>
        <div className={`${styles.circle} ${styles.circle2}`}></div>
        <img src={blog38} alt="cooking" width={900} height={500}/>
      </div>
    </div>
  );
};

export default HomepageSection1;
