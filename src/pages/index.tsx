import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getTodos, postTodo, putTodo } from "../utils/apiConsumer";
import TodoList from "../components/TodoList";

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
      console.log(data);
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
    console.log("Updating state");

    // PUT request to backend
    putTodo(todo);
  };

  return {
    todos,
    text,
    setText,
    addTodo,
    updateStatus,
  };
};

const Home: NextPage = () => {
  const { todos, text, setText, addTodo, updateStatus } = useTodos();

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
            value={text}
          />
          <button className="hover:border-b" onClick={addTodo} type="button">
            Add Todo
          </button>
        </div>
        <TodoList todos={todos} updateStatus={updateStatus} />
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
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default Home;
