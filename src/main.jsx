import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TodoProvider } from "./contexts/TodoContext.jsx";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import AddTodo from "./pages/AddTodo.jsx";
import EditTodo from "./pages/EditTodo.jsx";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<TodoProvider>
			<Router>
				<Routes>
					<Route path="/">
						<Route index element={<App />} />
						<Route path="add-todo" element={<AddTodo />} />
						<Route path="edit-todo" element={<EditTodo />} />
					</Route>
				</Routes>
			</Router>
		</TodoProvider>
	</StrictMode>,
);
