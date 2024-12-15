import { NavLink } from "react-router";
import { todosContext } from "./contexts/TodoContext";
import { useContext } from "react";

function App() {
  const { todos, setEditId } = useContext(todosContext);

  const renderTodo = todos?.map((todo) => {
    return (
      <div
        key={todo.id}
        className="flex items-center justify-between bg-white border border-gray-300 rounded-md shadow-md p-4 mb-3 w-auto h-fit"
      >
        <div>
          <p className="text-sm font-bold text-gray-700">ID: {todo.id}</p>
          <p className="text-base text-gray-800 truncate">{todo.title}</p>
          <p
            className={`text-sm ${
              todo.completed ? "text-green-600" : "text-red-600"
            }`}
          >
            {todo.completed ? "Completed" : "Not Completed"}
          </p>
        </div>

        <NavLink to={"/edit-todo"}>
          <button
            type="button"
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
            onClick={() => setEditId(todo.id)}
          >
            Edit
          </button>
        </NavLink>
      </div>
    );
  });

  return (
    <div className="bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full mx-2 px-96">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">
          Todo Management App
        </h1>
        <div className="flex justify-content mb-4">
          <NavLink to={"/add-todo"}>
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md shadow-md hover:bg-green-600"
            >
              Add Task
            </button>
          </NavLink>
        </div>

        <div className="">{renderTodo}</div>
      </div>
    </div>
  );
}

export default App;
