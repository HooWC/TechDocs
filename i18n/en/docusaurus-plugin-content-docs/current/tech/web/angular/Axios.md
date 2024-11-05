---
id: axios-angular
slug: /axios-angular
title: Angular Axios
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---

## Axios 



:::success Previous article reminder

In Angular, you can use `Axios` to make HTTP requests. Although Angular has a built-in `HttpClient` module, you can also use `Axios` if you are familiar with it or have specific needs. The following are detailed steps to install and configure `Axios` and use it in Angular.

:::

------

### 1. Install Axios

First, install `Axios` in the root directory of the Angular project.

```js
npm install axios
```

### 2. Create a service (Service) to encapsulate Axios requests

In order to keep the code clear and structured, HTTP request logic is usually encapsulated in the service. Use Angular CLI to create a service.

```js
ng generate service api
```

This command will generate two files: `api.service.ts` and `api.service.spec.ts`.

### 3. Configure Axios request logic

Open the generated `api.service.ts` file, import `Axios` and write the request method.

`api.service.ts`

```js
import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
providedIn: 'root'
})
export class ApiService {
private axiosInstance: AxiosInstance;

constructor() {
// Configure Axios instance
this.axiosInstance = axios.create({
baseURL: 'https://jsonplaceholder.typicode.com', // Your API root path
timeout: 1000, // Timeout
headers: { 'Content-Type': 'application/json' }
});
}

// GET request example
getPosts() {
return this.axiosInstance.get('/posts');
}

// POST request example
createPost(data: any) {
return this.axiosInstance.post('/posts', data);
}
}
```

Explanation

- `this.axiosInstance = axios.create({...})`: Creates an `Axios` instance and configures the base path, timeout, and default request headers.
- `getPosts` and `createPost` methods demonstrate GET and POST requests, respectively.

### 4. Using Axios requests in services

Call methods in the `ApiService` service in components. Next, we will call these methods in `AppComponent`.

`app.component.ts`

```js
import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any[] = [];
  newPost: any = { title: 'New Post', body: 'This is a new post.' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Call GET request to get data
    this.apiService.getPosts().then(response => {
      this.posts = response.data;
    }).catch(error => {
      console.error('Error fetching posts:', error);
    });

    // Call POST request to send data
    this.apiService.createPost(this.newPost).then(response => {
      console.log('Post created:', response.data);
    }).catch(error => {
      console.error('Error creating post:', error);
    });
  }
}
```

Explanation

- `this.apiService.getPosts()`: Call the `getPosts` method in `ApiService`, get the data and assign it to `posts`.

- `this.apiService.createPost(this.newPost)`: Call the `createPost` method to send new data and print the response result in the console.

### 5. Display data in HTML template

Display the data obtained from the API in `app.component.html`.

`app.component.html`

```html
<h1>Posts</h1>
<ul>
<li *ngFor="let post of posts">
<h3>{{ post.title }}</h3>
<p>{{ post.body }}</p>
</li>
</ul>
```

- `*ngFor="let post of posts"`: Loop through the title and content of each post.

------

### 6. Testing

Run the Angular application and check if the data is fetched from the API and displayed on the page.

```
ng serve
```

Open your browser and visit `http://localhost:4200`, you should see the `posts` list.

------

### 7. Handling requests and errors

In real applications, it is important to handle error information. You can add error handling in the service layer. Put the request in a `try-catch` statement or use the `catch` method to handle the error.

#### Handling errors in the service

In `api.service.ts`, modify the `getPosts` and `createPost` methods to add error handling.

```js
// GET request example
async getPosts() {
  try {
    const response = await this.axiosInstance.get('/posts');
    return response;
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw error;
  }
}

// POST request example
async createPost(data: any) {
  try {
    const response = await this.axiosInstance.post('/posts', data);
    return response;
  } catch (error) {
    console.error('Error in createPost:', error);
    throw error;
  }
}
```

------

### Summary

- **Install Axios**: Install via `npm install axios`.
- **Create a service**: Create a service via `ng generate service api`.
- **Configure an Axios instance**: Create and configure an `Axios` instance in the service.
- **Request data**: Call service methods in components and process data.
- **Error handling**: Use `try-catch` in services to handle request errors.

### Example 2:

This code uses the `axios` library to make a request to the specified API, and executes the request when the Angular component is initialized (i.e., the `ngOnInit` lifecycle hook), assigning the returned data to the `list` property. The specific process is as follows:

1. `list: Array<any> = []`: Define an array property named `list` to store data returned from the API, with an initial value of an empty array.
2. `ngOnInit(): void`: `ngOnInit` is one of the lifecycle hooks of Angular components and is automatically called after the component is initialized. It is usually used to perform certain operations (such as requesting data) when the component is loaded.
3. `axios.get('https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/getList')`:
- Here, the `axios.get()` method is used to make a GET request to the specified URL.
- `'https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/getList'` is the requested API address.
4. `.then(res => { this.list = res.data.data })`: This is a Promise chain that executes the `then` method when the request succeeds (i.e. a response is received).
- `res` is the response object of the request.
- `res.data` is the body of the response, assuming it contains a `data` property that holds the array data we need.
- `this.list = res.data.data`: Assign the data in the response (`res.data.data`) to the `list` property.

The final effect is: when the component is initialized, a request is made to the specified API and the returned data is stored in `list` so that it can be used in the template.

```javascript
list:Array<any> = [];

ngOnInit():void {
	axios.get('https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/getList').then( res => {
		this.list = res.data.data
	})
}
```

or

```javascript
list: Array<any> = []; // Define an array named list to store data obtained from the API.
page: number = 0; // Define a number named page to track the current page, with an initial value of 0.

ngOnInit(): void { // Angular component lifecycle hook, called after component initialization
// Initiate a GET request to the specified API
  axios.get('https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/getList')
  .then(res => { // Process the response of a successful request
    let list: Array<any> = res.data.data; // Store the data in the response in the temporary variable list
    // Traverse the obtained data and group it by 10 data
    for (let index = 0; index < list.length; index++) {
    // Slice the current index and the next 9 elements (a total of 10) and push them into this.list
      this.list.push(list.slice(index, index + 10));
      index += 9; // Increase index 9 so that the next loop starts from the next group
    }
  });
}
```

Front-end use

```html
<tr *ngIf="let item of list[page]">
	<td>{{  item.id }}</td>
	<td>{{  item.title }}</td>
</tr>
```







