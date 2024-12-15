import { NavLink } from "react-router";
import { todosContext } from "../contexts/TodoContext";
import { useContext, useRef, useState } from "react";

export default function AddTodo() {
  const inputRef = useRef();
  const { todos, setTodos } = useContext(todosContext);
  const [message, setMessage] = useState("");

  const addTodo = async () => {
    const newTodo = inputRef.current.value;

    if (!newTodo.trim()) {
      setMessage("Please enter a valid task.");
      return;
    }

    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: newTodo,
        userId: 2,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data);
    setTodos([...todos, data]);
    inputRef.current.value = "";
    setMessage("Task added successfully!"); // Set success message
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
          Todo Management App
        </h1>
        <NavLink to={"/"}>
          <button
            type="button"
            className="mb-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
          >
            &larr; Back to Home
          </button>
        </NavLink>

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Add a New Todo
        </h1>

        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title"
          />
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
}
