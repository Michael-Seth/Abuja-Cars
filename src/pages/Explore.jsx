import React from "react";
import { Link } from "react-router-dom";
import rentCategoryImage from "../assets/jpg/carhire.jpg";
import sellCategoryImage from "../assets/jpg/carsale.jpg";
import Slider from "../components/Slider";

function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Home</p>
      </header>
      <main>
        <Slider />

        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Cars for Hire</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Cars for Sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
