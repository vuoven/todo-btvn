import { loadTodoFromId, loadTodos } from "@/utils/loadTodo";
import React from "react";
import { Todo } from "..";
interface IDetailPageProps {
    todo: Todo
}
const DetailPage = (props: IDetailPageProps) => {
  return <>
  <h1>{props.todo.title}</h1>
  </>;
};
export default DetailPage;

export async function getStaticPaths() {
  const todos = await loadTodos();
  const paths = todos.map((todo) => ({
    params: { id: String(todo.id) },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context: any) {
  const todo = await loadTodoFromId(context.params.id);
  return {
    props: {
      todo,
    },
  };
}
