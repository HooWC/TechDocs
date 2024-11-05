---
id: react-base
slug: /react-base
title: 基础学习
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

# React 基础



##  安装 

```
npx create-react-app <project-name>
```

```
npm create vite@latest // 安装 template

npm run dev // 启动模板
```

启动

```
npm start // react启动
```

删除其他文件，留下 `index.js` 和 `App.js`

原始 `index.js` 文件

```react
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
```

##  安装 `Axios`  (如有需要)

```
npm i axios
```



## 基本使用

### Map 普通写法

```react
const list = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' }
  ];
```

```react
<ul>
  {
  	list.map(item => (
  	  <li key={item.id}>{item}</li>
  	))
  }
</ul>
```



### Map 函数写法

```react
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



### 三元表达式

```react
{flag && <span>this is span</span>}
```

```react
{loading ? <span>loading...</span> : <span>this is span</span>}
```



### onCLick

```react
function App(){
	const clickHandler = () => {
		cosole.log('button按钮点击了')
	}
	
	return (
		<button onCLick={clickHanfler}></button>
	)
}
```

`Component` 写法

```react
import React, { Component } from 'react';

class App extends Component {
  clickHandler = () => {
    console.log('button按钮点击了');
  }

  render() {
    return (
      <button onClick={this.clickHandler}></button>
    );
  }
}

export default App;
```

`传递参数` 写法

```react
function App(){
	const clickHandler = (name) => {
		cosole.log('button按钮点击了')
	}
	
	return (
		<button onCLick={() => clickHanfler('Hoo')}></button>
	)
}
```

```react
function App(){
	const clickHandler = (name,e) => {
		cosole.log('button按钮点击了')
	}
	
	return (
		<button onCLick={(e) => clickHanfler('Hoo',e)}></button>
	)
}
```



### Style 语法

（不推荐）

```react
<div style={{ color:'red' }}>this is div</div>
```

class类

```css
.foo {
	color:red
}
```

```react
import './index.css'

function App () {
	return (
		<div>
            // 安装 className 插件
			<span className='foo'>this is span</span>
		</div>
	)
}
```

安装

```
npm install classnames
```

使用

```react
import classNames from 'classnames'

className={classNames('nav-item', { active: type === item.type })}
```



### Filter

```react
List.filter(item => item.id !== id)
```



### 受控表单绑定 (onChange)

```react
const [value, setValue] = useState('')
```

```react
<input 
	type="text"
	value={value}
	onChange={(e) => setValue(e.target.value)}
/>
```



## 父传子

props只是读，不能修改数据

```react
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

```react
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



## 子传父

### 解构赋值 写法

```react
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
### Props 写法

```react
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

```react
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























