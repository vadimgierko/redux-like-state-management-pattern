import { useEffect, useState } from "react";
import { useStore } from "../../store/Store";
// import CRUD functions from "logic" folder here:
import addTodo from "../../logic/addTodo";
import updateTodo from "../../logic/updateTodo";
import deleteTodo from "../../logic/deleteTodo";
//================================================
import Todo from "../organisms/Todo";
import EditionScreen from "../organisms/EditionScreen";

export default function Todos() {
	const { state, dispatch } = useStore();
	const [inputValue, setInputValue] = useState("");
	const [idForEdition, setIdForEdition] = useState();

	function resetInput() {
		setInputValue("");
	}

	useEffect(() => {
		console.log("app state:", state);
	}, [state]);

	return (
		<div className="todo-page" style={{ textAlign: "center" }}>
			<h1>Your Todos</h1>
			<input
				value={inputValue}
				placeholder="add todo"
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button
				type="button"
				onClick={() => {
					addTodo(inputValue, dispatch);
					resetInput();
				}}
			>
				add todo
			</button>
			<ul className="todo-list" style={{ listStyle: "none", paddingLeft: 0 }}>
				{state.todos &&
					Object.keys(state.todos).map((key) => (
						<li key={key} style={{ marginBottom: "1em" }}>
							{idForEdition && idForEdition === key ? (
								<EditionScreen
									todoForEdition={state.todos[key]}
									onUpdate={(updatedTodo) => {
										updateTodo(key, updatedTodo, dispatch);
										setIdForEdition();
									}}
									onCancel={() => setIdForEdition()}
									onDelete={() => {
										deleteTodo(key, dispatch);
									}}
								/>
							) : (
								<Todo
									todo={state.todos[key]}
									onDelete={() => {
										deleteTodo(key, dispatch);
									}}
									onEdit={() => setIdForEdition(key)}
								/>
							)}
						</li>
					))}
			</ul>
		</div>
	);
}
