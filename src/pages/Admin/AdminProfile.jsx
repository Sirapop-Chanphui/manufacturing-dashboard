import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/authentication";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AdminProfile() {
    const { user, fetchUser, state } = useAuth();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name ?? user.username ?? "");
            setUsername(user.username ?? "");
            setEmail(user.email ?? "");
            setBio(user.bio ?? "");
            setAvatar(user.avatar ?? user.image ?? "");
        }
    }, [user]);

    const handleSave = async () => {
        if (!name.trim()) {
            toast.error("Please enter your name");
            return;
        }
        try {
            setIsSubmitting(true);
            await axios.put(`${API_BASE_URL}/auth/profile`, {
                name: name.trim(),
                username: username.trim() || undefined,
                email: email.trim() || undefined,
                bio: bio.trim() || undefined,
            });
            await fetchUser();
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message ?? "Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (state.getUserLoading && !user) {
        return (
            <div className="flex bg-neutral-100 min-h-screen items-center justify-center">
                <p className="text-body-1 text-neutral-400">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="flex bg-neutral-100 min-h-screen">
            <main className="flex-1 flex-col">
                {/* Header */}
                <div className="flex flex-row justify-between items-center px-[60px] py-[24px] border-b border-neutral-300 ">
                    <h2 className="text-headline-3 font-semibold">Profile</h2>
                    <Button buttonText="Save" buttonStyle="primary" className="flex flex-row" onClick={handleSave} disabled={isSubmitting} />
                </div>

                {/* Content */}
                <div className="flex flex-col pt-[40px] px-[60px] pb-[120px] gap-[40px]">
                    {/* Profile Image */}
                    <div className="flex flex-row items-center gap-[28px]">
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover object-center bg-neutral-200"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-neutral-200 flex items-center justify-center">
                                <User size={48} className="text-neutral-400" />
                            </div>
                        )}

                        <Button buttonText="Upload profile picture" buttonStyle="secondary" className="flex flex-row" />

                    </div>
                    <div className="flex w-[476px] h-px bg-neutral-300"></div>
                    {/* Form */}
                    <div className="flex flex-col gap-[28px] ">
                        <InputField
                            label="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <InputField
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <InputField
                            label="Email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div>
                            <label className="block text-body-1 text-neutral-400 mb-1">
                                Bio (max 120 letters)
                            </label>
                            <textarea
                                rows={4}
                                maxLength={120}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full border rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white text-body-1"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
}

export default AdminProfile;
