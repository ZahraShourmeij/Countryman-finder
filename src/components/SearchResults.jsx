import React, { useRef, useEffect }  from "react";
import { useLocation } from "react-router-dom";
import Search from "./Search";
import { Country } from "country-state-city";


const SearchResults = ({ fileUsers, apiUsers, current, setCurrent }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const selectedCountry = params.get("country");
  const selectedCity = params.get("city");

  const filteredUsers = fileUsers.filter(user => {
    if (selectedCountry && user.countryCode !== selectedCountry) return false;
    if (selectedCity && user.city !== selectedCity) return false;
    return true;
  });

  const resultsRef = useRef(null);

  const countryName = selectedCountry
  ? Country.getCountryByCode(selectedCountry)?.name
  : "";

// SearchResults.jsx
useEffect(() => {
  document.body.classList.add("search-results-page");
  return () => document.body.classList.remove("search-results-page");
}, []);


  return (
    <div className="search-results-page">
    <div className="results-wrapper">
      {/* 🔍 Search Box */}
        <Search
        apiUsers={apiUsers}
        current={current}
        setCurrent={setCurrent}
        hideCarousel={true}
        onlySearchBox={true}
        />

{/* 🧾 Search results title */}
{filteredUsers.length > 0 && (
  <div className="search-results-title">
    Search results : 
<span className="highlight">
    {" "}
  {selectedCity || countryName}
  {" "}
</span>
    <span className="count">
      {" "}
      ({filteredUsers.length} user{filteredUsers.length > 1 ? "s" : ""})
    </span>
  </div>
)}


      {/* 👥 نتایج */}
      <div style={{ marginTop: "3rem" }}>
        {filteredUsers.length === 0 && (
            <div className="no-users">
                No users found
            </div>
       )}

        {filteredUsers.length > 0 && (
          <div ref={resultsRef} className="filtered-users">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              >
                <img
                  src={user.img}
                  alt={user.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                  }}
                />
                <p style={{ margin: "5px 0 0 0", fontWeight: "500" }}>
                  {user.name}
                </p>
                <p style={{ margin: "0", fontSize: "12px", color: "#555" }}>
                  {user.city}, {user.country}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
   
  );
};

export default SearchResults;
