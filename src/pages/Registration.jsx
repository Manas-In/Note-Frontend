import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [Err, setErr] = useState("");
  const [PasswordMatch, setPasswordMatch] = useState("");
  const [Loading, setLoading] = useState("Register");

  const [fromData, setfromData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password1: "",
    password2: "",
  });

  // Handle input change
  const handleInput = (e) => {
    setfromData({ ...fromData, [e.target.name]: e.target.value });
  };

  // Password validation function
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpper = /[A-Z]/;
    const hasLower = /[a-z]/;
    const hasNumber = /\d/;
    const hasSpecial = /[@!$%*?&]/;

    if (!minLength.test(password))
      return "Password must be at least 8 characters long";
    if (!hasUpper.test(password))
      return "Password must contain at least 1 uppercase letter";
    if (!hasLower.test(password))
      return "Password must contain at least 1 lowercase letter";
    if (!hasNumber.test(password))
      return "Password must contain at least 1 number";
    if (!hasSpecial.test(password))
      return "Password must contain at least 1 special character (@!$%*?&)";
    return "";
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading("Loading...");

    // Password validation
    const passwordError = validatePassword(fromData.password1);
    if (passwordError) {
      setPasswordMatch(passwordError);
      setLoading("Register Again");
      return;
    }

    // Check if passwords match
    if (fromData.password1 !== fromData.password2) {
      setPasswordMatch("Passwords do not match");
      setLoading("Register Again");
      return;
    } else {
      setPasswordMatch(""); // Clear previous errors
    }

    // Submit registration
    axios
      .post("http://127.0.0.1:8000/user/register/", {
        username: fromData.username,
        first_name: fromData.first_name,
        last_name: fromData.last_name,
        email: fromData.email,
        password: fromData.password1,
      })
      .then((responc) => {
        console.log("Sign Up Successful");
        navigate("/login");
      })
      .catch((error) => {
        setLoading("Register Again");
        if (error.response && typeof error.response.data === "object") {
          setErr(error.response.data);
        } else {
          setErr({ general: "Something went wrong, please try again" });
        }
      });
  };

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 px-4 py-10">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 md:p-10 transition hover:shadow-2xl"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center">Sign Up</h2>
          <p className="text-sm text-gray-500 mt-2 mb-6 text-center">
            Create your account to get started
          </p>

          {/* Display general errors */}
          {Err?.general && (
            <div className="text-red-600 font-semibold bg-red-100 border border-red-400 rounded-2xl px-3 py-2 mt-2">
              <p>{Err.general}</p>
            </div>
          )}

          {/* Username */}
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-3 mt-4 focus-within:ring-2 focus-within:ring-indigo-200 transition">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 2.239-7 5v2h14v-2c0-2.761-3.134-5-7-5z"
                fill="#6B7280"
              />
            </svg>
            <input
              type="text"
              placeholder="Username"
              value={fromData.username}
              name="username"
              onChange={handleInput}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>
          {Err?.username && (
            <div className="text-red-600 font-semibold bg-red-100 border border-red-400 rounded-2xl px-3 py-2 mt-2">
              <p>{Err.username}</p>
            </div>
          )}

          {/* First Name */}
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-3 mt-4 focus-within:ring-2 focus-within:ring-indigo-200 transition">
            <input
              type="text"
              placeholder="First Name"
              value={fromData.first_name}
              name="first_name"
              onChange={handleInput}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-3 mt-4 focus-within:ring-2 focus-within:ring-indigo-200 transition">
            <input
              type="text"
              placeholder="Last Name"
              value={fromData.last_name}
              name="last_name"
              onChange={handleInput}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-3 mt-4 focus-within:ring-2 focus-within:ring-indigo-200 transition">
            <input
              type="email"
              placeholder="Email"
              value={fromData.email}
              name="email"
              onChange={handleInput}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>
          {Err?.email && (
            <div className="text-red-600 font-semibold bg-red-100 border border-red-400 rounded-2xl px-3 py-2 mt-2">
              <p>{Err.email}</p>
            </div>
          )}

          {/* Password */}
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-3 mt-4 focus-within:ring-2 focus-within:ring-indigo-200 transition">
            <input
              type="password"
              placeholder="Password"
              value={fromData.password1}
              name="password1"
              onChange={handleInput}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-4 gap-3 mt-4 focus-within:ring-2 focus-within:ring-indigo-200 transition">
            <input
              type="password"
              placeholder="Confirm Password"
              value={fromData.password2}
              name="password2"
              onChange={handleInput}
              className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
              required
            />
          </div>

          {/* Password Error */}
          {PasswordMatch && (
            <div className="mt-2 px-3 py-2 rounded-2xl bg-red-100 border border-red-400 text-red-600 font-semibold">
              <p>{PasswordMatch}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full h-12 rounded-full text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 transition-all font-medium text-lg shadow-lg hover:shadow-xl active:scale-95"
          >
            {Loading}
          </button>

          <p className="text-gray-500 text-sm mt-5 text-center">
            Already have an account?{" "}
            <a
              className="text-indigo-500 font-medium hover:underline"
              href="/login"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registration;
