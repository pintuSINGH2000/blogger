import { toast } from "react-toastify";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./action";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case LOGIN_SUCCESS:
      const { message, ...userData } = action.payload;
      return {
        user: userData,
        isFetching: false,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case LOGOUT:
      toast.success("Logout Successfully");
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default authReducer;
