import { combineReducers } from "redux";
import loginChangeReducer from "modules/login/login";
import saveConfigReducer from "modules/config/config";

const rootReducer = combineReducers({ loginChangeReducer, saveConfigReducer });

export default rootReducer;
