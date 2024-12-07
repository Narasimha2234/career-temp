import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Header2 from '../Layout/Header2';
import Footer from '../Layout/Footer';
import Profilesidebar from '../Element/Profilesidebar';
import { getAllJobs } from '../../services/AxiosInstance';



function CurrentJobOpenings (){
	const [jobs,setJobs]=useState()
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5; 

	const handlePageChange = (page) => {
	setCurrentPage(page);
	};

	const currentJobs = jobs?.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	const totalPages = Math.ceil(jobs?.length / pageSize);
	const totalPagesArray = totalPages > 0 ? [...Array(totalPages).keys()] : [];

	
	
	
	useEffect(()=>{
		getAllJobs()
		.then(res=>setJobs(res))
		.catch(err=>console.log(err))
	},[])
	
	
	return(
		<>
			<Header2 />
			<div className="page-content bg-white">
				<div className="content-block">
					<div className="section-full bg-white p-t50 p-b20">
						<div className="container">
							<div className="row">
								{/* <div className="col-xl-3 col-lg-4 m-b30">
									<div className="sticky-top">
										<div className="candidate-info">
											<div className="candidate-detail text-center">
												<div className="canditate-des">
													<Link to={'#'}>
														<img alt="" src={require("./../../images/team/pic1.jpg")} />
													</Link>
													<div className="upload-link" title="update" data-toggle="tooltip" data-placement="right">
														<input type="file" className="update-flie" />
														<i className="fa fa-camera"></i>
													</div>
												</div>
												<div className="candidate-title">
													<div className="">
														<h4 className="m-b5"><Link to={''}>David Matin</Link></h4>
														<p className="m-b0"><Link to={''}>Web developer</Link></p>
													</div>
												</div>
											</div>
											<ul>
												<li><Link to={"/jobs-profile"}>
													<i className="fa fa-user-o" aria-hidden="true"></i> 
													<span>Profile</span></Link></li>
												<li><Link to={"/jobs-my-resume"}>
													<i className="fa fa-file-text-o" aria-hidden="true"></i> 
													<span>My Resume</span></Link></li>
												<li><Link to={"/jobs-saved-jobs"}>
													<i className="fa fa-heart-o" aria-hidden="true"></i> 
													<span>Saved Jobs</span></Link></li>
												<li><Link to={"/jobs-applied-job"} className="active">
													<i className="fa fa-briefcase" aria-hidden="true"></i> 
													<span>Applied Jobs</span></Link></li>
												<li><Link to={"/jobs-alerts"} >
													<i className="fa fa-bell-o" aria-hidden="true"></i> 
													<span>Job Alerts</span></Link></li>
												<li><Link to= {"/jobs-cv-manager"}>
													<i className="fa fa-id-card-o" aria-hidden="true"></i> 
													<span>CV Manager</span></Link></li>
												<li><Link to={"/jobs-change-password"}>
													<i className="fa fa-key" aria-hidden="true"></i> 
													<span>Change Password</span></Link></li>
												<li><Link to={"./"}>
													<i className="fa fa-sign-out" aria-hidden="true"></i> 
													<span>Log Out</span></Link></li>
											</ul>
										</div>
									</div>
									
								</div> */}
								<Profilesidebar/>
								<div className="col-xl-9 col-lg-8 m-b30 browse-job">
									<div className="job-bx-title  clearfix">
										<h5 className="font-weight-700 pull-left text-uppercase">{jobs?.length} {jobs?.length > 1? "Jobs":"Job"} Found</h5>
										{/* <div className="float-right">
											<span className="select-title">Sort by freshness</span>
											<select className="custom-btn">
												<option>Last 2 Months</option>
												<option>Last Months</option>
												<option>Last Weeks</option>
												<option>Last 3 Days</option>
											</select>
										</div> */}
									</div>
									<ul className="post-job-bx browse-job">
										{currentJobs?.map((item,index)=>(
											<li key={index}>
												<div className="post-bx">
													<div className="job-post-info m-a0">
														<h4><Link to={`/job-detail/${item.id}`}>{item.jobName}</Link></h4>
														<ul>
															<li>@Orchasp ltd</li>
															<li><i className="fa fa-map-marker"></i>{item.jobLocation}</li>
															<li><i className="fa fa-money"></i>{item.salary}</li>
														</ul>
														<div className="job-time m-t15 m-b10 d-flex">
															{item?.skillSet?.map((item,index)=>(
																<li  className="mr-1" key={index}><span>{item}</span></li>
															))}
															
															{/* <li  className="mr-1"><span>Angular</span></li>
															<li  className="mr-1"><span>Bootstrap</span></li>
															<li  className="mr-1"><span>Wordpress</span></li> */}
														</div>
														<div className="posted-info clearfix">
															<p className="m-tb0 text-primary float-left"><span className="text-black m-r10">experience :</span>{item.experience}</p>
															<Link to={`/job-detail/${item.id}`} className="site-button button-sm float-right">Apply Job</Link>
														</div>
													</div>
												</div>
											</li>
										))}		
									</ul>
									<div className="pagination-bx m-t30">
									<ul className="pagination">
										<li className={`previous  ${currentPage === 1 ? 'disabled' : ''}`}>
											<button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
											<i className="ti-arrow-left"></i> Prev
											</button>
										</li>
										{[...Array(totalPages > 0 ? totalPages : 0).keys()].map((page) => (
											<li key={page} className={`${currentPage === page + 1 ? 'active' : ''} ml-1`}>
											<button onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
											</li>
										))}
										<li className={`next ml-1 ${currentPage === totalPages ? 'disabled' : ''}`}>
											<button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
											Next <i className="ti-arrow-right"></i>
											</button>
										</li>
									</ul>
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
export default CurrentJobOpenings; 