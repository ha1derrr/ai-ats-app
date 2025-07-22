import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "candidate",
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.fullName);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.avatar) data.append("avatar", formData.avatar);

    try {
      const res = await axios.post(
        `http://localhost:3000/user/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Signup success:", res.data);
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
          Create an Account
        </h2>

        {/* Full Name */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="cursor-pointer w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            <option value="candidate">Candidate</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        {/* Avatar */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">
            Upload Avatar
          </label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleChange}
            className="cursor-pointer w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-800 dark:file:text-white dark:hover:file:bg-gray-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
