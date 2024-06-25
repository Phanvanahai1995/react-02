import { useQuery } from "@tanstack/react-query";
import TodoItem from "./TodoItem";
import Spinner from "./ui/Spinner";
import { getListTodo } from "./lib/data-server";

function TodoList({ apiKey, isSearch }) {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["todo"],
    queryFn: () => getListTodo(apiKey),
  });

  let content;

  if (isLoading)
    content = (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  if (isError) content = <div>Fetching Todo fail!</div>;

  if (isSuccess)
    if (data.data.listTodo.length === 0) {
      content = (
        <div className="text-white text-center">Không có công việc nào</div>
      );
    } else {
      content = data.data.listTodo.map((todo) => (
        <TodoItem key={todo._id} data={todo} apiKey={apiKey} />
      ));
    }

  return (
    <ul className="list-disc w-full max-w-3xl flex flex-col gap-4">
      {isSearch && content}
    </ul>
  );
}

export default TodoList;
