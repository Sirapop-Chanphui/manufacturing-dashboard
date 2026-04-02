import { useState } from "react";
import ResetPasswordDesktop from "@/components/membermanagement/ResetPassword/ResetPasswordDesktop";
import ResetPasswordMobile from "@/components/membermanagement/ResetPassword/ResetPasswordMobile";
import PasswordChangeConfirmDialog from "@/components/membermanagement/ResetPassword/PasswordChangeConfirmDialog";
import axios from "axios";
import { toast } from "sonner";
import { mapBackendErrors } from "@/utils/mapBackendErrors";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ResetPasswordPage() {

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setShowLoginDialog(true);
  };

  const handleConfirmReset = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});

      await axios.put(`${API_BASE_URL}/user/password`, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      });

      toast.success("Password updated successfully");
      setValues(initialValues);
      setErrors({});
      setShowLoginDialog(false);
    } catch (err) {
      const payload = err.response?.data;
      const nextErrors = mapBackendErrors(payload);
      setErrors(nextErrors);
      setShowLoginDialog(false);

      if (nextErrors?.form) toast.error(nextErrors.form);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ResetPasswordDesktop
        values={values}
        onChange={handleChange}
        onSubmit={handleResetPassword}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      <div className="2xl:hidden">
        <ResetPasswordMobile
          values={values}
          onChange={handleChange}
          onSubmit={handleResetPassword}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>

      <PasswordChangeConfirmDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onConfirm={handleConfirmReset}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
export default ResetPasswordPage
