import { useEffect, useState } from "react";
import { createTodo } from "./lib/data-server";
import Spinner from "./ui/Spinner";
import TodoList from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function TodoForm() {
  const [apiKey, setApiKey] = useState(null);
  const [valueTodo, setValueTodo] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    setTimeout(() => {
      setApiKey(localStorage.getItem("apiKey"));
    }, 1000);
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: () => createTodo(apiKey, { todo: valueTodo }),
    onSuccess: () => {
      toast.success(`Thêm todo thành công`);
      setValueTodo("");
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleChange(e) {
    setValueTodo(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutate();
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto border-b py-2 border-teal-600"
      >
        <input
          onChange={handleChange}
          value={valueTodo}
          type="text"
          name="todo"
          min={1}
          placeholder="Thêm một việc làm mới"
          className="bg-slate-700 text-white placeholder:text-gray-400 w-64 px-3 py-1.5 border-none outline-none"
        />
        <button
          className={`${
            apiKey ? "pointer-events-auto" : "pointer-events-none"
          } text-white bg-teal-600 px-4 py-1.5 rounded-md hover:bg-teal-400 active:scale-110 transition-all duration-300`}
        >
          Thêm mới
        </button>
      </form>
    </>
  );
}

export default TodoForm;
