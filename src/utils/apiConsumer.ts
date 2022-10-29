import useSWR from "swr";
import type { Todo } from "../pages";

const baseUrl = "/api/todos";

declare function fetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response>;

const fetcher = async (
  input: RequestInfo,
  init: RequestInit,
  ...args: any[]
): Promise<Todo[] | undefined> => {
  const res = await fetch(input, init);
  return res.json();
};

export const useTodos = () => {
  const { data, error } = useSWR("/api/todos", fetcher);

  return {
    todos: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// TODO: Look into useSWRMutation
export const addTodo = async (text: string) => {
  const newTodo = { content: text, completed: false };

  await postTodo(newTodo);
};

export const postTodo = async (todo: Todo): Promise<Todo | undefined> => {
  try {
    const res = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const putTodo = async (todo: Todo): Promise<Todo | undefined> => {
  try {
    const res = await fetch(baseUrl, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!res.ok) {
      console.log(res);
      throw new Error(`Error apiConsumer putTodo - ${res.status} ${res.text}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (todo: Todo): Promise<Todo | undefined> => {
  try {
    const res = await fetch(baseUrl, {
      method: "DELETE",
      body: JSON.stringify({ id: todo.id }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!res.ok) {
      console.log(res);
      throw new Error(
        `Error apiConsumer deleteTodo - ${res.status} ${res.text}`
      );
    }

    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    console.log(err);
  }
};
