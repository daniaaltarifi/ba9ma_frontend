import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

function AuthNavbar() {
  const { user, logout } = useContext(UserContext);
  const { isLoggedIn, userName, userId, img } = user;

  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="icon_profile_navbar">
            <p className="dropdown-toggle list_profile_icon_navbar mx-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {userName} {/* Display the user's name */}
            </p>
            <ul className="dropdown-menu">
              <li><Link to={`/profile/${userId}`} className="dropdown-item">حسابي</Link></li>
              <li><Link to="/login" onClick={logout} className="dropdown-item">تسجيل الخروج</Link></li>
            </ul>
            <img src={`https://res.cloudinary.com/durjqlivi/image/upload/v1734555243/${img}` || img} alt="profile img" className="img-fluid img_icon_navbar"loading="lazy" />
          </div>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "#fff" }}>
            <button type="button" className="btn purple_btn">تسجيل الدخول</button>
          </Link>
          <Link to="/signup" style={{ color: "#fff" }}>
            <button type="button" className="btn purple_btn">انشاء حساب</button>
          </Link>
        </>
      )}
    </>
  );
}

export default AuthNavbar;