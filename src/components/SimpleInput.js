import { useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    hasError: nameInputHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const emailRegx = /[a-z0-9_]+@[a-z]+\.[a-z]+$/;
  const enteredEmailIsValid = emailRegx.test(enteredEmail);
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (nameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!nameIsValid && !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    resetNameInput();
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  const emailInputClasses = emailInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={submitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Please provide a correct email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
