---
id: fetch-base
slug: /fetch-base
title: Fetch Api
date: 2024-11-04
authors: Hoo
tags: [ajax]
keywords: [ajax]
---

## Fetch API

以Below are detailed examples and steps for basic CRUD operations and fetching data using the Fetch API.

### 1. Basic Usage

First, make sure your environment supports the Fetch API, which is supported by modern browsers.

### 2. CRUD Sample Code

Assuming we use `https://jsonplaceholder.typicode.com/posts` as a RESTful API, here is an example of CRUD operations:

#### 2.1 Create

```js
const createPost = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Created Post:', data);
    } catch (error) {
        console.error('Error creating post:', error);
    }
};

createPost();
```

#### 2.2 Read

```js
const fetchPosts = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Posts:', data);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

fetchPosts();
```

#### 2.3 Update

```js
const updatePost = async (postId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Updated Title',
                body: 'Updated Body',
                userId: 1,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Updated Post:', data);
    } catch (error) {
        console.error('Error updating post:', error);
    }
};

// Call the update function, assuming you want to update the post with ID 1
updatePost(1);
```

#### 2.4 删除（Delete）

```js
const deletePost = async (postId) => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        console.log('Deleted Post:', response.status); // 204 No Content
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

// Call the delete function, assuming you want to delete the post with ID 1
deletePost(1);
```

### 3. Summary

The above code shows how to use the Fetch API to perform CRUD operations, including create, read, update, and delete operations. You can modify the API URL and request body as needed. Make sure to check `response.ok` when processing the response to handle possible errors.



- **jQuery AJAX**:

  ```js
  $.ajax({
      url: 'https://api.example.com/data',
      method: 'GET',
      success: function(data) {
          console.log('Success:', data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.error('Error:', textStatus, errorThrown);
      }
  });
  ```

- **Fetch API**:

  ```js
  fetch('https://api.example.com/data')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
  ```

### 4. Functionality and flexibility

- **jQuery AJAX**:
- Provides a higher level of abstraction, making it relatively easy to handle complex requests (such as serializing data, processing JSON, etc.).
- By setting various options, timeouts, retries, caching, etc. can be easily handled.
- **Fetch API**:
- Uses Promise, which is more modern and flexible, but requires manual handling of errors and response types (such as JSON, text, etc.).
- Does not support directly setting request timeouts and caching.

















































































