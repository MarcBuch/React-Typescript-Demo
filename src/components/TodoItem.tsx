import React, { useState } from "react";
import type { Todo, ItemChangeHandler } from "../pages";

interface TodoItemProps {
  key: string;
  todo: Todo;
  onItemChange: ItemChangeHandler;
}

const TodoItem = ({ key, todo, onItemChange }: TodoItemProps) => {
  const [text, setText] = useState(todo.content);
  const [showToolbox, setShowToolbox] = useState(false);

  const handleUpdateContent = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.key == "Enter") {
      handleExpandToolbox();
      const newTodo = todo;
      newTodo.content = text;
      onItemChange("update", todo);
    }
  };

  const handleExpandToolbox = () => {
    setShowToolbox(!showToolbox);
  };

  const handleComplete = () => {
    const newTodo = todo;
    newTodo.completed = !todo.completed;

    onItemChange("update", newTodo);
  };

  return (
    <li className="mt-3 p-1 border rounded flex" key={key}>
      <button className="ml-1" type="button" onClick={() => handleComplete()}>
        {todo && todo.completed ? "👌" : "👋"}
      </button>
      <div className="my-1 flex flex-col w-full" onClick={handleExpandToolbox}>
        <form onSubmit={handleUpdateContent}>
          <input
            type="text"
            className={`mx-1.5 w-full ${todo.completed ? "line-through" : ""}`}
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </form>
        {showToolbox ? (
          <button
            className="mt-1 py-1 w-8 hover:rounded-full hover:bg-slate-400 hover:text-white"
            type="button"
            onClick={() => onItemChange("delete", todo)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mx-1.5 w-5 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        ) : (
          ""
        )}
      </div>
    </li>
  );
};

export default TodoItem;
