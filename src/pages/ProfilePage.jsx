import ProfileMobile from "@/components/membermanagement/Profile/ProfileMobile";
import ProfileDesktop from "@/components/membermanagement/Profile/ProfileDesktop";
import { useState } from "react";
import { toast } from "sonner"

function ProfilePage() {
  const profile = {
    name: "Moodeng ja",
    username: "moodeng.cute",
    email: "moodeng.cute@gmail.com",
  };

  const [values, setValues] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.custom((t) => (
      <div className="flex w-[340px] 2xl:w-[700px] items-start gap-[12px] rounded-[8px] bg-brand-green p-4 shadow-lg relative">
        <div className="flex flex-col gap-1">
          <p className="text-headline-4 text-white">Saved profile!</p>
          <p className="text-body-2 text-white">
            Your profile has been successfully updated
          </p>
        </div>

        <button
          onClick={() => toast.dismiss(t)}
          className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    ), {
      duration: 5000,
    });
  };


  return (
    <>
      <ProfileDesktop
        profile={profile}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
         />
      <div className="2xl:hidden">
        <ProfileMobile
          profile={profile}
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
export default ProfilePage
