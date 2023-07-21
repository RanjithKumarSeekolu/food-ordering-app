import classes from "./Header.module.css";
import React from "react";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import HeaderSearchBar from "./HeaderSearchBar";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Foodies</h1>
        <HeaderSearchBar />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="a table with full of delicious meals!" />
      </div>
    </React.Fragment>
  );
};
export default Header;
