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

React Hook 是 React 16.8 版本引入的一种新特性，旨在让函数组件能够使用 React 的状态和生命周期等功能。Hooks 提供了一种更简洁和可重用的方式来管理组件的状态和副作用，使函数组件更加强大。

### 1. 常见的 React Hooks

以下是一些常用的 React Hooks：

- **useState**：用于在函数组件中添加状态。
- **useEffect**：用于处理副作用，比如数据获取、事件监听等。
- **useContext**：用于在组件树中访问上下文（Context）。
- **useReducer**：用于管理复杂状态逻辑，类似于 Redux 的 reducer。
- **useRef**：用于访问 DOM 元素或存储可变数据。



### 2. 使用 `useState` Hook

`useState` 允许我们在函数组件中声明状态。

```react
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 初始化状态为 0

  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

export default Counter;
```

```react
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

模型

```react
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







### 3. 使用 `useEffect` Hook

`useEffect` 用于执行副作用，例如数据获取、订阅或手动更改 DOM。

```react
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
  }, []); // 空数组作为依赖，表示只在组件挂载时运行一次

  if (loading) {
    return <p>加载中...</p>;
  }

  return <div>{JSON.stringify(data)}</div>;
}

export default DataFetcher;
```

useEffect + Axios

```react
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const getInvoices = async () => {
            try {
                const response = await axios.get("/api/get_all_invoice");
                // 更新状态以反映获取的发票数据
                setInvoices(response.data.invoices);
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        getInvoices();
    }, []); // 空数组表示仅在组件挂载时运行一次

    return (
        <div>
            {/* 在此处使用invoices状态中的数据渲染UI */}
        </div>
    );
}

export default App;
```

useEffect 清除

```react
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
        	console.log('定时执行中')
        },1000)
        
        return () => {
        	clearInterval(timer)
        }
    }, []); 

    return (
        <div>
            {/* 在此处使用invoices状态中的数据渲染UI */}
        </div>
    );
}

export default App;
```



### 4. 使用 `useRef` Hook

`useRef` 用于访问 DOM 元素或存储不需要触发渲染的可变数据。

```react
import React, { useRef } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // 聚焦输入框
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>聚焦输入框</button>
    </div>
  );
}

export default TextInput;
```

```react
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

`inputRef.current.focus()` 是在 React 中通过 `ref` 来直接访问和操作 DOM 元素的方法。具体来说，它的作用是将焦点设置到一个输入框（input）上。让我们逐步解释这一过程。

```react
inputRef.current.focus()
```





### 5. 使用 `useReducer` Hook

`useReducer` 适用于管理复杂状态逻辑，特别是涉及多个子值的状态。

```
import React, { useReducer } from 'react';

// 定义 reducer 函数
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
      <p>当前计数: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>增加</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>减少</button>
    </div>
  );
}

export default Counter;
```



### 5. 使用 `useContext` Hook

`useContext` 用于访问上下文数据，方便在组件树中传递数据而不需要逐层传递 props。

```react
import React, { createContext, useContext, useState } from 'react';

// 创建上下文
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: '张三' }); // 初始用户信息

  // 更新用户信息的函数
  const updateUser = () => {
    setUser({ name: '李四' }); // 更新用户名称
  };

  return (
    // 提供用户上下文
    <UserContext.Provider value={user}>
      <div>
        <h1>使用 useContext 示例</h1>
        <UserDisplay />
        <button onClick={updateUser}>更新用户</button>
      </div>
    </UserContext.Provider>
  );
}

// 显示用户信息的组件
function UserDisplay() {
  const user = useContext(UserContext); // 获取用户信息

  return (
    <div>
      <p>当前用户: {user.name}</p>
    </div>
  );
}

export default App;
```

### 步骤解释

1. **创建上下文**：

   ```react
   const UserContext = createContext();
   ```

   使用 `createContext` 创建一个上下文对象 `UserContext`。

2. **创建 `App` 组件**：

   ```react
   function App() {
     const [user, setUser] = useState({ name: '张三' }); // 初始用户信息
   ```

   在 `App` 组件中，使用 `useState` 创建一个 `user` 状态，初始值为一个对象 `{ name: '张三' }`。

3. **定义更新用户的函数**：

   ```react
   const updateUser = () => {
     setUser({ name: '李四' }); // 更新用户名称
   };
   ```

   这个函数会将用户的名称更新为 `'李四'`。

4. **使用 Provider 提供上下文**：

   ```react
   <UserContext.Provider value={user}>
   ```

   在 `UserContext.Provider` 中，将 `user` 作为上下文的值提供给子组件。

5. **创建 `UserDisplay` 组件**：

   ```react
   function UserDisplay() {
     const user = useContext(UserContext); // 获取用户信息
   ```

   在这个组件中，我们使用 `useContext(UserContext)` 来获取当前的用户信息。

6. **显示用户信息**：

   ```react
   return (
     <div>
       <p>当前用户: {user.name}</p>
     </div>
   );
   ```

   通过 `user.name` 显示用户的名称。

7. **按钮更新用户信息**：

   ```react
   <button onClick={updateUser}>更新用户</button>
   ```

   点击这个按钮将调用 `updateUser` 函数，从而更新用户信息。

8. **导出 `App` 组件**：

   ```react
   export default App;
   ```

### 总结

这个例子展示了如何使用 `useContext` 在不同组件之间共享用户信息。通过上下文，我们可以避免将 `user` 信息通过 props 层层传递，使得代码更加简洁和易于维护。你可以通过点击按钮来更新用户的信息，并观察到 `UserDisplay` 组件会自动显示更新后的信息。



## 自定义Hook

封装函数就是自定义Hook

```react
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



## 总结

- **Hooks** 提供了一种优雅的方式来在函数组件中使用状态和生命周期方法。
- 常用的 Hooks 包括 `useState`、`useEffect`、`useContext`、`useReducer` 和 `useRef`。
- Hooks 使得组件的状态和逻辑更加可重用，提升了代码的可读性。

Hooks 的引入使得函数组件能够拥有和类组件一样的功能，同时也促使开发者向函数式编程的方向发展。
