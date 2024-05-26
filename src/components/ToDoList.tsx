import { useEffect, useState } from "react";
import TodoTypes from "../todo";
import TodoService, { ITEMS_PER__PAGE } from "../TodoService";
import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import ToDoForm from "./ToDoForm";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination";

export const ToDoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoText, setEditTodoText] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  //   const [totalTodos, setTotalTodos] = useState<TodoTypes[]>([]);

  const handleEdit = (id: number, text: string) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };
  const handleEditCancel = () => {
    setEditTodoId(null);
    setEditTodoText("");
  };
  const handleEditSave = (id: number) => {
    if (editTodoText.trim() !== "") {
      const updateTodo = TodoService.updateTodos({
        id,
        text: editTodoText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditTodoId(null);
      setEditTodoText("");
      toast.success("Todo Updated Successfully !!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    toast.success("Todo deleted !!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleChange = (checked: boolean, id: number, text: string) => {
    if (id && checked) {
      const updateTodo = TodoService.updateTodos({
        id,
        text,
        completed: true,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditTodoId(null);
      setEditTodoText("");
      toast.info("Marked as completed !!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else if (id && !checked) {
      const updateTodo = TodoService.updateTodos({
        id,
        text,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditTodoId(null);
      setEditTodoText("");
      toast.warn("Marked as incompleted !!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const handlePagination = (page: number) => {
    setPage(page);
  };
  const lastIndex = page * ITEMS_PER__PAGE;
  const firstIndex = lastIndex - ITEMS_PER__PAGE;
  const todoRecords = todos.slice(firstIndex, lastIndex);
  useEffect(() => {
    todoRecords.length <= 0 && setTodos(TodoService.getTodo());
    if (todoRecords.length <= 0) {
      setPage(1);
    }
  }, [page, todos.length, todoRecords.length]);
  return (
    <>
      <ToastContainer />
      <div role="todoForm" className="w-full">
        <div className="w-full border-2 border-gray-800 flex justify-center items-center shadow-lg rounded-md">
          <ToDoForm setTodo={setTodos} />
        </div>
        <div className="h-[450px] w-full mt-6 overflow-y-auto">
          {todoRecords &&
            todoRecords?.map((todo) => (
              <div
                className="flex items-center justify-between shadow-md border-2 my-3 py-3 px-3 transition-all ease-in duration-300"
                key={todo.id}
              >
                {editTodoId === todo.id ? (
                  <div className="flex items-center justify-center space-x-5 w-full px-1">
                    <input
                      className="border-b-2 border-gray-900 focus:outline-none bg-transparent w-full px-1"
                      type="text"
                      role="textbox"
                      value={editTodoText}
                      onChange={(e) => setEditTodoText(e.target.value)}
                      autoFocus={true}
                    />
                    {
                      <button
                        title="save"
                        role="button"
                        className="mx-2 text-green-500 text-md"
                        onClick={() => handleEditSave(todo.id)}
                      >
                        <FaCheck />
                      </button>
                    }
                    <button
                      title="cancel"
                      role="button"
                      className="text-red-500 text-lg"
                      onClick={() => handleEditCancel()}
                    >
                      <GiCancel />
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center space-x-2">
                    <div>
                      <input
                        className="h-[16px] w-[16px]"
                        type="checkbox"
                        role="checkbox"
                        onChange={(e) =>
                          handleChange(e.target.checked, todo.id, todo.text)
                        }
                      />
                    </div>
                    <span
                      className={`${
                        todo.completed && "line-through"
                      } font-medium text-md break-words w-80 md:w-full md: px-4`}
                    >
                      {todo.text}
                    </span>
                  </div>
                )}
                {editTodoId !== todo.id && (
                  <div className="flex items-center space-x-4">
                    {!todo.completed && (
                      <button
                        title="edit"
                        role="button"
                        className="text-blue-500 text-xl"
                        onClick={() => handleEdit(todo.id, todo.text)}
                      >
                        <FaEdit></FaEdit>
                      </button>
                    )}
                    <button
                      title="delete"
                      role="button"
                      className="text-red-500 text-xl"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="w-full" role="pagination">
        <Pagination
          page={page}
          totalItemCount={todos.length}
          handlePagination={handlePagination}
        />
      </div>
    </>
  );
};
export const todoRecords = TodoService.getTodo();
