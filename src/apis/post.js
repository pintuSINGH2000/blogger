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
    console.log(postData,"api");
    const res = await axios.put(
      `${backendUrl}post/${postId}`,
      postData
    );
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
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return error?.response?.data;
  }
};

export const getPost = async (postId) => {
  try {
    const res = await axios.get(`${backendUrl}post/${postId}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};

export const getAllPost = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] = user.token;
    const res = await axios.get(`${backendUrl}post/`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};
