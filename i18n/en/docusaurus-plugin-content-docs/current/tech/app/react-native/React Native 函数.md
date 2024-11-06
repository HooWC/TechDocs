---
id: rn-function
slug: /rn-function
title: previousState Function
date: 2024-11-04
authors: Hoo
tags: [react-native]
keywords: [react-native]
---



:::info
In React Native, `previousState` is often used to handle component state updates, especially when you need to modify the previous state when updating the state. React's `setState` method accepts a function as a parameter, which receives `previousState` and `props` as parameters, allowing you to update the current state based on the previous state value.
:::

### 1. **`previousState` when using `setState` to update the state**

When you need to update the state of a component and the new state depends on the old state, `previousState` is usually used. React's `setState` method supports passing a function as a parameter, which accepts two parameters:

- `previousState`: the current state of the component (the state before the update).

- `props`: the props of the current component.

In this way, you can ensure that you correctly depend on the previous state when updating the state.

### 2. **Steps:**

- **Step 1**: Create a React Native project.

- **Step 2**: Create a component with state.
- **Step 3**: Use `setState` method to update the state based on `previousState`.

### 3. **Code Example:**

This example demonstrates how to use `previousState` in React Native to update the state of the counter app.

#### Code Demonstration:

```js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  // Define a counter state
  const [counter, setCounter] = useState(0);

  // Function to increase the counter
  const increaseCounter = () => {
    setCounter((previousState) => {
      // previousState is the value of the current state
      return previousState + 1;  // Increment by 1 based on previousState
    });
  };

  // Function that decrements a counter
  const decreaseCounter = () => {
    setCounter((previousState) => {
      // previousState is the value of the current state
      return previousState - 1;  // Decrement by 1 based on previousState
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>Counter: {counter}</Text>
      <Button title="Increase" onPress={increaseCounter} />
      <Button title="Decrease" onPress={decreaseCounter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 30,
    marginBottom: 20,
  },
});
```
#### Code Explanation:

1. **State Initialization**:
- `const [counter, setCounter] = useState(0);`: We initialize a state called `counter` with an initial value of 0.

2. **`increaseCounter` Function**:
- `setCounter((previousState) => previousState + 1);`: When the "Increase" button is clicked, `setCounter` updates the state. We pass in a function whose first parameter is the current `previousState`, and then returns `previousState + 1`, which increases `counter` by 1.

3. **`decreaseCounter` Function**:
- `setCounter((previousState) => previousState - 1);`: Similarly, when the "Decrease" button is clicked, we use `setCounter` to reduce `counter` by 1.
4. **Display**:
- In the `Text` component, we display the current `counter` value.

#### Running effect:

- Every time you click the `Increase` button, the value of `counter` will increase by 1.
- Every time you click the `Decrease` button, the value of `counter` will decrease by 1.
- Here `previousState` ensures that the state update is based on the previous state value, avoiding problems that may occur when the state is updated asynchronously.

------

### 4. **Why use `previousState`? **

1. **Avoid race conditions**: In React, `setState` is asynchronous, so if you do not rely on the previous state to calculate the new state, you may encounter race conditions. That is, when you rely on `this.state` to update the state, the state update may not be real-time.

Using `previousState` ensures that each state update is based on the correct, latest state value, rather than the old cached state.

2. **Multiple state updates**: If you call `setState` multiple times in an event, and these updates are based on the same `previousState`, using `previousState` ensures that each update is correct.

------

### 5. **Advanced usage:**

If you need to perform more complex operations in `setState` (such as asynchronous data fetching and then updating the state), you can use `previousState` in combination with `props`:

```js
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate getting data from an API
    setTimeout(() => {
      setData('API Data Loaded');
    }, 2000);
  }, []);

  const increaseCounter = () => {
    setCounter((previousState) => {
      return previousState + 1;
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Counter: {counter}</Text>
      <Button title="Increase" onPress={increaseCounter} />
      {data ? <Text>{data}</Text> : <Text>Loading data...</Text>}
    </View>
  );
}
```

In this example, we simulate fetching data from an API and set a delay in `useEffect` (via `setTimeout`). Even if `setState` depends on `previousState`, the state can be synchronized.

------

### Summary:

- Use `previousState` to ensure that your state updates are based on the latest value of the current state.
- Use the functional form of `setState` to handle updates that depend on the previous state to avoid race conditions.
- Suitable for scenarios where you need to perform multiple state updates, or when multiple operations are based on the same state.

This way, you can ensure that state updates in React Native are accurate, synchronized, and problem-free!