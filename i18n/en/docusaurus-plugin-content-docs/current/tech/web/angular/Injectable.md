---
id: injectable
slug: /injectable
title: Angular Injectable
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---



:::success Previous article reminder

`@Injectable` is a decorator in Angular that is used to define an injectable service. It tells Angular that the class can be injected into other classes, such as components, other services, or instructions. The following is a detailed explanation of `@Injectable`.

:::

### Definition

- **`@Injectable` decorator**: It is one of the core functions of Angular, marking a class as an injectable service. Only classes marked as `@Injectable` can be recognized and injected by Angular's dependency injection system in the constructor.

### Function

- **Dependency injection**: Angular uses dependency injection (DI) to manage dependencies between classes. With `@Injectable`, Angular can create an instance of the service and pass it to the required class.

- **Modularization**: Separate service logic into independent classes to make the code more modular. Each service can handle specific functions, which can improve the reusability and maintainability of the code.

### Usage scenarios

- **Service**: Services are usually created in Angular applications to encapsulate business logic, data access, or other functions that span multiple components.

- **Shared data**: Services can be used to share data and state between different components. For example, you can create a user service to manage user information and use it in multiple components.

- **HTTP request**: Typically, services are used to send HTTP requests and handle responses, such as getting data, creating data, updating data, etc.

In `Angular`, creating an injectable service (`Injectable Service`) is a common practice that helps you separate business logic from components. Here are detailed steps and code examples on how to create and use an Angular service.

------

### 1. Create a service

Use Angular CLI to create a service. Here we will create a service named `data.service.ts`.

```
ng generate service data
```

This command generates `data.service.ts` and `data.service.spec.ts` files in the `src/app/` directory.

### 2. Implement the service

Open the `data.service.ts` file and add the following code:

```js
// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Use the @Injectable decorator to make the service injectable
@Injectable({
  providedIn: 'root' // Specifies that the service is available in the root injector
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Sample API

  constructor(private http: HttpClient) { } // Inject HttpClient

  // Send a GET request and return an Observable
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // the returned Observable
  }

  // Send a POST request and return an Observable
  createPost(post: { title: string; body: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, post); // the returned Observable
  }
}
```

### 3. Update AppModule

Make sure `HttpClientModule` is imported in your `app.module.ts` file. This will allow you to use `HttpClient` to send HTTP requests.

```js
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // import HttpClientModule

import { AppComponent } from './app.component';
import { DataService } from './data.service'; // Importing Customized Services

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Add HttpClientModule to the imports array
  ],
  providers: [DataService], // Provide customized services
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 4. Use services in components

Open the `app.component.ts` file and use `DataService` to get and create data:

```js
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Ensure the HTML template file is used
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any[] = []; // To store posts fetched from the API
  newPost = { title: '', body: '' }; // For creating new posts

  constructor(private dataService: DataService) { } // Inject the service

  ngOnInit(): void {
    // Fetch posts on component initialization
    this.dataService.getPosts().subscribe(data => {
      this.posts = data; // Assign to posts
    }, error => {
      console.error('Request failed', error); // Handle errors
    });
  }

  // Create a new post
  createPost(): void {
    this.dataService.createPost(this.newPost).subscribe(data => {
      console.log('Post created', data);
      this.posts.push(data); // Add the new post to the existing list
      this.newPost = { title: '', body: '' }; // Reset input fields
    }, error => {
      console.error('Failed to create post', error); // Handle errors
    });
  }
}

```

### 5. Update HTML template

In `src/app/app.component.html` Update the template to add an input box to create a new post:

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

### 6. Run the application

After making sure everything is set up correctly, run in the project directory:

```
ng serve
```

Then visit `http://localhost:4200` in the browser, you will see a list of post titles and can create new posts through the input box.

### Summary

- **@Injectable decorator**: Make the service injectable and inject `HttpClient` through the constructor.

- **Service method**: Create `getPosts` and `createPost` methods for sending GET and POST requests respectively.

- **Component uses service**: Inject `DataService` in the component and get and create data by calling the service method.

Through this process, you have successfully created an Angular service and used it in the component to handle HTTP requests. This separation of concerns makes the code more modular and maintainable.