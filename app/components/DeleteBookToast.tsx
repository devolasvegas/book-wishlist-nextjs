import { ToastContentProps } from "react-toastify";

const DeleteBookToast = ({ closeToast }: ToastContentProps) => {
  return (
    // using a grid with 3 columns
    <div className="grid grid-cols-[1fr_1px_80px] w-full">
      <div className="flex flex-col p-4">
        <h3 className="text-zinc-800 text-sm font-semibold">Please Confirm</h3>
        <p className="text-sm text-red-600">Do you want to delete this book?</p>
      </div>
      {/* that's the vertical line which separate the text and the buttons*/}
      <div className="bg-zinc-900/20 h-full" />
      <div className="grid grid-rows-[1fr_1px_1fr] h-full">
        {/*specifying a custom closure reason that can be used with the onClose callback*/}
        <button
          onClick={() => closeToast("delete")}
          className="bg-red-600 text-white"
        >
          Delete
        </button>
        <div className="bg-zinc-900/20 w-full" />
        {/*specifying a custom closure reason that can be used with the onClose callback*/}
        <button onClick={() => closeToast("cancel")} className="text-red-600">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteBookToast;
