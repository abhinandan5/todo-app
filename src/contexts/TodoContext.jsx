import { createContext, useEffect, useState } from "react";

const todosContext = createContext();

function TodoProvider({ children }) {
	const [todos, setTodos] = useState([]);
	const [editId, setEditId] = useState(-1);

	useEffect(() => {
		async function fetchTodos() {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/users/1/todos",
			);

			const data = await response.json();
			setTodos(data);
		}
		fetchTodos();
	}, []);
	
	return (
		<todosContext.Provider value={{ todos, setTodos, editId, setEditId }}>
			{children}
		</todosContext.Provider>
	);
}
export { TodoProvider, todosContext };
