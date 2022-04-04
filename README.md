# How to apply/use Redux-like state management pattern using React Context API & useReducer

---

## Create a folder named "store" in "src" folder.

## Inside "store" folder create a file named "initState.js" & define your initial state.

In our example todo app, we need to store only our todos in INIT_STATE, which is a JavaScript object:

```
// initState.js file

export const INIT_STATE = {
  todos: null,
};
```

## Inside "store" folder create a file named "reducer.js".

In reducer function we define all CRUD actions:

```
import { INIT_STATE } from "./initState";

export default function reducer(state, action) {
  switch (action.type) {
    case "add-todo":
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload.id]: action.payload.todo
        }
      };
    case "update-todo":
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.payload.id]: action.payload.todo
        }
      };
    case "delete-todo":
      let updatedTodos = { ...state.todos };
      if (updatedTodos[action.payload.id]) {
        delete updatedTodos[action.payload.id];
      }
      return {
        ...state,
        todos: updatedTodos
      };
    case "reset-state":
      return INIT_STATE;
    default:
      return state;
  }
}
```

## Inside "store" folder create a file named "Store.js" & paste the code below:

```
import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import { INIT_STATE } from "./initState.js";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, INIT_STATE);

	const value = {
		state,
		dispatch,
	};

	return (
		<StoreContext.Provider value={value}>{children}</StoreContext.Provider>
	);
}

```

## Wrap your `<App />` component into `<StoreProvider>` in index.js file

At first you need to import StoreProvider from "./store/Store", then wrap your `<App />` component into `<StoreProvider>`:

```
// index.js file

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./store/Store";

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider>
			<App />
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

```

## Create a folder named "logic" & define CRUD logic for your app

Inside a new created folder named "logic" create a few separate files:
- addTodo.js
- updateTodo.js
- deleteTodo.js

& paste the code below into those files:

```
// addTodo.js file

import uniqid from "uniqid";

export default function addTodo(todo, dispatch) {
	const id = uniqid();

	return dispatch({
		type: "add-todo",
		payload: {
			id: id,
			todo: todo,
		},
	});
}
```

```
// updateTodo.js file

export default function updateTodo(id, updatedTodo, dispatch) {
	return dispatch({
		type: "update-todo",
		payload: {
			id: id,
			todo: updatedTodo,
		},
	});
}
```

```
// deleteTodo.js file

export default function deleteTodo(id, dispatch) {
	return dispatch({
		type: "delete-todo",
		payload: {
			id: id,
		},
	});
}

```

## Now you can create a `<Todo /> component & use CRUD functions from "logic" folder

```
// Todo.js file
```

