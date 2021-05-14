import React from "react";
import "./AdvancedFilter.css";

const AdvancedFilter = ({ searchValue, handleChangeValue }) => (
   < div className="d-flex justify-content-left h-100">
   <div className="searchbar">

    <input
      data-testid="filter-input-name"
      type="text"
      name="name"
      value={searchValue.name}
      onChange={(e) => handleChangeValue(e)}
      placeholder="Name"
      className="search_input"
      autoFocus
    />
    <a href="#" className="search_icon"><i className="fas fa-search"></i></a>
    <input
      data-testid="filter-input-capital"
      type="text"
      name="location"
      value={searchValue.location}
      onChange={(e) => handleChangeValue(e)}
      placeholder="Location"
      className="search_input"
    />
    <input
      data-testid="filter-input-population"
      type="text"
      name="job"
      className="search_input"
      placeholder="Job"
      value={searchValue.job}
      onChange={(e) => handleChangeValue(e)}
    />

  </div>
  </ div>
);

export default AdvancedFilter;