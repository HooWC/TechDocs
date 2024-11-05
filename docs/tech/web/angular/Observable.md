<<<<<<< HEAD:docs/tech/Web/Angular/Observable.md
---
id: observable
slug: /observable
title: Angular Observable
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---



:::success 前文提醒

`Observable` 是 RxJS 库中的一个重要概念，常用于处理异步数据流。在 Angular 中，`Observable` 常与 `HttpClient` 一起使用，以便在处理 HTTP 请求时能够优雅地管理异步数据。

::: 

## 什么是 Observable？

- **定义**: `Observable` 是一种用于处理异步事件的对象，它可以用来表示一个可能在未来某个时间点发生的值或事件。

- 特性

  :

  - **延迟执行**: `Observable` 不会立即执行，它会在被订阅时才开始执行。
  - **多次发出值**: `Observable` 可以在其生命周期中多次发出值（数据），而不是像 Promise 只能发出一次。
  - **支持组合**: 可以通过 RxJS 提供的多种操作符组合和处理 `Observable` 的值。

**示例：使用 Observable 进行 HTTP 请求**

下面是一个在 Angular 中使用 `Observable` 的详细示例，展示如何通过 `HttpClient` 发起 GET 和 POST 请求。

------

### 1. 安装 RxJS 和 HttpClientModule

Angular 应用默认已经集成了 `RxJS`，因此不需要单独安装。接下来，在 `app.module.ts` 中导入 `HttpClientModule`：

```js
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // 导入 HttpClientModule
import { FormsModule } from '@angular/forms'; // 导入 FormsModule

import { AppComponent } from './app.component';
import { DataService } from './data.service'; // 导入自定义服务

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // 添加 HttpClientModule 到 imports 数组
    FormsModule // 添加 FormsModule 支持双向数据绑定
  ],
  providers: [DataService], // 提供自定义服务
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. 创建数据服务

创建一个服务用于发送 HTTP 请求：

```
ng generate service data
```

在 `data.service.ts` 中添加以下代码：

```js
// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 该服务在根级别可用
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // 示例 API

  constructor(private http: HttpClient) { }

  // 发送 GET 请求
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // 返回一个 Observable
  }

  // 发送 POST 请求
  createPost(post: { title: string, body: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, post); // 返回一个 Observable
  }
}
```

### 3. 修改根组件

在根组件中使用这个服务：

```js
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // 确保使用了 HTML 模板文件
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any[] = []; // 用于存储从 API 获取的帖子
  newPost = { title: '', body: '' }; // 用于创建新帖子

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // 组件初始化时获取帖子
    this.dataService.getPosts().subscribe(data => {
      this.posts = data; // 赋值给 posts
    }, error => {
      console.error('请求失败', error); // 处理错误
    });
  }

  // 创建新帖子
  createPost(): void {
    this.dataService.createPost(this.newPost).subscribe(data => {
      console.log('帖子已创建', data);
      this.posts.push(data); // 将新帖子添加到现有帖子列表
      this.newPost = { title: '', body: '' }; // 重置输入字段
    }, error => {
      console.error('创建帖子失败', error); // 处理错误
    });
  }
}
```

### 4. 更新 HTML 模板

在 `src/app/app.component.html` 中更新模板，如下所示：

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

### 5. 运行应用

确保一切设置无误后，在项目目录中运行：

```
ng serve
```

然后在浏览器中访问 `http://localhost:4200`，你将看到一个显示帖子标题的列表，并可以通过输入框创建新帖子。

### 总结

- **使用 Observable**: 在上面的例子中，`getPosts` 和 `createPost` 方法返回的都是 `Observable` 类型，这意味着它们不会立即执行，而是在被订阅时才开始执行。你可以在组件中通过调用 `subscribe` 方法来处理这些异步数据。
- **异步编程**: `Observable` 提供了一种方便的方式来处理异步编程，使代码更加清晰和可维护。

### 代码解释

- **getPosts**: 发送 GET 请求以获取帖子列表，并返回一个 `Observable`。
- **createPost**: 发送 POST 请求以创建新帖子，并返回一个 `Observable`。
- **subscribe**: 订阅 `Observable` 以处理返回的数据和错误。

