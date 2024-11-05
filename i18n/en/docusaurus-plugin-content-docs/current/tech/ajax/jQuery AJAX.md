---
id: jq-base
slug: /jq-base
title: JQuery Ajax
date: 2024-11-04
authors: Hoo
tags: [ajax]
keywords: [ajax]
---

###  jQuery AJAX

Here are detailed examples and steps for basic CRUD operations using jQuery AJAX. Assume we will be interacting with `https://jsonplaceholder.typicode.com/posts`, which is a simulated RESTful API.

### 1. Import jQuery

First, import jQuery in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jQuery AJAX CRUD</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <!-- Your Content -->
</body>
</html>
```

### 2. CRUD sample code

#### 2.1 Create

```js
const createPost = () => {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        success: (data) => {
            console.log('Created Post:', data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error('Error creating post:', textStatus, errorThrown);
        }
    });
};

// Calling the create function
createPost();
```

#### 2.2 读取（Read）

```js
const fetchPosts = () => {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET',
        success: (data) => {
            console.log('Posts:', data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error('Error fetching posts:', textStatus, errorThrown);
        }
    });
};

// Call the get function
fetchPosts();
```

#### 2.3 Update

```js
const updatePost = (postId) => {
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({
            title: 'Updated Title',
            body: 'Updated Body',
            userId: 1,
        }),
        success: (data) => {
            console.log('Updated Post:', data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error('Error updating post:', textStatus, errorThrown);
        }
    });
};

// Call the update function, assuming you want to update the post with ID 1
updatePost(1);
```

#### 2.4 Delete

```js
const deletePost = (postId) => {
    $.ajax({
        url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
        method: 'DELETE',
        success: (data) => {
            console.log('Deleted Post:', data); // Typically, a delete returns 204 No Content
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error('Error deleting post:', textStatus, errorThrown);
        }
    });
};

// Call the delete function, assuming you want to delete the post with ID 1
deletePost(1);
```

### 3. Summary

The above code shows how to use jQuery AJAX to perform CRUD operations, including create, read, update, and delete operations. Make sure your network connection is normal and the API URL is accessible when calling these functions. You can modify the request data and URL as needed.

### Form data

If you are using form data, the code can be as follows:

```js
const createPost = () => {
    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'POST',
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1
        },
        success: (data) => {
            console.log('Created Post:', data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.error('Error creating post:', textStatus, errorThrown);
        }
    });
};

// Calling the create function
createPost();
```















