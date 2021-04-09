import React from 'react';
import Todo from './Todo';
import { ITodo } from '../types';

interface IProps {
  todos: ITodo[];
  setTodos: (newState: ITodo[]) => void;
}

const TodoList = ({ todos, setTodos }: IProps): JSX.Element => {
  const updateTodo = (todo: ITodo): void => {
    const newTodos = todos;
    const index = todos.findIndex((i) => i.id === todo.id);
    newTodos[index] = todo;
    setTodos([...newTodos]);
  };

  return (
    <ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo) => (
            <Todo key={todo.id} todo={todo} updateTodo={updateTodo} />
          ))
        : 'No todos, yay!'}
    </ul>
  );
};

export default TodoList;
