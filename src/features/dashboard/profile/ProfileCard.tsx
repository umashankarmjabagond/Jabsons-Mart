import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { LuCalendarCheck } from "react-icons/lu";
import { RiStarSmileLine } from "react-icons/ri";
import { ProfileCardProps } from "@/types/profileTypes";
import { getUserProfile, uploadProfileImage } from "@/services/profile";

const ProfileCard: React.FC<Partial<ProfileCardProps>> = () => {
  const { t } = useTranslation();

  const [profile, setProfile] = useState<ProfileCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // ✅ NEW

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile({
        name: data.name,
        address: data.address || "",
        location: `${data.city || ""}, ${data.country || ""}`,
        rating: data.rating || 0,
        createdAt: data.created_at,
        memberSince: data.created_at,
        profilePic: data.profile_pic,
      });
    } catch (error) {
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ HANDLE IMAGE UPLOAD
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // optional validation
      if (!file.type.startsWith("image/")) {
        alert("Only images allowed");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Max 2MB allowed");
        return;
      }

      setUploading(true);

      const res = await uploadProfileImage(file);

      // ✅ update UI only after success
      setProfile((prev: any) => ({
        ...prev,
        profilePic: res.profile_pic,
      }));
    } catch (err) {
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
      e.target.value = ""; // reset input
    }
  };

  // ✅ TRIGGER FILE INPUT
  const triggerFileInput = () => {
    document.getElementById("profileUpload")?.click();
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        Loading profile...
      </div>
    );
  }

  const {
    name = "",
    createdAt = "",
    rating = 0,
    address = "",
    profilePic,
  } = profile || {};

  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="relative flex flex-col md:flex-row flex-wrap items-center md:items-center justify-center md:justify-between bg-white border rounded-lg shadow-md p-4 sm:p-6 md:p-8 gap-6 w-full text-center md:text-left">
      {/* LEFT SECTION */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* PROFILE IMAGE */}
        <div onClick={triggerFileInput} className="cursor-pointer">
          {profilePic ? (
            <img
              src={profilePic}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <IoPersonCircleSharp className="w-24 h-24 text-black" />
          )}
        </div>

        {/* hidden input */}
        <input
          id="profileUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        <div className="flex flex-col">
          <p className="text-lg font-semibold text-black">{name}</p>

          <div className="flex items-center justify-center md:justify-start gap-2 text-black mt-1">
            <CiLocationOn className="w-6 h-6" />
            <span>{address}</span>
          </div>

          {/* uploading text (no UI change, just below text) */}
          {uploading && (
            <span className="text-sm text-blue-500 mt-1">Uploading...</span>
          )}
        </div>
      </div>

      {/* MEMBER SINCE */}
      <div className="flex items-center gap-3">
        <LuCalendarCheck className="w-8 h-8 text-green-400" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-black">
            {t("PROFILE.MEMBER")}
          </span>
          <span className="font-bold">{memberSince}</span>
        </div>
      </div>

      {/* RATING */}
      <div className="flex flex-col items-center md:items-start gap-2 md:mr-10">
        <div className="flex items-center gap-2">
          <RiStarSmileLine className="w-8 h-8 text-blue-400" />
          <span className="font-semibold">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
