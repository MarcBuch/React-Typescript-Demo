import React from 'react';

import { ITodo } from '../types';

interface IProps {
  todo: ITodo;
  updateTodo: (todo: ITodo) => void;
}

const Todo = ({ todo, updateTodo }: IProps): JSX.Element => {
  const handleUpdateStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateTodo({ ...todo, completed: !todo.completed });
  };

  return (
    <li className="todo-item" id={todo.id.toString()}>
      <button className="todo-item" type="button" onClick={handleUpdateStatus}>
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
  );
};

export default Todo;
