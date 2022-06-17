import React from "react";
import InputLabel from "../Form/InputLabel";
import { onlyTextValidation, onlyNumberValidation, passwordValidation } from "../validations"
import { fakeUser } from "../variables";
import { Link } from "react-router-dom"
import s from "./LoginSignUp.module.css"
import CheckoutButton from "../Buttons/CheckoutButton";

class LoginSignUp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      error: {},
      isPasswordShown: false,
      isLogin: true,
      password: "",
    }
  }

  handleValidations = (type, value) => {
    let errorText;
    const {isLogin, password} = this.state
    switch(type) {
      case "firstName":
        errorText = onlyTextValidation(value)
        this.setState((prevState) => ({
          error: {...prevState.error, firstNameError: errorText}
        }))
        break;
        case "lastName":
          errorText = onlyTextValidation(value)
          this.setState((prevState) => ({
            error: {...prevState.error, lastNameError: errorText}
          }))
          break;
        case "zip":
          errorText = onlyNumberValidation(value)
          this.setState((prevState) => ({
            error: {...prevState.error, zipError: errorText}
          }))
          break;
        case "password":
          errorText = passwordValidation(value)
          this.setState((prevState) => ({
            error: {...prevState.error, passwordError: errorText}
          }))
          break;
        case "email":
          if (!isLogin && value === fakeUser.email) {
            errorText = "This account already exists."
          } else if (value !== fakeUser.email && isLogin) {
            errorText = "This account does not exist."
          } 
          this.setState((prevState) => ({
            error: {...prevState.error, emailError: errorText}
          }))
          break;
        case "confirmPassword":
          errorText = !isLogin && value !== password ? "Passwords must match" : null
          this.setState((prevState) => ({
            error: {...prevState.error, confirmPasswordError: errorText}
          }))
          break;
      default:
        break;
    }
    return errorText
  }

  handleBlur = ({target: {name, value}}) => this.handleValidations(name, value);

  togglePasswordVisibility = () => {
    const {isPasswordShown} = this.state
    this.setState({ isPasswordShown: !isPasswordShown })
  }

  checkErrorBeforeSave = (data) => {
    const {isLogin} = this.state
    let errorValue = {};
    let isError = false;
    Object.keys(data).forEach((val) => {
      if(!data[val].length && !(isLogin && val === "confirmPassword")) {
        errorValue = {...errorValue, [`${val}Error`]: "Required"}
        isError = true;
      }
    })
    this.setState({error: errorValue});
    Object.keys(data).forEach((val) => {
      isError = isError || !!this.handleValidations(val, data[val])
    })
    return isError
  }

  formSubmit = (event) => {
    event.preventDefault()
    const fData = new FormData(event.target)
    const userData = 
      {email: fData.get("email"), 
      password: fData.get("password"), 
      confirmPassword: fData.get("confirmPassword"),
      firstName: fData.get("firstName"), 
      lastName: fData.get("lastName"), 
      zip: fData.get("zip")}
      if (this.state.isLogin) {
        userData.confirmPassword = fData.get("password")
        userData.zip = fakeUser.zip
        userData.firstName = fakeUser.firstName
        userData.lastName = fakeUser.lastName
      }
    const errorCheck = this.checkErrorBeforeSave(userData);
    if (!errorCheck) {
      this.props.onSubmit(userData)
    }
  }

  render() {
    const {error, isPasswordShown, isLogin, password} = this.state
    let loginHeader = "Create Account"
    let inputData = [
      {key: 1, name: "email", type: "email", label: "Your Email Address", htmlFor:"email", error: "emailError"},
      {key: 2, name: "password", type: (isPasswordShown ? "text" : "password"), label: "Your Password", htmlFor:"password", error: "passwordError", value: password, onChange: ((e) => this.setState({password: e.target.value}))},
      {key: 3, name: "confirmPassword", type: (isPasswordShown ? "text" : "password"), label: "Confirm Password", htmlFor:"confirmPassword", error: "confirmPasswordError"},
      {key: 4, name: "firstName", type: "text", label: "First Name", htmlFor:"firstName", error: "firstNameError"},
      {key: 5, name: "lastName", type: "text", label: "Last Name", htmlFor:"lastName", error: "lastNameError"},
      {key: 6, name: "zip", type: "text", label: "Zip Code", htmlFor:"zip", error: "zipError"},
    ]

    if (isLogin) {
      loginHeader = "Sign In"
      inputData = [
      {key: 1, name: "email", type: "email", label: "Your Email Address", htmlFor:"email", error: "emailError"},
      {key: 2, name: "password", type: (isPasswordShown ? "text" : "password"), label: "Your Password", htmlFor:"password", error: "passwordError"},
      ]
    }

    return (
        <div className={s.loginContainer}>
          <div className={s.backHome} 
          onClick={() => this.props.onReturn()}>
            <i className="fa-solid fa-angle-left"></i>
            <span>Back</span>
          </div>
          {this.props.user ? <div>YOU ARE ALREADY LOGGED IN </div> :
          <form onSubmit={this.formSubmit}>
            <div className={s.selectionSignIn}>
              <h4>New User? Create an Account!</h4>
              <label>
              <input id="login" name="login" type="radio" checked={isLogin}
              onClick={() => {this.setState({isLogin: true})}} />
              Sign In
              </label>
              <label>
                <input id="newAccount" type="radio" name="login" checked={!isLogin} onClick={() => {this.setState({isLogin: false})}}/>
                Create Account
              </label>
            </div>
            <div className={s.inputFields}>
              <h2>{loginHeader}</h2>
              {inputData.length ? inputData.map((item) => (
              <InputLabel
                key={item.key}
                type={item.type}
                label={item.label}
                isPasswordShown={isPasswordShown}
                onPasswordVisibility={this.togglePasswordVisibility}
                name={item.name}
                onBlur={this.handleBlur}
                onChange={item.onChange}
                value={item.value}
                error={error}
                errorM={
                  (error
                  && error[item.error]
                  && error[item.error].length > 1)
                  ? error[item.error]
                  : null
                }
              />
            )): null}
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
          </form>}
        </div>
    )
  }
}

export default LoginSignUp