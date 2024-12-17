import React, { useEffect, useState } from "react";
import "../Css/blogDetails.css";
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import CommentForm from "../components/CommentForm";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
function BlogDetails() {
  const [blogDetails, setBlogDetails] = useState(null);
  const [lastThreeBlogs, setLastThreeBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [commentBlogs, setCommentBlogs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/blog/getBlogById/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog details");
        }
        const data = await response.json();
        setBlogDetails(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    const fetchLastThreeBlogs = async () => {
      const response = await axios.get("http://localhost:8080/blog/lastthree");
      const blogsData = response.data;
      const approvedBlogs = blogsData.filter(
        (blog) => blog.action === "approved"
      );
      setLastThreeBlogs(approvedBlogs);
    };
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:8080/tag/uniquetag");
        const tags = response.data;
        setTags(tags); // Assuming setTags is a function to update your state
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };
    const fetchCommentBlogs = async () => {
      try {
        const response = await axios.get(`${API_URL}/commentBlogs/getAllCommentBlogs`);
        const comments = response.data;
        const approvedComments = comments.filter(
          (comment) => comment.action === "approved"
        );
        setCommentBlogs(approvedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchBlogDetails();
    fetchLastThreeBlogs();
    fetchTags();
    fetchCommentBlogs();
  }, [id]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlides = Math.ceil(commentBlogs.length / 3);

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
  const visibleComments = commentBlogs.slice(startIndex, endIndex);

  // Adjust the visible comments to ensure exactly three are displayed
  while (visibleComments.length < 3) {
    visibleComments.push(null); // Add placeholders if there are fewer than three comments
  }
  const handleSubmit = async (name, email, comment) => {
    try {
      const response = await axios.post(
        `${API_URL}/commentBlogs/addCommentBlog`,
        {
          name: name,
          email: email,
          comment: comment,
          blog_id: id, // Assuming `id` is the correct identifier for `blog_id`
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  if (!blogDetails) {
    return <p>Loading...</p>; // Or a loading spinner if you prefer
  }
  // Destructure properties from blogDetails safely
  const { title, author, descr, img, created_date } = blogDetails;

  return (
    <>
      {/* header of course details */}

      <div>
        <div className="container text-center cont_course_details">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6 col-md-6 cl-sm-12 d-flex justify-content-center">
              <img
                src={`https://res.cloudinary.com/durjqlivi/${img}`}
                alt="coursedetails"
                className="img-fluid img_blogdetails"
                loading="lazy"
              />{" "}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12  justify-content-center align-items-center">
              <div className="d-flex justify-content-evenly ">
                <p className="title_blogdetails">{title}</p>
                <p className="teacher_coursedetails ms-5">{author}</p>
                <i
                  className="fa-solid fa-clock card_icon "
                  style={{ color: "#F57D20" }}
                ></i>
                <p className="date_blogdetails"> {created_date}</p>
              </div>
              <h1 className="title_coursedetails"> {title} </h1>
            </div>
          </div>
        </div>
        {/* End header of course details */}
        <section className="margin_section">
          <div className="container ">
            <div className="row ">
              <div className="col-lg-8 col-md-12 col-sm-12 cont_blogdetails">
                <p className="desc_blogdetails">{descr}</p>

                <div className="share_blogdetails_cont ">
                  <div>
                    <p className="categories_title">مشاركة: </p>
                  </div>

                  <div className="social_blogdetails">
                    <FaFacebookF className="social_icon_blogdetails" />
                    <FaPinterestP className="social_icon_blogdetails" />
                    <FaYoutube className="social_icon_blogdetails" />
                    <FaInstagramSquare className="social_icon_blogdetails" />
                    <BsTwitterX className="social_icon_blogdetails" />
                  </div>
                </div>
                <div className="container slider_blogdetails">
                  <div className="slider">
                    <div className="slider-content">
                      {commentBlogs.map((comment, index) => (
                        <div className="slider-item" key={index}>
                          {comment && (
                            <div className="row mb-2">
                              <div className="col-lg-1 col-md-2 col-sm-12">
                                <img
                                  src={require("../assets/acc_icon.png")}
                                  alt=""
                                  height={"70vh"}
                                  width={"70vh"}
                                  className="ps-3"
                                  loading="lazy"
                                />
                              </div>
                              <div className="col-lg-11 col-md-10 col-sm-12 ">
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
                <CommentForm
                  title="اترك تعليق"
                  btn_title="تعليق"
                  handleSubmit={handleSubmit}
                />
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 ">
                <p className="categories_title">المقالات الأخيرة</p>
                {lastThreeBlogs.map((lastthreeblogs) => (
                  <Link
                    to={`/blogdetails/${lastthreeblogs.id}`}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <div className="categ_lastblog_cont">
                      <img
                        src={`https://res.cloudinary.com/durjqlivi/${lastthreeblogs.img}`}
                        // src={`http://localhost:8080/` + lastthreeblogs.img}
                        alt=""
                        className="img-fluid img_last_blog"
                        loading="lazy"
                      />
                      <p className="desc_last_blog">{lastthreeblogs.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default BlogDetails;
