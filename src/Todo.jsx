import TodoForm from "./TodoForm";
import { getApiKey } from "./lib/data-server";
import TodoList from "./TodoList";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const apiKey = localStorage?.getItem("apiKey");

function Todo() {
  const [dataApiKey, setDataApiKey] = useState(apiKey);
  const [isSearch, setSearch] = useState(true);

  let email;

  function handleChangeSearch() {
    setSearch(false);
    toast.success("Bạn đang ở chế độ tìm kiếm");
  }

  useEffect(() => {
    async function fetchApiKey() {
      if (!apiKey) {
        email = prompt("Vui lòng nhập email của bạn!!");
        const data = await getApiKey(email);
        setDataApiKey(data);
      }
    }

    fetchApiKey();
  }, [isSearch]);

  let content;

  if (!dataApiKey) content = <div>Không có công việc nào!</div>;
  if (dataApiKey)
    content = <TodoList apiKey={dataApiKey} isSearch={isSearch} />;

  return (
    <div className="container mx-auto max-w-[800px] bg-slate-700 py-8 flex flex-col items-center gap-8">
      <h1 className="text-white text-3xl font-bold">Welcome to Todo App!</h1>
      <TodoForm
        dataApiKey={dataApiKey}
        isSearch={isSearch}
        setSearch={setSearch}
        onSearch={handleChangeSearch}
      />
      {content}
    </div>
  );
}

export default Todo;
