import toast from "react-hot-toast";
import { apiUrl } from "./config";

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

export async function getListTodo(apiKey) {
  const res = await fetch(`${apiUrl}/todos`, {
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
  });

  if (!res.ok) {
    throw new Error(`Fetch List Todo fail!`);
  } else {
    const data = await res.json();

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
