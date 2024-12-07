import {login,signUp,} from '../../services/AuthService';




export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export const signupAction=(email, password,phoneNumber, history)=> {
    return async(dispatch) => {
        const response=await signUp(email, password,phoneNumber)
        if(response.data.statusCodeValue===200){ 
            dispatch(confirmedSignupAction(" "))
            history.push('/login');
        }
        else{
            const errorMessage = response.data.body.message;
            console.log(errorMessage);
            dispatch(signupFailedAction(errorMessage));
        };
    };
}

export function logout(history) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, history) {
    return async(dispatch) => {
       const response=await login(email, password)
       
      if(response.data.statusCodeValue===200){
        localStorage.setItem("email",response?.data?.body?.email)
         localStorage.setItem("mobile",response?.data?.body?.mobile)
    localStorage.setItem("isLoggedIn", response.data.statusCodeValue === 200);
    localStorage.setItem("role", response.data.body?.role);
    setSession(response.data.body.token)
     const userDetails= jwtDecode(response.data.body.token)
        const user={
            email: userDetails.sub,
            idToken: response.data.body.token,
            localId: userDetails.id,
            expiresIn: userDetails.exp,
            role:userDetails.roles
        }
          dispatch(loginConfirmedAction(user));
				history.push(`${user?.role==="ROLE_ADMIN"?"/company-post-jobs":"/jobs-profile"}`); 
      }else{
             const errorMessage = response.data.body.message;
            dispatch(loginFailedAction(errorMessage));
      }
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}

export function jwtDecode(token) {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = atob(base64); 
    
    return JSON.parse(jsonPayload); 
  }

  export const isValidToken = (accessToken) => {
    if (!accessToken) {
      return false;
    }
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  };

  export const tokenExpired = (exp) => {
    let expiredTimer;
    const currentTime = Date.now();
    const timeLeft = exp * 1000 - currentTime;
    clearTimeout(expiredTimer);
  
    expiredTimer = setTimeout(() => {
      alert('Token expired');
  
      localStorage.removeItem('accessToken');
  
      window.location.href = "/";
    }, timeLeft);
  };
  
 
  
  export const setSession = (accessToken) => {
    
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      const { exp } = jwtDecode(accessToken);
      tokenExpired(exp);
    } else {     
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem("role")

    }
  };