export function Card({ children, className }) {
  return (
    <div
      className={`bg-input p-5 flex flex-col items-center w-1/1 max-w-100 gap-10 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={`flex flex-col gap-3 items-center ${className}`}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }) {
  return (
    <div className={`flex flex-col items-center w-1/1 ${className}`}>
      {children}
    </div>
  );
}
