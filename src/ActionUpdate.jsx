import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatedTodo } from "./lib/data-server";
import toast from "react-hot-toast";
import SpinnerMini from "./ui/SpinnerMini";

function ActionUpdate({
  setIsUpdate,
  apiKey,
  valueTodo,
  todoId,
  setIsComplete,
  isComplete,
}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updatedTodo(apiKey, todoId, { todo: valueTodo }),
    onSuccess: () => {
      toast.success("Cập nhật todo thành công!");
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleUpdateTodo() {
    mutate();
    setIsUpdate(false);
  }

  return (
    <>
      <div className="flex items-center">
        <label htmlFor={todoId} className="mr-2">
          {isComplete ? "Complete" : "Not Completed"}
        </label>
        <input
          onClick={() => setIsComplete((prev) => !prev)}
          id={todoId}
          type="checkbox"
          className="form-checkbox h-5 w-5 text-gray-600 "
        />
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setIsUpdate(false)}
          type="button"
          className="bg-orange-500 hover:bg-orange-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Thoát
        </button>
        <button
          onClick={handleUpdateTodo}
          type="button"
          className="bg-teal-500 hover:bg-teal-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          {isPending ? <SpinnerMini /> : "Update"}
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
        >
          Xóa
        </button>
      </div>
    </>
  );
}

export default ActionUpdate;
