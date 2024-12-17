import React from "react";
import "../Css/footer.css";
import { Link } from "react-router-dom";
import "../Css/blogDetails.css"
function Footer() {
    const scrolltoTop=()=>[
        // document.documentElement.scrollTo({ top: 0, behavior: "smooth" }),
        // setTimeout(() => {
        //     document.querySelector(".arrow_btn").style.display = "block";
        // }, 1000)
        window.scrollTo(0,0)
    ]
  return (
    <>
      <footer>
        <div className="margin_section">
          <div className="container-fluid text-center footer_cont">
            <div className="row">
              <div className="col-lg-1 col-md-3-col-sm-12">
                <button type="button" className="btn  arrow_btn" onClick={scrolltoTop}>
                  <i
                    className="fa-solid fa-arrow-up fa-lg"
                    style={{ color: "#ffffff" }}
                  ></i>
                </button>
              </div>
          
              <div className="col-lg-3 col-md-3-col-sm-12">
                <Link to="/cardprice" className="footer_link">
                  <p>نقاط البيع</p>
                </Link>
                <Link to="/blogs" className="footer_link">
                  <p>المدونة</p>
                </Link>
                <Link to="/contact" className="footer_link">
                  <p>تواصل معنا</p>
                </Link>
                <div className="social_icon">
<Link to=""> <i className="fa-brands fa-facebook-f m-2 social_icon_footer " style={{"color": "#ffffff"}}></i></Link>
<Link to=""><i className="fa-brands fa-x-twitter m-2 social_icon_footer" style={{"color": "#ffffff"}}></i></Link>
<Link to=""><i className="fa-brands fa-instagram m-2 social_icon_footer"style={{"color": "#ffffff"}}></i></Link>
<Link to=""><i className="fa-brands fa-linkedin-in m-2 social_icon_footer" style={{"color": "#ffffff"}}></i></Link>

                </div>
              </div>
              <div className="col-lg-4 col-md-3-col-sm-12">
                <Link to="/" className="footer_link">
                  <p>الرئيسية</p>
                </Link>
                <Link to="/courses" className="footer_link">
                  <p>الأقسام</p>
                </Link>
                <Link to="/library" className="footer_link">
                  <p>المكتبة</p>
                </Link>
                <Link to="/whoweare" className="footer_link">
                  <p>من نحن</p>
                </Link>
              </div>
              <div className="col-lg-3 col-md-3-col-sm-12">
              <img src={require("../assets/ba9ma.png")} alt="" className="img-fluid ba9ma_footer" loading="lazy"/>         
                   </div>
              
            </div>
            <h5 className="text-center copywrite">جميع الحقوق مجفوطة لدى شركة بصمة</h5>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
