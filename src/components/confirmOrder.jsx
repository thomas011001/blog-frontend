import toast from "react-hot-toast";

export default function confirmOrder(onDelete, message) {
  toast.dismissAll();
  toast(
    (t) => (
      <span>
        {message}
        <div className="mt-2 flex gap-2 justify-between">
          <button
            onClick={() => {
              onDelete();
              toast.dismiss(t.id);
            }}
            className="bg-destructive text-destructive-foreground px-2 py-1 rounded"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-muted text-muted-foreground px-2 py-1 rounded"
          >
            Cancle
          </button>
        </div>
      </span>
    ),
    {
      duration: 4000,
    }
  );
}
