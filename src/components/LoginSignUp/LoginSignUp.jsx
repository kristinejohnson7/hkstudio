import React, { useState, useContext } from "react";
import InputLabel from "../Form/InputLabel";
import {
  onlyTextValidation,
  onlyNumberValidation,
  passwordValidation,
} from "../../constantVariables/validations";
import { fakeUser } from "../../constantVariables/userVariables";
import { useNavigate } from "react-router-dom";
import s from "./LoginSignUp.module.css";
import CheckoutButton from "../Buttons/CheckoutButton";
import { userContext } from "../Helper/Context";

const LoginSignUp = (props) => {
  const { user, setUser } = useContext(userContext);
  const [error, setError] = useState({});
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleValidations = (type, value) => {
    let errorText;
    switch (type) {
      case "firstName":
      case "lastName":
        errorText = onlyTextValidation(value);
        setError((prevState) => ({
          ...prevState.error,
          [`${type}Error`]: errorText,
        }));
        break;
      case "zip":
        errorText = onlyNumberValidation(value);
        setError((prevState) => ({ ...prevState.error, zipError: errorText }));
        break;
      case "password":
        errorText = passwordValidation(value);
        setError((prevState) => ({
          ...prevState.error,
          passwordError: errorText,
        }));
        break;
      case "email":
        if (!isLogin && value === fakeUser.email) {
          errorText = "This account already exists.";
        } else if (value !== fakeUser.email && isLogin) {
          errorText = "This account does not exist.";
        }
        setError((prevState) => ({
          ...prevState.error,
          emailError: errorText,
        }));
        break;
      case "confirmPassword":
        errorText =
          !isLogin && value !== password ? "Passwords must match" : null;
        setError((prevState) => ({
          ...prevState.error,
          confirmPasswordError: errorText,
        }));
        break;
      default:
        break;
    }
    return errorText;
  };

  const handleBlur = ({ target: { name, value } }) =>
    handleValidations(name, value);

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const checkErrorBeforeSave = (data) => {
    let errorValue = {};
    let isError = false;
    Object.keys(data).forEach((val) => {
      if (!data[val].length && !(isLogin && val === "confirmPassword")) {
        errorValue = { ...errorValue, [`${val}Error`]: "Required" };
        isError = true;
      }
    });
    setError(errorValue);
    Object.keys(data).forEach((val) => {
      isError = isError || !!handleValidations(val, data[val]);
    });
    return isError;
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const fData = new FormData(event.target);
    const userData = {
      email: fData.get("email"),
      password: fData.get("password"),
      confirmPassword: fData.get("confirmPassword"),
      firstName: fData.get("firstName"),
      lastName: fData.get("lastName"),
      zip: fData.get("zip"),
    };
    if (isLogin) {
      userData.confirmPassword = fData.get("password");
      userData.zip = fakeUser.zip;
      userData.firstName = fakeUser.firstName;
      userData.lastName = fakeUser.lastName;
    }
    const errorCheck = checkErrorBeforeSave(userData);
    if (!errorCheck) {
      setUser(userData);
      navigate("/");
    }
  };

  let loginHeader = "Create Account";
  let inputData = [
    {
      key: 1,
      name: "email",
      type: "email",
      label: "Your Email Address",
      htmlFor: "email",
      error: "emailError",
    },
    {
      key: 2,
      name: "password",
      type: isPasswordShown ? "text" : "password",
      label: "Your Password",
      htmlFor: "password",
      error: "passwordError",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
    {
      key: 3,
      name: "confirmPassword",
      type: isPasswordShown ? "text" : "password",
      label: "Confirm Password",
      htmlFor: "confirmPassword",
      error: "confirmPasswordError",
    },
    {
      key: 4,
      name: "firstName",
      type: "text",
      label: "First Name",
      htmlFor: "firstName",
      error: "firstNameError",
    },
    {
      key: 5,
      name: "lastName",
      type: "text",
      label: "Last Name",
      htmlFor: "lastName",
      error: "lastNameError",
    },
    {
      key: 6,
      name: "zip",
      type: "text",
      label: "Zip Code",
      htmlFor: "zip",
      error: "zipError",
    },
  ];

  if (isLogin) {
    loginHeader = "Sign In";
    inputData = [
      {
        key: 1,
        name: "email",
        type: "email",
        label: "Your Email Address",
        htmlFor: "email",
        error: "emailError",
      },
      {
        key: 2,
        name: "password",
        type: isPasswordShown ? "text" : "password",
        label: "Your Password",
        htmlFor: "password",
        error: "passwordError",
      },
    ];
  }

  return (
    <div className={s.loginContainer}>
      {user ? (
        <div>YOU ARE ALREADY LOGGED IN </div>
      ) : (
        <form onSubmit={formSubmit}>
          <div className={s.selectionSignIn}>
            <h4>New User? Create an Account!</h4>
            <label>
              <input
                id="login"
                name="login"
                type="radio"
                checked={isLogin}
                onClick={() => {
                  setIsLogin(true);
                }}
              />
              Sign In
            </label>
            <label>
              <input
                id="newAccount"
                type="radio"
                name="login"
                checked={!isLogin}
                onClick={() => {
                  setIsLogin(false);
                }}
              />
              Create Account
            </label>
          </div>
          <div className={s.inputFields}>
            <h2>{loginHeader}</h2>
            {inputData.length
              ? inputData.map((item) => (
                  <InputLabel
                    key={item.key}
                    type={item.type}
                    label={item.label}
                    isPasswordShown={isPasswordShown}
                    onPasswordVisibility={togglePasswordVisibility}
                    name={item.name}
                    onBlur={handleBlur}
                    onChange={item.onChange}
                    value={item.value}
                    error={error}
                    errorM={
                      error && error[item.error] && error[item.error].length > 1
                        ? error[item.error]
                        : null
                    }
                  />
                ))
              : null}
          </div>
          <div className={s.inputButton}>
            <CheckoutButton className={s.submitBtns} title="SUBMIT" />
            <div className={s.btnDivider}>
              <hr />
              <span>OR</span>
              <hr />
            </div>
            <button className={s.facebook}>
              <i className="fa-brands fa-facebook-f"></i>
              SIGN IN WITH FACEBOOK
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginSignUp;
