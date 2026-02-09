// import axios from "axios";

// const isDEVELEPMONT = import.meta.env.MODE === "development";

// const baseURL = isDEVELEPMONT
//   ? import.meta.env.VITE_API_URL_LOCAL
//   : import.meta.env.VITE_API_URL_DEPLOY;

  
// const axiosinstance = axios.create({
//   baseURL: baseURL,
// });

// // Request Interceptor

// //    localStorage.setItem("accessTokon", responce.data.access);
// //     localStorage.setItem("refreshTokon", responce.data.refresh);

// axiosinstance.interceptors.request.use(
//   function (config) {
//     const AccessToken = localStorage.getItem("accessTokon");

//     if (AccessToken) {
//       config.headers["Authorization"] = `Bearer ${AccessToken}`;
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );

// // Responcce Interceptor
// axiosinstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },

//   //handle failed responce
//   async function (error) {
//     const OriginalResponce = error.config;
//     if (error.response.status === 401 && !OriginalResponce.retry) {
//       OriginalResponce.retry = true;
//       const RefreshToken = localStorage.getItem("refreshTokon");
//       console.log(RefreshToken);

//       try {
//         const response = await axiosinstance.post("/user/refresh/", {
//           refresh: RefreshToken,
//         });
//         console.log("responcedata====> :", response.data);
//         localStorage.setItem("accessTokon", response.data.access);
//         OriginalResponce.headers["Authorization"] =
//           `Bearer ${response.data.access}`;
//         return axiosinstance(OriginalResponce);
//       } catch (error) {
//         localStorage.removeItem("accessTokon");
//         localStorage.removeItem("refreshTokon");
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// export default axiosinstance;






import axios from "axios";

const isDEVELOPMENT = import.meta.env.MODE === "development"

console.log("Hello")
console.log(import.meta.env)

let baseURL = ""

if(isDEVELOPMENT){
   baseURL =  import.meta.env.VITE_API_URL_LOCAL;
}else{
    baseURL = import.meta.env.VITE_API_URL_DEPLOY;
    console.log("BASE URL:", baseURL); 
}

// const baseURL = isDEVELOPMENT
//   ? import.meta.env.VITE_API_URL_LOCAL
//   : import.meta.env.VITE_API_URL_DEPLOY;

console.log("MODE:", import.meta.env.MODE);
console.log("BASE URL:", baseURL);  
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













// import axios from "axios";

// const isDevelopment = import.meta.env.MODE === "development";

// // Make sure your .env has:
// // VITE_API_URL_LOCAL=http://localhost:8000
// // VITE_API_URL_DEPLOY=https://your-deployed-api.com
// const baseURL = isDevelopment
//   ? import.meta.env.VITE_API_URL_LOCAL
//   : import.meta.env.VITE_API_URL_DEPLOY;

// const axiosinstance = axios.create({
//   baseURL: baseURL,
//   withCredentials: true, // ✅ important if you use cookies or CORS_ALLOW_CREDENTIALS
// });

// // -------------------
// // Request Interceptor
// // -------------------
// axiosinstance.interceptors.request.use(
//   function (config) {
//     const accessToken = localStorage.getItem("accessToken"); // ✅ fixed typo
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// // -------------------
// // Response Interceptor
// // -------------------
// axiosinstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;

//     // Handle expired access token
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = localStorage.getItem("refreshToken"); // ✅ fixed typo

//       try {
//         const response = await axios.post(
//           `${baseURL}/user/refresh/`,
//           { refresh: refreshToken }
//         );

//         localStorage.setItem("accessToken", response.data.access);
//         originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;

//         return axiosinstance(originalRequest); // ✅ retry request with new token
//       } catch (err) {
//         // If refresh fails, clear tokens and redirect to login
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosinstance;
