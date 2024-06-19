import { useQuery } from "@tanstack/react-query";
import TodoForm from "./TodoForm";
import { getApiKey, getListTodo } from "./lib/data-server";
import Spinner from "./ui/Spinner";
import TodoList from "./TodoList";

function Todo() {
  let email;
  const apiKey = localStorage?.getItem("apiKey");

  if (!apiKey) {
    email = prompt("Vui lòng nhập email của bạn!!");

    getApiKey(email);
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todo"],
    queryFn: () => getListTodo(apiKey),
  });

  let content;

  if (isLoading) content = <Spinner />;

  if (isError) content = <div>Fetching Todo fail!</div>;

  if (data) content = <TodoList data={data.data.listTodo} apiKey={apiKey} />;

  return (
    <div className="container mx-auto max-w-[800px] bg-slate-700 py-8 flex flex-col items-center gap-8">
      <h1 className="text-white text-3xl font-bold">Welcome to Todo App!</h1>
      <TodoForm />
      {content}
    </div>
  );
}

export default Todo;
