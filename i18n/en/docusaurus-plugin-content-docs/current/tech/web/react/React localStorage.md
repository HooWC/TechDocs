---
id: local-storage-react
slug: /local-storage-react
title: Local Storage
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

# React localStorage 

`localStorage` is a persistent storage mechanism provided by web browsers for storing key-value data in the browser. It allows you to store data in the browser and share data between pages under the same domain name. This data can remain unchanged after the page is reloaded, and even when the browser is closed and reopened, until it is explicitly deleted.

```js
import React, { useState } from 'react';

const App = () => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    localStorage.setItem('data', text);
    alert('Data saved successfully!');
  };

  const handleLoad = () => {
    const data = localStorage.getItem('data');
    if (data) {
      setText(data);
    } else {
      alert('No data found!');
    }
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleSave}>Save Data</button>
      <button onClick={handleLoad}>Load Data</button>
    </div>
  );
};

export default App;
```













