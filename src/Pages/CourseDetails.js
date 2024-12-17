import React, { useState, useEffect, useRef, useContext } from "react";
import "../Css/courseDetails.css";
import { Link, useParams } from "react-router-dom";
import Tabs from "../Pages/Tabs.js";
import Tab from "../Pages/Tab.js";
import CommentForm from "../components/CommentForm.js";
import { IoIosArrowDown } from "react-icons/io";

import Rating from "../components/Rating.js";


import axios from "axios";
import { UserContext } from "../UserContext.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../Css/courses.css";
import MiniPopUpLogin from "../components/MiniPopUpLogin.js";
import MiniPopUpConfirm from "../components/MiniPopUpConfirm.js";
import ReadMoreReact from 'read-more-react';

function CourseDetails() {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [videosData, setVideosData] = useState([]);
  const [commentCourse, setCommentCourse] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [teacherId, settecherId] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [lessonCounts, setLessonCounts] = useState(0);
  const [student_teacherCount, setstudent_teacherCount] = useState(0);
  const [courseId, setcourseId] = useState(null);
  const [show, setShow] = useState(false); // State for controlling modal visibility
  const { user, logout } = useContext(UserContext);
  const { isLoggedIn, userName, userId, img } = user;
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const [couponError, setCouponError] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State for controlling MiniPopUpLogin visibility
  const [ShowPopupConf, setShowPopupConf] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [course_users, setCourse_users] = useState([]);
  const [approvedUser, setApprovedUser] = useState(null);
  const [checked, setChecked] = useState({}); // Initialize checked state as an object
  const [course, setCourse] = useState(null);

  const title_popup = "تسجيل الدخول";
  const description_popup = "لشراء قسم يجب تسجيل الدخول";
  const title_popup_confirm = " تنبيه";
  const description_popup_confirm = "تمت العملية بنجاح ,انتقل الى دوراتي";

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchCourseDetails();
    
    const fetchCommentCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/commentcourse`
        );
        const comments = response.data;
        const approvedComments = comments.filter(
          (comment) => comment.action === "approved"
        );
        setCommentCourse(approvedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    // countTeacherCourses()

    // fetchCourseUsers()
    fetchCommentCourses();
  }, []);
  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:8080/${fileName}`, {
        responseType: "blob", // Important: responseType blob for downloading files
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  useEffect(() => {
    const fetchVideosData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/courses/getbyvideo/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch video details");
        }
        const data = await response.json();
        setVideosData(data);
        const initialChecked = {};
        data.forEach((item) => {
          const storedState = localStorage.getItem(`checkbox-${item.id}`);
          initialChecked[item.id] = storedState ? JSON.parse(storedState) : false;
        });
        setChecked(initialChecked);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };
    fetchVideosData();
  }, [id]);
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null); // Initial video index

 
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = Math.ceil(commentCourse.length / 3);
  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Calculate which comments to display based on current slide index
  const startIndex = currentSlideIndex * 3;
  const endIndex = startIndex + 3;
  const visibleComments = commentCourse.slice(startIndex, endIndex);

  // Adjust the visible comments to ensure exactly three are displayed
  while (visibleComments.length < 3) {
    visibleComments.push(null); // Add placeholders if there are fewer than three comments
  }

  const [expandedItemId, setExpandedItemId] = useState(null);
  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
  };

  const handleClick = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  // handle prvent recordeing
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const [isBlackScreen, setIsBlackScreen] = useState(false);

  const handleKeyDown = (event) => {
    // Check for common screen recording and screenshot shortcuts
    const isRecordingShortcut =
      (event.metaKey && event.shiftKey && event.key === "5") || // macOS: Command + Shift + 5
      (event.ctrlKey && event.altKey && event.key === "r") || // Windows: Ctrl + Alt + R
      (event.metaKey && event.key === "4") || // macOS: Command + Shift + 4 (for screenshots)
      event.key === "PrintScreen" || // Windows: Print Screen
      event.key === "Meta"; // Check if the key is Windows key (in some cases)

    if (isRecordingShortcut) {
      setIsBlackScreen(true);
    }
  };

  const handleKeyUp = () => {
    setTimeout(() => {
      setIsBlackScreen(false);
    }, 7000); // 7 seconds
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const [videoDurations, setVideoDurations] = useState([]);
  const videoRefs = useRef([]);
  const videoEl = useRef(null);

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    console.log(formatDuration(video.duration));
  };
  useEffect(() => {
    const fetchVideoDurations = () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          video.addEventListener("loadedmetadata", () => {
            setVideoDurations((prevDurations) => {
              const newDurations = [...prevDurations];
              newDurations[index] = video.duration;
              return newDurations;
            });
          });
          // Trigger metadata loading
          video.load();
        }
      });
    };

    fetchVideoDurations();
    // Clean up event listeners
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.removeEventListener("loadedmetadata", () => {});
        }
      });
    };
  }, [videosData]);

  const formatDuration = (durationInSeconds) => {
    if (isNaN(durationInSeconds) || durationInSeconds < 0) {
      return "Invalid Duration";
    }

    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (name, email, comment, rating) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/commentcourse/add",
        {
          name: name,
          email: email,
          comment: comment,
          rating: rating,
          course_id: id, // Assuming `id` is the correct identifier for `blog_id`
        }
      );
      if (response.status === 200) {
        console.log("res", response.data);
      }
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    const fetchCourseCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/course-counts/${teacherId}`
        );
        // Assume response.data is an array with one object
        const data = response.data;
        if (data.length > 0) {
          setCourseCount(data[0].course_count); // Set the course count from the first item in the array
        }
      } catch (error) {
        console.error("Error fetching course count:", error);
      }
    };

    if (teacherId) {
      fetchCourseCount();
    }
  }, [teacherId]);

  useEffect(() => {
    const fetchStudentCount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/users-counts/${courseId}`
        );
        const data = response.data;
        if (data && data.student_count !== undefined) {
          setStudentCount(data.student_count); // Set the course count from the response
        }
      } catch (error) {
        console.error("Error fetching course count:", error);
      }
    };

    if (courseId) {
      fetchStudentCount();
    }
  }, [courseId]);


  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/courses/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blog details");
      }
      const data = await response.json();
      setCourseDetails(data);
      settecherId(data[0].teacher_id);
      if (data && data[0]) {
        setcourseId(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };
  useEffect(() => {
    const fetchLessonCounts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/courses/lesson-counts/${courseId}`
        );
        const data = response.data;
        if (data.length > 0) {
          setLessonCounts(data[0].lesson_count); // Set the lesson count from the first item in the array
        } else {
          setLessonCounts(0); // In case no lessons are found
        }
      } catch (error) {
        console.error("Error fetching course count:", error);
      }
    };

    if (courseId) {
      fetchLessonCounts();
    }
  }, [courseId]);

  const TeacherStudentCount = async () => {
    if (teacherId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/teacher/student-counts/${teacherId}`
        );
        const data = response.data;
        if (data && data.student_count !== undefined) {
          setstudent_teacherCount(data.student_count); // Set the course count from the response
        }
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    }
  };

  useEffect(() => {
    if (teacherId) {
      TeacherStudentCount();
    }
  }, [teacherId]);

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

  const validateCouponCode = async (code) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/validate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coupon_code: couponCode, course_id: courseId }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return data.error || "Invalid coupon code";
        
      }

      // Check if the coupon type is not 'course'
      if (data.couponType !== "course") {
        return "رمز الكوبون غير صالح"; // Return the error message
      }

      return ""; // No error
    } catch (error) {
      console.error("Error checking coupon code:", error);
      return "Invalid coupon code";
    }
  };

  const handleSubmitPay = async (event) => {
    event.preventDefault();

    // Validate all fields
    const errors = {};

    if (!studentName) errors.studentName = "اسم الطالب مطلوب";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "البريد الإلكتروني غير صحيح";
    if (!address) errors.address = "مكان السكن مطلوب";
    if (!phone || !/^\d+$/.test(phone)) errors.phone = "رقم الهاتف غير صحيح";

    // Custom validation for coupon code
    const couponError = await validateCouponCode(couponCode); // Await the result of validateCouponCode
    if (!couponCode || couponError) {
      errors.couponCode = couponError || "رقم الكوبون غير صالح";
    }
    // Set errors and return if any
    setStudentNameError(errors.studentName || "");
    setEmailError(errors.email || "");
    setAddressError(errors.address || "");
    setPhoneError(errors.phone || "");

    setCouponError(errors.couponCode || "");

    if (Object.keys(errors).length > 0) {
      return;
    }
    setCouponError("");
    setStudentNameError("");
    setEmailError("");
    setAddressError("");
    setPhoneError("");
    const userId = localStorage.getItem("id"); // Retrieve user_id from local storage

    if (!userId) {
      setMessage("User ID not found. Please log in.");
      handleClose();
      setShowLoginPopup(true);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/courses",
        {
          student_name: studentName,
          email: email,
          address: address,
          phone: phone,
          coupon_code: couponCode,
          course_id: courseId,
          user_id: userId,
        }
      );
      setMessage("Request was successful!");
      handleClose();
      setSmShow(true);
      setShowPopupConf(true);
      // Clear recorded courses
      setStudentName("");
      setEmail("");
      setAddress("");
      setAddress("");
      setPhone("");
      setCouponCode("");
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );

      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Invalid coupon code"
      ) {
        setCouponError("رقم الكوبون غير صالح");
      } else {
        setMessage("There was an error with your submission.");
      }
    }
  };

  const handleShow = () => setShow(true);
  useEffect(() => {
    const fetchCourseUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getallcourseusers"
        );
        setCourse_users(response.data);
      } catch (error) {
        console.error("Failed to fetch course users:", error);
      }
    };

    if (courseId) {
      fetchCourseUsers();
    }
  }, [courseId]);
