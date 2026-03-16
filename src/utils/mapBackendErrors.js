export const mapBackendErrors = (error) => {
    // Zod format
    if (error?.errors?.fieldErrors) {
      const formatted = {};
  
      Object.entries(error.errors.fieldErrors).forEach(([key, value]) => {
        formatted[key] = Array.isArray(value) ? value[0] : value;
      });
  
      return formatted;
    }
  
    // General message (เช่น duplicate email)
    if (error?.message) {
      return { form: error.message };
    }
  
    return { form: "Something went wrong" };
  };
  
  