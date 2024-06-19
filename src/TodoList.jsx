import TodoItem from "./TodoItem";

function TodoList({ data, apiKey }) {
  if (data.length === 0) return <div>Không có công việc nào</div>;

  return (
    <ul className="list-disc w-full max-w-3xl flex flex-col gap-4">
      {data.map((todo) => (
        <TodoItem key={todo._id} data={todo} apiKey={apiKey} />
      ))}
    </ul>
  );
}

export default TodoList;
