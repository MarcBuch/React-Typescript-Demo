import React, { useState } from 'react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import { ITodo } from './types';

export const App = (): JSX.Element => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
