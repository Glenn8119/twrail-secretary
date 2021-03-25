import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

import App from "./components/App";

const store = createStore(reducers, applyMiddleware(thunk));
// document.addEventListener("click",()=>{
//     console.log(store.getState())
// })
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.querySelector("#root")
)
