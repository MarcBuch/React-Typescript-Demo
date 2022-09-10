import React, { useState } from 'react';

import { ITodo } from './types';

const useTodos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [text, setText] = useState('');

  const addTodo = () => {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        content: text,
        completed: false,
      },
    ]);
    setText('');
  };

  const updateStatus = (todo: ITodo): void => {
    const newTodos = todos;
    const index = todos.findIndex((i) => i.id === todo.id);
    newTodos[index] = { ...todo, completed: !todo.completed };
    setTodos([...newTodos]);
  };

  return { todos, updateStatus, addTodo, setText, text };
};

export function Todo(): JSX.Element {
  const { todos, updateStatus, addTodo, setText, text } = useTodos();

  return (
    <>
      <label htmlFor="todo-text">
        <h1 className="text-3xl font-bold underline">Todo List</h1>
        <input
          aria-label="todo-text"
          id="todo-text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </label>
      <button className="add-todo" onClick={addTodo} type="button">
        Add Todo
      </button>
      <ul className="todo-list">
        {todos && todos.length
          ? todos.map((todo) => (
              <li className="todo-item" id={todo.id.toString()}>
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
    </>
  );
}

export default Todo;
