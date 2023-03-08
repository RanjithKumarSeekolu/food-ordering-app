import classes from './Checkout.module.css';
import { useRef,useState } from 'react';

const isEmpty=value=>value.trim()!=="";
const isNotFiveChars=value=>value.trim().length===6;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity]=useState({
    name:true,
    street:true,
    city:true,
    postalCode:true,
  });
  const nameinputRef=useRef();
  const streetInputRef=useRef();
  const postalCodeInputRef=useRef();
  const cityInputRef=useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName=nameinputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPostalCode=postalCodeInputRef.current.value;
    const enteredCity=cityInputRef.current.value;

    const enteredNameIsValid=isEmpty(enteredName);
    const enteredStreetIsValid=isEmpty(enteredStreet);
    const enteredCityIsValid=isEmpty(enteredCity);
    const enteredPostalCodeIsValid=isNotFiveChars(enteredPostalCode);
    console.log(enteredNameIsValid);

    setFormInputValidity({
        name:enteredNameIsValid,
        street: enteredCityIsValid,
        city: enteredCityIsValid,
        postalCode:enteredPostalCodeIsValid
    })
    const formIsValid=enteredCityIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
    if(!formIsValid){
        return;
    }
    props.onConfirm({
        name: enteredName,
        stree: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostalCode
    });
    nameinputRef.current.value="";
    cityInputRef.current.value="";
    streetInputRef.current.value="";
    postalCodeInputRef.current.value="";
  };

  const nameControlClasses=`${classes.control} ${formInputValidity.name?'':classes.invalid}`;
  const streetControlClasses=`${classes.control} ${formInputValidity.street?'':classes.invalid}`;
  const cityControlClasses=`${classes.control} ${formInputValidity.city?'':classes.invalid}`;
  const postalCodeControlClasses=`${classes.control} ${formInputValidity.postalCode?'':classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameinputRef} type='text' id='name' />
        {!formInputValidity.name && <p>Please Enter a Valid Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputValidity.street && <p>Please Enter a Valid Street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalCodeInputRef} type='text' id='postal' />
        {!formInputValidity.postalCode && <p>Please Enter a Valid Postal Code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputValidity.city && <p>Please Enter a Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;