import { useEffect, useState } from "react";
import { createTodo, handleSearchTodo } from "./lib/data-server";
import Spinner from "./ui/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import TodoItem from "./TodoItem";

function TodoForm({ dataApiKey, isSearch, onSearch, setSearch }) {
  const [valueTodo, setValueTodo] = useState("");
  const [data, setData] = useState(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createTodo(dataApiKey, { todo: valueTodo }),
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
    setSearch(true);
    mutate();
  }

  let content;

  if (!data) {
    content = (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  } else if (data.data.listTodo.length === 0) {
    content = (
      <div className="text-white text-center">Không có công việc nào</div>
    );
  } else {
    content = data.data.listTodo.map((todo) => (
      <TodoItem
        key={todo._id}
        data={todo}
        apiKey={dataApiKey}
        setValueTodo={setValueTodo}
      />
    ));
  }

  useEffect(() => {
    if (!isSearch) handleSearchTodo(dataApiKey, valueTodo, setData);
  }, [isSearch, valueTodo, setData]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto border-b py-2 border-teal-600 flex gap-2"
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
          type="submit"
          className={`${
            dataApiKey ? "pointer-events-auto" : "pointer-events-none"
          } text-white bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-400 font-bold active:scale-110 transition-all duration-300`}
        >
          Thêm mới
        </button>
        <button
          onClick={onSearch}
          type="button"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-max"
        >
          Tìm kiếm
        </button>
      </form>
      {isPending && <Spinner />}
      <ul className="list-disc w-full max-w-3xl flex flex-col gap-4">
        {isSearch ? "" : content}
      </ul>
    </>
  );
}

export default TodoForm;
