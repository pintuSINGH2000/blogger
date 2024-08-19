import React, { useEffect, useState } from 'react';
import styles from "./blogs.module.css";
import { getAllPost } from '../../apis/post';

const Blogs = () => {
    const [posts,setPosts] = useState([]);

    useEffect(()=>{
      const getPost = async () => {
        const res = await getAllPost();
        if(res?.posts){
           setPosts(res.posts);
        }
      }
      getPost();
    },[]);
  return (
    <div>{JSON.stringify(posts)}</div>
  )
}

export default Blogs