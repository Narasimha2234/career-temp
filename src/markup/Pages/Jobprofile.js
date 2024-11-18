import React from 'react';
import {Link} from 'react-router-dom';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import Profilesidebar from './../Element/Profilesidebar';
 
function Jobprofile(){
	return(
		<>	
			<Header2 />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white browse-job p-t50 p-b20">
						<div className="container">
							<div className="row">
								<Profilesidebar /> 
								<div className="col-xl-9 col-lg-8 m-b30">
									<div className="job-bx job-profile">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5>
											<Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link>
										</div>
										<form>
											<div className="row m-b30">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>First Name:</label>
														<input type="text" className="form-control" placeholder="Alexander Weir" /> 
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Last Name:</label>
														<input type="text" className="form-control" placeholder="Web Designer" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Email:</label>
														<input type="email" className="form-control" placeholder="English" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Phone No:</label>
														<input type="text" className="form-control" placeholder="32 Year" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>College Name:</label>
														<input type="text" className="form-control" placeholder="2000$" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Qualification:</label>
														<input type="text" className="form-control" placeholder="2500$" />
													</div>
												</div>
												
											</div>										
											<div className="row">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>YOP:</label>
														<input type="text" className="form-control" placeholder="+1 123 456 7890" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Experience:</label>
														<input type="text" className="form-control" placeholder="Country Name" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>DOB:</label>
														<input type="text" className="form-control" placeholder="112233" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Adhar Number:</label>
														<input type="text" className="form-control" placeholder="London" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>PAN Number:</label>
														<input type="text" className="form-control" placeholder="New york City" />
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Passport Number:</label>
														<input type="text" className="form-control" placeholder="New york City" />
													</div>
												</div>
												<div className="col-lg-6 col-md-12">
													<div className="form-group">
														<label>Skills:</label>
														<textarea  className="form-control">
														</textarea>
													</div>
												</div>
												<div className="col-lg-6 col-md-12">
													<div className="form-group">
														<label>Full Address:</label>
														<textarea  className="form-control">
														</textarea>
													</div>
												</div>
												
												<div id="attach_resume_bx" className="job-bx bg-white m-b30">
												<h5 className="m-b10">Attach Resume</h5>
												<p>Resume is the most important document recruiters look for. Recruiters generally do not look at profiles without resumes.</p>												
													<div className="row">
														<div className="col-lg-12 col-md-12">
															<div className="form-group">
																<div className="custom-file">
																	<p className="m-auto align-self-center">
																	<i className="fa fa-upload"></i>
																	Upload Resume File size is 3 MB
																	</p>
																	<input type="file" className="site-button form-control" id="customFile" />
																</div>
															</div>
														</div>
													</div>
											</div>
											</div>
											<button className="site-button m-b30">Save Setting</button>
										</form>
									</div>    
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />	
		</>
	)
} 
export default Jobprofile;