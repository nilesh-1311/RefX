import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaFacebook, FaGoogle } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registered with:", { name, email, password });
    alert("Registration successful!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-500 via-purple-500 to-blue-600">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">SIGN UP</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-semibold py-2 rounded-md hover:bg-pink-600 transition"
          >
            SIGN UP
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-5 text-center text-gray-500">Or sign up with</div>

        {/* Social Buttons */}
        <div className="flex justify-between space-x-3">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-1/2 space-x-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <FaFacebook className="text-blue-600" />
            <span>Facebook</span>
          </button>

          <button
            onClick={() => navigate("/home")}
            className="flex items-center justify-center w-1/2 space-x-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-red-500" />
            <span>Google</span>
          </button>
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-pink-600 font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
