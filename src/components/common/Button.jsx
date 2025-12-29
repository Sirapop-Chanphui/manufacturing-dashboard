// Button.jsx
function Button(props) {
  let style = "";
  if (props.buttonStyle === "primary") {
    style =
      "text-body-1 border border-brown-600 hover:border-brown-400 bg-brown-600 hover:bg-brown-400 text-white py-[12px] px-[40px] gap-[6px] rounded-full hover:cursor-pointer hover:underline";
  }
  if (props.buttonStyle === "secondary") {
    style =
      "text-body-1 border border-brown-400 hover:border-brown-400 bg-white text-brown-600 hover:text-brown-400 py-[12px] px-[40px] gap-[6px] rounded-full hover:cursor-pointer hover:underline";
  }

  return <button className={style}>{props.buttonText}</button>;
}

export default Button;

