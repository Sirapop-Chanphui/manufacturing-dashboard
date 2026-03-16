import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResetPasswordDesktop from "@/components/membermanagement/ResetPassword/ResetPasswordDesktop";
import ResetPasswordMobile from "@/components/membermanagement/ResetPassword/ResetPasswordMobile";
import PasswordChangeConfirmDialog from "@/components/membermanagement/ResetPassword/PasswordChangeConfirmDialog";


function ResetPasswordPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault()
    setShowLoginDialog(true)

  }

  const handleConfirmReset = async () => {
    //1. validate
    if (values.newPassword !== values.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 2. call API
    // await resetPassword(values)

    // 3. close dialog
    setShowLoginDialog(false);

    // 4. navigate
    navigate("/login");
  };


  return (
    <>
      <ResetPasswordDesktop
        values={values}
        onChange={handleChange}
        onSubmit={handleResetPassword}
      />
      <div className="2xl:hidden">
        <ResetPasswordMobile
          values={values}
          onChange={handleChange}
          onSubmit={handleResetPassword}
        />
      </div>

      <PasswordChangeConfirmDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onConfirm={handleConfirmReset}
      />
    </>
  );
}
export default ResetPasswordPage
