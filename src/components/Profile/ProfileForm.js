import { AuthContext } from "../../Store/AuthContext";
import classes from "./ProfileForm.module.css";
import { useRef, useContext } from "react";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);

  const newPasswordref = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    const enternewPassword = newPasswordref.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyChK707mathgXZfxOEybHq61Gomczbf1eU",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enternewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {});
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordref}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
