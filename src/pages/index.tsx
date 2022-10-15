import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getTodos, postTodo, putTodo, deleteTodo } from "../utils/apiConsumer";
import TodoList from "../components/TodoList";
import { Toggle } from "../components/ThemeToggle";

export type Todo = {
  id?: number;
  content: string;
  completed: boolean;
};

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // GET request to backend and store Todos in state
    getTodos().then((data) => setTodos(data ?? []));
  }, []);

  const addTodo = async () => {
    const newTodo = { content: text, completed: false };

    const data = await postTodo(newTodo);

    if (data) {
      setTodos([...todos, data]);
    }
    setText("");
  };

  const updateStatus = (todo: Todo) => {
    todo.completed = !todo.completed;
    const newTodos = todos;
    const index = todos.findIndex((i) => i.id === todo.id);
    newTodos[index] = todo;

    // Update State
    setTodos([...newTodos]);

    // PUT request to backend
    putTodo(todo);
  };

  const removeTodo = (todo: Todo) => {
    const newTodos = todos;
    const index = newTodos.findIndex((i) => i.id === todo.id);
    if (index > -1) {
      newTodos.splice(index, 1);
    }

    // Update State
    setTodos([...newTodos]);

    // DELETE request to backend
    deleteTodo(todo);
  };

  return {
    todos,
    text,
    setText,
    addTodo,
    updateStatus,
    removeTodo,
  };
};

const Home: NextPage = () => {
  const { todos, text, setText, addTodo, updateStatus, removeTodo } =
    useTodos();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  return (
    <div className="py-4 min-h-screen flex flex-col items-center dark:bg-slate-900 dark:text-white">
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="ToDo App" />
      </Head>
      <main className="flex flex-col flex-1 items-center">
        <h1 className="m-2 text-4xl font-bold">ToDo List</h1>
        <div className="m-4 p-5 w-full max-w-lg rounded text-white bg-slate-800 flex justify-evenly ">
          <input
            type="text"
            className="w-full max-w-xs bg-transparent border-b border-white outline-none"
            id="todo-text"
            placeholder="Write Code ..."
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            value={text}
          />
          <button
            className="ml-5 w-1/3 hover:border-b"
            onClick={addTodo}
            type="button"
          >
            Add Todo
          </button>{" "}
        </div>
        <TodoList
          todos={todos}
          updateStatus={updateStatus}
          removeTodo={removeTodo}
        />
      </main>

      <footer className="mt-auto w-full max-w-xl flex flex-row justify-around">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="h-1 ml-0.5">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        <Toggle />
      </footer>
    </div>
  );
};

export default Home;
