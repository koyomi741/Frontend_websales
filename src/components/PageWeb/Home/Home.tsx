import React from "react";
import Slider from "./Slider";
import "./Home.css";
import Footer from "../Store/Footer";
import Map from "../../../Map";

export default () => {
  return (
    <div className="home-container">
      <Slider />
      <Map/>
      <Footer/>
    </div>
  );
};
// aaa