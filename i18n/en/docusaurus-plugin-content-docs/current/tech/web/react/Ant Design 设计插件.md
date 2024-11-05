---
id: ant-design-react
slug: /ant-design-react
title: Ant Design Plugins
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

Ant Design is a widely used React UI component library that provides many high-quality components to help developers quickly build beautiful user interfaces. Here are the detailed steps on how to use Ant Design in a React project, including installation, basic configuration, and usage examples.

### Step 1: Install Ant Design

First, you need to install Ant Design in your React project. Make sure you have created a React project (if you haven't already, you can use `create-react-app` to create one).

Run the following command in the terminal to install Ant Design:

```react
npm install antd
```

### Step 2: Import Ant Design styles

Introduce Ant Design styles in your `src/index.js` file or `src/App.js` file:

```react
import 'antd/dist/antd.css'; // Import Ant Design styles
```

### Step 3: Use Ant Design components

Here is a simple example showing how to use Ant Design's button and input box components:

```js
import React, { useState } from 'react';
import 'antd/dist/antd.css'; // Import Ant Design styles
import { Button, Input, message } from 'antd'; // Import necessary components

function App() {
  const [inputValue, setInputValue] = useState(''); // State for the input box

  const handleClick = () => {
    message.success(`The content you entered is: ${inputValue}`); // Show success message
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Ant Design Example</h1>
      <Input
        placeholder="Please enter content"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update input box state
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <Button type="primary" onClick={handleClick}>
        Submit
      </Button>
    </div>
  );
}

export default App;

```

### Step 4: Code Explanation

1. **Introduce components**:

```react
import { Button, Input, message } from 'antd';
```

Import the required components from Ant Design. `Button` and `Input` are the components we will use, and `message` is used to display prompt information.

2. **Create state**:

```react
const [inputValue, setInputValue] = useState('');
```

Use `useState` to create a state `inputValue` to store the content of the input box.

3. **Handle button click events**:

   ```js
   const handleClick = () => {
     message.success(`Your input is: ${inputValue}`);
   };
   ```

   When the button is clicked, the `handleClick` function is called and `message.success` is used to display the user input.

4. **Use the `Input` component**:

   ```js
   <Input
     placeholder="Please enter content"
     value={inputValue}
     onChange={(e) => setInputValue(e.target.value)}
     style={{ width: '300px', marginBottom: '10px' }}
   />
   ```

  - `placeholder`: The hint text of the input box.
  - `value`: Bind to the `inputValue` state so that the content of the input box can be controlled.
  - `onChange`: Update the state of `inputValue` when the content of the input box changes.
  - `style`: Set the width and bottom margin of the input box.

5. **Use the Button component**:

   ```js
   <Button type="primary" onClick={handleClick}>
     Submit
   </Button>
   ```

   - `type`: The type of the button. Here it is set to `primary`, which means the primary button.
   - `onClick`: The function called when the button is clicked.

6. **Overall layout**：

   ```js
   <div style={{ padding: '20px' }}>
     <h1>Ant Design example</h1>
     ...
   </div>
   ```

   Use a `div` to wrap the entire content and set some padding.

### Step 5: Run your application

After completing the above steps, you can run the following command in the terminal to start your React application:

```react
npm start
```

Open `http://localhost:3000` in the browser, you will see a simple form, enter the content and click the submit button, and a prompt will pop up to show your input content.

### Summary

Through the above steps, you have successfully integrated Ant Design in your React application and used basic button and input box components. Ant Design provides a wealth of components and themes, and you can customize the style and functionality as needed. You can visit the Ant Design official documentation for more detailed information on components and usage.
