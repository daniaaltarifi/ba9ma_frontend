import React, { useState } from "react";
import axios from "axios";
import "../Css/commentForm.css";
function CommentForm({title,btn_title ,handleSubmit }) {



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
 

  const handleSubmitForm = async (event) => {
    event.preventDefault(); 

    // Form validation
    if (!name || !email || !comment || rating === 0) {
      alert("الرجاء ملء جميع الحقول وتحديد التقييم.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("الرجاء إدخال بريد إلكتروني صحيح.");
      return;
    } 

    try {
      await handleSubmit(name, email, comment , rating); 
    // Clear the form data after successful submission
    setName('');
    setEmail('');
    setComment('');
    setRating(0);
  

    
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };


  return (
    <>
      <section className="margin_section">
        <div className="container ">
          <div className="row">
            {/* <div className="col-lg-5 col-md-6 col-sm-12">

            </div> */}
            <div className="col-lg-12 col-md-6 col-sm-12">
          <h2 className="leave_comment_title">{title}</h2>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <p className="title_of_comment_form">الاسم</p>
                  <input
                   type="text"
                   name="name"
                   value={name}
                   onChange={(e) => setName(e.target.value)}

                   className="comment_form_input"
                  />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <p className="title_of_comment_form">البريد الالكنروني</p>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="comment_form_input"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                <p className="title_of_comment_form">التعليق </p>
                  <input
                    type="textarea"
                    className="textarea_input_commentForm"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                   
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <p className="title_of_comment_form">التقييم</p>
                  <div className="rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fa-star ${star <= rating ? 'fa-solid' : 'fa-regular'}`}
                        style={{ color: '#F6B40A', cursor: 'pointer' }}
                        onClick={() => handleRatingChange(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                    <button type="submit" onClick={handleSubmitForm} className="submit_button_commentForm">
                      {btn_title}
                    </button>
  
                   
                </div>
             
       
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CommentForm;