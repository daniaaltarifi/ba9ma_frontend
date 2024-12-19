import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/slider.css";
import { Link, useParams,useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../App";
function SliderComp({title,title2,description,image }) {
const [slider,setSlider]=useState([])
const navigate=useNavigate()
const CACHE_EXPIRY_TIME =60000; // Cache expiry time in milliseconds (e.g., 5 minutes)

  // if (!Array.isArray(slider) || slider.length === 0) {
  //   return <div>Loading...</div>; // Handle case where slider data is not yet loaded
  // }
  const location = useLocation();
  const page = location.pathname; 
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
 
  
  const [loading, setLoading] = useState(true);

  
  const fetchSlider = async () => {
    setLoading(true);
    try {
      // Construct unique key for local storage based on page
      // const storageKey = `sliderData_${page}`;
      // const timestampKey = `${storageKey}_timestamp`;

      // const storedData = localStorage.getItem(storageKey);
      // const storedTimestamp = localStorage.getItem(timestampKey);

      // const currentTime = new Date().getTime();

      // if (storedData && storedTimestamp && (currentTime - parseInt(storedTimestamp, 10)) < CACHE_EXPIRY_TIME) {
      //   // Use cached data if not expired
      //   setSlider(JSON.parse(storedData));
      // } else {
        // Fetch data from API if not cached or cache expired
        const response = await axios.get(`${API_URL}/sliders/getSliderByPage${page}`);
        const data = response.data;
        setSlider(data);
      //   localStorage.setItem(storageKey, JSON.stringify(data)); // Store data in local storage
      //   localStorage.setItem(timestampKey, currentTime.toString()); // Update timestamp
      // }
    } catch (error) {
      console.error("Failed to fetch slider:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
    fetchSlider()

  },[page])
  const handleOrderCardBtn = (pagelink) => {
    navigate(`#order-section`);
  };
  return (
    <>
      {/* slider section */}

      <Slider {...settings} style={{ overflow: "hidden" }}>
      {/* <div className="fixed_image_slider"> */}
        {slider.map((slide) => (
          <div className={`slide-item `}>
            <img
              src={`https://res.cloudinary.com/durjqlivi/${slide.slider_img}`}
              alt={`slider img`}
              loading="lazy"
              className="img_home"
            />

            <div className="overlay" key={slide.id}>
              <div className="overlay-content">
                {slide.img ? (
                  <img
                  src={`https://res.cloudinary.com/durjqlivi/${slide.img}`}
                    alt={slide.title}
                    height={"20%"}
                    loading="lazy"
                    width={"20%"}
                  />
                ) : (
                  <div className="placeholder-image">
                    <p></p>
                  </div>
                )}{" "}
                <h1 className="title_of_slidercomp">{slide.title}</h1>
                <p className="paragraph_slider">{slide.descr}</p>
                <button 
  className={`btn btn-s purple_btn ${!slide.btn_name ? 'hidden_btn' : ''}`} 
  onClick={() => handleOrderCardBtn(slide.page)}
  style={{ display: slide.btn_name ? 'inline-block' : 'none' }}
>
  {slide.btn_name}
</button>

              </div>
            </div>
          </div>
        ))}
    
      {/* </div> */}
      </Slider>

       {/* <Slider {...settings} style={{ overflow: "hidden" }}>
        <div className="slide-item">
          <img
            src={require("../assets/slide.jpg")}
            alt={`slider img`}
            className="img_home"
          />
          <div className="overlay">
            <div className="overlay-content">
              <img src={image} alt="" />{" "}
              <h1  className="title_of_slidercomp">{title}</h1>
              <p className="paragraph_slider">
              {description}
              </p>
              <Link to="/cardprice"  className="btn btn-s purple_btn ">
                اطلب بطاقتك هنا
              </Link>
            </div>
          </div>
        </div>
        <div className="slide-item">
          <img
            src={require("../assets/slide.jpg")}
            alt={`Contact Video`}
            className="img_home"
          />
           <div className="overlay">
            <div className="overlay-content">
              <img src={require("../assets/logo.png")} alt="" />
          <p  >{title2}</p>

              <p className="paragraph_slider">
                في عصرنا الرقمي، تحولت التكنولوجيا إلى عنصر أساسي في حياتنا
                اليومية، ومعها، ظهر التعليم عن بُعد كوسيلة مثالية لتكميل النظام
                التعليمي التقليدي. هذه الطريقة الجديدة تمكن الطلاب من فهم
                المفاهيم المعقدة بسهولة أكبر.
              </p>
              <Link to="/cardprice"  className="btn btn-s purple_btn btn_slider">
                اطلب بطاقتك هنا
              </Link>
            </div>
          </div>
        </div>
        
      </Slider> */}
    </>
  );
}

export default SliderComp;
