---
id: class-name-react
slug: /class-name-react
title: Class Name
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

`classnames` 是一个小巧的 JavaScript 库，专门用于处理动态类名的管理。在 React 项目中，`classnames` 非常有用，尤其是在需要根据组件的状态或 props 动态切换 CSS 类名时。

以下是如何在 React 项目中使用 `classnames` 的详细步骤和代码示例。

### 1. 安装 `classnames`

在项目根目录下通过 npm 或 yarn 安装 `classnames`：

```
npm install classnames
```

或

```
yarn add classnames
```

### 2. 在 React 组件中使用 `classnames`

`classnames` 允许你以多种方式组合类名，可以传入字符串、对象、数组等。下面是一些常见用法示例。

#### 2.1 基本使用示例

先引入 `classnames`：

```react
import classNames from 'classnames';
```

### 3. 使用 `classnames` 动态控制类名

#### 3.1 通过字符串组合类名

可以直接传入字符串：

```react
const btnClass = classNames('btn', 'btn-primary');
console.log(btnClass); // 输出: 'btn btn-primary'
```

#### 3.2 使用对象条件控制类名

在对象中指定条件，当条件为 `true` 时，`classnames` 会自动添加对应的类名。

```react
const btnClass = classNames('btn', {
  'btn-primary': true,
  'btn-secondary': false,
});
console.log(btnClass); // 输出: 'btn btn-primary'
```

### 4. 在 React 组件中实际应用

#### 4.1 代码示例：根据 props 动态应用样式

以下是一个按钮组件示例。根据传入的 `primary` 和 `disabled` props，按钮的样式会动态改变：

```react
import React from 'react';
import classNames from 'classnames';
import './Button.css'; // 假设你有一个 CSS 文件

function Button({ primary, disabled, children }) {
  // 使用 classNames 来动态设置类名
  const buttonClass = classNames('btn', {
    'btn-primary': primary,
    'btn-disabled': disabled,
  });

  return (
    <button className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
```

#### 4.2 在 CSS 文件中定义样式

```css
/* Button.css */
.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: blue;
  color: white;
}

.btn-disabled {
  background-color: grey;
  color: white;
  cursor: not-allowed;
}
```

#### 4.3 使用 Button 组件

在父组件中使用 `Button` 组件：

```react
import React from 'react';
import Button from './Button';

function App() {
  return (
    <div>
      <Button primary>Primary Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button primary disabled>
        Primary Disabled Button
      </Button>
    </div>
  );
}

export default App;
```

### 5. 使用数组传入多个类名

你可以传入数组来指定多个类名：

```react
const btnClass = classNames('btn', ['btn-large', 'btn-primary']);
console.log(btnClass); // 输出: 'btn btn-large btn-primary'
```

### 6. 条件组合复杂类名

在某些情况下，可能需要根据多个条件组合多个类名：

```react
function MyComponent({ isActive, hasError }) {
  const componentClass = classNames({
    'active': isActive,
    'error': hasError,
    'default': !isActive && !hasError,
  });

  return <div className={componentClass}>内容</div>;
}
```

### 7. 总结

- `classnames` 是一个强大的工具，能帮助我们轻松实现条件式的类名组合。
- 在 React 组件中，根据 `props` 或 `state` 动态地应用类名。
- 结合对象、数组和字符串传参，灵活性极高。

通过 `classnames`，可以避免手动拼接字符串，代码更清晰、易读。
