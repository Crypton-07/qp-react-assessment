import { ToDoList } from "./components/ToDoList";

function App() {
  return (
    <div className="flex justify-center items-center flex-col max-w-3xl mx-auto rounded-md px-5 md:px-0">
      <div className="bg-gray-900 w-full flex justify-center items-center my-3 py-1 rounded-md">
        <h1 className="flex items-center text-white text-3xl py-1 tracking-wider font-medium uppercase">
          ToDo App
        </h1>
      </div>
      <ToDoList />
    </div>
  );
}

export default App;
