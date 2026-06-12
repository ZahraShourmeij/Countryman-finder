import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from '../assets/background.svg';
import { useLocation } from "react-router-dom";

import dashed_Desktop from "../assets/dashed_Desktop.svg"
import dashed_Tablet from "../assets/dashed_Tablet.svg"
import dashed_Mobile from "../assets/dashed_Mobile.svg"

import { Country, City } from "country-state-city";

const Search = ({ apiUsers,current, loading, hideCarousel = false, onlySearchBox = false,}) => {
  const [selectedCountry, setSelectedCountry] = React.useState("");
  const [cities, setCities] = React.useState([]);
  const [selectedCity, setSelectedCity] = React.useState("");

  const location = useLocation();
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const country = params.get("country");
  const city = params.get("city");

  if (country) {
    setSelectedCountry(country);
    const countryCities = City.getCitiesOfCountry(country);
    setCities(countryCities || []);
  }

  if (city) {
    setSelectedCity(city);
  }
}, [location.search]);

  
  // useEffect(() => {
  //   if (!apiUsers || apiUsers.length === 0) return;
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % apiUsers.length);
  //   }, 5000); 
  //   return () => clearInterval(interval);
  // }, [apiUsers, setCurrent]);

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setSelectedCity("");
    const cityArrow = document.getElementById("arrow-city");
    if (cityArrow) cityArrow.style.left = "50px";

    const countryCities = City.getCitiesOfCountry(countryCode);
    setCities(countryCities || []);
  };

  // گروه فعلی کاربران برای نمایش ۴ تا
const groupSize = 4;
  const currentGroup = Math.floor(current / groupSize);
  const visibleUsers = apiUsers.slice(currentGroup * groupSize, currentGroup * groupSize + groupSize);

const navigate = useNavigate();

const handleSearchClick = () => {
  if (!selectedCountry && !selectedCity) return;

  const params = new URLSearchParams();

  if (selectedCountry) params.append("country", selectedCountry);
  if (selectedCity) params.append("city", selectedCity);

  localStorage.setItem(
    "lastSearch",
    JSON.stringify({
      country: selectedCountry,
      city: selectedCity,
    })
  );

  navigate(`/search-results?${params.toString()}`);
};


  return (
    <>
{!hideCarousel && (
  <div className="dashed-wrapper">
    <div className="dashed-container">
          <img src={dashed_Desktop} alt="dashed" className="dashed_Desktop" />
          <img src={dashed_Tablet} alt="dashed" className="dashed_Tablet" />
          <img src={dashed_Mobile} alt="dashed" className="dashed_Mobile" />

{loading ? (
    <>
      <div className="user-skeleton user1" />
      <div className="user-skeleton user2" />
      <div className="user-skeleton user3" />
      <div className="user-skeleton user4" />
    </>
  ) : (
    visibleUsers.map((user, idx) => (
      <img
        key={currentGroup * groupSize + idx}
        src={user.img}
        alt={user.name}
        className={`user user${idx + 1}`}
      />
    ))
  )}
</div>
      </div>
)}
    <section className={`hero-section ${onlySearchBox ? "only-search" : ""}`}>

  {!onlySearchBox && (
    <>
      <div className="hero-bg">
        <img src={bg} alt="hero background" className="bg-desktop" />
      </div>

      <div className="hero-content">
        <p className="title">
          Find your <span style={{ color: "#FFA500" }}>countryman</span> with us!
        </p>
        <p className="content">
          Wherever you are in the world, you can easily find and communicate with your fellow countrymen with a simple search.
        </p>
      </div>
    </>
  )}


          <div className="search-container">
            <div className="select-container" id="country">
  <select
    className="select"
    value={selectedCountry}
    onChange={handleCountryChange}
  >
    <option value="">Country</option>
    {Country.getAllCountries().map((c) => (
      <option key={c.isoCode} value={c.isoCode}>
        {c.name}
      </option>
    ))}
  </select>
  <i className="fa fa-chevron-down select-arrow"></i>
</div>

<div className="select-container" id="city">
  <select
    className="select"
    value={selectedCity}
    onChange={(e) => setSelectedCity(e.target.value)}
    disabled={!selectedCountry}
  >
    <option value="">City</option>
    {cities.map((city) => (
      <option
        key={`${city.name}-${city.stateCode}`}
        value={city.name}
      >
        {city.name}
      </option>
    ))}
  </select>
  <i className="fa fa-chevron-down select-arrow"></i>
</div>

            

            <button className="btn-search ms-auto" onClick={handleSearchClick}>
              <i className="fa fa-search"></i> Search
            </button>

          </div>
      </section>
    </>
  );
};

export default Search;
