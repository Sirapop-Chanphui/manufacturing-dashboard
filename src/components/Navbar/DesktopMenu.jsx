import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, UserRound, LogOut, RotateCw } from "lucide-react";
import man from "../../assets/img/men-and-cat.jpg"
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

function DesktopMenu({ isLoggedIn }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (<>
    {isLoggedIn ? (
       <div className="hidden 2xl:flex items-center gap-[16px]">
       {/* Notification */}
       <div className="relative flex justify-center items-center h-[48px] w-[48px] bg-white border border-neutral-200 rounded-full">
         <Bell className="text-neutral-400 stroke-[1px]" />
         <span className="absolute top-1 right-1 h-[8px] w-[8px] bg-brand-red rounded-full" />
       </div>
 
       {/* Profile dropdown */}
       <div ref={ref} className="relative">
         <button
           onClick={() => setOpen((prev) => !prev)}
           className="flex items-center gap-[8px] focus:outline-none hover:cursor-pointer"
         >
           <img
             src={man}
             className="w-[48px] h-[48px] rounded-full object-cover"
             alt="profile image"
           />
           <span className="text-body-1 text-neutral-500">Moodang</span>
           <ChevronDown
             className={`w-[16px] h-[16px] text-neutral-400 transition-transform ${
               open ? "rotate-180" : ""
             }`}
           />
         </button>
 
         {open && (
           <div className="absolute right-0 mt-2 w-[200px] rounded-[12px] text-neutral-500 bg-neutral-100 border shadow-lg py-2 z-50">
             <button
               onClick={() => navigate("/profile")}
               className="flex w-full items-center gap-3 px-4 py-2 transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
             >
               <UserRound className="w-4 h-4 text-neutral-400" />
               <span>Profile</span>
             </button>
 
             <button
               onClick={() => navigate("/reset-password")}
               className="flex w-full items-center gap-3 px-4 py-2 transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
             >
               <RotateCw className="w-4 h-4 text-neutral-400" />
               <span>Reset password</span>
             </button>
 
             <div className="my-2 h-px bg-neutral-200" />
 
             <button
               onClick={() => {
                 // logout logic
                 navigate("/")
                 setOpen(false);
               }}
               className="flex w-full items-center gap-3 px-4 py-2  transition-all duration-200 ease-out hover:translate-x-1 cursor-pointer"
             >
               <LogOut className="w-4 h-4" />
               <span>Log out</span>
             </button>
           </div>
         )}
       </div>
     </div>
    )
      : (
        <div className="hidden 2xl:flex flex-row gap-[8px]">
          <Button buttonText="Log in" buttonStyle="secondary" onClick={() => navigate("/login")} />
          <Button buttonText="Sign up" buttonStyle="primary" onClick={() => navigate("/signup")} />
        </div>)}

  </>);
}

export default DesktopMenu;