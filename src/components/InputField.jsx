export function Input({
  placeholder,
  value,
  handler,
  type = "text",
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      className={`border-border px-5 text-foreground bg-input h-12 border  rounded ${className}`}
      value={value}
      onChange={handler}
      placeholder={placeholder}
      {...props}
    />
  );
}

export function InputTitle({ children, className = "" }) {
  return (
    <p className={`text-foreground font-semibold font-sans ${className}`}>
      {children}
    </p>
  );
}

export function InputField({ children, className = "" }) {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
}

export function TextArea({
  placeholder,
  value,
  handler,
  type = "text",
  className = "",
  ...props
}) {
  return (
    <textarea
      type={type}
      className={`border-border px-5 py-3 text-foreground bg-input border rounded ${className}`}
      value={value}
      onChange={handler}
      placeholder={placeholder}
      {...props}
    />
  );
}
