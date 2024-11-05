---
id: react-base
slug: /react-base
title: Basic Learning
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

# React Basics

## Installation

```
npx create-react-app <project-name>
```

```
npm create vite@latest // Install template

npm run dev // Start template
```

Start

```
npm start // React Start
```

Delete other files, leaving `index.js` and `App.js`

Original `index.js` file

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
```

##  Install `Axios` (if necessary)

```
npm i axios
```



## Basic usage

### Common way to write Map

```js
const list = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' }
  ];
```

```js
<ul>
  {
  	list.map(item => (
  	  <li key={item.id}>{item}</li>
  	))
  }
</ul>
```



### Map Function writing

```js
function App(){
    const listData = lists.map(item => (
        <li key={item.id}>{item.name}</li>
    ));

    return (
        <div>
            <ul>
                {listData}
            </ul>
        </div>
    );
}
```



### Ternary Expression

```js
{flag && <span>this is span</span>}
```

```js
{loading ? <span>loading...</span> : <span>this is span</span>}
```



### onCLick

```js
function App(){
	const clickHandler = () => {
		cosole.log('button click')
	}
	
	return (
		<button onCLick={clickHanfler}></button>
	)
}
```

`Component` Writing

```js
import React, { Component } from 'react';

class App extends Component {
  clickHandler = () => {
    console.log('button click');
  }

  render() {
    return (
      <button onClick={this.clickHandler}></button>
    );
  }
}

export default App;
```

`Passing parameters` writing method

```js
function App(){
	const clickHandler = (name) => {
		cosole.log('button click')
	}
	
	return (
		<button onCLick={() => clickHanfler('Hoo')}></button>
	)
}
```

```js
function App(){
	const clickHandler = (name,e) => {
		cosole.log('button click')
	}
	
	return (
		<button onCLick={(e) => clickHanfler('Hoo',e)}></button>
	)
}
```



### Style grammar

(Not recommended)

```js
<div style={{ color:'red' }}>this is div</div>
```

Class

```css
.foo {
	color:red
}
```

```js
import './index.css'

function App () {
	return (
		<div>
            // Install the className plugin
			<span className='foo'>this is span</span>
		</div>
	)
}
```

install

```
npm install classnames
```

use

```react
import classNames from 'classnames'

className={classNames('nav-item', { active: type === item.type })}
```



### Filter

```js
List.filter(item => item.id !== id)
```



### Controlled form binding (onChange)

```js
const [value, setValue] = useState('')
```

```js
<input 
	type="text"
	value={value}
	onChange={(e) => setValue(e.target.value)}
/>
```



## From father to son

Props are only read, data cannot be modified

```js
function Son(props){
	return <div>this is son {props.name}</div>
}

function App(){
	const name = 'this is app name'
	return (
		<div>
			<Son name={name} />
		</div>
	)
}
```

### chilren

```js
function Son(props){
	return <div>this is son {props.chilren}</div>
}

function App(){
	const name = 'this is app name'
	return (
		<div>
			<Son>
				<span>this is span</span>
			</Son>
		</div>
	)
}
```



## Child to parent

### Destructuring assignment writing

```js
function Son({ onGetMsg }){
	const sonMsg = 'this is son msg'
	return (
		<div>
			<button onClick={() => onGetMsg(sonMsg)}>send</button>
		</div>
	)
}

function App(){
	const getMsg = (msg) => console.log(msg)
	return (
		<div>
			<Son onGetMsg={getMsg} />
		</div>
	)
}
```
### Props Writing

```js
function Son(props){
	const sonMsg = 'this is son msg';
	return (
		<div>
			<button onClick={() => props.onGetMsg(sonMsg)}>send</button>
		</div>
	);
}
```



## createContext()

```js
import { createContent } from "react"

const MsgContext = createContent()

function A(){
	return (
		<div>
			this is A component
			<B />
		</div>
	)
}

function B(){
const msg = useContext(MsgContext)
	return (
		<div>
			this is B component , { msg }
		</div>
	)
}

function App(){
const msg = 'this is app msg'
	return (
		<div>
			<MsgContext.Provider value={msg}>
				this is App
				<A />
			</MsgContext.Provider>
		</div>
	)
}
```























