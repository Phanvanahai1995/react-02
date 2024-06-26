import SpinnerMini from "./ui/SpinnerMini";

function ActionTodo({ onDelete, setIsUpdate, isPending, setValueTodo }) {
  function handleDelete() {
    if (typeof setValueTodo === "function") {
      setValueTodo((prev) => (prev === "" ? true : ""));
      onDelete();
      setTimeout(() => setValueTodo(""), 50);
    } else {
      onDelete();
    }
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsUpdate(true)}
        type="button"
        className={`${
          isPending ? "pointer-events-none" : ""
        } bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2`}
      >
        Sửa
      </button>
      <button
        onClick={handleDelete}
        type="button"
        className={`${
          isPending ? "pointer-events-none" : ""
        } bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >
        {isPending ? <SpinnerMini /> : "Xóa"}
      </button>
    </div>
  );
}

export default ActionTodo;
