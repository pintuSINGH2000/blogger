import React, { useEffect, useMemo, useState } from "react";
import styles from "./createpost.module.css";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageBlot from "../Editor/ImageBot";
import {  useNavigate, useParams } from "react-router-dom";
import {  getPost, updatePost, updateStatus } from "../../apis/post";
import Spinner from "./../Spinner/Spinner";
import CircularLoader from "./../CircularLoader/CircularLoader";
import { IoCloudOfflineOutline } from "react-icons/io5";
import { IoCloudDone } from "react-icons/io5";
import { throttle } from "../../helper/throttle";

const CreatePost = () => {
  const [postData, setPostData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [isAutoSaveActive, setIsAutoSaveActive] = useState(true);

  const modules = useMemo(
    () => ({
      toolbar: {
        theme: "snow",
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: function () {
            const tooltip = this.quill.theme.tooltip;
            const originalSave = tooltip.save;
            const originalHide = tooltip.hide;

            tooltip.save = function () {
              const range = this.quill.getSelection(true);
              const value = this.textbox.value;
              if (value) {
                this.quill.insertEmbed(range.index, "image", value, "user");
              }
            };
            tooltip.hide = function () {
              tooltip.save = originalSave;
              tooltip.hide = originalHide;
              tooltip.hide();
            };
            tooltip.edit("image");
            tooltip.textbox.placeholder = "Embeded URL";
            if (
              tooltip.root &&
              tooltip.root.getAttribute("data-mode") === "image"
            ) {
              tooltip.root.classList.add("ql-image-label");
            }
          },
        },
        history: {
          delay: 500,
          maxStack: 100,
          userOnly: true,
        },
      },
    }),
    []
  );

  const handleChange = (e) => {
    setIsSaved(false);
    setIsChange(true);
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContentChange = (content) => {
    setIsSaved(false);
    setIsChange(true);
    setPostData({
      ...postData,
      content: content,
    });
  };

  const handleStatus = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    if (postData.status === 1) {
      await updatePost(postData, postId);
      setIsSaved(true);
    } else {
      setIsAutoSaveActive(false);
      postData.status=1;
      await updateStatus(postData, postId);
      navigate("/blog");
    }
    setIsProcessing(false);
  };

  const throttledSaveDraft = useMemo(
    () =>
      throttle(
        async (data) => {
          if(!isAutoSaveActive) return;
          try {
            const res = await updatePost(
              {
                title: data[0].title,
                content: data[0].content,
                image: data[0].image,
              },
              postId
            );
          } catch (error) {
            console.error("Error saving draft:", error);
          }
        },
        5000,
        () => setIsSaved(true)
      ),
    [postId]
  );

  useEffect(() => {
    if (!isSaved && isChange && postData.status==2) {
      throttledSaveDraft(postData);
    }
  }, [postData, isSaved]);

  useEffect(() => {
    const getPostData = async () => {
      setIsLoading(true);
      const res = await getPost(postId);
      if (res?.post) {
        setPostData(res?.post);
      }
      setIsLoading(false);
    };
    getPostData();
     //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSaved) {
        const confirmationMessage =
          "You have unsaved changes. Are you sure you want to leave this page?";
        event.preventDefault();
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSaved]);

  return (
    <>
      {isLoading ? (
        <div className={`${styles.lodingState} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <div className={`${styles.container}`}>
          <div className={styles.header}>
            <div className={`${styles.title} open-sans-bold`}>
              Create Blog Post
            </div>
            <div className="flexbox-center" style={{ gap: "30px" }}>
              {isChange &&
                (!isSaved ? (
                  <IoCloudOfflineOutline className={styles.saveIcon} />
                ) : (
                  <IoCloudDone
                    className={styles.saveIcon}
                    style={{ color: "rgb(48 191 48)" }}
                  />
                ))}
              <button
                className={`${styles.save} poppins-500 cursor-pointer flexbox-center`}
                onClick={handleStatus}
              >
                {isProcessing ? (
                  <Spinner />
                ) : postData?.status == 1 ? (
                  "Update"
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Enter blog title"
              name="title"
              className={`${styles.input}`}
              value={postData.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <input
              type="url"
              placeholder="Enter image URL"
              name="image"
              className={`${styles.input}`}
              value={postData.image}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <ReactQuill
              value={postData.content}
              modules={modules}
              onChange={handleContentChange}
              placeholder="Write your blog post here..."
              className={styles.quill}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
