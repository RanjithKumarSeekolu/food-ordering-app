import { useContext } from "react";
import classes from "./HeaderSearchBar.module.css";
import cartContext from "../../store/cart-context";
// import icon from './search.gif';
const HeaderSearchBar = () => {
  const cartCtx = useContext(cartContext);
  return (
    <>
      <form className={classes.form__control}>
        <input
          placeholder="Search"
          onChange={(e) => {
            cartCtx.searchChangeHandler(e);
          }}
        />
        {/* <button onClick={}><img src={icon} alt='search'/></button> */}
      </form>
    </>
  );
};

export default HeaderSearchBar;
