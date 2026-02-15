import { toast } from "sonner";

export function showAuthErrorToast(error) {
  toast.custom(
    (t) => (
      <div className="hidden 2xl:flex w-[700px] items-start gap-[12px] rounded-[8px] bg-brand-red p-4 shadow-lg relative">
        <div className="flex flex-col gap-1">
          <p className="text-headline-4 text-white">
            {error.message}
          </p>
          <p className="text-body-2 text-white">
            Please try another password or email
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t)}
          className="absolute top-4 right-6 text-white opacity-80 hover:opacity-100"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    ),
    { duration: 5000 }
  );
}