通过使用 `Observable`，你可以轻松管理异步数据流，并在应用中实现更复杂的交互逻辑。
=======
---
id: observable
slug: /observable
title: Angular Observable
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---


`Observable` 是 RxJS 库中的一个重要概念，常用于处理异步数据流。在 Angular 中，`Observable` 常与 `HttpClient` 一起使用，以便在处理 HTTP 请求时能够优雅地管理异步数据。

## 什么是 Observable？

- **定义**: `Observable` 是一种用于处理异步事件的对象，它可以用来表示一个可能在未来某个时间点发生的值或事件。

- 特性

  :

  - **延迟执行**: `Observable` 不会立即执行，它会在被订阅时才开始执行。
  - **多次发出值**: `Observable` 可以在其生命周期中多次发出值（数据），而不是像 Promise 只能发出一次。
  - **支持组合**: 可以通过 RxJS 提供的多种操作符组合和处理 `Observable` 的值。

**示例：使用 Observable 进行 HTTP 请求**

下面是一个在 Angular 中使用 `Observable` 的详细示例，展示如何通过 `HttpClient` 发起 GET 和 POST 请求。

------

### 1. 安装 RxJS 和 HttpClientModule

Angular 应用默认已经集成了 `RxJS`，因此不需要单独安装。接下来，在 `app.module.ts` 中导入 `HttpClientModule`：

```js
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // 导入 HttpClientModule
import { FormsModule } from '@angular/forms'; // 导入 FormsModule

import { AppComponent } from './app.component';
import { DataService } from './data.service'; // 导入自定义服务

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // 添加 HttpClientModule 到 imports 数组
    FormsModule // 添加 FormsModule 支持双向数据绑定
  ],
  providers: [DataService], // 提供自定义服务
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. 创建数据服务

创建一个服务用于发送 HTTP 请求：

```
ng generate service data
```

在 `data.service.ts` 中添加以下代码：

```js
// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 该服务在根级别可用
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // 示例 API

  constructor(private http: HttpClient) { }

  // 发送 GET 请求
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // 返回一个 Observable
  }

  // 发送 POST 请求
  createPost(post: { title: string, body: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, post); // 返回一个 Observable
  }
}
```

### 3. 修改根组件

在根组件中使用这个服务：

```js
// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // 确保使用了 HTML 模板文件
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any[] = []; // 用于存储从 API 获取的帖子
  newPost = { title: '', body: '' }; // 用于创建新帖子

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // 组件初始化时获取帖子
    this.dataService.getPosts().subscribe(data => {
      this.posts = data; // 赋值给 posts
    }, error => {
      console.error('请求失败', error); // 处理错误
    });
  }

  // 创建新帖子
  createPost(): void {
    this.dataService.createPost(this.newPost).subscribe(data => {
      console.log('帖子已创建', data);
      this.posts.push(data); // 将新帖子添加到现有帖子列表
      this.newPost = { title: '', body: '' }; // 重置输入字段
    }, error => {
      console.error('创建帖子失败', error); // 处理错误
    });
  }
}
```

### 4. 更新 HTML 模板

在 `src/app/app.component.html` 中更新模板，如下所示：

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

### 5. 运行应用

确保一切设置无误后，在项目目录中运行：

```
ng serve
```

然后在浏览器中访问 `http://localhost:4200`，你将看到一个显示帖子标题的列表，并可以通过输入框创建新帖子。

### 总结

- **使用 Observable**: 在上面的例子中，`getPosts` 和 `createPost` 方法返回的都是 `Observable` 类型，这意味着它们不会立即执行，而是在被订阅时才开始执行。你可以在组件中通过调用 `subscribe` 方法来处理这些异步数据。
- **异步编程**: `Observable` 提供了一种方便的方式来处理异步编程，使代码更加清晰和可维护。

### 代码解释

- **getPosts**: 发送 GET 请求以获取帖子列表，并返回一个 `Observable`。
- **createPost**: 发送 POST 请求以创建新帖子，并返回一个 `Observable`。
- **subscribe**: 订阅 `Observable` 以处理返回的数据和错误。

通过使用 `Observable`，你可以轻松管理异步数据流，并在应用中实现更复杂的交互逻辑。
>>>>>>> d75f00fc1ea1253c1f56f4615d7fcfbc00d453b8:docs/tech/web/angular/Observable.md
