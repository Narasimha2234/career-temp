import React, { useEffect, useState } from 'react';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import Profilesidebar from './../Element/Profilesidebar';
import { useSelector } from 'react-redux';
import { getCandidateById, saveProfile, updateProfile } from '../../services/AxiosInstance';
import { useSnackbar } from 'notistack';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL=process.env.REACT_APP_BASE_RESOURSE_URL

function Jobprofile(){
	const {enqueueSnackbar}=useSnackbar()
	const user=useSelector(state=>state.auth)
	const [profileId,setProfileId]=useState("")
	const [resumeName, setResumeName] = useState("");
	const[resumeError,setResumeError]=useState("")
	const [errors, setErrors] = useState({});
	const [view,setView]=useState(false)
	const[viewResume,setViewResume]=useState()

	const validationRules = {
		firstName: {
		  pattern:  /^[A-Za-z][A-Za-z\s]{0,49}$/,
		  errorMessage: "First name should only contain letters and spaces",
		},
		lastName: {
		  pattern: /^[A-Za-z][A-Za-z\s]{0,49}$/,
		  errorMessage: "Last name should only contain letters and spaces",
		},
		address: {
		  pattern: /^[^\s][\w\s,.-]{4,99}$/,
		  errorMessage: "Address should be between 5 to 100 characters",
		},
		adhaarNo: {
		  pattern: /^\d{12}$/,
		  errorMessage: "Aadhaar number should be exactly 12 digits.",
		},
		panNo: {
		  pattern: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
		  errorMessage: "PAN number should be in a valid format, e.g., ABCDE1234F.",
		},
		passportNo: {
		  pattern: /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/,
		  errorMessage: "Passport number should be a valid format, e.g., A1234567.",
		},
		qualification: {
		  pattern: /^(?![ .])[A-Za-z0-9_\-\@\$\!\%\*\?\&#.\s]{1,20}(?:\s?[-to]\s?[A-Za-z0-9_\-\@\$\!\%\*\?\&#.\s]{1,20})?$/,
		  errorMessage: "Qualification should only contain letters, spaces, and valid symbols (,.-), .",
		},
		skills: {
		  pattern: /^[A-Za-z][A-Za-z\s,.-]{10,99}$/,
		  errorMessage: "Skills should be a comma-separated list, min 10 characters.",
		},
		collegeName: {
		  pattern: /^(?=.*[A-Za-z])[A-Za-z0-9\s,.-]{1,100}$/,
		  errorMessage: "College name should only contain letters,numbers spaces, and valid symbols ( ,  .   - ), max 100 characters.",
		},
		email: {
		  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		  errorMessage: "Email should be in a valid format, e.g., example@domain.com.",
		},
		mobile: {
		  pattern: /^[6-9]\d{9}$/,
		  errorMessage: "Mobile number should be a valid 10-digit Indian number.",
		},
	  };
	const validateField = (name, value) => {
		const rule = validationRules[name];
		if (rule && !rule.pattern.test(String(value))) { 
		  setErrors((prevErrors) => ({
			...prevErrors,
			[name]: rule.errorMessage,
		  }));
		  return false;
		} else {
		  setErrors((prevErrors) => {
			const { [name]: _, ...rest } = prevErrors; 
			return rest;
		  });
		  return true;
		}
	  };

	const validateAllFields = () => {
		let isValid = true;
		const newErrors = {};
	  
		Object.entries(formData).forEach(([key, value]) => {
		 
		  const rule = validationRules[key];
		  if (rule && !rule.pattern.test(String(value))) {
			
			isValid = false;
			newErrors[key] = rule.errorMessage;
		  }
		});
	  
		setErrors(newErrors);
		return isValid;
	  };
	  
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		address: '',
		dob: '',
		adhaarNo: 0,
		panNo: '',
		passportNo: '',
		qualification: '',
		skills: '',
		yop: '',
		experience: '',
		collegeName: '',
		resume: null,
		email: '',
		mobile: '',
		userId:user?.auth?.localId
	  });
	  useEffect(() => {
		const email=localStorage.getItem("email")
		const mobile=localStorage.getItem("mobile")
		setFormData({
			...formData,
			mobile:mobile,
			email:email
		})
		if (user?.auth?.localId) {
		  getCandidateById(user.auth.localId)
			.then((res) => {	
				console.log(res);
				
			  if (res?.id) {
				localStorage.setItem("candidateId",res?.id)
				setProfileId(res.id);
				setFormData({
				  firstName: res?.firstName || "",
				  lastName: res?.lastName || "",
				  address: res?.address || "",
				  dob: res?.dob || "",
				  adhaarNo: res?.adhaarNo || 0,
				  panNo: res?.panNo || "",
				  passportNo: res?.passportNo || "",
				  qualification: res?.qualification || "",
				  skills: res?.skills || "",
				  yop: res?.yop || "",
				  experience: res?.experience || "",
				  collegeName: res?.collegeName || "",
				  resume: res?.resume || null,
				  email: res?.user?.email || "",
				  mobile: res?.user?.mobile || "",
				  userId: user?.auth?.localId,
				});
			  }

			  if (res?.resume) {
				setResumeName(res.resume || "Existing Resume");
				
			 }
			})
			.catch((err) => console.error(err));
		}
	  }, [user]);
	  const handleChange = (e) => {
		let { name, value } = e.target;
		const formattedValue = name === "panNo" || name === "passportNo" ? value.toUpperCase() : value;
		validateField(name, formattedValue);
		setFormData({
		  ...formData,
		  
		  [name]: formattedValue,
		});
	  };
	  const handleFileChange = (e) => {
		
		const file = e.target.files[0];
		
		const maxSizeInBytes = 3 * 1024 * 1024; 
		if(file?.type!=="application/pdf"){
			enqueueSnackbar("Please Select Pdf files Only",{variant:"error"})
			return ;
		}

		if (file) {
			if (file.size > maxSizeInBytes) {
			  setResumeError("File size must be less than or equal to 3MB.");
			  setFormData((prevFormData) => ({
				...prevFormData,
				resume: null,
			  }));
			  setResumeName("")
			} else {
			  setResumeError(""); 
			  setFormData((prevFormData) => ({
				...prevFormData,
				resume: file,
			  }));
			  setViewResume(URL.createObjectURL(file));
			  setResumeName(file.name);
			}
		  }
	  };
	  
	  const handleSubmit=(e)=>{
		e.preventDefault();
			if (!validateAllFields()) {
				enqueueSnackbar("Please fix the field errors before submitting.", { variant: "error" });
				return;
			}
			console.log("Submitting form data...", formData);
			const submitData = new FormData();
			Object.keys(formData).forEach((key) => {
				submitData.append(key, formData[key]);
			});
			if (profileId === "") {
				saveProfile(submitData)
					.then((res) => enqueueSnackbar("Profile saved successfully", { variant: "success" }))
					.catch((err) => enqueueSnackbar("Failed to save profile", { variant: "error" }));
			} else {
				updateProfile(profileId, submitData)
					.then((res) => enqueueSnackbar("Profile updated successfully", { variant: "success" }))
					.catch((err) => enqueueSnackbar("Failed to update profile", { variant: "error" }));
			}
	  }

	  const handleViewResume=async()=>{
		setView(true)
		if(!viewResume){
			 setViewResume(`${BASE_URL}/files/get/${resumeName}`)	 
		}
	
	  }
 
	  const handleCloseResume=()=>{
		setView(false)
		if (viewResume) {
			URL.revokeObjectURL(viewResume); 
		  }
	  }
	  console.log(viewResume);
	  
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
											<h5 className="font-weight-700 pull-left text-uppercase">Candidate Profile</h5>
											{/* <Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link> */}
										</div>
										<form onSubmit={handleSubmit}>
											<div className="row m-b30">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>First Name:</label>
														<input type="text" value={formData.firstName} className="form-control" name='firstName' placeholder="first name" onChange={handleChange}/> 
														{errors.firstName && <p style={{ color: "red", fontSize: "12px" }}>{errors.firstName}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Last Name:</label>
														<input type="text" value={formData.lastName} className="form-control" name='lastName' placeholder="last name" onChange={handleChange}/>
														{errors.lastName && <p style={{ color: "red", fontSize: "12px" }}>{errors.lastName}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Email:</label>
														<input type="email" value={formData.email} name='email' className="form-control" placeholder="email" onChange={handleChange}/>
														{errors.email && <p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Phone No:</label>
														<input type="number" value={formData.mobile} name='mobile' className="form-control" placeholder="mobile number" onChange={handleChange}/>
														{errors.mobile && <p style={{ color: "red", fontSize: "12px" }}>{errors.mobile}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>College Name:</label>
														<input type="text" value={formData.collegeName}  className="form-control" name='collegeName' placeholder="college name" onChange={handleChange}/>
														{errors.collegeName && <p style={{ color: "red", fontSize: "12px" }}>{errors.collegeName}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Qualification:</label>
														<input type="text" value={formData.qualification}  name='qualification' className="form-control" placeholder="qualifications" onChange={handleChange}/>
														{errors.qualification && <p style={{ color: "red", fontSize: "12px" }}>{errors.qualification}</p>}
													</div>
												</div>
												
											</div>										
											<div className="row">
												<div className="col-lg-6 col-md-6">
												<div className="form-group">
														<label>YOP</label>
														<Form.Control as="select" custom className="form-control" style={{height:"50px"}} name='yop' value={formData.yop} onChange={handleChange}>
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
														<label>Experience</label>
														<Form.Control as="select" custom className="form-control" style={{height:"50px"}} name='experience' value={formData.experience} onChange={handleChange}>
															<option>fresher	</option>
															<option>1 Years</option>
															<option>2 Years</option>
															<option>3 Years</option>
															<option>4 Years</option>
															<option>5 Years</option>
														</Form.Control>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>DOB:</label>
														<input type="date" value={formData.dob}  name='dob' className="form-control" placeholder="date of birth" onChange={handleChange}/>
														{errors.dob && <p style={{ color: "red", fontSize: "12px" }}>{errors.dob}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Adhar Number:</label>
														<input type="text" value={formData.adhaarNo === 0 ? "" : formData.adhaarNo}  name='adhaarNo' className="form-control" placeholder="adhar number" onChange={handleChange}/>
														{errors.adhaarNo && <p style={{ color: "red", fontSize: "12px" }}>{errors.adhaarNo}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>PAN Number:</label>
														<input type="text" value={formData.panNo}  className="form-control" name='panNo' placeholder="pan number" onChange={handleChange}/>
														{errors.panNo && <p style={{ color: "red", fontSize: "12px" }}>{errors.panNo}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Passport Number:</label>
														<input type="text" value={formData.passportNo}  name='passportNo' className="form-control" placeholder="passport number" onChange={handleChange}/>
														{errors.passportNo && <p style={{ color: "red", fontSize: "12px" }}>{errors.passportNo}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-12">
													<div className="form-group">
														<label>Skills: <span style={{color:"GrayText"}}>( Seperate Skills with Comma )</span></label>
														<textarea   name='skills' value={formData.skills}  className="form-control" placeholder='your skills' onChange={handleChange}>
														</textarea>
														{errors.skills && <p style={{ color: "red", fontSize: "12px" }}>{errors.skills}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-12">
													<div className="form-group">
														<label>Full Address:</label>
														<textarea name='address' value={formData.address}  className="form-control" placeholder='address' onChange={handleChange}>
														</textarea>
														{errors.address && <p style={{ color: "red", fontSize: "12px" }}>{errors.address}</p>}
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
																	<input type="file" name='resume' className="site-button form-control" id="customFile" onChange={handleFileChange}/>
																</div>
																<div style={{display:"flex",justifyContent:"space-between"}}>
																	<p>
																	{resumeName && !resumeError &&(
																		<p className="mt-2">Selected Resume: <strong>{resumeName.includes("_")?resumeName.split("_")[1]:resumeName}</strong></p>
																	)}
																	{!resumeName && !resumeError &&(
																		<p style={{color:"GrayText"}}>Please Upload Your Latest Resume</p>
																	)}
																	{resumeError &&  (
																		<p style={{color:"red"}}>{resumeError}</p>
																	)}
																	</p>
																	<p>
																	{resumeName && !resumeError &&(
																		<p className="mt-2 text-primary " style={{cursor:"pointer"}} onClick={handleViewResume}>View Resume <i className='fa fa-eye'/></p>
																	)}
																	</p>
																	
																</div>
															</div>
														</div>
													</div>
											</div>
											</div>
											<button className="site-button m-b30"> {profileId===""?"Save":"Update"}</button>
										</form>
										
									</div>    
								</div>
								
							</div>							
						</div>					
					</div>
				</div>
			</div>
			<Footer />	
			{view && (
						<div
						style={{
						  position: "fixed",
						  top: "50%",
						  left: "50%",
						  transform: "translate(-50%, -50%)",
						  backgroundColor: "whitesmoke",
						  zIndex: 1000,
						  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
						  borderRadius: "8px",
						  width: "80%",
						  maxWidth: "600px",
						  padding: "20px",
						}}
					  >
						<div
						  style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "10px",
						  }}
						>
						  <h5 style={{ margin: 0 }}>Resume Preview</h5>
						  <span
							onClick={handleCloseResume}
							style={{
							  cursor: "pointer",
							  fontSize: "18px",
							  fontWeight: "bold",
							  color: "red",
							}}
						  >
							×
						  </span>
						</div>
						<iframe
						  src={viewResume}
						  title="Preview Resume"
						  style={{
							width: "100%",
							height: "600px",
							border: "none",
						  }}
						/>
					  </div>
			)}
		</>
	)
} 
export default Jobprofile;