import TodoForm from "./TodoForm";
import { getApiKey } from "./lib/data-server";
import Spinner from "./ui/Spinner";
import TodoList from "./TodoList";

import { useEffect, useState } from "react";

const apiKey = localStorage?.getItem("apiKey");

function Todo() {
  const [dataApiKey, setDataApiKey] = useState(apiKey);

  let email;

  useEffect(() => {
    console.log("ok");
    async function fetchApiKey() {
      if (!apiKey) {
        email = prompt("Vui lòng nhập email của bạn!!");
        const data = await getApiKey(email);
        setDataApiKey(data);
      }
    }

    fetchApiKey();
  }, []);

  let content;

  if (!dataApiKey) content = <div>Không có công việc nào!</div>;
  if (dataApiKey) content = <TodoList apiKey={dataApiKey} />;

  return (
    <div className="container mx-auto max-w-[800px] bg-slate-700 py-8 flex flex-col items-center gap-8">
      <h1 className="text-white text-3xl font-bold">Welcome to Todo App!</h1>
      <TodoForm dataApiKey={dataApiKey} />
      {content}
    </div>
  );
}

export default Todo;
