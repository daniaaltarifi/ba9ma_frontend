import React from 'react'
import { Link } from 'react-router-dom'
function PurpleBox({title,description,link}) {
  return (
    <>
       <section className="margin_section">

<div className="container text-center home_box">
  <h2 className="h_home_box">{title}</h2>
  <p className="p_home_box"> {description}</p>
<Link to={link}>
  <button type="button" className="btn btn-light click_here_btn">اضغط هنا</button>

</Link>
</div>
</section>
    </>
  )
}

export default PurpleBox