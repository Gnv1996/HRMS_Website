import React, { useState } from "react";
import { User, Landmark, MapPin, Camera, Save, Briefcase } from "lucide-react";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "Gautam Vashisth",
    fatherName: "",
    gender: "Male",
    dob: "",
    address: "",
    profilePhoto: null,
    role: "Senior Software Developer",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifscCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    if (e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile analytics updated successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Account Settings</h2>
            <p className="text-slate-500 mt-1 font-medium">Manage your public profile and banking information</p>
          </div>
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PROFILE HERO CARD */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <div className="px-8 pb-8">
              <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 gap-6">
                <div className="relative group">
                  {formData.profilePhoto ? (
                    <img
                      src={formData.profilePhoto}
                      alt="Profile"
                      className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-3xl bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center">
                      <User size={48} className="text-slate-300" />
                    </div>
                  )}
                  <label className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                    <Camera size={18} className="text-indigo-600" />
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                </div>
                
                <div className="text-center md:text-left mb-2">
                  <h3 className="text-2xl font-bold text-slate-900">{formData.name || "Set Your Name"}</h3>
                  <div className="flex items-center gap-2 text-slate-500 font-medium">
                    <Briefcase size={16} />
                    <span>{formData.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: PERSONAL INFO */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <User size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Personal Details</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                  <Input label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="Richard Doe" />
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none font-medium text-slate-700"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
                </div>

                <div className="mt-6 space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 ml-1">Current Address</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-4 text-slate-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Street, City, State, ZIP..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: BANKING INFO */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                    <Landmark size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Bank Details</h4>
                </div>

                <div className="space-y-5">
                  <Input label="Account Number" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="0000 0000 0000" />
                  <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Global Bank" />
                  <Input label="Branch" name="branch" value={formData.branch} onChange={handleChange} placeholder="Downtown" />
                  <Input label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="GBNK0001234" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component for cleaner code
const Input = ({ label, name, type = "text", value, onChange, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300"
    />
  </div>
);

export default Profile;