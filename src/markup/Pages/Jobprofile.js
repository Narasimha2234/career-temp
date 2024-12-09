import React, { useEffect, useState } from 'react';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import Profilesidebar from './../Element/Profilesidebar';
import { useSelector } from 'react-redux';
import { getCandidateById, saveProfile, updateProfile } from '../../services/AxiosInstance';
import { useSnackbar } from 'notistack';

function Jobprofile(){
	const {enqueueSnackbar}=useSnackbar()
	const user=useSelector(state=>state.auth)
	const [profileId,setProfileId]=useState("")
	const [resumeName, setResumeName] = useState("");
	const [errors, setErrors] = useState({});

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
		  pattern: /^[A-Za-z][A-Za-z\s,.-]{1,49}$/,
		  errorMessage: "Qualification should only contain letters, spaces, and valid symbols (,.-), max 50 characters.",
		},
		skills: {
		  pattern: /^[A-Za-z][A-Za-z\s,.-]{1,99}$/,
		  errorMessage: "Skills should be a comma-separated list, max 100 characters.",
		},
		yop: {
		  pattern: /^\d{4}$/,
		  errorMessage: "Year of passing should be a valid 4-digit year.",
		},
		experience: {
		  pattern: /^([0-9]|[1-9][0-9])$/,
		  errorMessage: "Experience should be a number between 0 and 99.",
		},
		collegeName: {
		  pattern: /^[A-Za-z][A-Za-z\s,.-]{1,99}$/,
		  errorMessage: "College name should only contain letters, spaces, and valid symbols (,.-), max 100 characters.",
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
		if (rule && !rule.pattern.test(value)) {
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
		Object.entries(formData).forEach(([key, value]) => {
		  if (!validateField(key, value)) {
			isValid = false;
		  }
		});
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
		const { name, value } = e.target;
		validateField(name, value);
		setFormData({
		  ...formData,
		  
		  [name]: value,
		});
		console.log(formData);
	  };
	  const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData((prevFormData) => ({
		  ...prevFormData,
		  resume: file,
		}));
		setResumeName(file.name);
	  };
	   
	  const handleSubmit=(e)=>{
		e.preventDefault()

		if (!validateAllFields()) {
			enqueueSnackbar("Please fix the Field errors before submitting.", { variant: "error" });
			return;
		  }

		const submitData = new FormData();
		Object.keys(formData).forEach((key) => {
		  if (key ==="resume") {
			submitData.append(key, formData[key]); 
		  } else {
			submitData.append(key, formData[key]); 
		  }
		});
		if(profileId===""){
		saveProfile(submitData)
		.then(res=>enqueueSnackbar("profile saved successfully",{variant:"success"}))
		.catch(err=>console.log(err))
		}else{
			updateProfile(profileId,submitData)
			.then(res=>enqueueSnackbar("profile Updated successfully",{variant:"success"}))
			.catch(err=>enqueueSnackbar("failed to Update profile",{variant:"error"}))
		}
		// window.location.reload()
	  }
	
	  
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
														<input type="text" value={formData.qualification}  name='qualification' className="form-control" placeholder="qualications" onChange={handleChange}/>
														{errors.qualification && <p style={{ color: "red", fontSize: "12px" }}>{errors.qualification}</p>}
													</div>
												</div>
												
											</div>										
											<div className="row">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>YOP:</label>
														<input type="text" value={formData.yop}  name='yop' className="form-control" placeholder="pass out year" onChange={handleChange}/>
														{errors.yop && <p style={{ color: "red", fontSize: "12px" }}>{errors.yop}</p>}
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Experience:</label>
														<input type="text" value={formData.experience}  name='experience' className="form-control" placeholder="experience" onChange={handleChange}/>
														{errors.experience && <p style={{ color: "red", fontSize: "12px" }}>{errors.experience}</p>}
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
														<input type="text" value={formData.adhaarNo === 0 ? "" : formData.adhaarNo}  name='adhaarNo' className="form-control" placeholder="adhaar number" onChange={handleChange}/>
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
														<label>Skills:</label>
														<textarea  name='skills' value={formData.skills}  className="form-control" placeholder='your skills' onChange={handleChange}>
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
																{resumeName && (
                                                                    <p className="mt-2">Selected Resume: <strong>{resumeName.split("_")[1]}</strong></p>
                                                                )}
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
		</>
	)
} 
export default Jobprofile;