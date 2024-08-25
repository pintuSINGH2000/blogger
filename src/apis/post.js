import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createPost = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.post(`${backendUrl}post/`);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const updatePost = async (postData, postId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.put(`${backendUrl}post/${postId}`, postData);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const updateStatus = async (postData, postId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.put(
      `${backendUrl}post/update-status/${postId}`,
      postData
    );
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const deletePost = async (postId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.delete(`${backendUrl}post/${postId}`);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const getPost = async (postId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.get(`${backendUrl}post/${postId}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const getPublicPost = async (postId,userId) => {
  try {
    const res = await axios.get(`${backendUrl}post/public-post/${postId?postId:null}/${userId?userId:''}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};
export const getAllPost = async (skip, status) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.get(
      `${backendUrl}post?status=${status}&skip=${skip}`
    );
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

// comment
export const createComment = async (commentData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.post(`${backendUrl}comment/`,commentData);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.delete(`${backendUrl}comment/${commentId}`);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};
