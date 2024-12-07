import axios from 'axios';



const BASE_URL=process.env.REACT_APP_BASE_API_URL


const axiosInstance = axios.create({
    baseURL: BASE_URL,
});
axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.url || config.url.includes("api/auth/login") || config.url.includes("api/auth/register")) {
          
            return config;
          }
      const token = localStorage.getItem('accessToken');
     
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
       
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
axiosInstance.interceptors.response.use(
    (res)=>res,
    (error)=>Promise.reject((error.response  && error.response.data) || "somethng went wrong")
)

export default axiosInstance;


//admin

export const postJob=async(data)=>{
    const response=await axiosInstance.post("/admin/savejob",data)
    return response.data
  }

  export const deleteJob=async(id)=>{
    const response=await axiosInstance.delete(`admin/delete/${id}`)
    return response.data
  }

  export const fetchAllJobs=async()=>{
    const response=await axiosInstance.get("admin/getalljobs")
    return response.data
  }

  export const updateJob=async(id,data)=>{
    const response=await axiosInstance.put(`admin/update/${id}`,data)
    return response.data
  }

  export const fetchById=async(id)=>{
    const response=await axiosInstance.get(`admin/getjobsbyid/${id}`)
    return response.data
  }

  export const getAllResumes=async()=>{
    const response=await axiosInstance.get(`admin/all`)
    return response.data
  }

  export const getResumeByID=async(id)=>{
    const response=await axiosInstance.get(`/admin/get/${id}`)
    return response.data
  }


  //user
  // export const getUserBuId=async(id)=>{
  //   const response=await axiosInstance.get(`/auth/getUser/${id}`)
  //   return response.data
  // }
  export const saveProfile=async(data)=>{
    const response=await axiosInstance.post(`/user/savecandidate`,data)
    return response.data
  }
  export const updateProfile=async(id,data)=>{
    const response=await axiosInstance.put(`/user/updatecandidate/${id}`,data)
    return response.data
  }
  export const getAllJobs=async()=>{
    const response=await axiosInstance.get("user/getalljobs")
    return response.data
  }
  export const getById=async(id)=>{
    const response=await axiosInstance.get(`user/getjobsbyid/${id}`)
    return response.data
  }
  

  export const applyJob=async(candidateId,jobId)=>{
    const response=await axiosInstance.post(`user/apply?candidateProfileId=${candidateId}&jobId=${jobId}`)
    return response.data
  }

  export const getCandidateById=async(id)=>{
    const response = await axiosInstance.get(`/user/getcandidatebyuserid/${id}`)
    return response.data
  }
  
  export const fetchJobById=async(id)=>{
    const response=await axiosInstance.get(`user/applied/${id}`)
    return response.data
  }