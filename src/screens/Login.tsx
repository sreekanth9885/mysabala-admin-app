import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Truck } from "lucide-react";
import { useLoginMutation } from "../features/auth/authApi";

export function Login() {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      console.log("Login Response:", response);

      // Store token
      localStorage.setItem("token", response.token);

      // Optional: store user
      localStorage.setItem("user", JSON.stringify(response.user));

      // Navigate to dashboard
      navigate("/");

    } catch (error: any) {
      console.error("Login Error:", error);

      alert(
        error?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 to-red-600 p-12 items-center justify-center">
        <div className="text-white text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Truck size={64} className="text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Food Delivery Admin Sreekanth
          </h1>

          <p className="text-xl text-white/90">
            Manage your restaurants, food items, and orders all in one place
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome Back
              </h2>

              <p className="text-gray-600">
                Sign in to your admin account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="admin@fooddelivery.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />

                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>

                <a
                  href="#"
                  className="text-sm text-orange-600 hover:text-orange-700"
                >
                  Forgot password?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}