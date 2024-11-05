---
id: httpclient-module
slug: /httpclient-module
title: Angular HttpClientModule
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---

## 



:::success Previous article reminder

`HttpClientModule` is a module in the Angular framework that simplifies and enhances HTTP communication with the server. It provides an injectable `HttpClient` service that allows developers to easily send HTTP requests and process responses. The following is a detailed explanation of `HttpClientModule`:

:::

### Main functions

1. **HTTP request**:

- `HttpClient` can send multiple types of HTTP requests, including GET, POST, PUT, DELETE, etc. These requests can be used to interact with RESTful APIs to get or send data.

2. **Response processing**:

- The response returned by `HttpClient` is an RxJS `Observable`, which allows you to process data streams in a responsive programming way. You can listen to the response through the `subscribe` method and process the data.

3. **Automatic JSON conversion**:

- `HttpClient` automatically converts the JSON data of the HTTP response to JavaScript objects, which makes it more convenient to handle the response data.

4. **Request interceptors**:

- You can define interceptors to handle requests and responses. This is very useful for adding authentication tokens to each request, handling errors, logging requests, etc.

5. **Simplified error handling**:

- `HttpClient` provides a more concise error handling mechanism, allowing you to easily capture and handle HTTP errors.

------

### Simple example 1:

Import `HttpClientModule` in the **`app.module.ts`** file

```javascript
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule to use the HttpClient service in your app

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    HttpClientModule // Import HttpClientModule, allowing us to use HttpClient in the service to make HTTP requests
  ],
  providers: [], 
  bootstrap: [AppComponent] 
})
export class AppModule { } 
```

You can then use `HttpClient` in your component to send the request and handle the response.

```javascript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoices: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(): void {
    this.http.get<any>('/api/get_all_invoice')
      .subscribe(
        (response) => {
          // Update invoice data in component
          this.invoices = response.invoices;
        },
        (error) => {
          console.error('Error fetching invoices:', error);
        }
      );
  }
}
```

------

### Simple example 2:

#### 1. Install `HttpClientModule`

Import `HttpClientModule` in the `app.module.ts` file:

```js
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppComponent } from './app.component';
import { DataService } from './data.service'; // Import custom services

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // Add HttpClientModule to the imports array
  ],
  providers: [DataService], // Provide custom services
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 2. Create a data service

Create a service for sending HTTP requests:

```
ng generate service data
```

Then add the code in `data.service.ts`:

```js
// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // The service is available at the root level
})
export class DataService {
private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API

constructor(private http: HttpClient) { }

// Send a GET request
getPosts(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl); // Return an Observable
}

// Send a POST request
createPost(post: { title: string, body: string }): Observable<any> {
  return this.http.post<any>(this.apiUrl, post); // Return an Observable
  }
}
```

#### 3. Modify the root component

Use this service in the root component:

```js
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Posts</h1>
    <ul>
      <li *ngFor="let post of posts">{{ post.title }}</li>
    </ul>
    <h2>Create Post</h2>
    <input [(ngModel)]="newPost.title" placeholder="Title">
    <textarea [(ngModel)]="newPost.body" placeholder="Body"></textarea>
    <button (click)="createPost()">Create</button>
`,
styles: []
})
export class AppComponent implements OnInit {
posts: any[] = []; // Used to store posts obtained from the API
newPost = { title: '', body: '' }; // Used to create new posts

constructor(private dataService: DataService) { }

ngOnInit(): void {
  // Get posts when the component is initialized
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
      this.posts.push(data); // Add the new post to the existing list of posts
      this.newPost = { title: '', body: '' }; // Reset the input fields
    }, error => {
      console.error('Failed to create post', error); // Handle the error
    });
  }
}
```

#### 4. Update the HTML template

Make sure your `AppComponent` template references the input and list correctly. The HTML template is already included in the code above.

```html
<h1>Posts</h1>
<!-- Display the post list -->
<ul>
  <li *ngFor="let post of posts">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </li>
</ul>

<h2>Create Post</h2>
<!-- Enter the form for a new post -->
<div>
  <input [(ngModel)]="newPost.title" placeholder="Title" />
  <textarea [(ngModel)]="newPost.body" placeholder="Body"></textarea>
  <button (click)="createPost()">Create</button>
</div>
```

#### 5. Run the application

After ensuring everything is set up correctly, run in the project directory:

```
ng serve
```

