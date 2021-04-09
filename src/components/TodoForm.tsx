import React, { useState } from 'react';
import { ITodo } from '../types';

interface IProps {
  todos: ITodo[];
  setTodos: (newState: ITodo[]) => void;
}

const TodoForm = ({ todos, setTodos }: IProps): JSX.Element => {
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    const todo: ITodo = {
      id: todos.length + 1,
      content: input,
      completed: false,
    };
    setTodos([...todos, todo]);
    setInput('');
  };

  return (
    <div>
      <input onChange={(e) => setInput(e.target.value)} value={input} />
      <button className="add-todo" onClick={handleAddTodo} type="button">
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
