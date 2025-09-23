export default function Avatar({ children, className = "" }) {
  return (
    <div
      className={`p-0.5 border-destructive border-3 rounded-full ${className}`}
    >
      {children}
    </div>
  );
}

export function AvatarImg({ src, width, className = "" }) {
  return (
    <img
      src={src}
      className={`rounded-full aspect-square ${className}`}
      width={width}
    />
  );
}
