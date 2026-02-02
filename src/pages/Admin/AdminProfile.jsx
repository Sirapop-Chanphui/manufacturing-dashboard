import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { useState } from "react";
import men from "../../assets/img/men-and-cat.jpg"
import { toast } from "sonner"

function AdminProfile() {
    const [name, setName] = useState("Thompson Parker");
    const [username, setUsername] = useState("thompson.p");
    const [email, setEmail] = useState("thompson@example.com");
    const [bio, setBio] = useState(
        "Content writer and cat lover. Passionate about storytelling and creativity."
    );

    const handleSave = () => {
        toast.custom((t) => (
            <div className="flex w-[700px] items-start gap-[12px] rounded-[8px] bg-brand-green p-4 shadow-lg relative">

                <div className="flex flex-col gap-1">
                    <p className="text-headline-4 text-white">
                        Saved profile
                    </p>
                    <p className="text-body-2 text-white">
                        Your profile has been successfully updated
                    </p>
                </div>
                <button
                    onClick={() => toast.dismiss(t)}
                    className="absolute top-4 right-6 text-white opacity-80 hover:opacity-100"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
        ), {
            duration: 5000,
        });
    }

    return (
        <div className="flex bg-neutral-100 min-h-screen">
            <main className="flex-1 flex-col">
                {/* Header */}
                <div className="flex flex-row justify-between items-center px-[60px] py-[24px] border-b border-neutral-300 ">
                    <h2 className="text-headline-3 font-semibold">Profile</h2>
                    <Button buttonText="Save" buttonStyle="primary" className="flex flex-row" onClick={() => handleSave()} />
                </div>

                {/* Content */}
                <div className="flex flex-col pt-[40px] px-[60px] pb-[120px] gap-[40px]">
                    {/* Profile Image */}
                    <div className="flex flex-row items-center gap-[28px] ">
                        <img
                            src={men}
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover"
                        />

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
