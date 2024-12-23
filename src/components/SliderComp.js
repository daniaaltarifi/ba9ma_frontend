import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/slider.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";

function SliderComp() {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const fetchSlider = async () => {
    setLoading(true);
    try {
      const sanitizedPage = page.startsWith("/") ? page.substring(1) : page;
      const response = await axios.get(
        `${API_URL}/sliders/getSliderByPage/${sanitizedPage}`
      );
      setSlider(response.data);
    } catch (error) {
      console.error("Failed to fetch slider:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlider();
  }, [page]);

  const handleOrderCardBtn = () => {
    const orderSection = document.querySelector("#order-section");
    if (orderSection) {
      navigate("#order-section");
    } else {
      console.error("Order section not found.");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <Slider {...settings} style={{ overflow: "hidden" }}>
          {slider.map((slide) => (
            <div className="slide-item" key={slide.id}>
              <img
                srcSet={
                  slide.slider_img
                    ? `https://res.cloudinary.com/durjqlivi/${slide.slider_img}?w=800 800w,
                       https://res.cloudinary.com/durjqlivi/Basma_Academy/image?w=1600 1600w`
                    : "placeholder.jpg"
                }
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="slider img"
                className="img_home"
                decoding="async"
              />

              <div className="overlay">
                <div className="overlay-content">
                  <h1 className="title_of_slidercomp">{slide.title}</h1>
                  <p
                    className="paragraph_slider"
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.5",
                      color: "#333",
                      margin: "10px 0",
                      textAlign: "center",
                    }}
                  >
                    {slide.descr || "نحن هنا دائمًا لمساعدتك!"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
<link rel="preload" href="path-to-your-font.woff2" as="font" type="font/woff2" crossorigin="anonymous"></link>

export default SliderComp;
