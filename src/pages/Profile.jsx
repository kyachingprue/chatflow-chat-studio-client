import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { FaCamera, FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

// Cloudinary config
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const DEFAULT_COVER = "https://i.ibb.co/default-cover.jpg";
const DEFAULT_PROFILE = "https://i.ibb.co/17761113/default-profile.png";

const Profile = () => {
  const { user } = useAuth(); // 🔑 only email needed
  const axiosSecure = useAxiosSecure();

  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const [userData, setUserData] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* ================= FETCH MONGODB USER ================= */
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/${user.email}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch(() => {
        toast.error("Failed to load profile");
      });
  }, [user?.email, axiosSecure]);

  const uploadImage = async (file, type) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.secure_url) {
        console.error("Cloudinary error:", data);
        throw new Error("Upload failed");
      }

      const imageUrl = data.secure_url;

      await axiosSecure.patch(
        `/users/${encodeURIComponent(user.email)}`,
        {
          [type === "cover" ? "cover" : "image"]: imageUrl,
        }
      );

      setUserData((prev) => ({
        ...prev,
        [type === "cover" ? "cover" : "image"]: imageUrl,
      }));

      toast.success(`${type} image updated`);
    } catch (error) {
      toast.error("Cloudinary upload failed",error);
    } finally {
      setUploading(false);
    }
  };

  const onCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file, "cover");
  };

  const onProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadImage(file, "profile");
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 animate-pulse">
        {/* Cover Skeleton */}
        <div className="h-64 md:h-80 bg-gray-300 rounded-xl"></div>

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center -mt-16 md:-mt-20">
          {/* Avatar */}
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gray-300 border-4 border-white"></div>

          {/* Info */}
          <div className="mt-4 md:mt-0 md:ml-6 space-y-3 w-full max-w-md">
            <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

            {/* Social icons */}
            <div className="flex gap-3 mt-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-12 md:p-8 bg-linear-to-br from-rose-100 via-purple-100 to-indigo-200">

      {uploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border-4 border-white/30 border-t-indigo-600 animate-spin"></div>
            <p className="text-sm font-semibold text-gray-800">
              Uploading image...
            </p>
          </div>
        </div>
      )}

      {/* ================= COVER ================= */}
      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
        <img
          src={userData.cover || DEFAULT_COVER}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => coverInputRef.current.click()}
          className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-2 rounded flex items-center gap-2 text-sm"
        >
          <FaCamera /> Change Cover
        </button>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={onCoverChange}
        />
      </div>

      {/* ================= PROFILE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row items-center -mt-16 md:-mt-20"
      >
        {/* Profile Image */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
          <img
            src={userData.image || DEFAULT_PROFILE}
            alt="Profile"
            className="w-full h-full object-cover"
          />

          <button
            onClick={() => profileInputRef.current.click()}
            className="absolute bottom-2 right-8 bg-blue-300 text-black p-2 rounded-full"
          >
            <FaCamera size={14} />
          </button>

          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onProfileChange}
          />
        </div>

        {/* Info */}
        <div className="mt-4 md:mt-20 md:ml-6 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">
            {userData.name}
          </h2>
          <p className="text-gray-500">{userData.email}</p>

          <p className="text-indigo-600 font-medium capitalize">
            {userData.role}
            {userData.isVerified && " ✅"}
          </p>

          <div className="flex gap-4 justify-center md:justify-start mt-3 text-xl text-gray-600">
            <FaFacebook />
            <FaTwitter />
            <FaGithub />
            <FaLinkedin />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
