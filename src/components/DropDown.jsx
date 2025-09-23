function DropDown({ children, className = "" }) {
  return (
    <div
      className={`flex justify-center items-center sm:relative ${className}`}
    >
      {children}
    </div>
  );
}

export function DropDownLink({ children, className = "" }) {
  return (
    <div
      className={`p-2 font-sans text-foreground hover:bg-muted ${className}`}
    >
      {children}
    </div>
  );
}

export function DropDownMenu({ children, state, className = "" }) {
  return (
    <div
      className={`flex flex-col w-full justify-center p-10 right-0 top-0 absolute h-dvh bg-card sm:p-0 sm:top-10  sm:right-5 sm:h-auto sm:w-50  sm:rounded py-3 shadow-2xl  ${
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
