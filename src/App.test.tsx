import { render, screen } from "@testing-library/react";
import App from "./App";
import ToDoForm from "./components/ToDoForm";
import { SetStateAction } from "react";
import TodoTypes from "./todo";
import Pagination from "./components/Pagination";
import { ToDoList } from "./components/ToDoList";

describe("App", () => {
  test("renders heading", async () => {
    render(<App />);
    expect(screen.getByText("ToDo App")).toBeInTheDocument();
  });
});

describe("TodoForm", () => {
  test("Render Input Elements", async () => {
    render(
      <ToDoForm
        setTodo={function (_value: SetStateAction<TodoTypes[]>): void {
          throw new Error("Function not implemented.");
        }}
      />
    );
    const addButton = screen.getByTitle(/add task/);
    const searchButton = screen.getByTitle(/search/);
    const resetButton = screen.getByTitle(/reset/);
    expect(addButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  describe("Pagination", () => {
    test("Pagination", async () => {
      render(
        <Pagination
          page={0}
          totalItemCount={0}
          handlePagination={function (_arg: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      );
      const nextButton = screen.getByTitle("next");
      const prevButton = screen.getByTitle("prev");
      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
    });
  });

  describe("Todo List Items", () => {
    test("Todo List", async () => {
      render(<ToDoList />);
      const todoForm = screen.getByRole("todoForm");
      const pagination = screen.getByRole("pagination");
      expect(todoForm).toBeInTheDocument();
      expect(pagination).toBeInTheDocument();
    });
  });
});