useEffect(() => {
  // Example API call to fetch course details
  const fetchCourseData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/courses/${courseId}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  fetchCourseData();
}, [courseId]);
 // Determine if the user is approved
 useEffect(() => {
  if (course_users.length > 0 && userId && courseId) {
    const user_course = course_users.find(
      (user) =>
        user.payment_status === "approved" &&
        user.user_id === userId &&
        user.course_id === courseId
    );

    const currentDate = new Date();

    if (user_course && course && course.expiration_date) {
      const courseExpirationDate = new Date(course.expiration_date);
      if (currentDate <= courseExpirationDate) {
        setApprovedUser(user_course);
      } else {
        setApprovedUser(null);
      }
    } else if (user_course) {
      setApprovedUser(user_course);
    } else {
      setApprovedUser(null);
    }
  }
}, [course_users, userId, courseId, course]);
 // Include `course` in dependency array if `course.expiration_date` is used
  
  const handleCheckboxChange = (videoId) => {
    const newChecked = !checked[videoId];
    setChecked((prev) => ({ ...prev, [videoId]: newChecked }));
    localStorage.setItem(`checkbox-${videoId}`, JSON.stringify(newChecked));
  };
// Download handler function


  return (
    <>
      {/* header of course details */}
      {courseDetails.map((course) => (
        <div
          className="container text-center cont_course_details"
          key={course.id}
        >
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
              <img
                src={`http://localhost:8080/${course.img}`}
                alt="coursedetails"
                className="img-fluid img_coursedetails"
                loading="lazy"
              />{" "}
            </div>
            <div className="col-lg-6 col-md-6 cl-sm-12 ">
              <div className="dep_teacher_coursedetails ">
                <p className="dep_coursedetaile">{course.department_name}</p>
                <p className="teacher_coursedetails">{course.teacher_name}</p>
              </div>
              <h1 className="title_coursedetails">{course.subject_name}</h1>
              <div className="d-flex justify-content-around ">
                <div className="d-flex">
                  <i
                    class="fa-solid fa-graduation-cap card_icon"
                    style={{ color: "#F57D20" }}
                  ></i>

                  <p className="details_courses_card"> {studentCount} طالب </p>
                </div>
                <div className="d-flex">
                  <i
                    class="fa-solid fa-file card_icon"
                    style={{ color: "#F57D20" }}
                  ></i>
                  <p className="details_courses_card "> {lessonCounts} درس</p>
                </div>

                {course.total_video_duration !== "0h 0m 0s" ? (
                  <div className="d-flex">
                    <i
                      className="fa-solid fa-clock card_icon"
                      style={{ color: "#F57D20" }}
                    ></i>
                    <p className="details_courses_card">
                      {course.total_video_duration}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* End header of course details */}

      <section className="margin_section">
        <div className="container text-center">
          <div className="row">
            <div
              className="col-lg-5 col-md-12 col-sm-12"
              onContextMenu={handleContextMenu}
            >
              {/* <Video/> */}

              {videosData.length > 0 && (
                <div className="video_cont">
                  <div className="video_wrapper">
                    {/* Render default video if currentVideoIndex is null */}
                    {currentVideoIndex === null ? (
                      <div>
                        <video
                          ref={videoEl}
                          onLoadedMetadata={handleLoadedMetadata}
                          controls
                          controlsList="nodownload"
                          className="video_play"
                          preload="metadata"
                          key={currentVideoIndex}
                          onEnded={() =>
                            setCurrentVideoIndex(
                              (prevIndex) => (prevIndex + 1) % videosData.length
                            )
                          }
                        >
                          <source
                            src={`http://localhost:8080/${videosData[0].defaultvideo}`} // Assuming first video is default
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                        {approvedUser ? (
                          <>
                          <div className="d-flex justify-content-center">
                            <div>
                              <h2 className="title_after_purchase">
                                {videosData[0].subject_name}
                              </h2>
                              <h3 className="teachar_after_purchase">
                                {videosData[0].teacher_name}
                              </h3>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">

<button
  onClick={() => handleDownload(videosData[0].file_book)}
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

</div>
                          </>
                          
                        ) : (
                          <div>
                            <div className="d-flex justify-content-center">
                              <p className="after_price_coursedetails">
                                {videosData[0].after_offer} دينار
                              </p>
                              <p className="before_price_coursedetails">
                                {videosData[0].before_offer} دينار
                              </p>
                            </div>
                            <button
                              className="purchase_now_coursedetails"
                              onClick={handleValidate}

                            >
                              شراء الان
                            </button>
                          </div>
                        )}

                        {/* Modal */}
                        <Modal show={show} onHide={handleClose} dir="rtl">
                          <Modal.Title className="modal_title">
                            شراء مادة
                          </Modal.Title>
                          <Modal.Body>
                            <Form id="buyDepartmentForm">
                              <Form.Group className="mb-3">
                                <Form.Label className="text_field">
                                  اسم الطالب
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className={`input_filed_modal ${
                                    studentNameError ? "border-danger" : ""
                                  }`}
                                  value={studentName}
                                  onChange={(e) =>
                                    setStudentName(e.target.value)
                                  }
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
                                  <Form.Text className="text-danger">
                                    {emailError}
                                  </Form.Text>
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
                                  <Form.Text className="text-danger">
                                    {addressError}
                                  </Form.Text>
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
                                  <Form.Text className="text-danger">
                                    {phoneError}
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
                                  value={couponCode}
                                  onChange={(e) =>
                                    setCouponCode(e.target.value)
                                  }
                                  required
                                />
                                {couponError && (
                                  <Form.Text className="text-danger">
                                    {couponError}
                                  </Form.Text>
                                )}
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              type="submit"
                              onClick={handleSubmitPay}
                              form="buyDepartmentForm"
                              className="buy_department_btn"
                            >
                              شراء الآن
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        {/* End Modal */}
                      </div>
                    ) : (
                      // Render selected video
                      videosData[currentVideoIndex] && (
                        <div>
                          {videosData[currentVideoIndex].type === "file" &&
                          approvedUser ? (
                            <div>
                              <div className="video_wrapper">
                                <video
                                  ref={videoEl}
                                  onLoadedMetadata={handleLoadedMetadata}
                                  key={currentVideoIndex}
                                  controls
                                  controlsList="nodownload"
                                  className="video_play"
                                  preload="metadata"
                                >
                                  <source
                                    src={`http://localhost:8080/${videosData[currentVideoIndex].url}`}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                                <div className="d-flex justify-content-evenly">
                                  <div>
                                    <h2 className="title_after_purchase">
                                      {videosData[0].subject_name}
                                    </h2>
                                    <h3 className="teachar_after_purchase">
                                      {videosData[0].teacher_name}
                                    </h3>
                                  </div>
                          
                                </div>
                              </div>
                            </div>
                          ) : videosData[currentVideoIndex].type === "link" ? (
                            <div className="frame-responsive">
                              <iframe
                                width="100%"
                                height="250"
                                key={currentVideoIndex}
                                src={videosData[currentVideoIndex].link}
                                title="Video player"
                                allowFullScreen
                              ></iframe>
                              <h2 className="title_after_purchase">
                                {videosData[0].subject_name}
                              </h2>
                              <h3 className="teachar_after_purchase">
                                {videosData[0].teacher_name}
                              </h3>
                            </div>
                          ) : (
                            <div>
                              <div className="d-flex justify-content-center">
                                <p className="after_price_coursedetails">
                                  {videosData[0].after_offer} دينار
                                </p>
                                <p className="before_price_coursedetails">
                                  {videosData[0].before_offer} دينار
                                </p>
                              </div>
                              <button
                                className="purchase_now_coursedetails"
                                onClick={handleShow}
                              >
                                شراء الان
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/*End video  */}
            </div>
            {courseDetails.map((course) => (
              <div
                className="col-lg-7 col-md-12 col-sm-12 col_tabs_coursedetails"
                key={course.id}
              >
                <Tabs>
                  <Tab title="عن المادة">
                    <div className="description_coursedetails">
                      {/* {course.descr} */}
                      <ReadMoreReact text={course.descr}
            min={200}
            ideal={300}
            max={500}
            readMoreText="اقرأ المزيد"
            readMoreClassName="read-more-button"
            />
                    </div>
                  </Tab>
                  {/* {approvedUser && courseDetails && videosData.length > 0 && ( */}
                  {approvedUser ? (
                    <Tab title="الموضوعات">
                      <div>
                        <p className="description_coursedetails">
                          {course.descr}
                        </p>
                        <div className="container text-center">
                          {videosData.map((item, index) => (
                            <div
                              className="row topic_list_tabs_cont"
                              key={item.id}
                              onClick={() => handleClick(item.id)}
                            >
                              <div
                                className={`col-lg-6 col-md-6 col-sm-12 ${
                                  expandedItemId === item.id ? "mb-3" : ""
                                }`}
                              >
                                <div className="d-flex align-items-center pt-2">
                                  <IoIosArrowDown />
                                  <li style={{ cursor: "pointer" }}>
                                    {item.title}
                                  </li>
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="d-flex justify-content-evenly">
                                  <div className="d-flex">
                                    <i
                                      className="fa-solid fa-file card_icon"
                                      style={{ color: "#F57D20" }}
                                    ></i>
                                    <p className="details_courses_card">
                                      1 درس
                                    </p>
                                  </div>
                                  {item.type === "file" && (
                                    <div className="d-flex">
                                      <i
                                        className="fa-solid fa-clock card_icon"
                                        style={{ color: "#F57D20" }}
                                      ></i>
                                      <p className="details_courses_card">
                                        {item.duration}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {expandedItemId === item.id && (
                                <div className="d-flex justify-content-between">
                                  <p style={{ marginTop: "10px" }}>
                                    {item.description}
                                  </p>

                                  <div className="d-flex">
                                    <input
                                      type="checkbox"
                                  
                                      value="Paneer"
                                      id={`checkbox-${item.id}`}
                                      name={`checkbox-${item.id}`} 
                                      className="checkbox_coursedetails"
                                      checked={checked[item.id] || false} // Ensure checked state is managed
                                      onChange={() => handleCheckboxChange(item.id)} // Pass item.id
                    
                                    />

                                    <button
                                      className="show_video_btn"
                                      onClick={() => handleVideoSelect(index)}
                                    >
                                      مشاهدة{" "}
                                      <i
                                        className="fa-regular fa-circle-play"
                                        style={{ color: "#fff" }}
                                      ></i>
                                    </button>
                                  
                                  </div>
                                </div>
                              )}
                              {/* Video Element */}
                              <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                src={item.videoUrl} // Ensure this is the correct video URL
                                style={{ display: "none" }} // Hide video element
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tab>
                  ) : (
                    <p>
                      {/* Access to this tab is restricted. Please ensure you have
                      the correct permissions. */}
                    </p>
                  )}

                  <Tab title="المدرب">
                    <div className="container text-center">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                          <img
                            src={`http://localhost:8080/${course.img}`}
                            alt="teacher img"
                            height={"80vh"}
                            width={"80vh"}
                            loading="lazy"
                          />
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                          <p className="teacher_name_coursedetails">
                            {course.teacher_name}{" "}
                          </p>
                          <p className="desc_of_teacher_coursedetails">
                            {course.teacher_descr}{" "}
                          </p>
                          <div className="d-flex">
                            <i
                              className="fa-solid fa-file card_icon ps-2"
                              style={{ color: "#F57D20" }}
                            ></i>
                            <p className="details_courses_card">
                              {" "}
                              {courseCount}مادة{" "}
                            </p>
                          </div>
                          <div className="d-flex">
                            <i
                              className="fa-solid fa-graduation-cap card_icon ps-2"
                              style={{ color: "#F57D20" }}
                            ></i>
                            <p className="details_courses_card">
                              {" "}
                              {student_teacherCount} طالب{" "}
                            </p>
                          </div>
                          <div className="d-flex">
                            <p>للمتابعة:</p>
                            <Link to="">
                              <i
                                className="fa-brands fa-facebook-f m-2"
                                style={{ color: "#000" }}
                              ></i>
                            </Link>
                            <Link to="">
                              <i
                                className="fa-brands fa-x-twitter m-2"
                                style={{ color: "#000" }}
                              ></i>
                            </Link>
                            <Link to="">
                              <i
                                className="fa-brands fa-instagram m-2"
                                style={{ color: "#000" }}
                              ></i>
                            </Link>
                            <Link to="">
                              <i
                                className="fa-brands fa-linkedin-in m-2"
                                style={{ color: "#000" }}
                              ></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  {/* comment slide */}
                  <Tab title="الأراء">
                    <Rating comments={commentCourse} />
                    <div className="container">
                      <div className="slider">
                        <div className="slider-content">
                          {visibleComments.map((comment, index) => (
                            <div className="slider-item" key={index}>
                              {comment && (
                                <div className="row mb-2">
                                  <div className="col-lg-3 col-md-3 col-sm-12">
                                    <img
                                      src={require("../assets/acc_icon.png")}
                                      alt="course"
                                      height={"70vh"}
                                      width={"70vh"}
                                      loading="lazy"
                                    />
                                  </div>
                                  <div className="col-lg-9 col-md-9 col-sm-12">
                                    <div className="d-flex justify-content-between">
                                      <p className="teacher_name_coursedetails">
                                        {comment.name}
                                      </p>
                                      <p className="comment_date_coursedetails">
                                        {comment.created_date}
                                      </p>
                                    </div>
                                    <p className="desc_of_teacher_coursedetails">
                                      {comment.comment}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <div
                        className="col-md-12 col-sm-12 col_btn_prevNext"
                        style={{ marginTop: "10px" }}
                      >
                        <button onClick={goToNextSlide} className="btn mb-3">
                          <i className="fa fa-arrow-right"></i>
                        </button>
                        <div
                          style={{
                            textAlign: "center",
                            marginTop: "5px",
                            fontSize: "18px",
                          }}
                        >
                          {/* Displaying current slide number in bold */}
                          <span style={{ fontWeight: "bold" }}>
                            {currentSlideIndex + 1}
                          </span>{" "}
                          / {totalSlides}
                        </div>
                        <button onClick={goToPrevSlide} className="btn mb-3">
                          <i className="fa fa-arrow-left"></i>
                        </button>
                      </div>
                    </div>
                  </Tab>
                  {/* End comment slide */}
                </Tabs>
                <CommentForm
                  title="اترك تعليق"
                  btn_title="تعليق"
                  handleSubmit={handleSubmit}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* MiniPopUpLogin */}
      {showLoginPopup && (
        <MiniPopUpLogin
          title_popup={title_popup}
          description_popup={description_popup}
          show={showLoginPopup}
          onClose={handleClosePopup}
        />
      )}

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

export default CourseDetails;
