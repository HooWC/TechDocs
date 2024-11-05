---
id: class-name-react
slug: /class-name-react
title: Class Name
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

`classnames` is a small JavaScript library that specifically handles the management of dynamic class names. `classnames` is very useful in React projects, especially when you need to dynamically switch CSS class names based on the state or props of a component.

Below are detailed steps and code examples on how to use `classnames` in a React project.

### 1. Install `classnames`

Install `classnames` via npm or yarn in the project root directory:

```
npm install classnames
```

or

```
yarn add classnames
```

### 2. Use `classnames` in React components

`classnames` allows you to combine class names in a variety of ways, you can pass in strings, objects, arrays, etc. Here are some common usage examples.

#### 2.1 Basic usage examples

First import `classnames`:

```react
import classNames from 'classnames';
```

### 3. Use `classnames` to dynamically control class names

#### 3.1 Combine class names with strings

You can directly pass in strings:

```react
const btnClass = classNames('btn', 'btn-primary');
console.log(btnClass); // Output: 'btn btn-primary'
```

#### 3.2 Use object conditions to control class names

Specify conditions in the object. When the condition is `true`, `classnames` will automatically add the corresponding class name.

```js
const btnClass = classNames('btn', {
  'btn-primary': true,
  'btn-secondary': false,
});
console.log(btnClass); // output: 'btn btn-primary'
```

### 4. Practical application in React components

#### 4.1 Code example: Apply styles dynamically based on props

Here is an example of a button component. Depending on the `primary` and `disabled` props passed in, the button's style will change dynamically:

```js
import React from 'react';
import classNames from 'classnames';
import './Button.css'; // Assume you have a CSS file

function Button({ primary, disabled, children }) {
  // Use classNames to dynamically set class names
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

#### 4.2 Defining styles in CSS files

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

#### 4.3 Use Button component

Use `Button` component in parent component:

```js
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

### 5. Use an array to pass in multiple class names

You can pass in an array to specify multiple class names:

```react
const btnClass = classNames('btn', ['btn-large', 'btn-primary']);
console.log(btnClass); // Output: 'btn btn-large btn-primary'
```

### 6. Conditional combination of complex class names

In some cases, you may need to combine multiple class names based on multiple conditions:

```js
function MyComponent({ isActive, hasError }) {
  const componentClass = classNames({
    'active': isActive,
    'error': hasError,
    'default': !isActive && !hasError,
  });

  return <div className={componentClass}>cotent</div>;
}
```

### 7. Summary

- `classnames` is a powerful tool that can help us easily implement conditional class name combination.
- In React components, dynamically apply class names based on `props` or `state`.
- Combine object, array and string parameters for high flexibility.

With `classnames`, you can avoid manual string concatenation, making the code clearer and easier to read.
