function InputField({
    label,
    name,
    type = "text",
    value,
    error,
    onChange,
    placeholder,
}) {
    return (
        <div className="flex flex-col gap-[4px]">
            <label htmlFor={name} className="text-body-1 text-neutral-400">{label}</label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
            rounded-[8px] border pl-[16px] pr-[12px] py-[12px] text-body-1 bg-white focus:outline-none focus:ring-1
            ${error
                        ? "border-red-400 focus:ring-red-400"
                        : "border-neutral-300 focus:ring-neutral-400"
                    }
          `}
            />

            {error && (
                <span  id={`${name}-error`} className="text-xs text-red-500">{error}</span>
            )}
        </div>
    );
}

export default InputField;
