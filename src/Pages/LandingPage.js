import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/slider.css";
import Home from "./Home";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { API_URL } from "../App";

function LandingPage() {
  const [slider, setSlider] = useState([]);
  const [boxUnderSlider, setBoxUnderSlider] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const page = location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
    // fetchSlider(page).then(data => setSlider(data)); // Assuming data is an array
  }, [page]);
  const fetchBoxSLider = async () => {
    try {
      const response = await axios.get(`${API_URL}/boxSlider/getBoxSliders`);
      const data = response.data;
      setBoxUnderSlider(data);
    } catch (error) {
      console.log(`Error getting data from frontend: ${error}`);
    }
  };
  const fetchSlider = async () => {
    try {
      const storedData = localStorage.getItem("sliderData");
      if (storedData) {
        setSlider(JSON.parse(storedData)); // Use data from local storage
      } else {
        const response = await axios.get(
          `${API_URL}/sliders/getAllSliders`
        );
        const data = response.data;
        setSlider(data); // Assuming setTags is a function to update your state
        console.log("slider", data);
        localStorage.setItem("sliderData", JSON.stringify(data)); // Store data in local storage
      }
    } catch (error) {
      console.error("Failed to fetch slider:", error);
    }
  };
  useEffect(() => {
    fetchBoxSLider();
    fetchSlider();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: false,
    prevArrow: false,
  };
  const handleOrderCardBtn = (pagelink) => {
    navigate(`${pagelink}#order-section`);
  };
  return (
    <>
      <Slider {...settings} style={{ overflow: "hidden" }}>
        <div className="fixed_image_slider"></div>

        {slider.map((slide) => (
          <div className="slide-item">
            <img
              src={`https://res.cloudinary.com/durjqlivi/${slide.slider_img}`}
              alt={`slider img`}
              className="img_home"
              loading="lazy"
            />

            <div className="overlay" key={slide.id}>
              <div className="overlay-content">
                {slide.img ? (
                  <img
                  src={`https://res.cloudinary.com/durjqlivi/${slide.img}`}

                    alt={slide.title}
                    height={"20%"}
                    width={"20%"}
                    loading="lazy"
                  />
                ) : (
                  <div className="placeholder-image">
                    <p></p>
                  </div>
                )}{" "}
                <h1 className="title_of_slidercomp">{slide.title}</h1>
                <p className="paragraph_slider">{slide.descr}</p>
                <button
                  className={`btn btn-s purple_btn ${
                    !slide.btn_name ? "hidden_btn" : ""
                  }`}
                  onClick={() => handleOrderCardBtn(slide.page)}
                  style={{ display: slide.btn_name ? "inline-block" : "none" }}
                >
                  {slide.btn_name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div
        className="container text-center slider_box"
        style={{ overflowX: "hidden" }}
      >
        <div className="row">
          {boxUnderSlider.map((box) => (
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-2 col-md-12 col-sm-12 vector_cont">
                  <img
                    src={require("../assets/vectorBook.png")}
                    alt="vector book"
                    className="vector_icon"
                    loading="lazy"
                  />
                </div>
                <div className="col-lg-10 col-md-12 col-sm-12">
                  <h5 className="h_box_slider"> {box.title} </h5>
                  <p className="p_box_slider">{box.descr}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End slider section */}
      <Home />
    </>
  );
}

export default LandingPage;
