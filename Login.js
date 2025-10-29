import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    navigate("/home");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-white via-blue-100 to-blue-200">
      {/* Left Section (Login Box) */}
      <div className="flex w-1/2 items-center justify-center relative">
        {/* Clickable App Name */}
        <div
          onClick={() => navigate("/")}
          className="absolute top-10 left-12 cursor-pointer select-none"
        >
          <h1 className="text-4xl font-extrabold text-blue-500 tracking-wide font-[Poppins] drop-shadow-sm hover:text-blue-600 transition">
            Refx
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-3xl p-10 w-96 mt-20">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Log In
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none bg-transparent text-gray-700"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full outline-none bg-transparent text-gray-700"
              />
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <button
                type="button"
                onClick={() => alert("Reset link sent to your email!")}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-full transition"
            >
              Log in
            </button>
          </form>

          <div className="mt-4 text-center text-gray-600 text-sm">
            <p>
              Not a member?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-blue-500 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              <FaFacebook className="text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section (Cart Image) */}
      <div className="w-1/2 bg-blue-200 flex items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
          alt="Cart"
          className="w-80 h-80"
        />
      </div>
    </div>
  );
};

export default Login;
