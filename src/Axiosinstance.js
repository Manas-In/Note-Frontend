import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;
const axiosinstance = axios.create({
  baseURL: baseURL,
});

// Request Interceptor

//    localStorage.setItem("accessTokon", responce.data.access);
//     localStorage.setItem("refreshTokon", responce.data.refresh);

axiosinstance.interceptors.request.use(
  function (config) {
    const AccessToken = localStorage.getItem("accessTokon");

    if (AccessToken) {
      config.headers["Authorization"] = `Bearer ${AccessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Responcce Interceptor
axiosinstance.interceptors.response.use(
  function (response) {
    return response;
  },
  
  
  //handle failed responce
async  function (error) {
    const OriginalResponce = error.config;
    if (error.response.status === 401 && !OriginalResponce.retry) {
      OriginalResponce.rety = true;
      const RefreshToken = localStorage.getItem('refreshTokon')
      console.log(RefreshToken);
      
      
      try {
        const response = await axiosinstance.post('/user/refresh/', {refresh:RefreshToken })
        console.log('responcedata====> :', response.data);
        localStorage.setItem('accessTokon', response.data.access)
        OriginalResponce.headers['Authorization'] = `Bearer ${response.data.access}`
        return axiosinstance[OriginalResponce]
        
        
      }catch(error){
        localStorage.removeItem('accessTokon')
        localStorage.removeItem('refreshTokon')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error);
  }
);

export default axiosinstance;
