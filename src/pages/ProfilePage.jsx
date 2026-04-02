import ProfileMobile from "@/components/membermanagement/Profile/ProfileMobile";
import ProfileDesktop from "@/components/membermanagement/Profile/ProfileDesktop";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/authentication";

function ProfilePage() {
  const { user, state } = useAuth();

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!user) return;
    setValues({
      name: user.name ?? "",
      username: user.username ?? "",
      email: user.email ?? "",
    });
  }, [user]);

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
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        user={user}
        getUserLoading={state.getUserLoading}
      />
      <div className="2xl:hidden">
        <ProfileMobile
          values={values}
          onChange={handleChange}
          onSubmit={handleSubmit}
          user={user}
          getUserLoading={state.getUserLoading}
        />
      </div>
    </>
  );
}
export default ProfilePage
