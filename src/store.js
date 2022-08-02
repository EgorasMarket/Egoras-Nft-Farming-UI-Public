import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";

// const store = createStore(rootReducer, applyMiddleware(reduxThunk));
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk))
); // new store create function : to help with redux debugging on browser

export default store;
