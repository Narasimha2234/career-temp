import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
import { useSnackbar } from "notistack";
var bnr = require("./../../images/background/bg6.jpg");

function Register2(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {enqueueSnackbar}=useSnackbar()
  const dispatch = useDispatch();

  function onSignUp(e) {
	e.preventDefault();
	let error = false;
	const errorObj = { ...errors };
  const emailRegex =/^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
	// Email Validation
	if (email === "") {
	  errorObj.email = "Email is required";
	  error = true;
	} else if (!emailRegex.test(email)) {
	  errorObj.email = "Please enter a valid email address";
	  error = true;
	}
  
	// Mobile Number Validation
	if (phoneNumber === "") {
	  errorObj.phoneNumber = "Phone number is required";
	  error = true;
	} else if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
	  errorObj.phoneNumber =
		"Phone number must  exactly 10 digits";
	  error = true;
	}
  
	// Password Validation
	if (password === "") {
		errorObj.password = "Password is required";
		error = true;
	  } else {
		// Individual Password Checks
		if (!/(?=.*[a-z])/.test(password)) {
		  errorObj.password = "Password must include at least one lowercase letter";
		  error = true;
		} else if (!/(?=.*[A-Z])/.test(password)) {
		  errorObj.password = "Password must include at least one uppercase letter";
		  error = true;
		} else if (!/(?=.*\d)/.test(password)) {
		  errorObj.password = "Password must include at least one digit";
		  error = true;
		} else if (!/(?=.*[@$!%*?&#])/.test(password)) {
		  errorObj.password =
			"Password must include at least one special character";
		  error = true;
		} else if (password.length < 8) {
		  errorObj.password = "Password must be at least 8 characters long";
		  error = true;
		}
	  }
    
  
	if (confirmPassword === "") {
	  errorObj.confirmPassword = "Confirm password is required";
	  error = true;
	} else if (confirmPassword !== password) {
	  errorObj.confirmPassword = "Passwords not matched";
	  error = true;
	}
  
	setErrors(errorObj);
  
	if (error) return;

	dispatch(loadingToggleAction(true));
	dispatch(signupAction(email, password, phoneNumber, props.history));
  }
  React.useEffect(() => {
    if (props.successMessage) {
      enqueueSnackbar(props.successMessage, { variant: 'success' });
    } 
    // else if (props.errorMessage && !props.successMessage) {
    //   enqueueSnackbar(props.errorMessage, { variant: 'error' });
    // }
    // if (props.errorMessage) {
    //   dispatch({ type: 'CLEAR_ERROR_MESSAGE' }); 
    // }
    if (props.successMessage) {
      dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' }); 
    }
  }, [props.successMessage, enqueueSnackbar,dispatch]);


  return (
    <div className="page-wraper">
      <div className="browse-job login-style3">
        <div
          className="bg-img-fix"
          style={{ backgroundImage: `url(${bnr})`, height: "100vh" }}
        >
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 bg-white z-index2 relative p-a0 content-scroll skew-section left-bottom">
              <div className="login-form style-2">
                <div className="text-center p-tb30">
                  <h2>Orchasp Ltd</h2>
                </div>
                <div className="clearfix"></div>
                <div className="tab-content nav p-b30 tab">
                  <div id="login" className="tab-pane active ">
                    {/* {props.errorMessage && (
                      <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                        {props.errorMessage}
                      </div>
                    )}
                    {props.successMessage && (
                      <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                        {props.successMessage}
                      </div>
                    )} */}
                    <form className="dez-form p-b30" onSubmit={onSignUp}>
                      <h3 className="form-title m-t0">Create an Account</h3>
                      <p>
                        Enter your e-mail address, phone number, and password.
                      </p>

                      {/* Email Input */}
                      <div className="form-group">
                        <input
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({ ...errors, email: "" }); 
                            if(props.errorMessage){
                              dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
                            }
                          }}
                          className="form-control"
                          placeholder="Email"
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>

                      {/* Phone Number Input */}
                      <div className="form-group">
                        <input
                          value={phoneNumber}
                          onChange={(e) => {setPhoneNumber(e.target.value)
                            setErrors({...errors,phoneNumber:""})
                            if(props.errorMessage){
                              dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
                            }
                          }}
                          className="form-control"
                          placeholder="Phone Number"
                        />
                        {errors.phoneNumber && (
                          <div className="text-danger">{errors.phoneNumber}</div>
                        )}
                      </div>

                      {/* Password Input */}
					  {/* Password Input */}
<div className="form-group" style={{ position: "relative", marginBottom: "1.5rem" }}>
  <input
    value={password}
    onChange={(e) => {setPassword(e.target.value)
      setErrors({...errors,password:""})
    }}
    type={passwordVisible ? "text" : "password"}
    className="form-control"
    placeholder="Password"
    style={{
      paddingRight: "2.5rem",
      borderColor: errors.password ? "red" : "",
    }}
  />
  <i
    className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
    aria-hidden="true"
    style={{
      position: "absolute",
      top: errors.password ? "calc(20% + 10px)" : "50%",
      right: "12px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color:  "#888",
      fontSize: "1rem",
      lineHeight: "1",
    }}
    onClick={() =>{ setPasswordVisible(!passwordVisible)
      setErrors({...errors,confirmPassword:""})
    }}
  ></i>
  {errors.password && (
    <div className="text-danger" style={{ marginTop: "0.25rem" }}>{errors.password}</div>
  )}
</div>

			{/* Confirm Password Input */}
			<div className="form-group" style={{ position: "relative", marginBottom: "1.5rem" }}>
			<input
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				type={confirmPasswordVisible ? "text" : "password"}
				className="form-control"
				placeholder="Confirm Password"
				style={{
				paddingRight: "2.5rem",
				borderColor: errors.confirmPassword ? "red" : "",
				}}
			/>
			<i
				className={`fa ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
				aria-hidden="true"
				style={{
				position: "absolute",
				top: errors.confirmPassword ? "calc(20% + 10px)" : "50%",
				right: "12px",
				transform: "translateY(-50%)",
				cursor: "pointer",
				color:  "#888",
				fontSize: "1rem",
				lineHeight: "1",
				}}
				onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
			></i>
			{errors.confirmPassword && (
				<div className="text-danger" style={{ marginTop: "0.25rem" }}>{errors.confirmPassword}</div>
			)}
			</div>
                      {/* Submit Button */}
                      <div className="text-center bottom">
                        <button
                          type="submit"
                          className="site-button button-md btn-block text-white"
                        >
                          Sign Up
                        </button>
                        {props.errorMessage && (<p style={{color:"red"}}>{props.errorMessage}</p> )}

                      </div>
                    </form>
                    {/* Sign In Link */}
                    <div className="text-center">
                      <Link
                        to="/login"
                        className="site-button button-md btn-block text-white"
                      >
                        Already have an account? Sign In
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Register2);