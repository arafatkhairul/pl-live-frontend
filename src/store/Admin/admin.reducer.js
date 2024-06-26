import { key } from "../../utils/Config";
import * as ActionType from "./admin.type";
import jwt_decode from "jwt-decode";
import setToken from "../../utils/setToken";
import SetDevKey from "../../utils/devkey";

const initialState = {
  admin: {},
  isAuth: false,
};

export const adminReducer = (state = initialState, action) => {
  let decode;
  switch (action.type) {
    case ActionType.LOGIN_ADMIN:
      if (action.payload) {
        decode = jwt_decode(action.payload);
      }
      setToken(action.payload);
      SetDevKey(key);
      localStorage.setItem("token", action.payload);
      localStorage.setItem("key", key);
      localStorage.setItem("isAuth", true);
      return {
        ...state,
        admin: decode,
        isAuth: true,
      };
    case ActionType.PROFILE_ADMIN:
      return {
        ...state,
        admin: {
          id: action.payload._id,
          name: action.payload.name,
          email: action.payload.email,
          image: action.payload.image,
          role: action.payload.role,
          fcm_token: action.payload.fcm_token,
          flag: action.payload.flag,
        },
      };
    case ActionType.LOGOUT_ADMIN:
      localStorage.removeItem("key", key);
      localStorage.removeItem("token", setToken);
    
      setToken(null);
      SetDevKey(null);
      return {
        ...state,
        isAuth: false,
        admin: {},
      };
    case ActionType.UPDATE_IMAGE_PROFILE:
      return {
        ...state,
        admin: {
          name: action.payload.name,
          image: action.payload.image,
        },
      };

    case ActionType.UPDATE_PROFILE:
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
};
