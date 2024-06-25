import toast from "react-hot-toast";
import { apiUrl } from "./config";

const query = {};

export async function getApiKey(email) {
  const res = await fetch(`${apiUrl}/api-key?email=${email}`);

  if (!res.ok) {
    toast.error(`Email không tồn tại trong dữ liệu`);
    throw new Error("Email không tồn tại trong dữ liệu");
  } else {
    toast.success(`Chào mừng ${email}!`);
    const data = await res.json();

    localStorage.setItem("apiKey", data.data.apiKey);

    return data.data.apiKey;
  }
}

export async function createTodo(apiKey, body) {
  const res = await fetch(`${apiUrl}/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error("Tạo todo không thành công. Vui lòng thử lại");
  } else {
    return res.json();
  }
}

export async function getListTodo(apiKey, setData) {
  const queryString = Object.keys(query)
    ? `?${new URLSearchParams(query).toString()}`
    : "";

  const res = await fetch(`${apiUrl}/todos${queryString}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch List Todo fail!`);
  } else {
    const data = await res.json();

    if (typeof setData === "function") setData(data);

    return data;
  }
}

export async function deleteTodo(apiKey, id) {
  const res = await fetch(`${apiUrl}/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error("Xóa todo thất bại. Vui lòng thử lại");
  } else {
    return res;
  }
}

export async function updatedTodo(apiKey, id, body) {
  const res = await fetch(`${apiUrl}/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error("Sửa todo thất bại. Vui lòng thử lại");
  } else {
    return res;
  }
}

const debounce = (func, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export const handleSearchTodo = debounce((apiKey, value, setData) => {
  const keyword = value ? value.trim() : "";
  query.q = keyword;

  getListTodo(apiKey, setData);

  query.q = "";
});
