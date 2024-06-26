import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "./lib/data-server";
import toast from "react-hot-toast";
import { useState } from "react";
import ActionTodo from "./ActionTodo";
import ActionUpdate from "./ActionUpdate";

function TodoItem({ data, apiKey, setValueTodo }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [valueTodoUpdate, setValueTodoUpdate] = useState(data.todo);
  const [isComplete, setIsComplete] = useState(data.isCompleted);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteTodo(apiKey, data._id),
    onSuccess: () => {
      toast.success("Xóa todo thành công");
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleChange(e) {
    setValueTodoUpdate(e.target.value);
  }

  function handleDelete() {
    if (confirm("Bạn có chắc chắn muốn xóa")) mutate();
  }

  return (
    <li className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <input
        onChange={handleChange}
        className={`${
          isComplete ? "line-through" : ""
        }   appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        readOnly={!isUpdate}
        defaultValue={data.todo}
      />
      <div className="flex items-center justify-between mt-4">
        {isUpdate ? (
          <ActionUpdate
            todoId={data._id}
            apiKey={apiKey}
            setIsUpdate={setIsUpdate}
            valueTodo={valueTodoUpdate}
            setIsComplete={setIsComplete}
            isComplete={isComplete}
            onDelete={handleDelete}
            setValueTodo={setValueTodo}
          />
        ) : (
          <ActionTodo
            setIsUpdate={setIsUpdate}
            onDelete={handleDelete}
            isPending={isPending}
            setValueTodo={setValueTodo}
          />
        )}
      </div>
    </li>
  );
}

export default TodoItem;
