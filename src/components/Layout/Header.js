import classes from "./Header.module.css";
import React, { useState, useEffect } from "react";
import mealsImage from "../../assets/meals2.jpg";
import HeaderCartButton from "./HeaderCartButton";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add a scroll event listener using useEffect
  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position
      if (window.scrollY > 0) {
        // If scrolled down, set isScrolled to true
        setIsScrolled(true);
      } else {
        // If scrolled to the top, set isScrolled to false
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <header
        className={`${classes.header} ${
          isScrolled ? classes["non-transparent"] : ""
        }`}
      >
        <h1>Foodies</h1>
        <HeaderSearchBar />
        <ul className={classes.header__menu}>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#offers">Offers</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>

        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="a table with full of delicious meals!" />
      </div>
    </React.Fragment>
  );
};
export default Header;
