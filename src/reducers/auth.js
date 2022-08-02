import { AUTH_ERROR, USER_LOADED } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      // //console.log(payload);

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case AUTH_ERROR:

    default:
      return state;
  }
}
