import { todosContext } from "../contexts/TodoContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router";

export default function EditTodo() {
  const { setTodos, todos, editId } = useContext(todosContext);
  const [currTodo, setCurrTodo] = useState();
  const navigate = useNavigate();

  // console.log(currTodo);

  useEffect(() => {
    async function fetchTodo() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${editId}`
      );

      const data = await response.json();
      // console.log(data);
      setCurrTodo(data);
    }
    fetchTodo();
  }, [editId]);

  const editTodo = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${editId}`,
      {
        method: "PUT",
        body: JSON.stringify(currTodo),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const data = await response.json();
    setTodos(
      todos?.map((todo) => {
        if (todo.id === editId) return data;
        return todo;
      })
    );
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-md bg-white rounded-md shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
          Todo Management App
        </h1>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Todo</h2>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currTodo?.title || ""}
            onChange={(e) => {
              setCurrTodo({ ...currTodo, title: e.target.value });
            }}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            checked={currTodo?.completed || false}
            onChange={(e) =>
              setCurrTodo({ ...currTodo, completed: e.target.checked })
            }
          />
          <label className="ml-2 text-gray-600">Mark as Completed</label>
        </div>

        <div className="flex justify-between items-center">
          <NavLink to={"/"}>
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white text-sm rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </NavLink>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
            onClick={editTodo}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
