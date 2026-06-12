import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToHash from "./components/ScrollToHash";
import Navbar from "./components/MenuNavbar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import Features from "./components/Features";
import AboutUs from "./components/AboutUs";
import ClientReviews from "./components/ClientReviews";
import Footer from "./components/Footer";
import ReadMore from "./components/ReadMore";
import ToastMessage from "./components/ToastMessage";
import ConfirmLogoutModal from "./components/ConfirmLogoutModal";
import "./App.css";

function App() {
  const [apiUsers, setApiUsers] = useState([]);    // کاربران carousel از API
  const [fileUsers, setFileUsers] = useState([]);  // کاربران برای سرچ از فایل

  const [current, setCurrent] = useState(0);
  // const [hasResults, setHasResults] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastText, setToastText] = useState("");


  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openLogoutAfterToast, setOpenLogoutAfterToast] = useState(false);

  const [user, setUser] = useState(null);

  const [loadingUsers, setLoadingUsers] = useState(true);
// const handleOpenLogoutModal = () => {
//   setToastVisible(false); 

//   setTimeout(() => {
//     setShowLogoutModal(true); // بعد از fade، مودال باز می‌شه
//   }, 300); // ⏱ هم‌زمان با transition
// };


const handleLogout = () => {
  setToastVisible(false);
  setUser(null);
  // setShowLogoutModal(false);
  showToast("Logged out", "You have successfully logged out.");
  localStorage.removeItem("token");
};


useEffect(() => {
  if (!toastVisible && openLogoutAfterToast) {
    setShowLogoutModal(true);       // مودال باز میشه
    setOpenLogoutAfterToast(false); // ریست flag
  }
}, [toastVisible, openLogoutAfterToast]);


  // گرفتن کاربران carousel از API
  useEffect(() => {
    setLoadingUsers(true);
    fetch("https://68f17b88b36f9750dee96c75.mockapi.io/reviews")
      .then((res) => res.json())

      .then((data) => {
  setApiUsers(data);
 setLoadingUsers(false);

  data.forEach((user) => {
    const img = new Image();
    img.src = user.img;
  });
})
      .catch((err) => console.error(err));
  }, []);

  // گرفتن کاربران سرچ از فایل
  useEffect(() => {
    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => setFileUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // carousel timer
  useEffect(() => {
    if (apiUsers.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % apiUsers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [apiUsers]);


// تابع کمکی برای نشان دادن Toast
const showToast = (title, text) => {
  setToastTitle(title);
  setToastText(text);
  setToastVisible(true);
};

  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <ScrollToHash />
        
        <Navbar
        user={user} 
  onLoginClick={() => setShowLogin(true)}
  onSignupClick={() => {
    setShowLogin(false);
    setShowSignup(true);
  }}
  onLogoutClick={handleLogout}
/>

<ToastMessage
  show={toastVisible}
  onClose={() => setToastVisible(false)}
  title={toastTitle}
  text={toastText}
/>


        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Search
                  apiUsers={apiUsers}
                  loading={loadingUsers}
                  fileUsers={fileUsers}
                  current={current}
                  setCurrent={setCurrent}
                  // setHasResults={setHasResults}
                />
                <Features/>
                <AboutUs />
                <ClientReviews reviews={apiUsers} current={current} setCurrent={setCurrent} />
              </main>
            }
          />

<Route
  path="/search-results"
  element={
    <SearchResults
      fileUsers={fileUsers}
      apiUsers={apiUsers}
      current={current}
      setCurrent={setCurrent}
    />
  }
/>



          <Route path="/ReadMore" element={<ReadMore />} />
        </Routes>

        <Footer 
        showToast={showToast}
        />

        <LoginModal
      show={showLogin}
      onClose={() => setShowLogin(false)}
      onSignupClick={() => {
        setShowLogin(false);
        setShowSignup(true);
      }}
      onForgotClick={() => {
        setShowLogin(false);
        setShowForgot(true);
      }}
      showToast={showToast}
      setUser={setUser}
    />

    <SignupModal
      show={showSignup}
      onClose={() => setShowSignup(false)}
      onLoginClick={() => {
        setShowSignup(false);
        setShowLogin(true);
      }}
      showToast={showToast}
    />

    <ForgotPasswordModal
      show={showForgot}
      onClose={() => setShowForgot(false)}
      onChangePassClick={() => {
        setShowForgot(false);
        setShowChangePass(true);
      }}
      showToast={showToast}
    />

    <ChangePasswordModal
      show={showChangePass}
      onClose={() => setShowChangePass(false)}
      showToast={showToast}
    />

<ConfirmLogoutModal
  show={showLogoutModal}
  onClose={() => setShowLogoutModal(false)}
  onConfirm={handleLogout}
/>

    
      </div>
    </Router>
  );
}

export default App;
