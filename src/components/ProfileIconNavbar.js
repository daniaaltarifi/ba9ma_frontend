import React from 'react'
import '../Css/navbar.css'
import { Link } from 'react-router-dom'
function ProfileIconNavbar() {
  return (
    <>
    <div className='icon_profile_navbar'>
    <p className='dropdown-toggle list_profile_icon_navbar mx-3' type="button" data-bs-toggle="dropdown" aria-expanded="false">مسلّم يوسف </p>
    <ul className="dropdown-menu">
    <li><Link to="/profile" className="dropdown-item" href="#">حسابي</Link></li>
    <li><Link to="/login" className="dropdown-item" href="#"> تسجيل الخروج</Link></li>
  </ul>
    <img src={require("../assets/profile.png")} alt="profile img" className='img-fluid  img_icon_navbar' loading="lazy"/>
    </div>
        
    </>
  )
}

export default ProfileIconNavbar