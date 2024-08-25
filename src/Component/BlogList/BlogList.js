import React, { useEffect, useState } from "react";
import styles from "./blogList.module.css";
import blogImage from "../../assest/Images/blogImage.png";
import { IoEye } from "react-icons/io5";
import { FaCommentAlt } from "react-icons/fa";
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";
import moment from "moment";
import { IoSend } from "react-icons/io5";
import { MdSendAndArchive } from "react-icons/md";
import { Tooltip } from "antd";
import { BsFillShareFill } from "react-icons/bs";
import { MdAutoDelete } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const BlogList = ({ post, showMenu, handleMenu, onChangeStatus, onDelete, onShare }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container} onClick={()=>navigate(`/blog/edit/${post._id}`)}>
      <PiDotsThreeCircleVerticalFill
        onClick={(e)=>handleMenu(e)}
        className={styles.dotIcon}
      />
      {showMenu && (
        <div className={styles.menu}>
          {(post.status === 2 || post.status === 3) && (
            <div
              className={styles.menuItem}
              onClick={(e) => onChangeStatus(e,1)}
            >
              <IoSend
                className={styles.menuIcon}
                style={{ color: "#304996" }}
              />{" "}
              Make public
            </div>
          )}
          {(post.status === 1 || post.status === 3) && (
            <div className={styles.menuItem}  onClick={(e) => onChangeStatus(e,2)}>
              <MdSendAndArchive
                className={styles.menuIcon}
                style={{ color: "#304996" }}
              />
              Save as draft
            </div>
          )}
          {post.status === 1 && (
            <div className={styles.menuItem}   onClick={(e) => onChangeStatus(e,3)} >
              <MdAutoDelete
                className={styles.menuIcon}
                style={{ color: "red" }}
              />
              Move to thrash
            </div>
          )}
          {(post.status === 2 || post.status === 3) && (
            <div className={styles.menuItem}  onClick={(e)=>onDelete(e)}>
              <RiDeleteBinFill
                className={styles.menuIcon}
                style={{ color: "#eb6a6a" }}
              />
              Discard post
            </div>
          )}
         {post.status===1 && (
             <div className={styles.menuItem} onClick={(e)=>onShare(e)}>
             <BsFillShareFill
               className={styles.menuIcon}
               style={{ color: "rgb(48 191 48)" }}
             />
             Share
           </div>
         )}
        </div>
      )}

      <img
        src={post.image ? post.image : blogImage}
        alt="blog"
        className={styles.image}
      />
      <div className={styles?.postDetail}>
        <Tooltip
          placement="top"
          title={post.title}
          trigger={window.cordova ? "click" : "hover"}
          style={{ overflow: "auto", height: "200px" }}
        >
          <div className={`${styles.title} poppins-bold`}>
            {post?.title.substring(0, Math.min(post?.title.length, 25))}
          </div>
        </Tooltip>
        <div className={styles.date}>{moment(post.createdAt).format("MMM Do, YYYY")}</div>
        <div className={styles.impressions}>
          <div className={styles.impression}>
            <IoEye className={styles.impressionIcon} /> {post?.views}
          </div>
          <div className={styles.impression}>
            <FaCommentAlt className={styles.impressionIcon} />{" "}
            {post?.commentCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
