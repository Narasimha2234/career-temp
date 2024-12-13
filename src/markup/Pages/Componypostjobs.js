import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import {Form}  from 'react-bootstrap';         
import { postJob } from '../../services/AxiosInstance';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/AuthActions';
import { useSnackbar } from 'notistack';

function Componypostjobs(){
	const {enqueueSnackbar}=useSnackbar()
	const location=useLocation()
	const[path,setPath]=useState("")
	const [errors, setErrors] = useState({});
	const dispatch=useDispatch()
	const history=useHistory()
	const handleLogout=()=>{
	  dispatch(logout(history))
  }
	useEffect(()=>{
		setPath(location.pathname)
	},[location.pathname])
	
	const [formData, setFormData] = useState({
		jobId: '',
		jobName: '',
		jobRole: '',
		jobType: 'Office',
		experience: 'Fresher',
		noOfOpenings: '',
		salary: '',
		educationalQualification: '',
		yop: '2024',
		jobLocation: '',
		skillSet: '',
		jobRequirements: '',
		description: '',
	  });
	  const validationRules = {
		jobId: {
		  pattern: /^[A-Za-z0-9_\-\@\$\!\%\*\?\&#]{1,20}$/,
		  errorMessage: "Job ID should be alphanumeric",
		},
		jobName: {
		  pattern: /^[A-Za-z][A-Za-z\s]{2,49}$/,
		  errorMessage: "Job name should contain letters",
		},
		jobRole: {
		  pattern: /^[A-Za-z][A-Za-z\s]{2,49}$/,
		  errorMessage: "Job role should contain letters",
		},
		noOfOpenings: {
		  pattern: /^[1-9][0-9]*$/,
		  errorMessage: "Number of openings must be a positive integer.",
		},
		salary: {
		  pattern:/^(?! )[A-Za-z0-9_\-\@\$\!\%\*\?\&#\s]{1,20}(?:\s?[-to]\s?[A-Za-z0-9_\-\@\$\!\%\*\?\&#\s]{1,20})?$/,
		  errorMessage: "Salary must be a valid number, optionally with up to two decimal places.",
		},
		educationalQualification: {
		  pattern:/^(?![ .])[A-Za-z0-9_\-\@\$\!\%\*\?\&#.\s]{1,20}(?:\s?[-to]\s?[A-Za-z0-9_\-\@\$\!\%\*\?\&#.\s]{1,20})?$/,
		  errorMessage: "Enter valid format",
		},
		yop: {
		  pattern:  /^\d{4}$/,
		  errorMessage: "Year of passing must be a valid 4-digit year.",
		},
		jobLocation: {
		  pattern: /^[A-Za-z][A-Za-z\s,.-]{2,99}$/,
		  errorMessage: "Job location should contain letters",
		},
		skillSet: {
		  pattern: /^[A-Za-z][A-Za-z\s,.-]{10,199}$/,
		  errorMessage: "Skill set should be a comma-separated list of skills, min 10 characters.",
		},
		jobRequirements: {
		  pattern: /^[A-Za-z0-9][A-Za-z0-9\s,.-]{9,499}$/,
		  errorMessage: "Job requirements should be detailed, between 10 and 500 characters.",
		},
		description: {
		  pattern: /^[A-Za-z0-9][A-Za-z0-9\s,.-]{9,999}$/,
		  errorMessage: "Description should be detailed, between 10 and 1000 characters.",
		},
	  };
	//   const validateField = (name, value) => {
	// 	const rule = validationRules[name];
	// 	if (rule && !rule.pattern.test(value)) {
	// 	  setErrors((prev) => ({ ...prev, [name]: rule.errorMessage }));
	// 	} else {
	// 	  setErrors((prev) => {
	// 		const { [name]: _, ...rest } = prev;
	// 		return rest;
	// 	  });
	// 	}
	//   };
	const validateField = (name, value) => {
		const rule = validationRules[name];
		if (rule && !rule.pattern.test(value)) {
		  setErrors((prev) => ({ ...prev, [name]: rule.errorMessage }));
		  return false;
		} else {
		  setErrors((prev) => {
			const { [name]: _, ...rest } = prev;
			return rest;
		  });
		  return true;
		}
	  };
	//   const validateAllFields = () => {
	// 	let isValid = true;
	// 	Object.entries(formData).forEach(([key, value]) => {
	// 	  if (!validateField(key, value)) {
	// 		isValid = false;
	// 	  }
	// 	});
	// 	return isValid;
	//   };
	const validateAllFields = () => {
		let isValid = true;
		Object.entries(formData).forEach(([key, value]) => {
		  if (!validateField(key, value)) {
			isValid = false;
		  }
		});
		return isValid;
	  };
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
		  ...prev,
		  [name]: value,
		}));
		validateField(name, value);
	  };
	const handleSubmit=async(e)=>{
		e.preventDefault();
		if (!validateAllFields()) {
			enqueueSnackbar("Please fix the Field errors before submitting.", { variant: "error" });
			return;
		  }
		postJob(formData)
		.then(res=>{history.push("/company-manage-job") 
			enqueueSnackbar("Job Posted ",{variant:"success"})
		})
		.catch(err=>enqueueSnackbar("Failed to Post Job Retry",{variant:"error"}))
	}
	return(
		<>
			<Header2 />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white p-t50 p-b20">
						<div className="container">
							<div className="row">
								<div className="col-xl-3 col-lg-4 m-b30">
									<div className="sticky-top">
										<div className="candidate-info company-info">
											<div className="candidate-detail text-center">
												<div className="canditate-des">
													<Link to={"#"}>
														<img alt="" src={require("./../../images/orchasp_logo.png")} />
													</Link>
							
												</div>
												<div className="candidate-title">
													<h4 className="m-b5"><Link to={"#"}>Orchasp Ltd</Link></h4>
												</div>
											</div>
											<ul>
												{/* <li><Link to={"/company-profile"}>
													<i className="fa fa-user-o" aria-hidden="true"></i> 
													<span>Company Profile</span></Link></li> */}
												<li><Link to={"/company-post-jobs"} className={path==="/company-resume"?"active":""}>
													<i className="fa fa-file-text-o" aria-hidden="true"></i> 
													<span>Post A Job</span></Link></li>
												{/* <li><Link to={"/company-transactions"}>
													<i className="fa fa-random" aria-hidden="true"></i>
													<span>Transactions</span></Link></li> */}
												<li><Link to={"/company-manage-job"} className={path==="/company-resume"?"active":""}>
													<i className="fa fa-briefcase" aria-hidden="true"></i> 
													<span>Manage jobs</span></Link></li>
												<li><Link to={"/company-resume"} className={path==="/company-resume"?"active":""}>
													<i className="fa fa-id-card-o" aria-hidden="true"></i>
													<span>Applications Received</span></Link></li>
												{/* <li><Link to={"/jobs-change-password"}>
													<i className="fa fa-key" aria-hidden="true"></i> 
													<span>Change Password</span></Link></li> */}
												<li onClick={handleLogout}><Link to={"./"}>
													<i className="fa fa-sign-out" aria-hidden="true"></i> 
													<span>Log Out</span></Link></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-xl-9 col-lg-8 m-b30">
									<div className="job-bx submit-resume">
										<div className="job-bx-title clearfix">
											<h5 className="font-weight-700 pull-left text-uppercase">Post A Job</h5>
											{/* <Link to={"/company-profile"} className="site-button right-arrow button-sm float-right">Back</Link> */}
										</div>
										<form onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Job ID</label>
														<input type="text" className="form-control" placeholder="Enter Job Id" name='jobId' value={formData.jobId} onChange={handleChange}/>
														{errors.jobId && <span style={{ color: "red" }}>{errors.jobId}</span>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Job Name</label>
														<input type="text" className="form-control" placeholder="Enter Job Name" name='jobName' value={formData.jobName} onChange={handleChange}/>
														{errors.jobName && <span style={{ color: "red" }}>{errors.jobName}</span>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Job Role</label>
														<input type="text" placeholder='Enter Job Role' className="form-control tags_input" name='jobRole' value={formData.jobRole} onChange={handleChange}/>
														{errors.jobRole && <span style={{ color: "red" }}>{errors.jobRole}</span>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Job Type</label>
														<Form.Control as="select" custom className="custom-select" name='jobType' value={formData.jobType} onChange={handleChange}>
															<option>Office</option>
															<option>Remote</option>
															<option>Hybrid</option>	
														</Form.Control>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Experience</label>
														<Form.Control as="select" custom className="custom-select" name='experience' value={formData.experience} onChange={handleChange}>
															<option>fresher	</option>
															<option>1 Year</option>
															<option>2 Years</option>
															<option>3 Years</option>
															<option>4 Years</option>
															<option>5 Years</option>
														</Form.Control>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Number Of Openings</label>
														<input type="tel" className="form-control" placeholder="Enter Number Of Openings for This Job" name='noOfOpenings' value={formData.noOfOpenings} onChange={handleChange}/>
														{errors.noOfOpenings && <span style={{ color: "red" }}>{errors.noOfOpenings}</span>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Salary</label>
														<input type="text" className="form-control" placeholder="Enter Salary" name='salary' value={formData.salary} onChange={handleChange}/>
														{errors.salary && <span style={{ color: "red" }}>{errors.salary}</span>}
													</div>
												</div>
												
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Qualification</label>
														<input type="text" className="form-control" placeholder='Enter Qualifications Required' name='educationalQualification' value={formData.educationalQualification} onChange={handleChange} />
														{errors.educationalQualification && <span style={{ color: "red" }}>{errors.educationalQualification}</span>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
												<div className="form-group">
														<label>YOP</label>
														<Form.Control as="select" custom className="form-control" style={{height:"49px"}} name='yop' value={formData.yop } onChange={handleChange}>
														<option>2026</option>
														<option>2025</option>
															<option>2024</option>
															<option>2023</option>
															<option>2022</option>
															<option>2021</option>
															<option>2020</option>
															<option>2019</option>
															<option>2018</option>
															<option>2017</option>
															<option>2016</option>
															<option>2015</option>
															<option>2014</option>
															<option>2013</option>
															<option>2012</option>
															<option>2011</option>
															<option>2010</option>
														</Form.Control>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Job Location</label>
														<input type="text" className="form-control" name='jobLocation' placeholder="Enter Job Location" value={formData.jobLocation} onChange={handleChange}/>
														{errors.jobLocation && <span style={{ color: "red" }}>{errors.jobLocation}</span>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Skill Set: <span style={{color:"GrayText"}}>( Seperate Skills with Comma )</span></label>
														<textarea  className="form-control form-row" placeholder='Enter Required Skills' name='skillSet' value={formData.skillSet} onChange={handleChange}>
														</textarea>
														{errors.skillSet && <span style={{ color: "red" }}>{errors.skillSet}</span>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Requirements:<span style={{color:"GrayText"}}>(Seperate Requirements with Comma)</span></label>
														<textarea placeholder='Enter Job Requirements' className="form-control form-row" name='jobRequirements' value={formData.jobRequirements} onChange={handleChange}>
														</textarea>
														{errors.jobRequirements && <span style={{ color: "red" }}>{errors.jobRequirements}</span>}
													</div>
												</div>
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Description:</label>
														<textarea  className="form-control" placeholder='Enter Job Description' name='description' value={formData.description} onChange={handleChange}>
														</textarea>
														{errors.description && <span style={{ color: "red" }}>{errors.description}</span>}
													</div>
												</div>	
											</div>
											<button type="submit" className="site-button m-b30">Post</button>
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
export default Componypostjobs;