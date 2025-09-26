function DropDown({ children, className = "" }) {
  return (
    <div
      className={`flex justify-center items-center sm:relative ${className}`}
    >
      {children}
    </div>
  );
}

export function DropDownLink({ children, className = "", onClick }) {
  return (
    <div
      className={`p-1 font-sans text-foreground hover:bg-muted m-1 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function DropDownMenu({ children, state, className = "" }) {
  return (
    <div
      className={`flex flex-col absolute justify-center bg-card p-0 top-10  right-5 h-auto w-50  rounded py-3 shadow-2xl  ${
        !state ? "hidden" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function DropDownButton({ children, handle, className = "" }) {
  return (
    <button className={` cursor-pointer ${className}`} onClick={handle}>
      {children}
    </button>
  );
}

export default DropDown;
