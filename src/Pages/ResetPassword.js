import "../Css/auth.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from "../App";


function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Get the token from the URL

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    try {
            const res = await axios.post(
              `${API_URL}/users/reset-password/${token}`,
              { password, confirmPassword },
              { headers: { 'Content-Type': 'application/json' } }
            );
      setMessage(res.data.message);
      setError('');
    } catch (err) {
      setError('حدث خطأ أثناء إعادة تعيين كلمة المرور. حاول مرة أخرى.');
      console.error('Reset Password error:', err);
      setMessage('');
    }
  };
  return (
    <>
      <section className="margin_section">
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-5 col-md-6 col-sm-12 box_purple_auth">
              <div className="">
                <div className="hello_logo_auth_cont">
                  <p className="hi_auth"> اعادة تعيين كلمة المرور </p>
                  <img
                    src={require("../assets/ba9ma2.png")}
                    alt="ba9ma logo"
                    className="img-fluid logo_auth"
                    loading="lazy"
                  />
                </div>
               
              </div>{" "}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 cont_input_auth ">
              <div className="row m-5">
                <p className="title_of_input_auth"> كلمه المرور الجديدة: </p>
                <input
          type="password"
          value={password}
          className="search_blog"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
              </div>
              <div className="row m-5">
                <p className="title_of_input_auth">تأكيد كلمة المرور: </p>
                <input
          type="password"
          value={confirmPassword}
          className="search_blog"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
              
              </div>
              {message && <p className="message">{message}</p>}
              {error && <p className="error_message">{error}</p>}
              <button type="submit" onClick={handleResetPassword} className="btn purple_btn mb-2">إعادة تعيين كلمة المرور</button>

            </div>
           
            <div className="col-lg-1"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ResetPassword;