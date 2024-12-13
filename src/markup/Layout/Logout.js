import React, { useState }  from 'react';
import {connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../store/actions/AuthActions';
import { isAuthenticated } from '../../store/selectors/AuthSelectors';
import LogoutModal from '../Element/LogoutModel';



function LogoutPage(props){
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    console.log(showModal);
    
    function onLogout() {
        setShowModal(true);
    }
    function handleConfirmLogout() {
        dispatch(logout(props.history));  // Call logout action
        setShowModal(false);  // Close the modal
    }

    // Handle cancellation of logout (No)
    function handleCloseModal() {
        setShowModal(false);  // Close the modal
    }
    return(
        <>
        {/* Logout Button */}
        <li style={{listStyle:"none"}} title="Logout" className="site-button" onClick={onLogout}>
            <i className="fa fa-lock"></i> Logout 
        </li>

        {/* Show the modal when 'showModal' is true */}
        {showModal && (
            <LogoutModal
                onConfirm={handleConfirmLogout}
                onClose={handleCloseModal}
                text={"Are you sure you want to logout?"}
            />
        )}
    </>
    )
} 
const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(LogoutPage));