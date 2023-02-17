import React,{useContext} from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import cartContext from '../../store/cart-context';

const HeaderCartButton=props=>{

    const cartCtx=useContext(cartContext);
    const numberOfCartItems=cartCtx.items.reduce((acc,currItem)=>{return acc+currItem.amount}, 0);
    return (
    <button className={classes.button} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
     </button>);
}

export default HeaderCartButton;