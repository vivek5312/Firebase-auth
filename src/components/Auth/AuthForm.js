import { useState, useRef } from "react";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
  
    setIsLoading(true);
  
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChK707mathgXZfxOEybHq61Gomczbf1eU';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChK707mathgXZfxOEybHq61Gomczbf1eU';
    }
  
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
  
        if (data.error) {
          let errormessage = 'Authentication failed!';
          alert(errormessage);
        } else {
          // Authentication successful, you can console log the idToken
          console.log('idToken:', data.idToken);
          // You can also save the idToken in a state or context if needed
        }
      })
      .catch((error) => {
        // Handle errors
        alert('An error occurred. Please try again.');
        console.error('Error:', error);
        setIsLoading(false);
      });
  };
  
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin? 'Login':'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
