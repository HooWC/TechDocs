---
id: axios-base
slug: /axios-base
title: Axios
date: 2024-11-04
authors: Hoo
tags: [ajax]
keywords: [ajax]
---

## Axios

### 1. Install Axios

If you haven't installed Axios yet, you can install it via npm or yarn:

```js
npm install axios
# or
yarn add axios
```

### 2. Basic usage

#### 2.1 Send a GET request

```js
import axios from 'axios';

const getData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

getData();
```

#### 2.2 Sending a POST request

```js
import axios from 'axios';

const postData = async () => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: 'foo',
            body: 'bar',
            userId: 1,
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

postData();
```

### 3. Custom request headers

```js
import axios from 'axios';

const fetchDataWithHeaders = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            headers: {
                'Authorization': 'Bearer YOUR_TOKEN',
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data with headers:', error);
    }
};

fetchDataWithHeaders();
```



### 4. CRUD Example Code

Assuming we are interacting with a RESTful API, such as `https://jsonplaceholder.typicode.com/posts`, the following is an example of CRUD operations:

#### 4.1 Create

```js
import axios from 'axios';

const createPost = async () => {
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: 'foo',
            body: 'bar',
            userId: 1,
        });
        console.log('Created Post:', response.data);
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

createPost();
```

#### 4.2 Read

```js
import axios from 'axios';

const fetchPosts = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log('Posts:', response.data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

fetchPosts();
```

#### 4.3 Update

```js
import axios from 'axios';

const updatePost = async (postId) => {
    try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            title: 'Updated Title',
            body: 'Updated Body',
            userId: 1,
        });
        console.log('Updated Post:', response.data);
    } catch (error) {
        console.error('Error updating post:', error);
    }
};

// Call the update function, assuming you want to update the post with ID 1
updatePost(1);
```

#### 4.4 Delete

```js
import axios from 'axios';

const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        console.log('Deleted Post:', response.status); // 204 No Content
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

// Call the delete function, assuming you want to delete the post with ID 1
deletePost(1);
```

### Summary

The above code shows how to use Axios to perform CRUD operations, namely create, read, update, and delete operations. You can modify the API URL and request body as needed.

































































