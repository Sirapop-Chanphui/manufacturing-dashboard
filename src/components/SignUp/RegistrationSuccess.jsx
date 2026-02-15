import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authentication";

function RegistrationSuccess() {
  const navigate = useNavigate();
  const { state } = useAuth();
  return (
    <div className="flex flex-col items-center w-full 2xl:w-[798px] h-fit  bg-neutral-200 rounded-2xl mt-[88px] 2xl:mt-[140px] 2xl:px-[120px] 2xl:py-[60px] p-8  gap-[40px] text-center caret-transparent">
      <div className="w-[80px] h-[80px] rounded-full bg-brand-green text-headline-2 text-white flex items-center justify-center text-2xl">
        ✓
      </div>

      <h1 className="2xl:hidden text-headline-3 font-semibold">
        Registration success
      </h1>

      <h1 className="hidden 2xl:flex text-headline-2  font-semibold">
        Registration success
      </h1>
      <Button
        buttonStyle="primary"
        buttonText={state.loading ? "Continue..." : "Continue"}
        className="w-fit justify-center"
        onClick={() => navigate("/login")}
      />
    </div>
  );
}

export default RegistrationSuccess;