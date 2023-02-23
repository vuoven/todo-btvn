import { loadTodos } from "@/utils/loadTodo";
import { Button, TextInput } from "flowbite-react";
import { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface IHomeProps {
  todos: Todo[];
}
interface ErrorInput {
  type: "required";
  message?: string;
}
export default function Home(props: IHomeProps) {
  const [listTodo, setListTodo] = useState<Todo[]>(props.todos);
  const [value, setValue] = useState<string>("");
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);
  const [errorInput, setErrorInput] = useState<ErrorInput | null>(null);
  const [editing, setEditing] = useState<boolean>(false);
  const handleOnAdd = () => {
    if (value === "") {
      setErrorInput({
        type: "required",
        message: "*Please input the new title",
      });
      return;
    }
    const todo: Todo = {
      userId: Math.floor(1000 + Math.random() * 9000),
      id: Math.floor(1000 + Math.random() * 9000),
      title: value,
      completed: false,
    };
    setListTodo([todo, ...listTodo]);
    setValue("");
    setErrorInput(null);
    toast.success("New todo is added successfully");
  };
  const handleOnDelete = (todoId: number) => {
    const newListTodo = listTodo.filter((todo) => todo.id !== todoId);
    setListTodo(newListTodo);
    toast.success("Remove todo successfully");
  };
  const handleOnEdit = (
    todo: Todo,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setErrorInput(null)
    setEditing(true);
    setValue(todo.title);
    setCurrentTodo(todo);
  };
  const handleOnSave = () => {
    if (value === "") {
      setErrorInput({
        type: "required",
        message: "*Please input title you want to edit",
      });
      return;
    }
    if (currentTodo) {
      const currentIndex = listTodo.findIndex(
        (todo) => todo.id === currentTodo.id
      );
      listTodo[currentIndex] = { ...currentTodo, title: value };
    }
    setEditing(false);
    setCurrentTodo(null);
    setValue("");
    setErrorInput(null)
    toast.success("Todo is edited successfully");
  };
  const handleOnCancelEdit = () => {
    setErrorInput(null)
    setValue("");
    setEditing(false)
  }
  return (
    <>
      <main className="flex justify-center items-center h-screen bg-black">
        <div className="flex flex-col justify-center items-center bg-white px-2 py-2 rounded-2xl w-[32rem]">
          <h1 className="text-3xl mb-3">List Todo</h1>
          {!editing && (
            <div className="flex flex-row gap-3 mb-3">
              <div>
                <TextInput
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {if (e.key === 'Enter') handleOnAdd()}}
                  placeholder="What do you want to do?"
                  color={errorInput?.type === "required" ? "failure" : "gray"}
                  helperText={
                    errorInput?.type === "required" ? errorInput.message : ""
                  }
                />
              </div>
              <Button color="success" onClick={() => handleOnAdd()}>
                Add
              </Button>
            </div>
          )}
          {editing && (
            <div className="flex flex-row gap-3 mb-3">
              <div>
                <TextInput
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {if (e.key === 'Enter') handleOnSave()}}
                  color={errorInput?.type === "required" ? "failure" : "gray"}
                  helperText={
                    errorInput?.type === "required" ? errorInput.message : ""
                  }
                />
              </div>

              <Button color="success" onClick={() => handleOnSave()}>
                Save
              </Button>
              <Button outline color="gray" onClick={() => handleOnCancelEdit()}>
                Cancel
              </Button>
            </div>
          )}

          <ul className="border px-1 py-1 rounded-2xl w-full h-72 overflow-auto">
            {listTodo &&
              listTodo.map((todo) => {
                return (
                    <div key={todo.id}>
                      <li className="flex justify-between items-center flex-row gap-3 mb-3 hover:bg-slate-400 px-3 py-2">
                        <input
                          className="peer cursor-pointer"
                          type="checkbox"
                        />
                        <p className="truncate peer-checked:line-through">
                          {todo.title}
                        </p>
                        <div className="flex gap-3 peer-checked:invisible">
                          <Button onClick={(e) => handleOnEdit(todo, e)}>
                            Edit
                          </Button>
                          <Button
                            color="failure"
                            onClick={() => handleOnDelete(todo.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </li>
                    </div>
                );
              })}
            {listTodo.length === 0 && (
              <>
                <div className='flex justify-center items-center h-full'>
                  <p>{`It's time to do something bro`}</p>
                </div>
              </>
            )}
          </ul>
        </div>
        <ToastContainer />
      </main>
    </>
  );
}
export async function getStaticProps() {
  const todos: Todo[] = await loadTodos();
  return {
    props: {
      todos,
    }, // will be passed to the page component as props
  };
}
