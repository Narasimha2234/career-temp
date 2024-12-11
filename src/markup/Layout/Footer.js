import React from 'react';

function Footer(){
	return(
		<footer className="site-footer">
			<div className="footer-top">
				<div className="container">
					<div className="row">
						<div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
							<div className="widget">
								<img src={require("./../../images/orchasp_logo.png")} width="180" className="m-b15" alt=""/>
								<p className="text-capitalize m-b20">CIN: L72200TG1994PLC017485 </p>
								{/* <ul className="list-inline m-a0">
									<li className="site-button white twitter circle mr-2"><i className="fa fa-facebook"></i></li>
									<li className="site-button white twitter circle mr-2"><i className="fa fa-google-plus"></i></li>
									<li className="site-button white twitter circle mr-2"><i className="fa fa-linkedin"></i></li>
									<li className="site-button white twitter circle mr-2"><i className="fa fa-instagram"></i></li>
									<li className="site-button white twitter circle mr-2"><i className="fa fa-twitter"></i></li>
								</ul> */}
							</div>
						</div>
						<div className="col-xl-5 col-lg-5 col-md-8 col-sm-8 col-12">
							<div className="widget border-0">
								<h5 className="m-b30 text-white">Contact Us</h5>
								<ul className="" >
									<li>19 & 20, Moti Valley,</li>
									<li style={{marginTop:"5px"}}>Trimulgherry, Secunderabad - 500 015,</li>
									<li style={{marginTop:"5px"}}>Telangana, INDIA.</li>
									<li style={{marginTop:"5px"}}>E: info@orchasp.com</li>
									<li style={{marginTop:"5px"}}>Tel:+91-40-4776 6123 / 124</li>
									<li style={{marginTop:"5px"}}>Fax: +91-40-4776 6143</li>
								</ul>
							</div>
												</div>
						{/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-12">
							<div className="widget border-0">
								<h5 className="m-b30 text-white">Find Jobs</h5>
								<ul className="list-2 w10 list-line">
									<li><Link to={''}>US Jobs</Link></li>
									<li><Link to={''}>Canada Jobs</Link></li>
									<li><Link to={''}>UK Jobs</Link></li>
									<li><Link to={''}>Emplois en Fnce</Link></li>
									<li><Link to={''}>Jobs in Deuts</Link></li>
									<li><Link to={''}>Vacatures China</Link></li>
								</ul>
							</div>
						</div> */}
					</div>
				</div>
			</div>
			
			<div className="footer-bottom">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<span> © Copyright by 
							<span >Orchasp Limited </span> All rights reserved.</span> 
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer;