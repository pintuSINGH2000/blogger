import React, { useEffect, useState } from "react";
import styles from "./blogs.module.css";
import { deletePost, getAllPost, updateStatus } from "../../apis/post";
import BlogList from "../BlogList/BlogList";
import CircularLoader from "../CircularLoader/CircularLoader";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMenu, setShowMenu] = useState(null);
  const [statusData, setStatusData] = useState({});
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();

  const handleMenu = (event, index) => {
    event.stopPropagation();
    if (openMenu === index) {
      setOpenMenu(null); 
    } else {
      setOpenMenu(index); 
    }
  };

  const getPost = async (skip) => {
    if (skip === 0) {
      setIsProcessing(true);
    }
    setShowMenu(false);
    const res = await getAllPost(skip, currentStatus);
    if (res?.isUnauthorized) {
      localStorage.clear();
      navigate("/login");
    }
    if (res?.posts) {
      localStorage.setItem("res", JSON.stringify(res));

      if (skip === 0) {
        setPosts(res?.posts);
        setStatusData(res?.statusCount);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...res.posts]);
      }
    }
    if (skip === 0) {
      if (res?.posts?.length < 12) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } else {
      if (res?.posts?.length >= 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
    setIsProcessing(false);
  };

  const handleChangeStatus = async (event, status, postId) => {
    event.stopPropagation();
    setOpenMenu(null);
    await updateStatus({ status: status }, postId);
    getPost(0);
  };

  // Handle post deletion
  const handleDelete = async (event, postId) => {
    event.stopPropagation();
    setOpenMenu(null);
    await deletePost(postId);
    getPost(0);
  };

  // Handle share
  const handleShare = async (event, postId) => {
    event.stopPropagation();
    setOpenMenu(null);
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

  useEffect(() => {
    getPost(0);
       //eslint-disable-next-line
  }, [currentStatus]);

  const STATUS = [
    {
      id: 1,
      name: "All",
      slag: "all",
    },
    {
      id: 2,
      name: "Publish",
      slag: "publish",
    },
    {
      id: 3,
      name: "Draft",
      slag: "draft",
    },
    {
      id: 3,
      name: "Thrash",
      slag: "thrash",
    },
  ];
  return (
    <>
      {isProcessing ? (
        <div className={`${styles.lodingState} flexbox-center`}>
          <CircularLoader />
        </div>
      ) : (
        <div className={styles.container} id="scrollableDiv">
          <div className={styles.filter}>
            <button
              className={`${styles.filterBtn} open-sans-bold`}
              onClick={() => setShowMenu(!showMenu)}
            >
              {STATUS[currentStatus].name} (
              {statusData[STATUS[currentStatus].slag]}){" "}
              {showMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
              {showMenu && (
                <div className={styles.filterMenu}>
                  {STATUS.map((status, index) => (
                    <div
                      key={status.id}
                      onClick={() => setCurrentStatus(index)}
                      className={`${styles.filterList} open-sans-bold`}
                    >
                      {status.name} ({statusData[status.slag]})
                    </div>
                  ))}
                </div>
              )}
            </button>
          </div>
          {posts.length === 0 ? (
            <div
              className={`${styles.emptyState} flexbox-center poppins-semibold`}
            >
              No post avaiable!
            </div>
          ) : (
            <div style={{ marginTop: "20px" }}>
              <InfiniteScroll
                dataLength={posts.length}
                next={() => getPost(posts.length)}
                hasMore={hasMore}
                loader={<Loader />}
                scrollableTarget="scrollableDiv"
                endMessage={
                  <p
                    style={{
                      textAlign: "center",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    <b>No More Posts!</b>
                  </p>
                }
              >
                <div className={styles.blogListContainer}>
                  {posts.map((post, index) => (
                    <BlogList
                      post={post}
                      key={index}
                      showMenu={openMenu === index}
                      handleMenu={(event) => handleMenu(event, index)}
                      onChangeStatus={(event, status) =>
                        handleChangeStatus(event, status, post._id)
                      }
                      onDelete={(event) => handleDelete(event, post._id)}
                      onShare={(event) => handleShare(event, post._id)}
                    />
                  ))}
                </div>
              </InfiniteScroll>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Blogs;
