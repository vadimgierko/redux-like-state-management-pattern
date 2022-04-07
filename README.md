# Redux-like state management pattern. How to manage global state in React apps using Context API & useReducer

In this guide we will build a simple todo app and apply my favourite way of managing React app's state using React Context API & useReducer hook.

## What is Redux-like state management pattern?

In most articles I've found on the Internet the pattern applied in this app is called _Redux-like state management pattern_, because it is very similar to how Redux works.

Redux-like state management pattern enables managing & sharing global state throughout the whole React application without using any third library.

## What knowledge do you need to use this pattern?

If you want to use a Redux-like pattern in your app, you need to have basic knowledge of:

- React 16.8+
- React hooks

If you have basic knowledge of Redux, you will figure out very quickly how & why this pattern works.

On other hand, even if you've never used Redux, React Context API or useReducer hook, you will be able to use the pattern enlighted in this article without any problems & ...even without a deep understanding of these technologies.

## You may want to use Redux-like state management pattern in your apps if...

- You want to have a global state for the entire React application.
- You want to be able manage the app state only via React.
- You don't want to use Redux or any other state management library.
- You want to have your app logic separated & extracted from components.

## Get started! Part I. Set up app store

Now we are going to create:

- a global store for our app state
- a reducer function for triggering changes in the state.

So,

1. create a folder named "store" in "src" folder of your app,
2. inside "store" folder create files named "initState.js", "reducer.js" and "State.js":

```
src
 |-- store
       |---- initState.js
       |---- reducer.js
       |---- State.js
```

### Define initial state of your app

First of all we need to define the initial state of our app in a initState.js file. The state should be a JavaScript object assigned to the INIT_STATE constant. Initial state will be passed to the reducer function, when the app will mount. And also we'll use initial state, when we need to reset our state.

In our todo app, we need to store only our todos in the initial state, so you can copy the code below & paste it in initState.js file:

```
// initState.js file

export const INIT_STATE = {
  todos: {},
};
```

At the moment there are no todos stored in the app, so we've assigned an empty object to todos prop in initial state object.

### Define basic app logic in reducer function

Reducer function:

- recieves an actual state via first argument,
- recieves an action (every action must have a type, which defines, how it needs to update a state, and can have additional data - payload, for example a todo object) via second argument,
- returns new updated state.

Like in Redux, the state should be immutable, so we cannot mutate the state in our reducer.

In our todo app we want to be able to add, delete & update todos, so we've defined basic actions types for all of these CRUD functions in our reducer code below (copy this code & paste it in reducer.js file):

```
// reducer.js file

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

### Create a Context Provider for the store

In this guide I will give you a working pateern & not explain, how Context API works, so if you are interested, you can read about this in React docs.

To create a Context Provider for your app state, to enable access to the state in every component, copy the code below & paste it in Store.js file:

```
// Store.js file:

import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer.js";
import { INIT_STATE } from "./initState.js";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const value = {
    state,
    dispatch
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

```

### Wrap your `<App />` component into `<StoreProvider>` in index.js file

To enable access to the global app state for every app component, you need to wrap your `<App />` component into `<StoreProvider>` in index.js file.

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

**And that's the end of the first part!** We've finished implementing Redux-like state management pattern in our app. Now the state can be available for any component in our app. In the second part we'll see, how to import the state to the component.

## Part II. Connect the store to the app's components

Ok, so now we have our store all set and finally we can connect it to our app's component.

### Create a folder named "logic" & define CRUD logic for your app

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

### Create a <Todo /> component

Now you can create a `<Todo />` component & use all of CRUD functions from "logic" folder there.

```
// Todo.js file

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

```
