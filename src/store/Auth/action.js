import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// Action Types
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// Action Creators
export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const logout = () => ({
  type: LOGOUT,
});

// Async Thunk Actions
export const loginApi = (user) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${backendUrl}auth/login`, user);
    if (res?.data?.message) {
      toast.success(res?.data?.message);
    }
    dispatch(loginSuccess(res.data));
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    dispatch(loginFailure());
    return false;
  }
};

export const registerApi = (formData) => async () => {
  try {
    const res = await axios.post(`${backendUrl}auth/register`, formData);
    toast.success(res?.data?.message);
    return true;
  } catch (error) {
    toast.error(error?.response?.data?.errorMessage);
    return false;
  }
};
