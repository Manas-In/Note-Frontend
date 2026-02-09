



import axios from "axios";

const isDEVELOPMENT = import.meta.env.MODE === "development"


let baseURL = ""


if(isDEVELOPMENT){
   baseURL =  import.meta.env.VITE_API_URL_LOCAL;
}else{
    baseURL = import.meta.env.VITE_API_URL_DEPLOY;
   
}




// const baseURL = isDEVELOPMENT
//   ? import.meta.env.VITE_API_URL_LOCAL
//   : import.meta.env.VITE_API_URL_DEPLOY;


// console.log(import.meta.env)
  

// const baseURL = import.meta.env.VITE_API_URL_DEPLOY
const axiosinstance = axios.create({
  baseURL,
});

// --------------------
// Request Interceptor
// --------------------
axiosinstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessTokon");

    if (
      accessToken &&
      !config.url.includes("/user/login/") &&
      !config.url.includes("/user/register/")
    ) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------
// Response Interceptor
// --------------------
axiosinstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest.retry &&
      !originalRequest.url.includes("/user/login/") &&
      !originalRequest.url.includes("/user/register/")
    ) {
      originalRequest.retry = true;

      const refreshToken = localStorage.getItem("refreshTokon");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          `${baseURL}/user/refresh/`,
          { refresh: refreshToken }
        );

        localStorage.setItem("accessTokon", response.data.access);
        originalRequest.headers.Authorization =
          `Bearer ${response.data.access}`;

        return axiosinstance(originalRequest); 
      } catch (err) {
        localStorage.removeItem("accessTokon");
        localStorage.removeItem("refreshTokon");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosinstance;











