import { ArrowDownUp } from "lucide-react";

export default function SortBy({ value, setValue }) {
  return (
    <button
      className={`p-1 size-7 transition flex items-center rounded-md border-1 border-primary cursor-pointer bg-gray-300 text-primary ${
        value ? " bg-gray-800 text-primary-foreground" : ""
      }`}
      onClick={() => setValue(!value)}
    >
      <ArrowDownUp />
    </button>
  );
}
