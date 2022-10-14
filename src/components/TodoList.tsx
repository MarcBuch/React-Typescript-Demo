import React, { useState, useEffect } from "react";
import type { Todo } from "../pages";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { getTodos, putTodo } from "../utils/apiConsumer";

interface hovering {
  isHovering: boolean;
  hoveringOn: string;
}

const useTodos = () => {
  const [isHovering, setIsHovering] = useState<hovering>({
    isHovering: false,
    hoveringOn: "",
  });

  const clearHovering = (): void => {
    setIsHovering({
      isHovering: false,
      hoveringOn: "",
    });
  };

  const updateHovering = (key: string): void => {
    setIsHovering({
      isHovering: true,
      hoveringOn: key,
    });
  };

  return {
    isHovering,
    clearHovering,
    updateHovering,
  };
};

export type TodoListProps = {
  todos: Todo[];
  updateStatus: (todo: Todo) => void;
  removeTodo: (todo: Todo) => void;
};

const TodoList = ({ todos, updateStatus, removeTodo }: TodoListProps) => {
  const { isHovering, clearHovering, updateHovering } = useTodos();

  const [listRef] = useAutoAnimate<HTMLUListElement>();

  const handleMouseOver =
    (key: string) => (event: React.MouseEvent<HTMLLIElement>) => {
      updateHovering(key);
    };

  const handleMouseOut = () => {
    clearHovering();
  };

  return (
    <ul className="justify-center max-w-lg" ref={listRef}>
      {todos && todos.length
        ? todos.map((todo) => (
            <li
              className="mt-3 flex"
              key={todo.id?.toString()}
              onMouseOver={handleMouseOver(todo.id?.toString() ?? "")}
              onMouseOut={handleMouseOut}
            >
              <button
                className="mr-2"
                type="button"
                onClick={() => updateStatus(todo)}
              >
                {todo && todo.completed ? "👌" : "👋"}
              </button>
              <p
                className={`break-all ${todo.completed ? "line-through" : ""}`}
              >
                {todo.content}
              </p>
              {isHovering.isHovering &&
              isHovering.hoveringOn === todo.id?.toString() ? (
                <button
                  className="ml-1 w-5 h-6"
                  type="button"
                  onClick={() => removeTodo(todo)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="ml-1 w-5 h-6"
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
            </li>
          ))
        : "No todos, yay!"}
    </ul>
  );
};

export default TodoList;
