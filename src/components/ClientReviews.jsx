import React, {useState, useEffect } from "react";
import curve from "../assets/curve.svg";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(null);
  const groupSize = 4; // هر بار ۴ تا عکس نمایش داده بشه

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://68f17b88b36f9750dee96c75.mockapi.io/reviews"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchReviews();
  }, []);

useEffect(() => {
  if (reviews.length === 0) return;

  const interval = setInterval(() => {
    setCurrent((prev) => {
      if (reviews.length === 0) return 0;
      return (prev + 1) % reviews.length;
    });
  }, 8000);

  return () => clearInterval(interval);
}, [reviews.length, setCurrent]);

  if (error) return <p>Error: {error}</p>;
  // if (reviews.length === 0) return <p>Loading reviews...</p>;
  if (reviews.length === 0) {
  return (
    <section className="section4">
      <div className="review-skeleton"></div>
    </section>
  );
}

  const handlePrev = () =>
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

 
// ساخت آرایه‌ای از ۴ تصویر که در حالت لوپ بچرخه
const visibleImages = Array.from({ length: groupSize }, (_, i) => {
  const index = (current + i - 2 + reviews.length) % reviews.length;
  // "-2" باعث میشه اکتیو بیاد دومی از راست
  return reviews[index];
});


  return (
<section className="section4">
  <div className="content">
    <div className="title">
      <p>
        Client <span className="rev">Reviews</span>
      </p>
    </div>

    <div className="slider">
<div className="slider__slides">
  {reviews.map((review, index) => (
    <div
      key={index}
      className={`slider__slide ${index === current ? "active fade" : ""}`}
    >
      <div className="reviewtext">
        <h3>{review.name}</h3>
        <p>{review.text}</p>
      </div>
    </div>
  ))}
</div>


      {/* دکمه‌های قبلی و بعدی */}
      <button
        id="nav-button--prev"
        className="slider__nav-button"
        onClick={handlePrev}
      ></button>
      <button
        id="nav-button--next"
        className="slider__nav-button"
        onClick={handleNext}
      ></button>

<div className="slider__nav">
  {visibleImages.map((review, index) => {
    // این‌بار دومی از راست رو اکتیو می‌کنیم
    const isActive = index === groupSize - 2;

    return (
      <div
        key={index}
        className={`slider__navlink ${isActive ? "active" : ""} fade`}
        onClick={() =>
          setCurrent((current + index - 2 + reviews.length) % reviews.length)
        }
      >
        <img src={review.img} alt={review.name} />
      </div>
    );
  })}
</div>

<img src={curve} alt={curve} className="curve fade"  key={current}/>
    </div>
  </div>
</section>
  )
}

export default Reviews;

