import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useTodos, addTodo, putTodo, deleteTodo } from "../utils/apiConsumer";
import TodoItem from "../components/TodoItem";
import { Toggle } from "../components/ThemeToggle";

export type Todo = {
  id?: number;
  content: string;
  completed: boolean;
};

export type ItemChangeHandler = (
  method: "update" | "delete",
  todo: Todo
) => void;

const Home: NextPage = () => {
  const { todos, isLoading, isError } = useTodos();
  const [text, setText] = useState("");

  const [listRef] = useAutoAnimate<HTMLUListElement>();

  const handleSubmitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();

      addTodo(text);
      setText("");
    }
  };

  const handleSubmitOnClick = () => {
    addTodo(text);
    setText("");
  };

  const handleItemChange: ItemChangeHandler = (method: string, todo: Todo) => {
    switch (method) {
      case "update":
        console.log(`Index - handleItemChange - ${todo.content}`);
        putTodo(todo);
        break;

      case "delete":
        deleteTodo(todo);
        break;
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
            onKeyPress={handleSubmitOnEnter}
            value={text}
          />
          <button
            className="ml-5 w-1/3 hover:border-b"
            onClick={handleSubmitOnClick}
            type="button"
          >
            Add Todo
          </button>{" "}
        </div>
        {isError ? (
          <p>Don`t Panic, there might be some issues ...</p>
        ) : (
          <ul className="justify-center max-w-lg w-full" ref={listRef}>
            {todos && todos.length
              ? todos.map((todo) => (
                  <TodoItem
                    key={todo.id?.toString() ?? ""}
                    todo={todo}
                    onItemChange={handleItemChange}
                  />
                ))
              : "No todos, yay!"}
          </ul>
        )}
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
