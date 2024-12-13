import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loadingToggleAction, loginAction } from "../../store/actions/AuthActions";
import loginbg from "./../../images/bg6.jpg";
import { useSnackbar } from "notistack";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const {enqueueSnackbar}=useSnackbar()
  const dispatch = useDispatch();
 const onChangeEmail = (e) => {
  const value = e.target.value;
  setEmail(value);

  const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

  // Validate email in real-time
  if (!value) {
    setErrors((prev) => ({ ...prev, email: "Email is required" }));
  } else if (!emailRegex.test(value)) {
    setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
  } else {
    setErrors((prev) => ({ ...prev, email: "" }));
  }
};
  
const onChangePassword = (e) => {
  const value = e.target.value;
  setPassword(value);

  // Validate password in real-time
  if (!value) {
    setErrors((prev) => ({ ...prev, password: "Password is required" }));
  } else {
    setErrors((prev) => ({ ...prev, password: "" }));
  }
};

  // Validation on form submission
  function onLogin(e) {
    e.preventDefault();
    const emailRegex =/^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    let error = false;
    let errorObj = { email: "", password: "" };
  
    // Simple validation
    if (email === "") {
      errorObj.email = "Email is required";
      error = true;
    } else if (!emailRegex.test(email)) {
      errorObj.email = "Please enter a valid email address";
      error = true;
    }
    
    if (password === "") {
      errorObj.password = "Password is required";
      error = true;
    }

    setErrors(errorObj);

    if (error) return;

    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  React.useEffect(() => {
    if (props.successMessage) {
      enqueueSnackbar(props.successMessage, { variant: 'success' });
    } else if (props.errorMessage && !props.successMessage) {
      enqueueSnackbar(props.errorMessage, { variant: 'error' });
    }
    if (props.errorMessage) {
      dispatch({ type: 'CLEAR_ERROR_MESSAGE' }); 
    }
    if (props.successMessage) {
      dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' }); 
    }
  }, [props.successMessage, props.errorMessage, enqueueSnackbar,dispatch]);

  
  return (
    <div className="page-wraper">
      <div
        className="page-content bg-white login-style2"
        style={{ backgroundImage: `url(${loginbg})`, backgroundSize: "cover" }}
      >
        <div className="section-full">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="text-white max-w400 align-self-center">
                  <div>
                    <h2>Orchasp Ltd</h2>
                  </div>
                  <h2 className="m-b10">Join Our Team</h2>
                  {/* <p className="m-b30">
                    Welcome to the careers portal of Orchasp Ltd! Here, we are committed to creating an inclusive and inspiring environment where innovation thrives, and employees are empowered to excel. Discover exciting opportunities to contribute to our growth while building a fulfilling career for yourself.
                  </p> */}
                  <p className="m-b30">
                    Whether you're a seasoned professional or just starting, we have roles across multiple departments waiting for passionate individuals like you.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="login-2 submit-resume p-a30 seth">
                  <form onSubmit={onLogin} className="col-12 p-a0">
                    <p className="font-weight-600">
                      If you have an account with us, please log in.
                    </p>

                    {/* Error and Success Messages */}
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

                    {/* Email Input */}
                    <div className="form-group">
                      <label>E-Mail Address*</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Type Your Email Address"
                          value={email}
                          onChange={onChangeEmail}
                        />
                        
                      </div>
					  {errors.email && (
                          <div className="text-danger fs-12">{errors.email}</div>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="form-group" style={{ position: "relative" }}>
						<label>Password *</label>
						<div style={{ position: "relative" }}>
							<input
							type={passwordVisible ? "text" : "password"}
							className="form-control"
							placeholder="Type Your Password"
							value={password}
							onChange={onChangePassword}
							style={{ paddingRight: "2.5rem" }} // Space for the icon
							/>
							<i
							className={`fa ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
							aria-hidden="true"
							style={{
								position: "absolute",
								top: "50%",
								right: "10px",
								transform: "translateY(-50%)",
								cursor: "pointer",
								color: "#888",
								fontSize: "1rem",
							}}
							onClick={togglePasswordVisibility}
							></i>
						</div>
						{errors.password && (
							<div className="text-danger fs-12">{errors.password}</div>
						)}
						</div>
                    {/* Submit Button and Sign Up Link */}
                    <div className="text-center">
                      <button className="site-button float-left">Login</button>
                      <div className="text-center m-t15">
                        <Link
                          to="register-2"
                          className="site-button-link forget-pass m-t15 float-right"
                        >
                          <i className="fa fa-unlock-alt"></i> Sign Up
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="login-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <span className="float-left">
                  © Copyright by{" "}
          
                  <span>Orchasp Ltd</span>
                </span>
                <span className="float-right">All rights reserved.</span>
              </div>
            </div>
          </div>
        </footer>
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

export default connect(mapStateToProps)(Login);
