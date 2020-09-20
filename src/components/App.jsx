import React from "react";

import GoogleMap from "./GoogleMapWarp.jsx";
import Aside from "./Aside.jsx";
import StoreInfo from "./StoreInfo.jsx";

export default function App(props) {
  return (
    <React.Fragment>
      <Aside />
      <GoogleMap />
      <StoreInfo />
    </React.Fragment>
  );
};
