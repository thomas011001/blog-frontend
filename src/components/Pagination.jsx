import { Button } from "./Button";

export default function Pagination({ value, handler, className, meta }) {
  const nextHandler = () => handler(value + 1);
  const prevHandler = () => {
    if (value > 1) handler(value - 1);
  };
  return (
    <div className={`flex justify-center h-10 ${className}`}>
      <Button
        className={`rounded-r-none h-full `}
        onClick={prevHandler}
        disabled={value <= 1}
      >
        Previous
      </Button>
      <p className="flex items-center justify-center px-2 border-primary border-t-1 border-b-1 max-w-15 w-full">
        {value}
      </p>
      <Button
        className="rounded-l-none h-full"
        onClick={nextHandler}
        disabled={value >= meta?.totalPages}
      >
        Next
      </Button>
    </div>
  );
}
