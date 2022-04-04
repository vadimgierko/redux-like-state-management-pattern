import { useEffect, useState } from "react";

export default function EditionScreen({
	todoForEdition,
	onUpdate,
	onCancel,
	onDelete,
}) {
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		if (todoForEdition) {
			setInputValue(todoForEdition);
		}
	}, [todoForEdition]);

	return (
		<div className="edition-screen">
			<input
				value={inputValue}
				placeholder="add todo"
				onChange={(e) => setInputValue(e.target.value)}
			/>
			<button type="button" onClick={() => onUpdate(inputValue)}>
				update
			</button>
			<button type="button" onClick={onCancel}>
				cancel
			</button>
			<button type="button" onClick={onDelete}>
				delete
			</button>
		</div>
	);
}
