import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import { getTodos, postTodo, putTodo } from '../utils/apiConsumer';

export type Todo = {
  id?: number;
  content: string;
  completed: boolean;
};

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    // GET request to backend and store Todos in state
    getTodos().then((data) => setTodos(data ?? []));
  }, []);

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

  const addTodo = () => {
    postTodo({ content: text, completed: false });
    setText('');
  };

  return { todos, text, updateStatus, addTodo, setText };
};

const Home: NextPage = () => {
  const { todos, text, updateStatus, addTodo, setText } = useTodos();

  return (
    <div className="py-4">
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="My ToDo App" />
      </Head>
      <main className="min-h-screen flex flex-col items-center">
        <h1 className="m-2 text-4xl font-bold">ToDo List</h1>
        <label
          htmlFor="todo-text"
          className="m-4 p-4 rounded text-white bg-slate-800"
        >
          <input
            type="text"
            className="mr-6 bg-transparent border-b border-white outline-none"
            aria-label="todo-text"
            id="todo-text"
            placeholder="Write Code"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button
            className="m-1 hover:border-b"
            onClick={addTodo}
            type="button"
          >
            Add Todo
          </button>
        </label>

        <ul className="justify-center p-0">
          {todos && todos.length
            ? todos.map((todo) => (
                <li className="todo-item" key={todo.id?.toString()}>
                  <button
                    className="todo-item"
                    type="button"
                    onClick={() => updateStatus(todo)}
                  >
                    {todo && todo.completed ? '👌' : '👋'}
                  </button>
                  <span
                    className="todo-item-text"
                    style={
                      todo.completed
                        ? { textDecoration: 'line-through' }
                        : { textDecoration: 'none' }
                    }
                  >
                    {todo.content}
                  </span>
                </li>
              ))
            : 'No todos, yay!'}
        </ul>
      </main>

      <footer className="flex flex-1 p-2">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className="h-1 ml-0.5">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
