import { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Header */}
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
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

      {/* Sign-Up Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <p className="text-gray-500">Join us today, it's free!</p>

        {/* Social Sign-Up Buttons */}
        <div className="flex space-x-4 my-4">
          <button className="flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg w-full text-gray-700 hover:bg-gray-100">
            <FaGoogle />
            <span>Sign up with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Username Input */}
        <div className="relative mb-4">
          <FiUser className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

        {/* Confirm Password Input */}
        <div className="relative mb-4">
          <FiLock className="absolute left-3 top-3 text-gray-500" />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center justify-start text-sm mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 mr-2"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <span className="text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms & Conditions
            </a>
          </span>
        </div>

        {/* Sign-Up Button (Animated) */}
        <button
          className={`w-full py-2 rounded-md text-lg font-medium transition-transform duration-200 ${
            agreeTerms
              ? "bg-blue-600 text-white hover:scale-105 active:scale-95"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!agreeTerms}
        >
          Sign Up
        </button>

        {/* Sign-In Link */}
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
