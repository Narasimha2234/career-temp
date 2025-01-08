import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from '../../store/actions/AuthActions';
import profileDemo from "../../images/profile.png"
import { getCandidateById, saveProfile, updateProfile } from '../../services/AxiosInstance';
import {  useSnackbar } from 'notistack';

const BASE_URL=process.env.REACT_APP_BASE_RESOURSE_URL

function Profilesidebar(){
	const { enqueueSnackbar }=useSnackbar()
	const user=useSelector(state=>state.auth)
	const [userProfile,setUserProfile]=useState(profileDemo)
	const [profileId,setProfileId]=useState("")
	// console.log(userProfile);
	
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
		email: '',
		mobile: '',
		userId:user?.auth?.localId,
		profilePic:null,
		resume:null
	  });
	 
	  
	const location=useLocation()
	const history=useHistory()
	const dispatch=useDispatch()
	const[path,setPath]=useState("")
	useEffect(()=>{
		setPath(location.pathname)
	},[location.pathname])
	
	const handleLogout=()=>{
		dispatch(logout(history))
	}
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
			  if (res?.id) {
				localStorage.setItem("candidateId",res?.id)
				setProfileId(res.id);
				setUserProfile(res?.profilePic ? `${BASE_URL}/get/files/${res?.profilePic}`:profileDemo)
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
				  profilePic:res?.profilePic || ""
				});
			  }
			})
			.catch((err) => console.error(err));
		}
	  }, [user]);

	  const handleFileChange = (e) => {
		const file = e.target.files[0];
		// if(file?.type!=="image/jpeg" || file?.type!=="image/png"){
		// 	enqueueSnackbar("Please Select image or png file Only",{variant:"error"})
		// 	return ;
		// }
		
		setFormData((prevFormData) => {
			const updatedFormData = { ...prevFormData, profilePic: file };
			
		
			const submitData = new FormData();
			Object.keys(updatedFormData).forEach((key) => {
				if (key === "profilePic" && updatedFormData[key]) {
					submitData.append(key, updatedFormData[key]);
				} else {
					submitData.append(key, updatedFormData[key] || ""); 
				}
			});
	
			
		
			if (profileId === "") {
				saveProfile(submitData)
					.then(() => enqueueSnackbar("Profile pic saved successfully", { variant: "success" }))
					.catch((err) => enqueueSnackbar("Failed to save profile pic", { variant: "error" }));
			} else {
				updateProfile(profileId, submitData)
					.then(() => {
							enqueueSnackbar("Profile pic updated successfully", { variant: "success" })
							window.location.reload()
							}
						)
					.catch(() => enqueueSnackbar("Failed to update profile pic", { variant: "error" }));
			}
			
			return updatedFormData;
		});
	};

	
	return(
		<div className="col-xl-3 col-lg-4 m-b30">
			<div className="sticky-top">
				<div className="candidate-info">
					<div className="candidate-detail text-center">
						<div className="canditate-des">
							<li>
								<img alt="" src={userProfile} style={{height:"150px",width:"150px" ,borderRadius:"50%",objectFit:"",marginTop:"-25px"}}/>
							</li>
							<div className="upload-link" title="upload" data-toggle="tooltip" data-placement="right">
								<input type="file" className="update-flie" accept='.png,.jpeg,.jpg' name="profilePic" onChange={handleFileChange}/>
								<i className="fa fa-camera"></i>
							</div>
						</div>
						<div className="candidate-title">
							<div className="">
								<h4 className="m-b5">{formData.firstName} {formData.lastName}</h4>
								{/* <p  className="m-b0">{formData.email}</p> */}
							</div>
						</div>
					</div>
					<ul>
						<li><Link to={"/jobs-profile"} className={path==="/jobs-profile"?"active":""}>
							<i className="fa fa-user-o" aria-hidden="true"></i> 
							<span>Profile</span></Link></li>
						{/* <li><Link to={"/jobs-my-resume"}>
							<i className="fa fa-file-text-o" aria-hidden="true"></i> 
							<span>My Resume</span></Link></li> */}
						{/* <li><Link to={"/jobs-saved-jobs"}>
							<i className="fa fa-heart-o" aria-hidden="true"></i> 
							<span>Saved Jobs</span></Link></li> */}
						<li><Link to={"/jobs-current-openings"}className={path==="/jobs-current-openings"?"active":""}>
							<i className="fa fa-briefcase" aria-hidden="true"></i> 
							<span>Current Openings</span></Link></li>
						 <li><Link to={"/jobs-applied"} className={path==="/jobs-applied"?"active":""}>
							<i className="fa fa-bell-o" aria-hidden="true"></i> 
							<span>Applied Jobs</span></Link></li>
							{/* <li><Link to={"/jobs-cv-manager"}>
							<i className="fa fa-id-card-o" aria-hidden="true"></i> 
							<span>CV Manager</span></Link></li> */} 
					     	{/* <li><Link to={"/jobs-change-password"}>
							<i className="fa fa-key" aria-hidden="true"></i> 
							<span>Change Password</span></Link></li> */}
						<li onClick={handleLogout}>
							<Link to={"#"}>
							<i className="fa fa-sign-out" aria-hidden="true"></i> 
							<span>Log Out</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Profilesidebar;