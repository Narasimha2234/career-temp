import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Logout from './Logout';




class Header2 extends Component{
	 isLoggedIn=localStorage.getItem("isLoggedIn")
	  role=localStorage.getItem("role")
	 state = {
		// initial state
		show: false,
	 }

	handleClose = () => {
		this.setState({ show: false });
	};
	handleShow = () => {
		this.setState({ show: true });
	};
	componentDidMount() {
        // sidebar open/close
		
        var Navicon = document.querySelector('.navicon');
        var sidebarmenu = document.querySelector('.myNavbar ');

        function toggleFunc() {
            sidebarmenu.classList.toggle('show');
         //   Navicon.classList.toggle('open');
        }
        Navicon.addEventListener('click', toggleFunc);

        // Sidenav li open close
        var navUl = [].slice.call(document.querySelectorAll('.navbar-nav > li > a, .sub-menu > li > a'));
        for (var y = 0; y < navUl.length; y++) {
            navUl[y].addEventListener('click', function () { checkLi(this) });
        }
		
        function checkLi(current) {
            current.parentElement.parentElement.querySelectorAll( "li" ).forEach( el =>
				(current.parentElement !== el) ? el.classList.remove('open') : ''
			);
			setTimeout(() => {
				current.parentElement.classList.toggle('open');
			}, 100);			
        }
	}	
	render(){
		return(
			<>
			<header className="site-header mo-left header border-bottom fullwidth">
				
				<div className="sticky-header main-bar-wraper navbar-expand-lg">
					<div className="main-bar clearfix">
						<div className="container clearfix">
							
							<div className="logo-header mostion">
								<Link to={"./"}><img src={require('./../../images/orchasp_logo.png')} style={{height:"90px"}} alt="" /></Link>
							</div>
							
							<button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
								<span></span>
								<span></span>
								<span></span>
							</button>
							
							{!this.isLoggedIn &&(
								<div className="extra-nav">
								<div className="extra-cell">
									<Link to={"/register-2"} className="site-button"><i className="fa fa-user"></i> Sign Up</Link>
										{/* <Link to={'#'} title="READ MORE" onClick={this.handleShow} className="site-button"><i className="fa fa-lock"></i> login </Link> */}
										{/* <Logout / > */}
								</div>
							</div>
							)}
							{this.isLoggedIn &&(
								<div className="extra-nav">
								<div className="extra-cell">
									{/* <Link to={"/register-2"} className="site-button"><i className="fa fa-user"></i> Sign Up</Link> */}
										{/* <Link to={'#'} title="READ MORE" onClick={this.handleShow} className="site-button"><i className="fa fa-lock"></i> login </Link> */}
										<Logout / >
								</div>
							</div>
							)}
							
							<div className="header-nav navbar-collapse collapse myNavbar justify-content-start" id="navbarNavDropdown">
								<ul className="nav navbar-nav">
									<li >
										<Link to={`${this.role==="ROLE_USER"?"/jobs-profile":"/company-post-jobs"}`}>Home </Link>
										
									</li>
									{/* {this.role==="ROLE_USER" &&(
										<li >
										<Link to={"/jobs-profile"}> Profile </Link>
										
									</li>
									)}
									{this.role==="ROLE_ADMIN"&&(
										<li >
										<Link to={"/company-post-jobs"}>Admin </Link>
										
									</li>
									)} */}
									
									
								</ul>			
							</div>
						</div>
					</div>
				</div>				
			</header>
			</>
		)
	}
}

export default Header2;