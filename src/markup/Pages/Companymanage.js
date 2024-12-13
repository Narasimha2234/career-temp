import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import { deleteJob, fetchAllJobs } from '../../services/AxiosInstance';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/AuthActions';
import { useSnackbar } from 'notistack';
import LogoutModal from '../Element/LogoutModel';

function Companymanage() {
  const [company, setCompany] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [jobId,setJobId]=useState()
  const {enqueueSnackbar}=useSnackbar()
  const [jobList, setJobList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; 
  const location = useLocation();
  const [path, setPath] = useState("");
  const dispatch=useDispatch()
  const history=useHistory()
  const handleLogout=()=>{
	dispatch(logout(history))
}

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    fetchAllJobs()
      .then((res) => {
        setJobList(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleConfirmation=(id)=>{
    setJobId(id)
    setShowModel(true)
  }

  function handleCloseModal() {
    setShowModel(false);  
  }

  const handleDeleteJob=(id)=>{
	deleteJob(id)
	.then(res=>{
    window.location.reload()
    enqueueSnackbar("Job Deleted",{variant:"success"})
  })
	.catch(err=> enqueueSnackbar("Failed to Delete Job",{variant:"error"}))
  }

  const totalPages = Math.ceil(jobList.length / jobsPerPage);

  // Get jobs for current page
  const currentJobs = jobList.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
 

  return (
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
                            <img
                              alt=""
                              src={require("./../../images/orchasp_logo.png")}
                            />
                          </Link>
                        </div>
                        <div className="candidate-title">
                          <h4 className="m-b5">
                            <Link to={"#"}>Orchasp Ltd</Link>
                          </h4>
                        </div>
                      </div>
                      <ul>
                        <li>
                          <Link
                            to={"/company-post-jobs"}
                            className={path === "/company-post-jobs" ? "active" : ""}
                          >
                            <i className="fa fa-file-text-o" aria-hidden="true"></i>
                            <span>Post A Job</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/company-manage-job"}
                            className={path === "/company-manage-job" ? "active" : ""}
                          >
                            <i className="fa fa-briefcase" aria-hidden="true"></i>
                            <span>Manage jobs</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={"/company-resume"}
                            className={path === "/company-resume" ? "active" : ""}
                          >
                            <i className="fa fa-id-card-o" aria-hidden="true"></i>
                            <span>Applications Received</span>
                          </Link>
                        </li>
                        <li onClick={handleLogout}>
                          <Link to={"./"}>
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            <span>Log Out</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 m-b30">
                  <div className="job-bx browse-job clearfix">
                    <div className="job-bx-title clearfix">
                      <h5 className="font-weight-700 pull-left text-uppercase">
                        Manage jobs
                      </h5>
                    </div>
                    <table className="table-job-bx cv-manager company-manage-job">
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Applications</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentJobs.map((item, index) => (
                          <tr key={index}>
                            <td className="job-name">
                              <Link to={""}>{item.jobName}</Link>
                              <ul className="job-post-info">
                                <li>
                                  <i className="fa fa-map-marker"></i>{" "}
                                  {item.jobLocation}
                                </li>
                                <li>
                                  <i className="fa fa-bookmark-o"></i> {item.jobType}
                                </li>
                                <li>
                                  <i className="fa fa-filter"></i> {item.jobRole}
                                </li>
                              </ul>
                            </td>
                            <td className="application text-primary">
                              ({item.applicationsRecieved}) Applications
                            </td>
                            <td className="job-links">
                              <Link to={`/job-view/${item?.id}`}>
                                <i className="fa fa-eye"></i>
                              </Link>
                              <li onClick={()=>handleConfirmation(item?.id)}>
                                <i className="ti-trash"></i>
                              </li>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination-bx m-t30 float-right">
                      <ul className="pagination">
                        <li className="previous">
                          <Link to={"#"} onClick={() => handlePageChange(currentPage - 1)}>
                            <i className="ti-arrow-left"></i> Prev
                          </Link>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li
                            key={index}
                            className={currentPage === index + 1 ? "active" : ""}
                          >
                            <Link to={"#"} onClick={() => handlePageChange(index + 1)}>
                              {index + 1}
                            </Link>
                          </li>
                        ))}
                        <li className="next">
                          <Link to={"#"} onClick={() => handlePageChange(currentPage + 1)}>
                            Next <i className="ti-arrow-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* <Modal
                      show={company}
                      onHide={() => setCompany(false)}
                      className="modal fade modal-bx-info"
                    >
                      <div className="modal-dialog my-0" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="logo-img">
                              <img
                                alt=""
                                src={require("./../../images/orchasp_logo.png")}
                              />
                            </div>
                            <h5 className="modal-title">Orchasp Limited</h5>
                            <button
                              type="button"
                              className="close"
                              onClick={() => setCompany(false)}
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <ul>
                              <li>
                                <strong>Job Title :</strong>
                                <p> Web Developer – PHP, HTML, CSS </p>
                              </li>
                              <li>
                                <strong>Experience :</strong>
                                <p>5 Year 3 Months</p>
                              </li>
                              <li>
                                <strong>Description :</strong>
                                <p>
                                  Lorem Ipsum is simply dummy text of the printing and
                                  typesetting industry has been the industry's standard
                                  dummy text ever since.
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setCompany(false)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </Modal> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showModel && (
        <LogoutModal
          text={"Really Want to Delete ?"}
          onClose={handleCloseModal}
          onConfirm={()=>handleDeleteJob(jobId)}
        />
      )}
    </>
  );
}

export default Companymanage;
