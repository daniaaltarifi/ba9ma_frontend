import React, { useEffect, useState } from "react";
import "../Css/blogs.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { API_URL } from "../App";

function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [lastThreeBlogs, setLastThreeBlogs] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [dynamicBlog, setDynamicBlog] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const tag_name = location.state?.tag_name;
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${API_URL}/blog/All-blogs`);
      const blogsData = response.data;
      const approvedBlogs = blogsData.filter(
        (blog) => blog.action === "approved"
      );
      setBlogs(approvedBlogs);
      if (approvedBlogs.createdAt) {
        const formattedDate = new Date(
          approvedBlogs.createdAt
        ).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        approvedBlogs.createdAt = formattedDate; // Overwrite the createdAt field with formatted date
      }
    } catch (error) {}
  };
  const fetchTags = async () => {
    try {
      const response = await axios.get(`${API_URL}/Tags/getUniqueTags`);
      const tags = response.data;
      setTags(tags); // Assuming setTags is a function to update your state
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const fetchLastThreeBlogs = async () => {
    const response = await axios.get(`${API_URL}/blog/lastthree`);
    const blogsData = response.data;
    const approvedBlogs = blogsData.filter(
      (blog) => blog.action === "approved"
    );
    setLastThreeBlogs(approvedBlogs);
  };
  // design of blog that have purple background
  const fetchDynamicBlog = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/dynamicBlogs/getDynamicBlogs`
      );
      const data = response.data;
      setDynamicBlog(data);
    } catch (error) {
      console.log(`Error getting data from frontend: ${error}`);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDynamicBlog();
    fetchBlog();
    fetchTags();
    fetchLastThreeBlogs();
  }, []);

  // Calculate which blogs to display based on current slide index

  const handleInputChange = (event) => {
    setCurrentSlideIndex(0); // Reset to the first slide when filtering changes
    const query = event.target.value;
    setSearchQuery(query);
    const filteredResults = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
  };
  const handleTagClick = async (tag_name) => {
    try {
      const response = await axios.get(
        `${API_URL}/Tags/getBlogsByTag/${tag_name}`
      );
      const blogs = response.data;
      const mappedBlogs = blogs.map((tag) => ({
        id: tag.blog_id, // Adjust as needed
        title: tag.title,
        author: tag.author,
        descr: tag.descr,
        img: tag.img,
        Tag: tag.Tag,
      }));
      setBlogs(mappedBlogs);

    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };
  const [displayBlogs, setDisplayBlogs] = useState([]);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Number of blogs per slide
  const blogsPerSlide = 5;

  // Calculate total number of slides
  const totalSlides = Math.ceil(displayBlogs.length / blogsPerSlide);

  // Update the displayBlogs state based on filters
  useEffect(() => {
    // window.scrollTo(0,0)
    let filteredBlogs = [];

    if (searchQuery.length > 0) {
      filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedTagId !== null) {
      filteredBlogs = blogs.filter((blog) => blog.id === selectedTagId);
    } else if (tag_name) {
      filteredBlogs = blogs.filter((blog) => blog.tag_name === tag_name);
    } else {
      filteredBlogs = blogs;
    }

    setDisplayBlogs(filteredBlogs);
    setCurrentSlideIndex(0); // Reset to the first slide when filtering changes
  }, [blogs, searchQuery, selectedTagId, tag_name]);

  // Function to navigate to the next slide
  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to navigate to the previous slide
  const goToPrevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Calculate which blogs to display based on current slide index
  const startIndex = currentSlideIndex * blogsPerSlide;
  const endIndex = startIndex + blogsPerSlide;
  const visibleBlogs = displayBlogs.slice(startIndex, endIndex);

  return (
    <>
      {/* header */}
      {dynamicBlog.map((dyn) => (
        <div className="header_blog" key={dyn.id}>
          <p className="title_header_blog">{dyn.title}</p>
          <div className="paragraph_cont">
            <p className="paragraph_header_blog">{dyn.descr}</p>
          </div>
        </div>
      ))}
      {/* End header */}
      <section className="margin_section">
        <div className="container ">
          <div className="row ">
            <div className="col-lg-8 col-md-12 col-sm-12 col_blog">
              {/* search */}
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <h1 className="title_blog">جميع المقالات</h1>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12">
                  <div className="navbar__search">
                    <span>
                      <i
                        className="fa-solid fa-magnifying-glass fa-sm"
                        style={{ color: "#833988" }}
                      ></i>{" "}
                    </span>
                    <input
                      type="text"
                      placeholder="ابحث عن موضوع"
                      value={searchQuery}
                      className="search_blog"
                      onChange={handleInputChange}
                    />
                    <a
                      className="btn btn-s purple_btn search_btn_blog"
                      onChange={handleInputChange}
                    >
                      بحث{" "}
                    </a>
                    {searchQuery && (
                      <ul className="search_dropdown">
                        {searchResults.length > 0 ? (
                          searchResults.map((blog) => (
                            <li
                              key={blog.id}
                              onClick={() => {
                                navigate(`/blogdetails/${blog.id}`);
                                window.scrollTo(0, 0);
                              }}
                            >
                              <img
                                src={`https://res.cloudinary.com/durjqlivi/${blog.img}`}
                                alt={blog.title}
                                loading="lazy"
                              />
                              {blog.title}
                            </li>
                          ))
                        ) : (
                          <li>No blogs found.</li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              {/* End search */}
              {visibleBlogs.map((blog, index) => (
                <Link
                  to={`/blogdetails/${blog.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div key={index} className="card mb-3 card_cont_blog">
                    {blog ? (
                      <div className="row g-0">
                        <div className="col-lg-4 col-md-4 col-sm-12 img_col_blogs">
                          <img
                            src={`https://res.cloudinary.com/durjqlivi/${blog.img}`}
                            className="img-fluid img_blog"
                            alt="blog"
                            loading="lazy"
                          />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12">
                          <div className="card-body card_body_blog">
                            <div className="cont_info_blog">
                              <div>
                                <p className="card-title blog_title">
                                  {blog.title}
                                </p>
                                <small className="blog_dep">
                                  {blog.Tag?.tag_name}
                                </small>
                              </div>
                              <div>
                                <h5 className=" teacher_name_blog">
                                  {blog.author}
                                </h5>
                                <div className="d-flex">
                                  <i
                                    className="fa-solid fa-clock card_icon ms-2"
                                    style={{ color: "#F57D20" }}
                                  ></i>
                                  <p className="details_blogs_card ">
                                    {new Date(
                                      blog.createdAt
                                    ).toLocaleDateString("en-GB", {
                                      year: "numeric",
                                      month: "numeric",
                                      day: "numeric",
                                    })}{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="card-text desc_blog ">{blog.descr}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="col-md-12 col-sm-12"></div>
                    )}
                  </div>
                </Link>
              ))}
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
                      alt=""
                      className="img-fluid img_last_blog"
                      loading="lazy"
                    />
                    <p className="desc_last_blog">{lastthreeblogs.title}</p>
                  </div>
                </Link>
              ))}
              <p className="categories_title">التاغات </p>
              <div className="tags_btn_cont">
                {tags.map((tag) => (
                  <div key={tag.id}>
                    <button
                      type="button"
                      className="btn btn-outline-secondary mb-1"
                      onClick={() => handleTagClick(tag.tag_name)}
                    >
                      {tag.tag_name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blogs;
