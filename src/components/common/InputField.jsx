import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function InputField({
  label,
  name,
  type = "text",
  value,
  error,
  onChange,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const hasError = Boolean(error);
  const errorMessage = typeof error === "string" ? error : null;

  return (
    <div className="flex flex-col gap-[4px]">
      <label
        htmlFor={name}
        className="text-body-1 text-neutral-400 caret-transparent"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={errorMessage ? `${name}-error` : undefined}
          className={`
            w-full rounded-[8px] border pl-[16px] pr-[44px] py-[12px] text-body-1 bg-white
            focus:outline-none focus:ring-1
            ${hasError
              ? "border-red-400 focus:ring-red-400 text-red-500"
              : "border-neutral-300 focus:ring-neutral-400"}
          `}
        />

        {/* 👁 Toggle password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <span id={`${name}-error`} className="text-xs text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default InputField;

