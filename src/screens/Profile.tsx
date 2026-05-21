import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Mail, Phone, Edit, Save, LogOut, Shield } from "lucide-react";
import { useAuth } from "../features/hooks/useAuth";
import { formatDate } from "../utils/formatDate";

export function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: user?.email || "",
    phone: user?.phone || "",
    location: "San Francisco, CA",
    role: "Super Admin",
  });
  console.log("userdetails", user);
  const handleLogout = () => {
    navigate("/login");
  };

  const handleSave = () => {
    setIsEditing(false);
    // Mock save action
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-32"></div>
        <div className="px-8 pb-8">
          <div className="flex items-end justify-between -mt-16 mb-6">
            <div className="flex items-end gap-4">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User size={64} className="text-orange-600" />
              </div>
              <div className="pb-2">
                <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Shield size={16} className="text-orange-600" />
                  <span className="text-sm font-medium text-orange-600">{profileData.role}</span>
                </div>
              </div>
            </div>
            <div className="pb-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all shadow-lg"
                >
                  <Edit size={20} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-lg"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <User size={18} className="text-gray-500" />
                  Full Name
                </div>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">{user?.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={18} className="text-gray-500" />
                  Email Address
                </div>
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">{user?.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <Phone size={18} className="text-gray-500" />
                  Phone Number
                </div>
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              ) : (
                <p className="text-gray-800 bg-gray-50 px-4 py-3 rounded-lg">{profileData.phone}</p>
              )}
            </div>


          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Account Created</h3>
          <p className="text-1xl font-bold text-green-600">{formatDate(user?.created_at)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Last Login</h3>
          <p className="text-1xl font-bold text-green-600">{formatDate(user?.last_login)}</p>
        </div>

      </div>

      {/* Security Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-600" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Change Password</p>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
            </div>
            <span className="text-orange-600">→</span>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
        >
          <LogOut size={20} />
          <div className="text-left">
            <p className="font-medium">Logout</p>
            <p className="text-sm">Sign out of your admin account</p>
          </div>
        </button>
      </div>
    </div>
  );
}
