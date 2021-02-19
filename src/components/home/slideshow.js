import React, { Component } from "react";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import SearchBar from "./searchbar";

export default class Slideshow extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
    };
    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Slider {...settings}>
          <div className="slideshow-bg slideshow-bg1"></div>
          <div className="slideshow-bg slideshow-bg2"></div>
          <div className="slideshow-bg slideshow-bg3"></div>
          <div className="slideshow-bg slideshow-bg4"></div>
        </Slider>
        <SearchBar />
      </div>
    );
  }
}
