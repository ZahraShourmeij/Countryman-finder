import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import ToastMessage from "./ToastMessage";


const getDeviceType = () => {
  const width = window.innerWidth;
  if (width <= 768) return "mobile";
  if (width <= 1024) return "tablet";
  return "desktop";
};

function Footer({ showToast }) {
  const [email, setEmail] = useState("");
  const [device, setDevice] = useState(getDeviceType());


useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = device === "mobile";
  const isTablet = device === "tablet";
  const isDesktop = device === "desktop";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
        if (showToast) {
      showToast(
        "Thank You for Subscribing!",
        "You’ll now receive the latest updates directly in your inbox."
      );
    }

    setEmail("");
  };

  // const [isHovering, setIsHovering] = useState(false);

// useEffect(() => {
//   if (submitted && !isHovering) {
//     const timer = setTimeout(() => setSubmitted(false), 10000);
//     return () => clearTimeout(timer);
//   }
// }, [submitted, isHovering]);



  return (
    <footer className="footer" id="contactUs">
      {/* ✅ Mobile Layout */}
      {isMobile && (
        <>
          <div className="left">
            <div className="left-mobile">
              <img src={Logo} alt="Logo" />
              <p>
                Our goal is to help users find the person they want around the
                world.
              </p>
            </div>
            <div className="icon">
              <a href="#"><i id="twitter" class="fa-brands fa-x-twitter"></i></a>
              <a href="#"><i id="whatsapp" className="fa-brands fa-whatsapp"></i></a>
              <a href="#"><i id="instagram" className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div className="right">
            <p>Register your email to be notified of new site features.</p>
            <form className="input" onSubmit={handleSubmit}>
              <input
                required
                type="email"
                placeholder="Please enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>

          <div className="link">
            <div className="link1">
              <ul>
                <li><a id="FAQblack" href="#">User Services</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </div>
            <div className="link2">
              <ul>
                <li><a id="AboutUsblack" href="#">Company</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Career</a></li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* ✅ Tablet Layout */}
      {isTablet && (
        <>
        <div className="bottom">
          <div className="left">
            <div className="left-mobile">
              <img src={Logo} alt="Logo" />
              <p>
                Our goal is to help users find the person they want around the
                world.
              </p>
            </div>
            <div className="icon">
              <a href="#"><i id="twitter" class="fa-brands fa-x-twitter"></i></a>
              <a href="#"><i id="whatsapp" className="fa-brands fa-whatsapp"></i></a>
              <a href="#"><i id="instagram" className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div className="link">
            <div className="link1">
              <ul>
                <li><a id="FAQblack" href="#">User Services</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </div>
            <div className="link2">
              <ul>
                <li><a id="AboutUsblack" href="#">Company</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Career</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right">
            <p>Register your email to be notified of new site features.</p>
            <form className="input" onSubmit={handleSubmit}>
              <input
                required
                type="email"
                placeholder="Please enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}

      {isDesktop && (
        <>
        <div className="left">
            <div className="left-mobile">
              <img src={Logo} alt="Logo" />
              <p>
                Our goal is to help users find the person they want around the
                world.
              </p>
            </div>
            <div className="icon">
              <a href="#"><i id="twitter" class="fa-brands fa-x-twitter"></i></a>
              <a href="#"><i id="whatsapp" className="fa-brands fa-whatsapp"></i></a>
              <a href="#"><i id="instagram" className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div className="link">
            <div className="link1">
              <ul>
                <li><a id="FAQblack" href="#">User Services</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Terms of Use</a></li>
              </ul>
            </div>
            <div className="link2">
              <ul>
                <li><a id="AboutUsblack" href="#">Company</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Career</a></li>
              </ul>
            </div>
            </div>
          <div className="right">
            <p>Register your email to be notified of new site features.</p>
            <form className="input" onSubmit={handleSubmit}>
              <input
                required
                type="email"
                placeholder="Please enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
</>
      )}
    </footer>
  );
}

export default Footer;
