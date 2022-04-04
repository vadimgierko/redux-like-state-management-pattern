export default function Todo({ todo, onDelete, onEdit }) {
	return (
		<div className="todo">
			<span style={{ marginRight: "1em" }}>{todo}</span>
			<button type="button" onClick={onEdit}>
				edit
			</button>
			<button type="button" onClick={onDelete}>
				delete
			</button>
		</div>
	);
}
