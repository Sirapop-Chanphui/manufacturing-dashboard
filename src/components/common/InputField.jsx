function InputField({
    label,
    name,
    type = "text",
    value,
    error,
    onChange,
    placeholder,
}) {
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : null;
    return (
        <div className="flex flex-col gap-[4px]">
            <label htmlFor={name} className="text-body-1 text-neutral-400 caret-transparent">{label}</label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                aria-invalid={hasError}
                aria-describedby={errorMessage ? `${name}-error` : undefined}
                className={`
 rounded-[8px] border pl-[16px] pr-[12px] py-[12px] text-body-1 bg-white focus:outline-none focus:ring-1
            ${hasError
                        ? "border-red-400 focus:ring-red-400 text-red-500"
                        : "border-neutral-300 focus:ring-neutral-400"
                    }
          `}
            />

            {errorMessage && (<span id={`${name}-error`} className="text-xs text-red-500" > {errorMessage} </span>
            )}
        </div>
    );
}

export default InputField;
