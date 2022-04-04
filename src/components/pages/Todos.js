import { useEffect, useState } from "react";
import { useStore } from "../../store/Store";
// import CRUD functions from "logic" folder here:
import addTodo from "../../logic/addTodo";
import updateTodo from "../../logic/updateTodo";
import deleteTodo from "../../logic/deleteTodo";

export default function Todos() {
	const { state, dispatch } = useStore();
	const [inputValue, setInputValue] = useState("");
	const [idForEdition, setIdForEdition] = useState();
	const [editedValue, setEditedValue] = useState("");

	function resetInput() {
		setInputValue("");
	}

	useEffect(() => {
		if (idForEdition) {
			setEditedValue(state.todos[idForEdition]);
		} else {
			setEditedValue("");
		}
	}, [idForEdition, state.todos]);

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
					if (inputValue.length) {
						addTodo(inputValue, dispatch);
						resetInput();
					} else {
						alert("You cannot add an empty todo! Type something!");
					}
				}}
			>
				add todo
			</button>
			<ul className="todo-list" style={{ listStyle: "none", paddingLeft: 0 }}>
				{state.todos &&
					Object.keys(state.todos).map((key) => (
						<li key={key} style={{ marginBottom: "1em" }}>
							{idForEdition && idForEdition === key ? (
								<>
									<input
										value={editedValue}
										placeholder="update todo"
										onChange={(e) => setEditedValue(e.target.value)}
									/>
									<button
										type="button"
										onClick={() => {
											if (editedValue.length) {
												updateTodo(key, editedValue, dispatch);
												setIdForEdition();
											} else {
												alert(
													"You cannot update an empty todo! Type something!"
												);
											}
										}}
									>
										update
									</button>
									<button type="button" onClick={() => setIdForEdition()}>
										cancel
									</button>
								</>
							) : (
								<>
									<span style={{ marginRight: "1em" }}>{state.todos[key]}</span>
									<button type="button" onClick={() => setIdForEdition(key)}>
										edit
									</button>
								</>
							)}
							<button type="button" onClick={() => deleteTodo(key, dispatch)}>
								delete
							</button>
						</li>
					))}
			</ul>
		</div>
	);
}
