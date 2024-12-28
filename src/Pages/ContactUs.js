import React, { useEffect,useState } from "react";
import SliderComp from "../components/SliderComp";
import "../Css/contactUs.css";
import CommentForm from "../components/CommentForm";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from "../App";
function ContactUs() {
  const [contact,setContact]=useState([])

  const fetchContact= async () => {
    try {
        const response = await axios.get(`${API_URL}/contactdynamic/`);
        const data=response.data;
        setContact(data);  // Assuming setTags is a function to update your state
   
    } catch (error) {
        console.error("Failed to fetch slider:", error);
    }
};
useEffect(()=>{
  window.scrollTo(0, 0);
  fetchContact()
},[])
  
  const handleSubmit = async ( name, email,comment) => {
   
    try {
      const response = await axios.post(`${API_URL}/Comments/addComment`, {
        name : name ,
         email: email,
         comment: comment
      });
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Handle error response
    }
  };
  const [slider,setSlider]=useState([])


const location = useLocation();
const page = location.pathname; 

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
        <div className="container text-center "id="order-section">
          <div className="row cont_contact">
            {contact.map((contact)=>(
            <div className="col-lg-6 col-md-12 col-sm-12" key={contact.id}>
              <h1 className="faq">{contact.title}</h1>
              <p className="desc_contac">
               {contact.descr}
              </p>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className="d-flex ">
                    <div className="icon_cont_contact">
                      <img
                        src={require("../assets/phone.png")}
                        alt="phone"
                        className="img-fluid icon_contact"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="contact_info">رقم الهاتف</p>
                      <p className="contact_info">{contact.phone}</p>
                    </div>
                  </div>
                </div>
              
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className="d-flex ">
                    <div className="icon_cont_contact">
                      <img
                        src={require("../assets/whatsapp.png")}
                        alt="phone"
                        className="img-fluid icon_contact"
                        loading="lazy"  
                      />
                    </div>
                    <div>
                      <p className="contact_info">الواتساب</p>
                      <a href={contact.whatsup} target ="blank"className="contact_info">بصمة واتساب</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
                  <div className="d-flex ">
                    <div className="icon_cont_contact">
                      <img
                        src={require("../assets/facebook.webp")}
                        alt="phone"
                        className="img-fluid icon_contact"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="contact_info">الفيسبوك</p>
                      <a href={contact.facebook} target ="blank"className="contact_info">بصمة اونلاين</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center email_cont">
                  <div className="d-flex ">
                    <div className="icon_cont_contact">
                      <img
                        src={require("../assets/email.webp")}
                        alt="phone"
                        className="img-fluid icon_contact"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="contact_info">الايميل</p>
                      <p className="contact_info">{contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            ))}
            <div className="col-lg-6 col-md-12 col-sm-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3386.2206410015024!2d35.90986842377241!3d31.92776652690021!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca0a3af3acf8b%3A0xfaeba9dd7981de41!2z2KPZg9in2K_ZitmF2YrYqSDYt9ix2YrZgiDYp9mE2YbYrNin2K0!5e0!3m2!1sar!2sjo!4v1721133493463!5m2!1sar!2sjo"
                className="location_maps_contact"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* comment form */}
      <div className="container">

      <div className="row">
        <div className="col-lg-3 col-md-12 col-sm-12 "></div>
        <div className="col-lg-6 col-md-12 col-sm-12 ">
          <CommentForm title="تواصل معنا" btn_title="ارسال" handleSubmit={handleSubmit}/>
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12 "></div>
      </div>
      </div>
    </>
  );
}

export default ContactUs;