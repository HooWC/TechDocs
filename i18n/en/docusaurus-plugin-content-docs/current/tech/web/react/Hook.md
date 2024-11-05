---
id: hook-react
slug: /hook-react
title: Hook
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

## Hook

RReact Hook is a new feature introduced in React 16.8, which aims to enable functional components to use React's state and lifecycle features. Hooks provide a more concise and reusable way to manage component state and side effects, making functional components more powerful.

### 1. Common React Hooks

Here are some commonly used React Hooks:

- **useState**: used to add state to functional components.

- **useEffect**: used to handle side effects, such as data acquisition, event listening, etc.

- **useContext**: used to access context in the component tree.

- **useReducer**: used to manage complex state logic, similar to Redux's reducer.

- **useRef**: used to access DOM elements or store mutable data.

### 2. Use `useState` Hook

`useState` allows us to declare state in functional components.

```js
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Initial state is 0

  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
}

export default Counter;
```

```js
import { useState } from 'react'

function App(){
	const [count, setCount] = useState(0)
	
	const handleClick = () => {
		setCount(count++)
	}
	
	return (
		<div>
			<button onClick={handleClick}>{count}</button>
		</div>
	)
}

export default App
```

model

```js
import { useState } from 'react'

function App(){
	const [from, setFrom] = useState({
		name:'Hoo'
	})
	
	const handleClick = () => {
		setFrom({
			...from,
			name:'Hoo Weng Chin'
		})
	}
	
	return (
		<div>
			<button onClick={handleClick}>{from.name}</button>
		</div>
	)
}

export default App
```







### 3. Use `useEffect` Hook

`useEffect` is used to perform side effects, such as data fetching, subscriptions, or manual DOM changes.

```js
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []); // An empty array as a dependency means it will only run once when the component is mounted.

  if (loading) {
    return <p>loading...</p>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default DataFetcher;
```

useEffect + Axios

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const getInvoices = async () => {
            try {
                const response = await axios.get("/api/get_all_invoice");
                // Update the status to reflect the acquired invoice data
                setInvoices(response.data.invoices);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        getInvoices();
    }, []); // An empty array means it will only be run once when the component is mounted.

    return (
        <div>
            {/* Here we render the UI using the data from the invoices state */}
        </div>
    );
}

export default App;
```

useEffect Clear

```js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
        	console.log('Scheduled execution')
        },1000)
        
        return () => {
        	clearInterval(timer)
        }
    }, []); 

    return (
        <div>
            {/* Here we render the UI using the data from the invoices state */}
        </div>
    );
}

export default App;
```



### 4. Use `useRef` Hook

`useRef` is used to access DOM elements or store mutable data that does not need to trigger rendering.

```js
import React, { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Focus input box
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus input box</button>
    </div>
  );
}

export default TextInput;
```

```js
import React, { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef(null);

  function handleClick() {
    console.log('Input value:', inputRef.current.value);
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Get Value</button>
    </div>
  );
}

export default MyComponent;
```

`inputRef.current.focus()` is a method in React to directly access and manipulate DOM elements through `ref`. Specifically, it sets the focus to an input box. Let's explain this process step by step。

```react
inputRef.current.focus()
```





### 5. use `useReducer` Hook

`useReducer` Suitable for managing complex state logic, especially state involving multiple sub-values.

```js
import React, { useReducer } from 'react';

// Defining the reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Current count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>add</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>reduce</button>
    </div>
  );
}

export default Counter;
```



### 5. use `useContext` Hook

`useContext` Used to access contextual data, making it easy to pass data in the component tree without having to pass props layer by layer.

```js
import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'Zhang San' }); // Initial user information

  // Function to update user information
  const updateUser = () => {
    setUser({ name: 'Li Si' }); // Update user name
  };

  return (
    // Provide user context
    <UserContext.Provider value={user}>
      <div>
        <h1>Using useContext Example</h1>
        <UserDisplay />
        <button onClick={updateUser}>Update User</button>
      </div>
    </UserContext.Provider>
  );
}

// Component to display user information
function UserDisplay() {
  const user = useContext(UserContext); // Get user information

  return (
    <div>
      <p>Current User: {user.name}</p>
    </div>
  );
}

export default App;

```

### Step explanation

1. **Create context**:

```js
const UserContext = createContext();
```

Use `createContext` to create a context object `UserContext`.

2. **Create `App` component**:

```js
function App() {
  const [user, setUser] = useState({ name: '张三' }); // Initial user information
}
```

In the `App` component, use `useState` to create a `user` state with an initial value of an object `{ name: '张三' }`.

3. **Define a function to update the user**:

```js
const updateUser = () => {
  setUser({ name: '李四' }); // Update user name
};
```

This function will update the user's name to `'李四'`.

4. **Use Provider to provide context**:

```js
<UserContext.Provider value={user}>
```

In `UserContext.Provider`, provide `user` as the value of the context to the child component.

5. **Create `UserDisplay` component**:

```js
function UserDisplay() {
  const user = useContext(UserContext); // Get user information
}
```

In this component, we use `useContext(UserContext)` to get the current user information.

6. **Display user information**:

```js
return (
  <div>
    <p>Current user: {user.name}</p>
  </div>
);
```

Display the user's name through `user.name`.

7. **Button updates user information**:

```js
<button onClick={updateUser}>Update User</button>
```

Clicking this button will call the `updateUser` function to update the user information.

8. **Export `App` component**:

```js
export default App;
```

### Summary

This example shows how to use `useContext` to share user information between different components. With context, we can avoid passing `user` information through props layer by layer, making the code more concise and easier to maintain. You can update the user's information by clicking the button and observe that the `UserDisplay` component automatically displays the updated information.

## Custom Hook

The encapsulation function is a custom Hook

```js
function useToggle(){
	const [value, setValue] = useStaet(true)
	const toggle = () => setValue(!value)
	
	return {
		value,
		toggle
	}
}

function App(){
	const { value, toggle } = useToggle()
	return (
		<div>
			{value && <div>this is div</div>}
			<button onClick={toggle}>toggle</button>
		</div>
	)
}
```



## Summary

- **Hooks** provide an elegant way to use state and lifecycle methods in function components.
- Commonly used Hooks include `useState`, `useEffect`, `useContext`, `useReducer`, and `useRef`.
- Hooks make component states and logic more reusable and improve code readability.

The introduction of Hooks enables function components to have the same functionality as class components, and also encourages developers to move towards functional programming.
