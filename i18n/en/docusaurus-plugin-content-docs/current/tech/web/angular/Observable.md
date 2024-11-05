---
id: observable
slug: /observable
title: Angular Observable
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---



:::success Previous article reminder

`Observable` is an important concept in the RxJS library and is often used to handle asynchronous data streams. In Angular, `Observable` is often used with `HttpClient` to elegantly manage asynchronous data when processing HTTP requests.

:::

## What is Observable?

- **Definition**: `Observable` is an object used to handle asynchronous events. It can be used to represent a value or event that may occur at a certain point in the future.

- Features

:

- **Delayed execution**: `Observable` will not execute immediately, it will start executing when it is subscribed.

- **Multiple emission values**: `Observable` can emit values ​​(data) multiple times in its life cycle, instead of only once like Promise.

- **Support combination**: The values ​​of `Observable` can be combined and processed through a variety of operators provided by RxJS.

**Example: HTTP Requests with Observable**

Here is a detailed example of using `Observable` in Angular, showing how to make GET and POST requests with `HttpClient`.

------

### 1. Install RxJS and HttpClientModule

Angular applications have already integrated `RxJS` by default, so there is no need to install it separately. Next, import `HttpClientModule` in `app.module.ts`:

```js
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { DataService } from './data.service'; // Import custom service

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule to the imports array
    FormsModule // Add FormsModule to support two-way data binding
  ],
  providers: [DataService], // Provide the custom service
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 2. Create a data service

Create a service for sending HTTP requests:

```
ng generate service data
```

Add the following code to `data.service.ts`:

```js
// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available at the root level
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API URL

  constructor(private http: HttpClient) { }

  // Send a GET request
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Returns an Observable
  }

  // Send a POST request
  createPost(post: { title: string, body: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, post); // Returns an Observable
  }
}
```

### 3. Modify the root component

Use this service in the root component:

```js
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Ensure HTML template file is used
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any[] = []; // Stores posts fetched from the API
  newPost = { title: '', body: '' }; // For creating a new post

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Fetch posts when the component initializes
    this.dataService.getPosts().subscribe(data => {
      this.posts = data; // Assign data to posts array
    }, error => {
      console.error('Request failed', error); // Handle errors
    });
  }

  // Create a new post
  createPost(): void {
    this.dataService.createPost(this.newPost).subscribe(data => {
      console.log('Post created', data);
      this.posts.push(data); // Add the new post to the existing posts list
      this.newPost = { title: '', body: '' }; // Reset input fields
    }, error => {
      console.error('Failed to create post', error); // Handle errors
    });
  }
}
```

### 4. Update HTML template

Update the template in `src/app/app.component.html` as follows:

```html
<h1>Posts</h1>
<ul>
  <li *ngFor="let post of posts">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </li>
</ul>

<h2>Create Post</h2>
<div>
  <input [(ngModel)]="newPost.title" placeholder="Title" />
  <textarea [(ngModel)]="newPost.body" placeholder="Body"></textarea>
  <button (click)="createPost()">Create</button>
</div>
```

### 5. Run the application

After ensuring everything is set up correctly, run in the project directory:

```
ng serve
```

Then visit `http://localhost:4200` in your browser, you will see a list of post titles and can create a new post through the input box.

### Summary

- **Use Observable**: In the above example, both `getPosts` and `createPost` methods return `Observable` types, which means they will not be executed immediately, but will start executing when subscribed. You can handle these asynchronous data by calling the `subscribe` method in the component.

- **Asynchronous Programming**: `Observable` provides a convenient way to handle asynchronous programming, making the code clearer and more maintainable.

### Code Explanation

- **getPosts**: Send a GET request to get a list of posts and return an `Observable`.

- **createPost**: Send a POST request to create a new post and return an `Observable`.

- **subscribe**: Subscribe to `Observable` to handle the returned data and errors.

By using `Observable`, you can easily manage asynchronous data streams and implement more complex interaction logic in your application.
