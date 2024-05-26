import TodoTypes from "./todo";

const LOCAL_STORAGE = "todos";
export const ITEMS_PER__PAGE = 6;

const TodoService = {
  getTodo: (): TodoTypes[] => {
    const todoArr = localStorage.getItem(LOCAL_STORAGE);
    return todoArr ? JSON.parse(todoArr) : [];
  },

  addTodos: (text: string): TodoTypes => {
    const todos = TodoService.getTodo();
    const newTodo: TodoTypes = {
      id: Math.floor(1000 + Math.random() * 9000),
      text,
      completed: false,
    };
    const updateTodos = [newTodo, ...todos];
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(updateTodos));

    return newTodo;
  },

  updateTodos: (todo: TodoTypes): TodoTypes => {
    const todos = TodoService.getTodo();
    const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(updateTodos));
    return todo;
  },

  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodo();
    const updateTodos = todos.filter((t) => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(updateTodos));
  },
  filterTodo: (text: string): TodoTypes[] => {
    const todos = TodoService.getTodo();
    const filterTodo: TodoTypes[] = todos.filter((item) =>
      item.text.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        ? item
        : null
    );
    return filterTodo;
  },
};

export default TodoService;
