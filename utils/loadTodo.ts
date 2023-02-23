import { Todo } from "@/pages";

export const loadTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await res.json();
  const todosSlice = todos.slice(0, 5);
  return todosSlice
};

export const loadTodoFromId = async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
    const todoFetched = await res.json();
    return todoFetched
}
