import masker from "../../assets/masker/masker";
import tokens from "../../assets/masker/tokens";
import { getIcon } from "../../assets/utils";
function Input(props: any) {
  let {
    id,
    name,
    value,
    mask = "P".repeat(240),
    token = tokens,
    className = "",
    icon,
    iconAction,
    onKeyPress,
    type = "text",
    onChange,
    placeholder = "Placeholder",
    label = "",
    errorMessage = "",
    infoMessage = "",
    required = false,
  } = props;

  const refresh = (st: string | any): string | void => masker(st, mask, true, token);
  const changes = (e: Event | any) => {
    const el: Element | any = document.getElementById(id);
    const value = e.target.value || "";

    onChange(refresh(value));
    el.value = refresh(value);
  };
  const inputOrTextarea =
    type === "textarea" ? (
      <textarea
        className="min-h-[3rem] max-h-[250px] w-full max-w-full min-w-full outline-none px-4 rounded-md border-2"
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={changes}
        required={required}
      />
    ) : (
      <input
        className="bg-[transparent] h-12 placeholder:p-2 px-4 outline-none w-full rounded-md border-solid border-2"
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={changes}
        required={required}
        onKeyDown={onKeyPress}
      />
    );
  return (
    <div className={`input relative h-12 bg-[transparent] ${className}`}>
      <label className="block mb-1" htmlFor={id}>
        {label}
      </label>
      {inputOrTextarea}
      {getIcon(icon) && (
        <img
          className="absolute float-right bottom-[16%] right-[10px] h-[34px] w-[34px] cursor-pointer"
          onClick={() => {
            iconAction("Lucas");
          }}
          src={getIcon(icon)}
          alt={`${name}-icon`}
        />
      )}
      {!!errorMessage && (
        <span className="text-[red] ml-2 text-[12px]">
          {errorMessage}
        </span>
      )}
      {!!infoMessage && (
        <span className="text-[blue] ml-2 text-[12px]">
          {infoMessage}
        </span>
      )}
    </div>
  );
}

export default Input;
