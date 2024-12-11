import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header2 from './../Layout/Header2';
import Footer from './../Layout/Footer';
import { getAllResumes } from '../../services/AxiosInstance';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/AuthActions';

const BASE_URL=process.env.REACT_APP_BASE_API_URL
function Companyresume() {
    const [resumes, setResumes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const resumesPerPage = 4;
    const location = useLocation();
    const [path, setPath] = useState("");
	const dispatch=useDispatch()
	const history=useHistory()

    console.log(resumes);
    
	const handleLogout=()=>{
	  dispatch(logout(history))
  }
	
    useEffect(() => {
        setPath(location.pathname);
    }, [location.pathname]);

    useEffect(() => {
        getAllResumes()
            .then((res) => setResumes(res))
            .catch((err) => console.log(err));
    }, []);
    console.log(resumes);
    
    const token = localStorage.getItem('accessToken');

    const downloadResume = async (filename) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/admin/download/resume/${filename}`,
                {
                    responseType: 'blob',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading the file", error);
        }
    };

    // Pagination logic
    const indexOfLastResume = currentPage * resumesPerPage;
    const indexOfFirstResume = indexOfLastResume - resumesPerPage;
    const currentResumes = resumes.slice(indexOfFirstResume, indexOfLastResume);

    const totalPages = Math.ceil(resumes.length / resumesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                                                    <h4 className="m-b5">Orchasp Ltd</h4>
                                                </div>
                                            </div>
                                            <ul>
                                                <li>
                                                    <Link to={"/company-post-jobs"} className={path === "/company-post-jobs" ? "active" : ""}>
                                                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                                        <span>Post A Job</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={"/company-manage-job"} className={path === "/company-manage-job" ? "active" : ""}>
                                                        <i className="fa fa-briefcase" aria-hidden="true"></i>
                                                        <span>Manage jobs</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={"/company-resume"} className={path === "/company-resume" ? "active" : ""}>
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
                                <div className="col-xl-9 col-lg-12 m-b30 ">
                                    <div className="job-bx clearfix">
                                        <div className="job-bx-title clearfix">
                                            <h5 className="font-weight-700 pull-left text-uppercase">Resume</h5>
                                            {/* <Link to={"/company-manage-job"} className="site-button right-arrow button-sm float-right">Back</Link> */}
                                        </div>
                                        <ul className="post-job-bx browse-job-grid post-resume row">
                                            {currentResumes.map((item, index) => (
                                                <li className="col-lg-6 col-md-6" key={index}>
                                                    <div className="post-bx">
                                                        <div className="d-flex m-b20">
                                                            <div className="job-post-info">
                                                                <h5 className="m-b0">{item.name}</h5>
                                                                <p className="m-b5 font-13">
                                                                    <Link to={"#"} className="text-primary">{item?.jobs?.jobRole}</Link>
                                                                    &nbsp; &nbsp;at Orchasp Limited
                                                                </p>
                                                                <ul>
                                                                    <li><i className="fa fa-map-marker"></i>{item?.jobs?.jobLocation}</li>
                                                                    <li><i className="fa fa-money"></i> {item?.jobs?.salary}</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="job-time m-t15 m-b10 ">
                                                            {item?.skills?.map((item,index)=>(
                                                                <Link key={index} to={"#"} className="mr-1"><span>{item}</span></Link>
                                                            ))}
                                                
                                                        </div>
                                                    </div>
                                                    <span onClick={() => downloadResume(item?.resume)}>
                                                        <Link to={"#"} className="job-links m-tb100">
                                                            <i className="fa fa-download"></i>
                                                        </Link>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pagination-bx float-right">
                                            <ul className="pagination">
                                                <li className={`${currentPage === 1 ? "disabled" : ""} mr-2 `}>
                                                    <Link to={"#"} onClick={() => handlePageChange(currentPage - 1)}>
                                                        <i className="ti-arrow-left"></i> Prev
                                                    </Link>
                                                </li>
                                                {Array.from({ length: totalPages }, (_, i) => (
                                                    <li key={i} className={`${currentPage === i + 1 ? "active" : ""} mr-2 ml-2`}>
                                                        <Link to={"#"} onClick={() => handlePageChange(i + 1)}>{i + 1}</Link>
                                                    </li>
                                                ))}
                                                <li className={currentPage === totalPages ? "disabled" : ""}>
                                                    <Link to={"#"} onClick={() => handlePageChange(currentPage + 1)}>
                                                        Next <i className="ti-arrow-right"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Companyresume;
