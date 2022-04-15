export default function Footer() {
	return (
		<footer style={{ textAlign: "center", color: "grey" }}>
			<hr />
			<h4>
				Todo App created with create-react-app with Redux-like state management
				pattern (React Context API + useReducer hook) implemented created by{" "}
				<a
					href="https://github.com/vadimgierko"
					target="_blank"
					rel="noreferrer"
				>
					Vadim Gierko
				</a>
				.
			</h4>
			<p>
				Click here to see the{" "}
				<a
					href="https://github.com/vadimgierko/redux-like-state-management-pattern#readme"
					target="_blank"
					rel="noreferrer"
				>
					step by step implementation guide
				</a>
				.
			</p>
			<p>
				Click here to{" "}
				<a
					href="https://codesandbox.io/s/react-context-usereducer-redux-like-state-management-pattern-l7tpm2"
					target="_blank"
					rel="noreferrer"
				>
					play with the code in codesandbox
				</a>
				.
			</p>
			<p>
				Click here to see the{" "}
				<a
					href="https://github.com/vadimgierko/redux-like-state-management-pattern"
					target="_blank"
					rel="noreferrer"
				>
					repository code on GitHub
				</a>
				.
			</p>
			<p>
				Click here to see the{" "}
				<a
					href="https://github.com/vadimgierko/async-redux-like-state-management-pattern-in-react#readme"
					target="_blank"
					rel="noreferrer"
				>
					extended tutorial about async Redux-like pattern in React connected to
					Firebase
				</a>
				.
			</p>
		</footer>
	);
}
