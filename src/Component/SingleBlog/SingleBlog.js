import React, { useEffect, useRef, useState } from "react";
import styles from "./singleblog.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  deleteComment,
  getPublicPost,
} from "../../apis/post";
import blogger from "../../assest/Images/blogger.jpg";
import { BsFillShareFill } from "react-icons/bs";
import moment from "moment";
import { FaBlogger } from "react-icons/fa";
import { BiLogoBlogger } from "react-icons/bi";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import CircularLoader from "../CircularLoader/CircularLoader";
import { toast } from "react-toastify";

const SingleBlog = () => {
  const [postData, setPostData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { postId } = useParams();
  const textareaRef = useRef(null);
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [currentInput, setCurrentInput] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
   if(textareaRef?.current?.style){
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
   }
  }, [inputComment]);
  useEffect(() => {
    const getSinglePost = async () => {
      setIsProcessing(true);
      const res = await getPublicPost(postId, user?.userId);
      if (res?.post) {
        setPostData(res?.post);
        setComments(res?.comments);
        localStorage.setItem("resData", JSON.stringify(res));
      } else {
        navigate("/*");
      }
      setIsProcessing(false);
    };
    getSinglePost();
    //eslint-disable-next-line
  }, []);

  const handleShare = async () => {
    const homepageUrl = window?.location?.origin;
    navigator.clipboard
      .writeText(homepageUrl + "/blog/" + postId)
      .then(() => {
        toast.success("Link copied to Clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };


  const handleSend = async () => {
    if (inputComment.trim().length === 0) return;
    if (isLoading) return;
    setIsLoading(true);
    const res = await createComment({
      content: inputComment,
      postId: postData._id,
      parentComment: currentInput === -1 ? null : currentInput,
    });
    if (res?.comment) {
      setInputComment("");
      setCurrentInput(-1);
      res.comment.isDeletable = true;
      if (res.comment?.parentComment) {
        const updatedComments = comments.map((comment) => {
          if (comment._id === res.comment.parentComment) {
            return {
              ...comment,
              replies: [...comment.replies, res?.comment],
            };
          }
          return comment;
        });

        setComments(updatedComments);
      } else {
        res.comment.replies = [];
        setComments([...comments, res.comment]);
      }
    }
    setIsLoading(false);
  };

  const hadleReply = (commentid) => {
    if (commentid === currentInput) return;
    setCurrentInput(commentid);
    setInputComment("");
  };

  const handleDelete = async (commentId) => {
    if (isLoading) return;
    setIsLoading(true);
    const res = await deleteComment(commentId);
    if (res?.deleted) {
      setComments(comments.filter((comment) => comment._id !== commentId));
    }
    setIsLoading(false);
  };
  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div
        key={comment._id}
        className={styles.userComment}
        style={{ marginLeft: comment?.parentComment && "0" }}
      >
        <BiLogoBlogger className={styles.profile} />
        <div className={styles.commentData}>
          <div className={`${styles.authorDetails}`}>
            <div className={`${styles.authorName}  poppins-semibold`}>
              {comment?.author?.username}
            </div>
            <span className={`${styles.createdDate}`}>
              {moment(comment.createdAt).format("MMMM D, YYYY h:mm:ss a")}
            </span>
          </div>
          <div>{comment.content}</div>
          {comment.replies && comment.replies.length > 0 && (
            <div>{renderComments(comment.replies)}</div>
          )}
          {currentInput === comment._id && (
            <div
              className={`${styles.commentInput} ${styles.replyCommentInput}`}
            >
              <BiLogoBlogger className={styles.profile} />{" "}
              <textarea
                ref={textareaRef}
                value={inputComment}
                onChange={(e) => setInputComment(e.target.value)}
                rows="1"
                className={`${styles.input} poppins-500`}
                placeholder="Write your comment..."
              />
              <IoSend className={styles.send} onClick={handleSend} />
            </div>
          )}
          <div className={styles.btns}>
            {!comment.parentComment && comment?.isEditable && (
              <button
                className={`${styles.btn} ${styles.reply}`}
                onClick={() => hadleReply(comment._id)}
              >
                Reply
              </button>
            )}
            {comment?.isDeletable && (
              <button
                className={`${styles.btn}  ${styles.delete}`}
                onClick={() => handleDelete(comment._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    ));
  };
  return (
    <>
      {isProcessing ? (
        <div className={`${styles.lodingState} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <div className={`${styles.container} flexbox-center`}>
          <img
            src={blogger}
            alt="post"
            className={styles.blogImage}
            height={300}
          />
          <div className={styles.blogDetails}>
            <div className={styles.header}>
              <div className={`${styles.title} poppins-bold`}>
                {postData.title}
              </div>
              <BsFillShareFill
                className={styles.menuIcon}
                style={{ color: "rgb(48 191 48)", fontSize: "20px",cursor:"pointer" }}
                onClick={handleShare}
              />
            </div>
            <div className={styles.subheader}>
              <div className={`${styles.date} poppins-semibold`}>
                {moment(postData.createdAt).format("MMM Do, YYYY")}
              </div>
              <div className={`${styles.username} poppins-semibold`}>
                Author: {postData?.author?.username}
              </div>
            </div>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />
            <hr
              style={{
                border: "none",
                borderTop: "1px dotted black",
                margin: "32px",
              }}
            />
            {isLoading ? (
              <div className={`${styles.lodingComment} flexbox-center`}>
                <CircularLoader />
              </div>
            ) : (
              <div className={styles.comments}>
                {renderComments(comments)}
                {!user?(<div className={styles.loginMessage}>
                  <div className={`${styles.message}  poppins-500`}>To leave a comment, click the button below to sign in.</div>
                  <button className={`${styles.btn} ${styles.reply}`} onClick={()=>navigate("/login")}>Sign in</button>
                </div>):(<>
                {currentInput === -1 && (
                  <div className={styles.commentInput}>
                    <BiLogoBlogger className={styles.profile} />{" "}
                    <textarea
                      ref={textareaRef}
                      value={inputComment}
                      onChange={(e) => setInputComment(e.target.value)}
                      rows="1"
                      className={`${styles.input} poppins-500`}
                      placeholder="Write your comment..."
                    />
                    <IoSend className={styles.send} onClick={handleSend} />
                  </div>
                )}</>)}
              </div>
            )}
            <div className={styles.footer}>
              <FaBlogger /> Powered by Blogger
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleBlog;
