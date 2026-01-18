// Button.jsx
function Button(props) {
  let style = "";
  if (props.buttonStyle === "primary") {
    style =
      `${props.className} text-body-1 border border-neutral-600 hover:border-neutral-400 bg-neutral-600 hover:bg-neutral-400 text-white py-[12px] ${props.px ?? "px-[40px]"}  gap-[6px] rounded-full hover:cursor-pointer hover:underline`;
  }
  if (props.buttonStyle === "secondary") {
    style =
      `${props.className} flex flex-row items-center justify-center text-body-1 border border-neutral-400 hover:border-neutral-400 bg-white text-neutral-600 hover:text-neutral-400 py-[12px] ${props.px ?? "px-[40px]"} gap-[6px] rounded-full hover:cursor-pointer hover:underline`;
  }

  return <button onClick={props.onClick}  className={style}>{props.icon && <props.icon size={24} strokeWidth={1.5} className="shrink-0 relative -top-px" />}{props.buttonText}</button>;
}

export default Button;

