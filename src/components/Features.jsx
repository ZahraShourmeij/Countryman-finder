import React from "react";
import DottedLine from "../assets/dotted-line.svg";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";

const features = [
  {
    icon: icon1,
    title: "Login with Google and Facebook account",
    desc: "You can easily log in with your other accounts.",
  },
  {
    icon: icon2,
    title: "Security of user information",
    desc: "Experience security with us. We keep your information confidential.",
  },
  {
    icon: icon3,
    title: "Free and unlimited messaging",
    desc: "Easily message and chat with other people.",
  },
  {
    icon: icon4,
    title: "Find compatriots around the world",
    desc: "Easily find and communicate with your compatriots anywhere in the world.",
  },
];


function Features() {
  return (
<section className="features-section" id="feature">
      <p className="features-title">
        Our <span>Features</span>
      </p>

      {/* خط چین svg */}
      <div className="features-line">
        <img src={DottedLine} alt="line" />
      </div>

      {/* آیکون‌ها */}
      <div className="features-items">
        {features.map((item, index) => (
          <div key={index} className="feature-card">
            <div className={`feature-icon-bg color-${index}`}>
        <img src={item.icon} alt={item.title} className="feature-icon" />
      </div>
            <p className="feature-title">{item.title}</p>
            <p className="desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
