import React from "react";
import company from "../assets/RightContent.png";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <section className="AboutUs" id="AboutUs">
      <div className="AboutUs-content">
        <div className="leftcontent">
          <h1>
            <span>About</span> Us
          </h1>
          <p>
            We started our business in 1402 and our goal is to help users find the person they want all over the world.
            <br />
            Just register on the site and enter your location and address, and then find the desired person with one click and communicate with them.
          </p>
          <Link to="/ReadMore">
            <button className="btn-readmore">Read More</button>
          </Link>
        </div>

        <div className="rightcontent">
          <img src={company} alt="AboutUs" className="Laptop-image"/>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
