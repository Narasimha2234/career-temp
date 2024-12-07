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
			})
			.catch((err) => console.error(err));
		}
	  }, [user]);


	  
	  const handleChange = (e) => {
		const { name, value } = e.target;
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
	  };
	   
	  const handleSubmit=(e)=>{
		e.preventDefault()
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
											<h5 className="font-weight-700 pull-left text-uppercase">Basic Information</h5>
											{/* <Link to={"./"} className="site-button right-arrow button-sm float-right">Back</Link> */}
										</div>
										<form onSubmit={handleSubmit}>
											<div className="row m-b30">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>First Name:</label>
														<input type="text" value={formData.firstName} className="form-control" name='firstName' placeholder="first name" onChange={handleChange}/> 
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Last Name:</label>
														<input type="text" value={formData.lastName} className="form-control" name='lastName' placeholder="last name" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Email:</label>
														<input type="email" value={formData.email} name='email' className="form-control" placeholder="email" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Phone No:</label>
														<input type="number" value={formData.mobile} name='mobile' className="form-control" placeholder="mobile number" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>College Name:</label>
														<input type="text" value={formData.collegeName}  className="form-control" name='collegeName' placeholder="college name" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Qualification:</label>
														<input type="text" value={formData.qualification}  name='qualification' className="form-control" placeholder="qualications" onChange={handleChange}/>
													</div>
												</div>
												
											</div>										
											<div className="row">
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>YOP:</label>
														<input type="text" value={formData.yop}  name='yop' className="form-control" placeholder="pass out year" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Experience:</label>
														<input type="text" value={formData.experience}  name='experience' className="form-control" placeholder="experience" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>DOB:</label>
														<input type="date" value={formData.dob}  name='dob' className="form-control" placeholder="date of birth" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Adhar Number:</label>
														<input type="text" value={formData.adhaarNo === 0 ? "" : formData.adhaarNo}  name='adhaarNo' className="form-control" placeholder="adhaar number" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>PAN Number:</label>
														<input type="text" value={formData.panNo}  className="form-control" name='panNo' placeholder="pan number" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Passport Number:</label>
														<input type="text" value={formData.passportNo}  name='passportNo' className="form-control" placeholder="passport number" onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-12">
													<div className="form-group">
														<label>Skills:</label>
														<textarea  name='skills' value={formData.skills}  className="form-control" placeholder='your skills' onChange={handleChange}>
														</textarea>
													</div>
												</div>
												<div className="col-lg-6 col-md-12">
													<div className="form-group">
														<label>Full Address:</label>
														<textarea name='address' value={formData.address}  className="form-control" placeholder='address' onChange={handleChange}>
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
																	<input type="file" name='resume' className="site-button form-control" id="customFile" onChange={handleFileChange}/>
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
		</>
	)
} 
export default Jobprofile;