import { useNavigate } from "react-router-dom";
import RegistrationSuccess from "../components/SignUp/RegistrationSuccess";

function RegistrationSuccessPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center bg-neutral-100 px-4">
      <RegistrationSuccess
        onAction={() => navigate("/login")}
      />
    </main>
  );
}

export default RegistrationSuccessPage;

