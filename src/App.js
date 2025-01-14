import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage.js";
import Courses from "./Pages/Courses.js";

import Footer from "./components/Footer.js";
import WhoWeAre from "./Pages/WhoWeAre.js";
import Blogs from "./Pages/Blogs.js";
import { UserProvider } from "./UserContext";
//  export const API_URL = "http://localhost:6060";
export const API_URL='https://backendba9ma.ba9maonline.com'
const CourseDetails = React.lazy(() => import("./Pages/CourseDetails.js"));
const BlogDetails = React.lazy(() => import("./Pages/BlogDetails.js"));
const CardPrice = React.lazy(() => import("./Pages/CardPrice.js"));
const SignUp = React.lazy(() => import("./Pages/SignUp.js"));
const Login = React.lazy(() => import("./Pages/Login.js"));
const Profile = React.lazy(() => import("./Pages/Profile.js"));
const ContactUs = React.lazy(() => import("./Pages/ContactUs.js"));
const Library = React.lazy(() => import("./Pages/Library.js"));
const MyCourses = React.lazy(() => import("./Pages/MyCourses.js"));
const ForgotPassword = React.lazy(() => import("./Pages/ForgotPassword.js"));
const ResetPassword = React.lazy(() => import("./Pages/ResetPassword.js"));
const MyCourseDetail = React.lazy(() => import("./Pages/MyCourseDetail.js"));


const LazyLoadCSS = () => {
  const location = useLocation();

  useEffect(() => {
    // Remove any previously injected CSS
    const oldLinks = document.querySelectorAll("link[data-dynamic-css]");
    oldLinks.forEach((link) => link.remove());

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.setAttribute("data-dynamic-css", "true"); // Identify dynamically injected CSS

    // Dynamically load the CSS file based on the current route
    if (location.pathname === "/") {
      link.href = "./Css/home.css";
    } else if (location.pathname === "/courses") {
      link.href = "./Css/courses.css";
    } else if (location.pathname.startsWith("/coursedetails")) {
      link.href = "./Css/coursesDetails.css";
    } else if (location.pathname === "/whoweare") {
      link.href = "./Css/whoweare.css";
    } else if (location.pathname === "/blogs") {
      link.href = "./Css/blogs.css";
    } else if (location.pathname.startsWith("/blogdetails")) {
      link.href = "./Css/blogDetails.css";
    } else if (location.pathname === "/cardprice") {
      link.href = "./Css/cardPrice.css";
    } else if (
      location.pathname === "/signup" ||
      location.pathname === "/login" ||
      location.pathname.startsWith("/profile")
    ) {
      link.href = "./Css/auth.css";
    } else if (location.pathname === "/contact") {
      link.href = "./Css/contactUs.css";
    } else if (location.pathname.startsWith("/mycoursedetails")) {
      link.href = "./Css/courseDetails.css";
    } else {
      link.href = ""; // Fallback, no CSS
    }

    // Append the link to the document head
    if (link.href) {
      document.head.appendChild(link);
    }
    // Clean-up: Remove the CSS when the component unmounts or route changes
    return () => {
      document.head.removeChild(link);
    };
  }, [location.pathname]);

  return null;
};

function App() {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (/Warning/.test(args[0])) {
      return;
    }
    originalConsoleError.apply(console, args);
  };

  // const { user, updateUser, logout } = useAuth();
  const [user, setUser] = useState({
    isLoggedIn: false,
    userId: "",
    userName: "",
    img: "",
  });
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("id");
    const img = localStorage.getItem("img");
    setUser({
      isLoggedIn: !!auth,
      userName: name || "",
      userId: id || "",
      img: img || "",
    });
  }, []);
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <LazyLoadCSS />
        <div className="App" dir="rtl">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/coursedetails/:id" element={<CourseDetails />} />
            <Route path="/whoweare" element={<WhoWeAre />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogdetails/:id" element={<BlogDetails />} />
            <Route path="/cardprice" element={<CardPrice />} />
            <Route path="/library" element={<Library />} />
            <Route path="/mycourses" element={<MyCourses />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/mycoursedetails/:id" element={<MyCourseDetail />} />
          </Routes>
          </Suspense>

        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
