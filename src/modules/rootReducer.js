import { combineReducers } from "redux";
import loginChangeReducer from "modules/login/login";

const rootReducer = combineReducers({ loginChangeReducer });

export default rootReducer;
