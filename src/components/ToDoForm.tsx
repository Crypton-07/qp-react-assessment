import React, { Dispatch, SetStateAction, useState } from "react";
import TodoService from "../TodoService";
import TodoTypes from "../todo";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaPlus, FaRedo } from "react-icons/fa";

interface PropTypes {
  setTodo: Dispatch<SetStateAction<TodoTypes[]>>;
}
const ToDoForm: React.FC<PropTypes> = ({ setTodo }) => {
  const [newToDoText, setNewTodoText] = useState<string>("");
  const handleAddTodo = () => {
    if (newToDoText.trim() !== "") {
      const newTodo = TodoService.addTodos(newToDoText);
      setTodo((prevTodo) => [newTodo, ...prevTodo]);
      setNewTodoText("");
      setTodo(TodoService.getTodo());
    }
  };
  const handleSearchTodo = () => {
    if (newToDoText.trim() !== "") {
      const searchedTodo = TodoService.filterTodo(newToDoText);
      setTodo(searchedTodo);
      setNewTodoText("");
    }
  };
  const handleReset = () => {
    setTodo(TodoService.getTodo());
  };
  return (
    <div className="w-full flex items-center justify-around space-x-1 md:space-x-4 px-2 md:px-4 py-4 shadow-lg">
      <input
        className="py-3 px-2 w-[70%] focus:outline-none border-b-2 border-gray-900 placeholder:tracking-wider"
        type="text"
        role="textbox"
        value={newToDoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Search Or Add Tasks"
      />
      <button
        title="add task"
        className="w-auto bg-gray-900 text-white py-2 px-2 md:py-3 md:px-5 shadow-md rounded-md font-medium tracking-wide active:scale-90 transition-all ease-in duration-200 uppercase"
        onClick={handleAddTodo}
      >
        <FaPlus />
      </button>
      <button
        title="search"
        className="w-auto bg-gray-900 text-white py-2 px-2 md:py-3 md:px-5 shadow-md rounded-md font-medium tracking-wide active:scale-90 transition-all ease-in duration-200 uppercase"
        onClick={handleSearchTodo}
      >
        <FaMagnifyingGlass />
      </button>
      <button
        title="reset"
        className="w-auto bg-gray-900 text-white py-2 px-2 md:py-3 md:px-5 shadow-md rounded-md font-medium tracking-wide active:scale-90 transition-all ease-in duration-200 uppercase"
        onClick={handleReset}
      >
        <FaRedo />
      </button>
    </div>
  );
};

export default ToDoForm;
