import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from "react-redux";
import rootReducer from "../src/reducers";
import thunk from 'redux-thunk';


const store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
 );
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
