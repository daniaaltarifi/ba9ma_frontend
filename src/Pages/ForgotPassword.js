import "../Css/auth.css";
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../App";

const ForgotPassword = () => {
  // State for managing email input, error messages, and success messages
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/users/forgot-password`, { email });

      // Check if the response indicates that the email does not exist
      if (res.data === 'The email does not exist. Please enter the correct email.') {
        setError('البريد الإلكتروني غير موجود. الرجاء إدخال بريد إلكتروني صحيح.');
        setMessage(''); // Clear any previous messages
      } else {
        setMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
        setError(''); // Clear any previous errors
      }
    } catch (err) {
      setError('حدث خطأ أثناء محاولة إرسال الرابط. الرجاء المحاولة مرة أخرى.');
      console.error('Forgot Password error:', err);
    }
  };

  return (
    <>
      <section className="margin_section">
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-1"> </div>
            <div className="col-lg-5 col-md-6 col-sm-12 box_purple_auth">
              <div className="">
                <div className="hello_logo_auth_cont">
                  <p className="hi_auth">هل نسيت كلمه المرور؟</p>
                  <img
                    src={require("../assets/ba9ma2.png")}
                    alt="ba9ma logo"
                    className="img-fluid logo_auth"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 cont_input_auth">
              <div className="row m-5">
                <p className="title_of_input_auth">أدخل بريدك الإلكتروني لتلقي رابط إعادة تعيين كلمة المرور</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`search_blog ${error && 'error_input'}`}
                  placeholder="البريد الإلكتروني"
                />
              </div>
              {message && <p className="success_message">{message}</p>}
              {error && <p className="error_message">{error}</p>}
              <button type="button" onClick={handleForgotPassword} className="btn purple_btn mb-2">إرسال</button>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;