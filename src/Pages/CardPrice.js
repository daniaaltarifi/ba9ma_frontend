import React, { useEffect, useState } from "react";
import axios from "axios";
import SliderComp from "../components/SliderComp.js";
import "../Css/cardPrice.css";
import Table from "react-bootstrap/Table";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { API_URL } from "../App.js";
function CardPrice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState([]);
  const [selectedGovernorateId, setSelectedGovernorateId] = useState(null);
  const [departmentData, setDepartmentData] = useState([]);
  const [purchasesteps, setPurchaseSteps] = useState([]);
  const [goverment, setGoverment] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchGoverment = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/availablecards`
        );
        const gov = response.data.governorates;
        setGoverment(gov);
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/departments/getDepartments`
        );
        const data = response.data;
        setDepartmentData(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };
    const fetchPurchaseSteps = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/purchasesteps`
        );
        setPurchaseSteps(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchGoverment();
    fetchData();
    fetchPurchaseSteps();
  }, []);

  const fetchcards = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/availablecards/available-cardsbygovermentId/${id}`
      );
      setSelectedGovernorate(response.data);
      setSelectedGovernorateId(id);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };
  const [slider, setSlider] = useState([]);

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
      <section className="margin_section">
        <div className="container text-center" id="order-section">
          <h2 className="title_cardprice">تفاصيل أسعار البطاقات</h2>
          <div className="row d-flex justify-content-center">
            {departmentData.map((department) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={department.id}>
                <Link
                  to={`/courses?department=${department.id}`}
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  <div className="box_purple__dep_cardprice">
                    <p>{department.title}</p>
                  </div>
                  <p>
                    <b>  {department.price} دينارًا  </b> لكل فصل
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="margin_section">
        <div className="container ">
          <h2 className="title_cardprice">خطوات طلب وشراء البطاقة</h2>
          <div className="row d-flex justify-content-evenly">
            {purchasesteps.map((step) => (
              <div className="col-lg-3 col-md-6 col-sm-12 ">
                <div className="box_purple__orderby_cardprice">
                  <img
                    src={`https://res.cloudinary.com/durjqlivi/${step.img}`}
                    alt="www icon"
                    className="img-fluid icon_orderby_cardprice"
                    loading="lazy"
                  />{" "}
                </div>{" "}
                <p className="name_of_orderby_cardprice">{step.title} </p>
                <p className="desc_orderby_cardprice">{step.descr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="margin_section">
        <div class="container text-center">
          <h1 className="faq">البطاقات متوفرة في</h1>
          {/* search */}
          <div className="row mb-2">
            {/* <div className="col-lg-7 col-md-12 col-sm-12">
                  <h1 className="title_blog">جميع المقالات</h1>
                </div> */}
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="navbar__search">
                <span>
                  <i
                    className="fa-solid fa-magnifying-glass fa-sm"
                    style={{ color: "#833988" }}
                  ></i>{" "}
                </span>
                <input
                  type="text"
                  placeholder="ابحث عن "
                  value={searchQuery}
                  className="search_blog"
                  //   onChange={handleInputChange}
                />
                <a href="#" className="btn btn-s purple_btn search_btn_blog">
                  بحث{" "}
                </a>
                {searchQuery && (
                  <ul className="search_dropdown">
                    {searchResults.length > 0 ? (
                      searchResults.map((course) => (
                        <li
                          key={course.id}
                          onClick={() => {
                            navigate(`/courses/${course.id}`);
                            window.scrollTo(0, 0);
                          }}
                        >
                          <img src={course.image} alt={course.courseName} loading="lazy"/>
                          {course.courseName}
                        </li>
                      ))
                    ) : (
                      <li>No courses found.</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {/* End search */}
          <div class="row">
            <div className="col">
              {/* Display goverment grouped by governorate */}

              {goverment.map((library) => (
                <div class="row" key={library.id}>
                  <div class="col">
                    <details onClick={() => fetchcards(library.id)}>
                      <summary>{library.governorate}</summary>
                      <div>
                        {selectedGovernorateId === library.id && (
                          <Table striped hover>
                            <thead>
                              <tr className="table_head_cardprice">
                                <th className="desc_table_cardprice">
                                  اسم المكتبة
                                </th>
                                <th className="desc_table_cardprice">
                                  العنوان
                                </th>
                                <th className="desc_table_cardprice">الرقم</th>
                                <th className="desc_table_cardprice">الموقع</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedGovernorate.length > 0 ? (
                                selectedGovernorate.map((card) => (
                                  <tr key={card.id}>
                                    <td>{card.name}</td>
                                    <td>{card.address}</td>
                                    <td>{card.phone}</td>
                                    <td>
                                      <i
                                        className="fa-solid fa-location-dot ps-1"
                                        style={{ color: "#f57d20" }}
                                      ></i>
                                      <a
                                        href={`https://maps.app.goo.gl/8nHFUUM7LgyZbzf19`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{textDecoration:"none",color: "#000"}}
                                      >
                                        {card.location}
                                      </a>{" "}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="4">No data available</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        )}
                      </div>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CardPrice;
