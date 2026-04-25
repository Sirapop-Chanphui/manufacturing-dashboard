import ProfileMobile from "@/components/membermanagement/Profile/ProfileMobile";
import ProfileDesktop from "@/components/membermanagement/Profile/ProfileDesktop";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/authentication";
import axios from "axios";
import {
  validateImageFile,
  IMAGE_FILE_ACCEPT,
} from "@/utils/imageFileValidation";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProfilePage() {
  const { user, state, fetchUser } = useAuth();

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  /** User tapped X to remove existing server photo; applied on Save with removeProfileImage text field */
  const [pendingRemoveProfileImage, setPendingRemoveProfileImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    setValues({
      name: user.name ?? "",
      username: user.username ?? "",
      email: user.email ?? "",
    });
  }, [user]);

  useEffect(() => {
    return () => {
      if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);
    };
  }, [profileImagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetProfileImageState = () => {
    if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);
    setProfileImagePreview(null);
    setProfileImageFile(null);
    setPendingRemoveProfileImage(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearPendingImage = () => {
    if (profileImagePreview) URL.revokeObjectURL(profileImagePreview);
    setProfileImagePreview(null);
    setProfileImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = validateImageFile(file);
    if (!result.ok) {
      toast.error(result.message);
      return;
    }
    setPendingRemoveProfileImage(false);
    setProfileImagePreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setProfileImageFile(file);
  };

  const handlePickImage = () => fileInputRef.current?.click();

  const handleAvatarRemove = () => {
    if (profileImageFile) {
      clearPendingImage();
      return;
    }
    if (user?.profile_pic && String(user.profile_pic).trim() !== "") {
      setPendingRemoveProfileImage(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.username?.trim()) {
      toast.error("Please enter a username");
      return;
    }
    if (!values.name?.trim()) {
      toast.error("Please enter a name");
      return;
    }
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("username", values.username.trim());
      formData.append("name", values.name.trim());
      if (profileImageFile) {
        formData.append("imageFile", profileImageFile);
      } else if (pendingRemoveProfileImage) {
        formData.append("removeProfileImage", "true");
      }
      await axios.put(`${API_BASE_URL}/user/profile`, formData);
      await fetchUser();
      resetProfileImageState();
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message ?? "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={IMAGE_FILE_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={handleProfileImageChange}
      />
      <ProfileDesktop
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        user={user}
        getUserLoading={state.getUserLoading}
        imagePreview={profileImagePreview}
        onPickImage={handlePickImage}
        onRemoveImage={handleAvatarRemove}
        isSubmitting={isSubmitting}
        hasPendingImage={Boolean(profileImageFile)}
        pendingRemoveProfileImage={pendingRemoveProfileImage}
      />
      <div className="2xl:hidden">
        <ProfileMobile
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          user={user}
          getUserLoading={state.getUserLoading}
          imagePreview={profileImagePreview}
          onPickImage={handlePickImage}
          onRemoveImage={handleAvatarRemove}
          isSubmitting={isSubmitting}
          hasPendingImage={Boolean(profileImageFile)}
          pendingRemoveProfileImage={pendingRemoveProfileImage}
        />
      </div>
    </>
  );
}
export default ProfilePage;
