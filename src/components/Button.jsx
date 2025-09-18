export function Button({
  children,
  className = "",
  variant = "primary",
  outline = false,
  ...props
}) {
  const baseStyles =
    "rounded h-12 px-4 font-semibold transition hover:opacity-90";

  const variants = {
    primary: outline
      ? "border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition"
      : "bg-primary text-primary-foreground hover:opacity-90 <transition></transition>",
    secondary: outline
      ? "border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground transition"
      : "bg-secondary text-secondary-foreground hover:opacity-90 transition",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
