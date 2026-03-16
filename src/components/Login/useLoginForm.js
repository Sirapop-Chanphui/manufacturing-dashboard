import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

export function useLoginForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    // Clear field-specific error and generic form error on change
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: undefined,
      form: undefined,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email must be a valid email";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =
    (onSubmit) =>
    async (event) => {
      event.preventDefault();

      if (!validate()) {
        return;
      }

      await onSubmit(values);
    };

  return {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
  };
}

