// Button.jsx
function Button(props) {
  let style = "";
  if (props.buttonStyle === "primary") {
    style =
      "text-body-1 border border-neutral-600 hover:border-neutral-400 bg-neutral-600 hover:bg-neutral-400 text-white py-[12px] px-[40px] gap-[6px] rounded-full hover:cursor-pointer hover:underline";
  }
  if (props.buttonStyle === "secondary") {
    style =
      "text-body-1 border border-neutral-400 hover:border-neutral-400 bg-white text-neutral-600 hover:text-neutral-400 py-[12px] px-[40px] gap-[6px] rounded-full hover:cursor-pointer hover:underline";
  }

  return <button className={style}>{props.buttonText}</button>;
}

export default Button;

