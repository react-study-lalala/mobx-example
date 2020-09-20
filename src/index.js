import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./components/App.jsx";

import 'mobx-react-lite/batchingForReactDom';
import { Provider } from "mobx-react";
import storeStore from "./stores/StoreStore.js";
import googleMapStore from "./stores/GoogleMapStore.js";

// 초기 스토어 목록 받아오기 (from firestore)
storeStore.getData();

// 리액트 렌더 시작!
ReactDOM.render(
  <React.StrictMode>
    <Provider storeStore={storeStore} googleMapStore={googleMapStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);