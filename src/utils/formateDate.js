export default function formateDate(data) {
  const date = new Date(data);

  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatted;
}
