import axios from 'axios';
import swal from "sweetalert";
import {
    isValidToken,
    jwtDecode,
    loginConfirmedAction,
    logout,
    setSession,
} from '../store/actions/AuthActions';

const BASE_URL=process.env.REACT_APP_BASE_API_URL 
export const signUp=async(email, password,mobile)=> {

    
    const postData = {
        email,
        password,
        mobile
    };
    return await axios.post(
        `${BASE_URL}/auth/register`,
        postData,
    );
}

export const login=async (email, password)=> {
    const postData = {
        email,
        password,
        returnSecureToken: true,
    };
    return await axios.post(
        `${BASE_URL}/auth/login`,
        postData,
    );
}

export function formatError(errorResponse) {
    switch (errorResponse.error.message) {
        case 'EMAIL_EXISTS':
            //return 'Email already exists';
            swal("Oops", "Email already exists", "error");
            break;
        case 'EMAIL_NOT_FOUND':
            //return 'Email not found';
           swal("Oops", "Email not found", "error",{ button: "Try Again!",});
           break;
        case 'INVALID_PASSWORD':
            //return 'Invalid Password';
            swal("Oops", "Invalid Password", "error",{ button: "Try Again!",});
            break;
        case 'USER_DISABLED':
            return 'User Disabled';

        default:
            return '';
    }
}

export function saveTokenInLocalStorage(tokenDetails) {
    tokenDetails.expireDate = new Date(
        new Date().getTime() + tokenDetails.expiresIn * 1000,
    );
    localStorage.setItem('userDetails', JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
    setTimeout(() => {
        dispatch(logout(history));
    }, timer);
}

export function checkAutoLogin(dispatch, history) {
    const token = localStorage.getItem('accessToken');
    if(token && isValidToken(token)){
        const userDetails= jwtDecode(token)
        setSession(token)
        const user={
            email: userDetails.sub,
            idToken: token,
            localId: userDetails.id,
            expiresIn: userDetails.exp,
            role:userDetails.roles
        }
        dispatch(loginConfirmedAction(user))
        history.push(`${user?.role==="ROLE_ADMIN"?"/company-post-jobs":"/jobs-profile"}`); 
    }
    else {
        dispatch(logout(history));
        return;
    }


}
