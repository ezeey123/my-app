import { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FiMail, FiLock } from "react-icons/fi";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Header */}
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
        <h1 className="text-lg font-semibold">Meetmax</h1>
      </div>

      {/* Language Selector */}
      <div className="absolute top-5 right-5">
        <select className="border rounded-md px-3 py-1 text-sm focus:outline-none">
          <option>English (UK)</option>
          <option>English (US)</option>
          <option>French</option>
        </select>
      </div>

      {/* Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <p className="text-gray-500">Welcome back, you've been missed!</p>

        {/* Social Buttons */}
        <div className="flex  justify-between space-x-4 my-4 ">
          <button className="flex items-center justify-center space-x-2 px-2 py-2 border rounded-lg w-full text-gray-700 hover:bg-gray-100">
            <FaGoogle />
            <span>Log in with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Email Input */}
        <div className="relative mb-4">
          <FiMail className="absolute left-3 top-3 text-gray-500" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <FiLock className="absolute left-3 top-3 text-gray-500" />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center text-sm mb-4">
          {/* <label className="flex items-center space-x-2 text-gray-600">
            <input type="checkbox" className="w-4 h-4" />
            <span>Remember me</span>
          </label> */}
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Sign-In Button (Animated) */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-medium transition-transform duration-200 hover:scale-105 active:scale-95">
          Sign In
        </button>

        {/* Sign-Up Link */}
        <p className="mt-4 text-gray-600">
          You haven't any account?{" "}
          <a className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
