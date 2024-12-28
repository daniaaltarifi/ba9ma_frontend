import React, { useEffect, useState } from "react";
import "../Css/home.css";
import StudentsOpinions from "../components/StudentsOpinions";
import PurpleBox from "../components/PurpleBox";
import axios from "axios";
import { API_URL } from "../App";

function Home() {
  const [faq, setFaq] = useState([]);
  const [about, setAbout] = useState([]);
  const [basmatrainig, setBasmaTraining] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/Fqs/getFaqs`);
        const data = response.data;
        setFaq(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };

    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${API_URL}/abouts/getabout`);
        const data = response.data;
        setAbout(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };

    const fetchBasma = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/basmatrainning/basma-trainings/1`
        );
        const data = response.data;
        setBasmaTraining(data);
      } catch (error) {
        console.log(`Error getting data from frontend: ${error}`);
      }
    };

    fetchData();
    fetchAbout(); 
    fetchBasma();
  }, []);

  useEffect(() => {
    if (about.length > 0 && about[0].img) {
      const imgSrc = `https://res.cloudinary.com/durjqlivi/${about[0].img}?w=1600&f_auto&q_auto`;
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = imgSrc;
      link.as = "image";
      link.type = "image/webp"; 
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
  }, [about]);

  return (
    <>
   
      <div
        className="container text-center about-section"
        style={{ overflowX: "hidden" }}
      >
      {about.map((abou) => (
          <div className="row" key={abou.id}>
            <div className="col-lg-5 col-md-6 col-sm-12">
              <h2 className="about_title">{abou.title}</h2>
              <p className="p_about">{abou.descr}</p>
            </div>
            <div className="col-lg-7 col-md-6 col-sm-12 d-flex justify-content-md-center align-items-center">
                <img
                  srcSet={`https://res.cloudinary.com/durjqlivi/${abou.img}?w=400&f_auto&q_auto 400w, https://res.cloudinary.com/durjqlivi/${abou.img}?w=800&f_auto&q_auto 800w, https://res.cloudinary.com/durjqlivi/${abou.img}?w=1600&f_auto&q_auto 1600w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="slider img"
                  className="about_img"
                  decoding="async"
                  loading="eager"
                />
          
            </div>
          </div>
        ))}
      </div>
      {/* End About section */}
       {/* Home Box */}
       {basmatrainig.length === 0 ? (
        <div>Loading...</div> // Display loading state
      ) : (
        basmatrainig.map((item) => (
          <PurpleBox
            key={item.id} // Unique key for each item
            title={item.title}
            description={item.descr}
            link="/courses" // Adjust link if needed
          />
        ))
      )}
      {/* <BoxCont title={title} description={description} linkPage={linkPage} /> */}

      {/* FAQ section */}
      <section className="margin_section" style={{ overflowX: "hidden" }}>
        <div className="container text-center">
          <h1 className="faq">الأسئلة المتكررة</h1>
          <div className="row">
            <div className="col">
              {faq.map((quesans) => (
                <details>
                  <summary>{quesans.ques}</summary>
                  <div>{quesans.ans} </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
      <h1 className="faq">أراء وتجارب طلابنا </h1>

      <StudentsOpinions />
    </>
    
  );
}

export default Home;
