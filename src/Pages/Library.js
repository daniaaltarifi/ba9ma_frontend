import { useState, useEffect, useRef } from "react";
import React from "react";
import SliderComp from "../components/SliderComp";
import { useNavigate ,useLocation, Link} from "react-router-dom";
import "../Css/courses.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
import { API_URL } from "../App";
function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [library, setLibrary] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const fetchLibrary = async () => {
    try {
      const response = await axios.get(`${API_URL}/Libraries/getLibraries`);
      setLibrary(response.data);
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API_URL}/departments/getDepartments`);
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchLibrary();
    fetchDepartments();
  }, []);
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the courses based on the search query
    const filteredResults = library.filter((library) =>
      library.book_name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const libraryPerSlide = 9; // Maximum library per slide

  const numSlides = Math.ceil(library.length / libraryPerSlide);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % numSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + numSlides) % numSlides);
  };
  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const fetchLibraryBasedDepartment = async (selectedDepartmentId) => {
    try {
      const response = await axios.get(
        `${API_URL}/Libraries/getbydep/${selectedDepartmentId}`
      ); 
      setLibrary(response.data);
    } catch (error) {
      console.error(
        `Error fetching library items for department ${selectedDepartmentId}:`,
        error
      );
    }
  };
  const handleDepartment = (e) => {
    const selectedDepartmentId = e.target.value;
    setSelectedDepartment(selectedDepartmentId);
    fetchLibraryBasedDepartment(selectedDepartmentId);
  };
  useEffect(() => {
    if (searchResults.length > 0) {
      setLibrary(searchResults);
    } else {
      // If searchResults is empty, reset to original library data
      fetchLibrary(); // Fetch original library data again
    }
  }, [searchResults]);
  const [slider,setSlider]=useState([])



const { hash } = useLocation();

useEffect(() => {
  if (hash) {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, [hash]);


  return (
    <>

      <SliderComp slider={slider} />
      <section className="margin_section"id="order-section">
        <div className="container ">
          <div className="row ">
            <div className="col-lg-3 col-md-4 col-sm-12">
              <div className="navbar__search">
                <span>
                  <i
                    className="fa-solid fa-magnifying-glass fa-sm"
                    style={{ color: "#833988" }}
                  ></i>{" "}
                </span>
                <input
                  type="text"
                  placeholder="ابحث عن مادة"
                  value={searchQuery}
                  className="search_course"
                  onChange={handleInputChange}
                />
                <a
                  onChange={handleInputChange}
                  className="btn btn-s purple_btn search_btn"
                >
                  بحث{" "}
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
              <select
                name="department"
                value={selectedDepartment}
                onChange={handleDepartment}
                id="lang"
                className="select_dep"
              >
                <option value="">اختر قسم</option>
                {department.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.title}
                  </option>
                ))}
              </select>
              
            </div>
            <div className="col-lg-6 col-md-4 col-sm-12"></div>
          </div>
        </div>
      </section>

      <div className="slick-wrapper">
        <div className="container ">
          <div className="row d-flex  flex-wrap justify-content-center align-items-center">
            {library.map((data, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={data.id}>
                <div
                  className={`slide ${index === currentSlide ? "active" : ""}`}
                >
                  <div className="card card_cont">
                    <img
                      src={require("../assets/course.webp")}
                      className="card-img-top img-fluid card_img"
                      alt="library"
                      loading="lazy"
                    />
                    <div className="card-body">
                      <div>
                        {/* rating here */}
                        <p className="card-text card_dep">
                          {" "}
                          {data.department.title}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="course_title_card">{data.book_name}</p>{" "}
                        <p className=" teacher_name_card">{data.author} </p>
                      </div>
                      <hr style={{ marginTop: "1px" }} />
                      <div className="d-flex justify-content-between">
                        <i
                          className="fa-solid fa-file card_icon"
                          style={{ color: "#F57D20" }}
                        ></i>
                        <p className="details_courses_card">
                          {" "}
                          {data.page_num}صفحة
                        </p>
                        <i
                          className="fa-solid fa-clock card_icon"
                          style={{ color: "#F57D20" }}
                        ></i>{" "}
                        <p className="details_courses_card">
                                  {new Date(
                                      data.createdAt
                                    ).toLocaleDateString("en-GB", {
                                      year: "numeric",
                                      month: "numeric",
                                      day: "numeric",
                                    })}
                        </p>
                        <Link target="blankk" to={`https://res.cloudinary.com/dqimsdiht/image/upload/v1734943495/${data.file_book}`}>
                        <button
                          style={{
                            backgroundColor: "#833988",
                            border: "none",
                            borderRadius: "25px",
                            color: "#fff",
                            fontSize: "12px",
                            height: "35px",
                          }}
                          className="px-3"
                        >
                          {" "}
                          <i
                            className="fa-solid fa-download px-2"
                            style={{ color: "#ffffff" }}
                          ></i>
                          تحميل
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            ))}
            <div
              className="col-md-12 col-sm-12 col_btn_prevNext"
              style={{ marginTop: "10px" }}
            >
              <button onClick={nextSlide} className="btn mb-3  ">
                {" "}
                <i className="fa fa-arrow-right"></i>
              </button>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "5px",
                  fontSize: "18px",
                }}
              >
                {" "}
                {/* Current Slide Number */}
                <span style={{ fontWeight: "bold",   paddingRight: "15px",
                      paddingLeft: "10px",}}>
                  {currentSlide + 1}
                </span>
                {/* Next Slide Number */}
                {currentSlide < 3 && ( // Replace `3` with the total number of slides minus one
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => goToSlide(currentSlide + 1)}
                  >
                    {currentSlide + 2}
                  </span>
                )}{" "}
                {/* Previous Slide Number */}
                {currentSlide > 0 && (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => goToSlide(currentSlide - 1)}
                  >
                    {currentSlide}
                  </span>
                )}
              </div>
              <button onClick={prevSlide} className="btn  mb-3  ">
                {" "}
                <i className="fa fa-arrow-left"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Library;
