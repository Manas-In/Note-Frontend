import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [Err, setErr] = useState("");
  const [Loading, setLoading] = useState("Login");

  const [login, setlogin] = useState();

  const [fromData, setfromData] = useState({
    email: "",
    password: "",
  });

  const { IsLogin, setIsLogin } = useContext(AuthContext);

  const handleFromData = (e) => {
    setfromData({ ...fromData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading("Loading...");


    axios
      .post("http://127.0.0.1:8000/user/login/", {
        email: fromData.email,
        password: fromData.password,
      })
      .then((responce) => {
        setlogin(responce.data);
        localStorage.setItem("accessTokon", responce.data.access);
        localStorage.setItem("refreshTokon", responce.data.refresh);
        setIsLogin(true);
        // navigate("/notes");
        navigate("/notes", { replace: true });
      })
      .catch((error) => {
        setLoading("Login Again");
        if (error.response) {
          setErr(error.response.data.detail || "Invalid email or password");
        } else {
          setErr("Something went wrong, please try again");
        }
      });
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 px-4 md:px-12">
      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center ">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl  md:p-10 transition-shadow hover:shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center">
            Sign in
          </h2>
          <p className="text-sm text-gray-500 mt-2 mb-6 text-center">
            Welcome back! Please sign in to continue
          </p>

          {/* Error Message */}
          {Err && (
            <p className="text-red-600 font-semibold bg-red-100 border border-red-400 rounded-2xl px-4 py-2 mt-2 text-center">
              {Err}
            </p>
          )}

          {/* Email Input */}
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-3 mt-4 focus-within:ring-2 focus-within:ring-indigo-200">
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="email"
              placeholder="Email id"
              name="email"
              value={fromData.email}
              onChange={handleFromData}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center mt-5 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-3 focus-within:ring-2 focus-within:ring-indigo-200">
            <svg
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={fromData.password}
              onChange={handleFromData}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-8 w-full h-12 rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 transition-all font-medium text-lg shadow-lg hover:shadow-xl active:scale-95"
          >
            {Loading}
          </button>

          {/* Register Link */}
          <p className="text-gray-500 text-sm mt-5 text-center">
            Don’t have an account?{" "}
            <a
              className="text-indigo-500 font-medium hover:underline"
              href="/registration"
            >
              Register Now
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
