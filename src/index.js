import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "modules/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
          <CookiesProvider>
                <App />
          </CookiesProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
