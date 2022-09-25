import type { Todo } from '.';

export const getTodos = async (): Promise<Todo[] | undefined> => {
  try {
    const res = await fetch('http://localhost:3000/api/todos');
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const postTodo = async (todo: Todo): Promise<Todo | undefined> => {
  try {
    const res = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const putTodo = async (todo: Todo): Promise<Todo | undefined> => {
  try {
    const res = await fetch('http://localhost:3000/api/todos', {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
