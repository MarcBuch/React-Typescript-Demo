import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.sass';
import React, { useState, useEffect } from 'react';

import { getTodos, postTodo, putTodo } from './apiConsumer';

export type Todo = {
  id?: number;
  content: string;
  completed: boolean;
};

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getTodos().then((data) => setTodos(data ?? []));
  }, [todos]);

  const addTodo = () => {
    postTodo({ content: text, completed: false });
    setText('');
  };

  const updateStatus = (todo: Todo) => {
    todo.completed = !todo.completed;
    putTodo(todo);
  };

  return { todos, text, updateStatus, addTodo, setText };
};

const Home: NextPage = () => {
  const { todos, text, updateStatus, addTodo, setText } = useTodos();

  return (
    <div className={styles.container}>
      <Head>
        <title>ToDo App</title>
        <meta name="description" content="My ToDo App" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>ToDo List</h1>
        <label htmlFor="todo-text" className={styles.action}>
          <input
            aria-label="todo-text"
            id="todo-text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button className="add-todo" onClick={addTodo} type="button">
            Add Todo
          </button>
        </label>

        <ul className={styles.list}>
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

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
