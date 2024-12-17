import React, { useState, useEffect } from "react";
import "../Css/topicsAndRating.css";


function Rating({ comments }) {
  const width = "50";
  const [averageRating, setAverageRating] = useState(0);


  useEffect(() => {
    if (comments.length > 0) {
      const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
      setAverageRating((totalRating / comments.length).toFixed(1));
    } else {
      setAverageRating(0); // Reset average rating if there are no comments
    }
  }, [comments]); // Add comments as dependency

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: comments.filter((comment) => comment.rating === star).length,
  }));

  const getPercentage = (count) => ((count / comments.length) * 100).toFixed(0);

  return (
    <div dir="ltr" className="mb-3">
      <div className="d-flex">
        <div className="d-flex justify-content-center align-items-center">
          <p className="total_rating">
          {averageRating}
          </p>
        </div>
        <div className="p-3">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <span key={index} className={`fa fa-star ${index < averageRating ? "checked" : ""}`}></span>
          ))}
          <p> based on {comments.length} ratings.</p>
        </div>
      </div>
      {/* <hr style={{ border: "3px solid #f1f1f1" }} /> */}

      <div className="row">
      {ratingCounts.map(({ star, count }) => (
          <React.Fragment key={star}>
            <div className="side_rating">
              <div className="d-flex">
                {[...Array(star)].map((_, index) => (
                  <i key={index} className="fa-solid fa-star" style={{ color: "#F6B40A" }}></i>
                ))}
                {[...Array(5 - star)].map((_, index) => (
                  <i key={index} className="fa-regular fa-star" style={{ color: "#F6B40A" }}></i>
                ))}
              </div>
            </div>
            <div className="percentage_cont">
              <span className="percentage_rating">{getPercentage(count)}%</span>
            </div>
            <div className="middle">
              <div className="bar-container">
                <div className="bar-1" style={{ width: `${getPercentage(count)}%` }}></div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
export default Rating;
