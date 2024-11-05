---
id: route-react
slug: /route-react
title: React Route
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

# React Router Dom Plugins

## install 

```
npm i react-router-dom
```

use

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world</div>
  },
  {
    path: "/login",
    element: <div>login page</div>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  	<RouterProvider router={router} />
  </React.StrictMode>
);
```



## Example

Create a `router` file

```js
import Login from '../page/Login'
import Article from '../page/Article'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world</div>
  },
  {
    path: "/login",
    element: <div>login page</div>
  },
])

export default router
```

`index.js` Introduction

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  	<RouterProvider router={router} />
  </React.StrictMode>
);
```

`front-end` using

```js
import { Link， useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
        	<Link to="/article">click</Link>
          <button onClick={() => navigate('/article')}>click</button>
        </div>
    )
}
```

### Differences between Link and Navigate:

1. **Usage:** `<Link>` is a React component that needs to be wrapped in JSX and uses the `to` attribute to specify the target route of the navigation; `navigate` is a function that can be called from any suitable place to trigger navigation programmatically.
2. **Applicable scenarios:** `<Link>` is usually used to create navigation links in a page, such as a navigation bar, menu, etc.; `navigate` is suitable for performing navigation operations in event handling functions or other places that require programmatic control.
3. **Performance:** When using the `<Link>` component for navigation, React Router uses client-side routing for navigation and does not reload the entire page, so it is usually more efficient. When using the `navigate` function for navigation, although it is also client-side navigation, it needs to be triggered manually, which may bring some additional performance overhead.

```js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Perform programmatic navigation to a specified route
    navigate('/article');
  };

  return (
    <div>
      <h1>My Component</h1>
      <button onClick={handleNavigate}>Click to jump to the article page</button>
    </div>
  );
}

export default MyComponent;
```



## useSearchParams()

```js
<button onClick={() => navigate('/article?id=1001&name=Hoo')}>click</button>
```

```js
import { useSearchParams } from 'react-router-dom'

const Article = () => {
    const [ params ] = useSearchParams()
    const  id = params.get('id')
    const  name = params.get('name')
    return (
        <div>
        	id is {id} , name is {name}
        </div>
    )
}
```



## useParams()

```js
<button onClick={() => navigate('/article/1001')}>click</button>
```
```js
import Home from '../page/Home'
import Login from '../page/Login'
import Article from '../page/Article'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/article/:id",
    element: <Article />
  },
])

export default router
```

```js
import { useParams } from 'react-router-dom'

const Article = () => {
    const params = useParams()
    const  id = params.id
    return (
        <div>
        	id is {id}
        </div>
    )
}
```

======

```js
<button onClick={() => navigate('/article/1001/Hoo')}>click</button>
```

```js
import Home from '../page/Home'
import Login from '../page/Login'
import Article from '../page/Article'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/article/:id/:name",
    element: <Article />
  },
])

export default router
```

```js
import { useParams } from 'react-router-dom'

const Article = () => {
    const params = useParams()
    const  id = params.id
    const  name = params.name
    return (
        <div>
        	id is {id} , name is {name}
        </div>
    )
}
```



## Children (Outlet)

```js
import Home from '../page/Home'
import Login from '../page/Login'
import Article from '../page/Article'
import Board from '../page/Board'
import About from '../page/About'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
    children: [
      {
    	path: "/board",
    	element: <Board />
  	  },
  	  {
    	path: "/about",
    	element: <About />
  	  },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/article/:id/:name",
    element: <Article />
  },
])

export default router
```

`Home`

```js
import { Link, Outlet } from "react-router-dom"

const Home = () => {
	<div>
    	I am Home, I will never disappear, I am fixed
        <Link to="/board">panel</Link>
        <Link to="/about">about</Link>
        
        {/* Rendering child components */}
        <Outlet />
    </div>
}
```

## Default secondary routing

```js
import Home from '../page/Home';
import Login from '../page/Login';
import Article from '../page/Article';
import Board from '../page/Board';
import About from '../page/About';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true, // Here it is changed to index, indicating the default route
        element: <Board />
      },
      {
        path: "/about",
        element: <About />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/article/:id/:name",
    element: <Article />
  },
]);

export default router;
```

## 404 Page Routing

```js
// 404 Page Routing
  {
    path: "*",
    element: <NotFound />
  }
```













