"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [profile, setProfile] = useState({
    name: session?.user?.name || "John Doe",
    email: session?.user?.email || "jhon@gmail.com",
    picture: session?.user?.profile_picture || "/default-profile.png",
    bio: "I’m a passionate developer who loves coding and learning new technologies.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-10 p-12 bg-white shadow-lg rounded-2xl border border-gray-100"
    >
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Profile Page
      </h1>

      {!isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="flex justify-center">
            <img
              src={profile.picture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />
          </div>
          <h2 className="text-xl font-semibold mt-4">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
          <p className="mt-3 text-gray-700 leading-relaxed">{profile.bio}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg text-white font-medium shadow-md"
          >
            ✏️ Edit Profile
          </button>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex justify-center">
            <img
              src={formData.picture}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-lg text-white font-medium shadow-md"
            >
              ✅ Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 transition px-5 py-2 rounded-lg text-white font-medium shadow-md"
            >
              ❌ Cancel
            </button>
          </div>
        </motion.form>
      )}
    </motion.div>
  );
}
