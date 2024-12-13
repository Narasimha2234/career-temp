import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import {Form}  from 'react-bootstrap';         
import { fetchById,  updateJob } from '../../services/AxiosInstance';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/AuthActions';
import { useSnackbar } from 'notistack';


function ComponyUpdatePost(){
	const {enqueueSnackbar}=useSnackbar()
	const location=useLocation()
	const[path,setPath]=useState("")
    const jobId=useParams().jobId
    const dispatch=useDispatch()
	const history = useHistory();
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
		yop: '',
		jobLocation: '',
		skillSet: '',
		jobRequirements: '',
		description: '',
	  });

      useEffect(()=>{
        fetchById(jobId)
        .then(res=>setFormData(
            {
                ...res,
                jobRequirements:res?.jobRequirements?.filter((item)=>item).join(","),
                skillSet:res?.skillSet?.filter((item)=>item).join(",")
            }
        ))
        .catch(err=>console.log(err))
      },[jobId])
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
		  ...prev,
		  [name]: value,
		}));
	  };
	const handleSubmit=async(e)=>{
		e.preventDefault();
        console.log(formData);
        
		updateJob(jobId,formData)
        .then(res=>{
			history.push(`/job-view/${jobId}`)
			enqueueSnackbar("Job updated ",{variant:"success"})
		})
        .catch(err=>enqueueSnackbar("Failed to UPdate the Job",{variant:"error"}))
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
													<h4 className="m-b5"><Link to={"#"}>@COMPANY</Link></h4>
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
														<input type="text" className="form-control" placeholder="Enter Job Title" name='jobId' value={formData.jobId} onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Job Name</label>
														<input type="text" className="form-control" placeholder="info@gmail.com" name='jobName' value={formData.jobName} onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Job Role</label>
														<input type="text" className="form-control tags_input" name='jobRole' value={formData.jobRole} onChange={handleChange}/>
														
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
														<label>Number Of Openings</label>
														<input type="tel" className="form-control" placeholder="e.g. 10000" name='noOfOpenings' value={formData.noOfOpenings} onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Salary</label>
														<input type="text" className="form-control" placeholder="e.g. 20000" name='salary' value={formData.salary} onChange={handleChange}/>
													</div>
												</div>
												
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Qualification</label>
														<input type="text" className="form-control" name='educationalQualification' value={formData.educationalQualification} onChange={handleChange} />
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
														<input type="text" className="form-control" name='jobLocation' placeholder="London" value={formData.jobLocation} onChange={handleChange}/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Skill Set:</label>
														<textarea  className="form-control form-row" name='skillSet' value={formData.skillSet} onChange={handleChange}>
														</textarea>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="form-group">
														<label>Job Requirements:</label>
														<textarea  className="form-control form-row" name='jobRequirements' value={formData.jobRequirements} onChange={handleChange}>
														</textarea>
													</div>
												</div>
												<div className="col-lg-12 col-md-12">
													<div className="form-group">
														<label>Description:</label>
														<textarea  className="form-control" name='description' value={formData.description} onChange={handleChange}>
														</textarea>
													</div>
												</div>
												
												
											</div>
											<button type="submit" className="site-button m-b30">Update</button>
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
export default ComponyUpdatePost;