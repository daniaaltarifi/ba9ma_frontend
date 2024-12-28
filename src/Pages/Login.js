
import "../Css/auth.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeviceDetector from 'device-detector-js';
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { API_URL } from "../App";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const getDeviceInfo = () => {
  //   const deviceDetector = new DeviceDetector();
  //   const userAgent = navigator.userAgent;
  //   const device = deviceDetector.parse(userAgent);
  
  //   return {
  //     deviceType: device.device.type || 'unknown',
  //     os: device.os.name || 'unknown',
  //     osVersion: device.os.version || 'unknown',
  //     browser: device.client.name || 'unknown',
  //     browserVersion: device.client.version || 'unknown',
  //   };
  // };
  
  const [modalMessage, setModalMessage] = useState('');
  const getDeviceInfo = () => {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;
    const device = deviceDetector.parse(userAgent);
  
    return {
      deviceType: device.device.type || 'unknown',
      os: device.os.name || 'unknown',
      osVersion: device.os.version || 'unknown',
      browser: device.client.name || 'unknown',
      browserVersion: device.client.version || 'unknown',
      
    };
  };
  
  const handleAccept= async (e) => {
    e.preventDefault();
  
    // Get device info using UAParser
    const deviceInfo = getDeviceInfo();
  
    try {
      // Send device info in headers
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
        ip,
      }, {
        headers: {
          'Device-Info': JSON.stringify(deviceInfo), // Send device info as a header
        },
      });
  
      if (res.data.token) {
        localStorage.setItem('auth', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('img', res.data.img);
  
        window.location.href = '/';
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.status === 403) {
        setError('Login not allowed from this device');
      } else {
        setError("Invalid email or password");
      }
    }
  };
  const [ip, setIp] = useState("");

  useEffect(() => {
    // Fetch the IP address as plain text
    fetch("https://api.ipify.org?format=text")
      .then((response) => response.text())
      .then((data) => {
        setIp(data);
      })
      .catch((error) => console.error("Error fetching IP address:", error));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Get device info using UAParser
    const deviceInfo = getDeviceInfo();
  
    try {
      // Send device info in headers
      const res = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
        ip,
      }, {
        headers: {
          'Device-Info': JSON.stringify(deviceInfo), // Send device info as a header
        },
      });
  
      if (res.data.token) {
        localStorage.setItem('auth', res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('id', res.data.id);
        localStorage.setItem('img', res.data.img);
  
        window.location.href = '/';
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response && err.response.status === 403) {
        setError('Login not allowed from this device');
      } else {
        setError("Invalid email or password");
      }
    }
  };
  
  
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  
  //   const deviceInfo = getDeviceInfo(); // Generate device info  
  //   try {
  //     const res = await axios.post(`${API_URL}/users/login`, {
  //       email,
  //       password,
  //       deviceInfo, // Send device info in the request
  //     });
  
  //     if (res.data.token) {
  //       localStorage.setItem('auth', res.data.token);
  //       localStorage.setItem('name', res.data.name);
  //       localStorage.setItem('id', res.data.id);
  //       localStorage.setItem('img', res.data.img);
  
  //       window.location.href = '/';
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     if (err.response && err.response.status === 403) {
  //       setError('Login not allowed from this device');
  //     } else {
  //       setError("Invalid email or password");
  //     }
  //   }
  // };
  
  
  // const handleAccept = async () => {
  //   try {
  //     // Perform the login process again since the user has accepted the modal
  //     const deviceInfo = getDeviceInfo();
  //     const res = await axios.post(`${API_URL}/users/login`, {
  //       email,
  //       password,
  //       deviceInfo
  //     });

  //     if (res.data.token) {
  //       localStorage.setItem('auth', res.data.token);
  //       localStorage.setItem('name', res.data.name);
  //       localStorage.setItem('id', res.data.id);
  //       localStorage.setItem('img', res.data.img);

  //       // Redirect to home page
  //       window.location.href = '/';
  //     }
  //   } catch (err) {
  //     if (err.response && err.response.status === 403) {
  //       setError('تسجيل الدخول غير متاح على هذا الجهاز');
  //     } else {
  //       setError("البريد الالكتروني أو كلمة المرور غير صحيحة");
  //     }
  //     console.error('Login error:', err);
  //   }
    
  //   handleClose();
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const deviceInfo = getDeviceInfo();

  //   // Capture device information
  //   try {

  //     const res = await axios.post(`${API_URL}/users/login`, {
  //       email,
  //       password,
  //       deviceInfo  // Include the device information in the request
  //     });
     
  //     if (res.data.message) {
  //       setModalMessage(res.data.message);
  //       handleShow();
  //     } else if (res.data.token) {
  //       localStorage.setItem('auth', res.data.token);
  //       localStorage.setItem('name', res.data.name);
  //       localStorage.setItem('id', res.data.id);
  //       localStorage.setItem('img', res.data.img);

  //       window.location.href = '/';
  //     }
  
  //   } catch (err) {
  //     if (err.response && err.response.status === 403) {
  //       setError('تسجيل الدخول غير متاح على هذا الجهاز');
  //     } 
    
  //     else {
  //       setError("البريد الالكتروني أو كلمة المرور غير صحيحة");
  //     }
  //     console.error('Login error:', err);
  //   }
  // };
  
  return (
    <>
      <section className="margin_section">
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-5 col-md-6 col-sm-12 box_purple_auth">
              <div className="">
                <div className="hello_logo_auth_cont">
                  <p className="hi_auth">مرحباً بك</p>
                  <img
                    src={require("../assets/ba9ma2.webp")}
                    alt="ba9ma logo"
                    className="img-fluid logo_auth"
                    loading="lazy"
                  />
                </div>
                <div>
                  <Link to="/signup">
                  <button type="button" className="btn auth_btn">
                  إنشاء حساب
                  </button>
             </Link>
                </div>
              </div>{" "}
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 cont_input_auth ">
              <div className="row m-5">
                <p className="title_of_input_auth">البريد الالكتروني</p>
                <input
                  type="text"
                  className={`search_blog ${error && 'error_input'}`}
                  value={email} onChange={(e) => setEmail(e.target.value)}
                 
                />
                



              </div>
              <div className="row m-5">
                <p className="title_of_input_auth">كلمة المرور</p>
                <input
                   type="password"
                   className={`search_blog ${error && 'error_input'}`}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                
                />
              


              <Link to="/forgotpassword" className="forget_pass_auth">نسيت كلمة المرور؟</Link>              </div>
              {error && <p className="error_message">{error}</p>}
              <button type="button" onClick={handleLogin} className="btn purple_btn mb-2">تسجيل الدخول</button>

            </div>
            
            <div className="col-lg-1"></div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title> تسجيل الدخول</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
        
          <Button style={{backgroundColor:"#833988",border:"none",textAlign:"center"}} onClick={handleAccept}>
close          </Button>
        </Modal.Footer>
      </Modal>
      </section>
    </>
  );
}

export default Login;