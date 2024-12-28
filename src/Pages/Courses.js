import { useState, useEffect, useContext } from "react";
import React from "react";
import SliderComp from "../components/SliderComp";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/courses.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import MiniPopUpLogin from "../components/MiniPopUpLogin.js";
import MiniPopUpConfirm from "../components/MiniPopUpConfirm.js";
import { UserContext } from "../UserContext.js";

import axios from "axios";
import { API_URL } from "../App.js";
function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [show, setShow] = useState(false);
  const [courses, setCourses] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherData, setTeacherData] = useState([]);

  const [allCourses, setAllCourses] = useState([]);

  const { user, logout } = useContext(UserContext);
  const { isLoggedIn, userName, userId, img } = user;

  const location = useLocation();
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [coupon_code, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const [couponError, setCouponError] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for controlling MiniPopUpLogin visibility
  const [ShowPopupConf, setShowPopupConf] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [selectedTeacherEmail, setSelectedTeacherEmail] = useState("");
  const [noCoursesMessage, setNoCoursesMessage] = useState("");

  const title_popup = "تسجيل الدخول";
  const description_popup = "لشراء قسم يجب تسجيل الدخول";
  const title_popup_confirm = " تنبيه";
  const description_popup_confirm = "تمت العملية بنجاح ,انتقل الى دوراتي";
  const handleInputChange = (event) => {
    setCurrentSlide(0);
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the courses based on the search query
    const filteredResults = courses.filter((course) =>
      course.subject_name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleClose = () => setShow(false);
  const handleValidate = () => {
    if (isLoggedIn) {
      setShow(true);
    } else {
      setShowLoginPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  const handleClosePopupConf = () => {
    setShowPopupConf(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Error collection
    const errors = {};
    if (!studentName) errors.studentName = "اسم الطالب مطلوب";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "البريد الإلكتروني غير صحيح";
    if (!address) errors.address = "مكان السكن مطلوب";
    if (!phone || !/^\d+$/.test(phone)) errors.phone = "رقم الهاتف غير صحيح";
    if (!selectedDepartment) errors.department = "يرجى اختيار القسم";
  
    // Update error states
    setStudentNameError(errors.studentName || "");
    setEmailError(errors.email || "");
    setAddressError(errors.address || "");
    setPhoneError(errors.phone || "");
    setDepartmentError(errors.department || "");
    setCouponError(errors.couponCode || "");
  
    // If there are errors, return early
    if (Object.keys(errors).length > 0) return; 
  
    // Validate coupon code and department ID
    try {
      const couponResponse = await axios.get(
        `${API_URL}/Coupons/getCouponByCode/${coupon_code}`
      );
      const couponData = couponResponse.data;
    // Check if department ID from coupon matches selected department
    const couponDepartmentId = parseInt(couponData.department_id, 10);
    const selectedDepartmentId = parseInt(selectedDepartment, 10);
    // Check if department ID from coupon matches selected department
    if (couponDepartmentId !== selectedDepartmentId) {
      setCouponError("الكوبون لا ينطبق على هذا القسم");
      return;
    }
      // Proceed with submission
      const userId = localStorage.getItem("id");
      if (!userId) {
        setMessage("User ID not found. Please log in.");
        return;
      }
  
      try {
        const response = await axios.post(
          `${API_URL}/PaymentsDepartments/buy`,
          {
            student_name: studentName,
            email,
            address,
            phone,
            coupon_code: coupon_code,
            department_id: selectedDepartment,
            user_id: userId,
          }
        );
  
        setMessage("Request was successful!");
        handleClose();
        setSmShow(true);
        setShowPopupConf(true);
  
        // Clear form fields
        setStudentName("");
        setEmail("");
        setAddress("");
        setPhone("");
        setCouponCode("");
      } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
                if (error.response?.data?.error === "Invalid or already used coupon") {
          setCouponError("رقم الكوبون غير صالح أو تم استخدامه من قبل");
        } 
        else if (error.response?.data?.error === "No courses found for this department") {
          setCouponError("لا توجد أي دورات متاحة لهذا القسم");}
        else {
          setMessage("There was an error with your submission.");
        }
      }
    } catch (error) {
      console.error("Error fetching coupon data:", error.response?.data || error.message);
      setCouponError("حدث خطأ في التحقق من رقم الكوبون");
    }
  };
  
  
  const cardsPerSlide = 9; // Maximum cards per slide
  const [totalSlides, setTotalSlides] = useState(0);
  const title = "ادرس اون لاين مواد المناهج الدراسية الأردنية";
  const fetchCourses = async () => {
    const departmentId =
      selectedDepartment ||
      new URLSearchParams(location.search).get("department");
    const teacherEmail = selectedTeacherEmail;

    let url = `${API_URL}/Courses`;

    if (departmentId && teacherEmail) {
      // Both department and teacher filters are selected
      url = `${API_URL}/Courses/filter/${departmentId}/${teacherEmail}`;
    } else if (departmentId) {
      // Only department filter is selected
      url = `${API_URL}/Courses/getbydep/${departmentId}`;
    } else if (teacherEmail) {
      // Only teacher filter is selected
      url = `${API_URL}/TeacherRoutes/teachercourse/${teacherEmail}`;
    }
    try {
      const response = await axios.get(url);
      const fetchedCourses = response.data;

      if (fetchedCourses.length === 0) {
        setNoCoursesMessage("لا يوجد مواد متاحة ");
        setAllCourses([]);
        setCourses([]);
        setTotalSlides(0);
        return;
      } else {
        setNoCoursesMessage(""); // Clear message if there are courses

        // Fetch additional data (student count and lesson count) for each course
        const coursesWithDetails = await Promise.all(
          fetchedCourses.map(async (course) => {
            try {
              const [studentCountResponse, lessonCountResponse] =
                await Promise.all([
                  axios.get(
                    `${API_URL}/Courses/users-counts/${course.id}`
                  ),
                  axios.get(
                    `${API_URL}/Courses/lesson-counts/${course.id}`
                  ),
                ]);

              const lessonCountData = lessonCountResponse.data;
              const lessonCount =
                Array.isArray(lessonCountData) && lessonCountData.length > 0
                  ? lessonCountData[0].lesson_count
                  : 0;

              return {
                ...course,
                student_count: studentCountResponse.data?.student_count || 0,
                lesson_count: lessonCount || 0,
              };
            } catch (error) {
              console.error(
                `Error fetching data for course ${course.id}:`,
                error
              );
              return {
                ...course,
                student_count: 0,
                lesson_count: 0,
              };
            }
          })
        );

        setAllCourses(coursesWithDetails);
        setCourses(
          coursesWithDetails.slice(
            currentSlide * cardsPerSlide,
            (currentSlide + 1) * cardsPerSlide
          )
        );
        setTotalSlides(Math.ceil(coursesWithDetails.length / cardsPerSlide));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const departmentId = query.get("department");
    if (departmentId) {
      setSelectedDepartment(departmentId);
    } else {
      setSelectedDepartment(null); // Reset the selected department if none is found
    }
  }, [location.search]);

  // Fetch courses whenever selected department or currentSlide changes
  useEffect(() => {
    fetchCourses();
  }, [selectedDepartment, currentSlide, selectedTeacherEmail]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/departments/getDepartments`
        );
        setDepartment(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);
  
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (!selectedDepartment) return; // Do nothing if no department is selected
  
      try {
        const response = await axios.get(
          `${API_URL}/Courses/getbydep/${selectedDepartment}`
        );
        const rawData = response.data;
  
        // Remove duplicates and extract teacher names
        const uniqueTeachers = rawData.reduce((unique, course) => {
          const teacherName = course.teacher?.teacher_name;
          const teacherId = course.teacher_id;
          const teacherEmail = course.teacher?.email;
        
          const isDuplicate = unique.some(
            (item) => item.teacher_id === teacherId
          );
        
          if (teacherName && teacherId && teacherEmail && !isDuplicate) {
            unique.push({
              teacher_id: teacherId,
              teacher_name: teacherName,
              email: teacherEmail,
            });
          }
          return unique;
        }, []);
        
  
        setTeacherData(uniqueTeachers);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
  
    fetchTeacherData();
  }, [selectedDepartment]);
  
  // useEffect(() => {
  //   const fetchTeacherData = async () => {
  //     if (!selectedDepartment) return; // Do nothing if no department is selected

  //     try {
  //       const response = await axios.get(
  //         `${API_URL}/Courses/getbydep/${selectedDepartment}`
  //       );
  //       const rawData = response.data;

  //       // Remove duplicates
  //       const uniqueTeachers = rawData.reduce((unique, teacher) => {
  //         const isDuplicate = unique.some(
  //           (item) => item.teacher.teacher_name === teacher.teacher_name
  //         );
  //         if (!isDuplicate) unique.push(teacher);
  //         return unique;
  //       }, []);

  //       setTeacherData(uniqueTeachers);
  //     } catch (error) {
  //       console.error("Error fetching teacher data:", error);
  //     }
  //   };

  //   fetchTeacherData();
  // }, [selectedDepartment]);
  const handleDepartment = (e) => {
    const selectedDepartmentId = e.target.value;
    setSelectedDepartment(selectedDepartmentId);

    setCurrentSlide(0); // Reset to the first slide when department changes
  };

  const handleTeacher = (e) => {
    const selectedTeacherId = e.target.value;
    setSelectedTeacher(selectedTeacherId);
    const teacher = teacherData.find(
      (tech) => tech.teacher_id.toString() === selectedTeacherId
    );
    if (teacher) {
      setSelectedTeacherEmail(teacher.email);
    } else {
      setSelectedTeacherEmail("");
    }
    setCurrentSlide(0); // Reset to the first slide when department changes
  };
  // Handle slide navigation
  const nextSlide = () => {
    if (hasNextSlide()) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const hasNextSlide = () => {
    return (currentSlide + 1) * cardsPerSlide < allCourses.length;
  };

  const dataToDisplay = searchQuery ? searchResults : courses;
  useEffect(() => {}, [courses, searchResults, dataToDisplay]);

  const [slider, setSlider] = useState([]);
  const page = location.pathname;
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <>
      <SliderComp slider={slider} />

      <div className="container courses_margin" id="order-section">
        <div className="row ">
          <div className="col-lg-4 col-md-4 col-sm-12">
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
                href="#"
                className="btn btn-s purple_btn search_btn"
                onChange={handleInputChange}
              >
                بحث
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
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
          <div className="col-lg-4 col-md-4 col-sm-12">
            <select
              name="teacher"
              value={selectedTeacher}
              onChange={handleTeacher}
              id="lang"
              className="select_dep"
            >
              <option value="">اختر استاذ</option>
              {teacherData.map((tech) => (
                <option key={tech.id} value={tech.teacher_id}>
                  {tech.teacher_name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="col-lg-2 col-md-4 col-sm-12"></div> */}
        </div>
      </div>
      <div className="container text-center purchaseDepartment_box">
        <h2 className="h_home_box">
          {" "}
          اغتنم الفرصة الآن في قسمنا الرقمي المتقدم!
        </h2>
        <p className="p_home_box">
          اشتري الان لتأمين مكانك في القسم الذي سيغير مستقبلك!
        </p>
        <button
          type="button"
          className="btn btn-light click_here_btn"
          onClick={handleValidate}
        >
          اضغط هنا
        </button>
        {/* Modal */}
        <Modal show={show} onHide={handleClose} dir="rtl">
          <Modal.Title className="modal_title">شراء قسم</Modal.Title>
          <Modal.Body>
            <Form id="buyDepartmentForm">
              <Form.Group className="mb-3">
                <Form.Label className="text_field">اسم الطالب</Form.Label>
                <Form.Control
                  type="text"
                  className={`input_filed_modal ${
                    studentNameError ? "border-danger" : ""
                  }`}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                />
                {studentNameError && (
                  <Form.Text className="text-danger">
                    {studentNameError}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  الأيميل
                </Form.Label>
                <Form.Control
                  type="email"
                  className={`input_filed_modal ${
                    emailError ? "border-danger" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && (
                  <Form.Text className="text-danger">{emailError}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  مكان السكن
                </Form.Label>
                <Form.Control
                  type="text"
                  className={`input_filed_modal ${
                    addressError ? "border-danger" : ""
                  }`}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                {addressError && (
                  <Form.Text className="text-danger">{addressError}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  رقم الهاتف
                </Form.Label>
                <Form.Control
                  type="text"
                  className={`input_filed_modal ${
                    phoneError ? "border-danger" : ""
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {phoneError && (
                  <Form.Text className="text-danger">{phoneError}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  القسم
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className={`select_dep ${
                    departmentError ? "border-danger" : ""
                  }`}
                >
                  <option value="">اختر القسم</option>
                  {department.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.title}
                    </option>
                  ))}
                </Form.Control>
                {departmentError && (
                  <Form.Text className="text-danger">
                    {departmentError}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text_field text-center">
                  الكوبون
                </Form.Label>
                <Form.Control
                  type="text"
                  className={`input_filed_modal ${
                    couponError ? "border-danger" : ""
                  }`}
                  value={coupon_code}
                  onChange={(e) => setCouponCode(e.target.value)}
                  required
                />
                {couponError && (
                  <Form.Text className="text-danger">{couponError}</Form.Text>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              onClick={handleSubmit}
              form="buyDepartmentForm"
              className="buy_department_btn"
            >
              شراء الآن
            </Button>
          </Modal.Footer>
        </Modal>

        {/*End Modal */}
      </div>
      <div className="slick-wrapper">
        <div className="container ">
          {noCoursesMessage ? (
            <div
              className="no-courses-message d-flex justify-content-center "
              style={{ color: "#833988" }}
            >
              <p>{noCoursesMessage}</p>
            </div>
          ) : (
            dataToDisplay.length > 0 && (
              <div className="row justify-content-center align-items-center">
                {dataToDisplay.map((card, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div
                      key={index}
                      className={`slide ${
                        index === currentSlide ? "active" : ""
                      }`}
                    >
                      <Link
                        to={`/coursedetails/${card.id}`}
                        className="link_card"
                      >
                        <div className="card card_cont">
                          <img
                            src={`https://res.cloudinary.com/durjqlivi/${card.img}`}
                            className="card-img-top img-fluid card_img"
                            alt="course"
                            loading="lazy"
                          />
                          <div className="card-body">
                            <div>
                              {/* rating here */}
                              <p className="card-text card_dep">
                                {" "}
                                {card.Department.title}
                              </p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p className="course_title_card">
                                {card.subject_name}
                              </p>{" "}
                              <p className=" teacher_name_card">
                                {card.teacher.teacher_name}
                              </p>
                            </div>
                            <hr style={{ marginTop: "1px" }} />
                            <div className="d-flex justify-content-between">
                              <i
                                className="fa-solid fa-file card_icon"
                                style={{ color: "#F57D20" }}
                              ></i>
                              <p className="details_courses_card">
                                {card.student_count} طالب
                              </p>
                              <i
                                className="fa-solid fa-graduation-cap card_icon"
                                style={{ color: "#F57D20" }}
                              ></i>
                              <p className="details_courses_card">
                                {card.lesson_count} درس
                              </p>
                              <i
                                className="fa-solid fa-clock card_icon"
                                style={{ color: "#F57D20" }}
                              ></i>{" "}
                              <p className="details_courses_card">
                                {new Date(card.created_at).toLocaleDateString(
                                  "en-GB",
                                  {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>{" "}
                  </div>
                ))}
                <div
                  className="col-md-12 col-sm-12 col_btn_prevNext"
                  style={{ marginTop: "10px" }}
                >
                  <button
                    onClick={nextSlide}
                    className="btn mb-3  "
                    disabled={currentSlide === totalSlides - 1}
                  >
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
                    {/* <p>  {totalSlides} {currentSlide + 1}  </p> */}
                    {/* Current Slide Number */}
                    <span
                      style={{
                        fontWeight: "bold",
                        paddingRight: "15px",
                        paddingLeft: "15px",
                      }}
                    >
                      {currentSlide + 1}
                    </span>
                    {/* Next Slide Number */}
                    {hasNextSlide() && (
                      <span style={{ cursor: "pointer" }} onClick={nextSlide}>
                        {currentSlide + 2}
                      </span>
                    )}
                    {/* Previous Slide Number */}
                    {/* {currentSlide > 0 && (
                    <span
                      style={{ cursor: "pointer" }}
                      // onClick={() => goToSlide(currentSlide - 1)}
                    >
                      {currentSlide}
                    </span>
                  )} */}
                  </div>
                  <button onClick={prevSlide} className="btn  mb-3  ">
                    <i className="fa fa-arrow-left"></i>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        {/* MiniPopUpLogin */}
        {showLoginPopup && (
          <MiniPopUpLogin
            title_popup={title_popup}
            description_popup={description_popup}
            show={showLoginPopup}
            onClose={handleClosePopup}
          />
        )}
      </div>

      {ShowPopupConf && (
        <MiniPopUpConfirm
          title_popup_confirm={title_popup_confirm}
          description_popup_confirm={description_popup_confirm}
          smShow={smShow}
          onClose={handleClosePopupConf}
        />
      )}
    </>
  );
}

export default Courses;
