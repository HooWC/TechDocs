---
id: injectable
slug: /injectable
title: Angular Injectable
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---



:::success 前文提醒

`@Injectable` 是 Angular 中的一个装饰器，用于定义一个可注入的服务。它告诉 Angular 该类可以被注入到其他类中，例如组件、其他服务或指令等。下面是对 `@Injectable` 的详细解释。

::: 

### 定义

- **`@Injectable` 装饰器**: 是 Angular 的核心功能之一，标记一个类为可注入的服务。只有被标记为 `@Injectable` 的类，才能在构造函数中被 Angular 的依赖注入系统所识别并注入。

### 功能

- **依赖注入**: Angular 使用依赖注入 (DI) 来管理类之间的依赖关系。通过 `@Injectable`，Angular 可以创建服务的实例并将其传递给需要的类。
- **模块化**: 将服务逻辑分离到独立的类中，使代码更加模块化。每个服务可以处理特定的功能，这样可以提高代码的可重用性和可维护性。

### 使用场景

- **服务**: 通常在 Angular 应用中创建服务，用于封装业务逻辑、数据访问或其他跨多个组件的功能。
- **共享数据**: 服务可以用于在不同组件之间共享数据和状态。例如，你可以创建一个用户服务来管理用户信息，并在多个组件中使用它。
- **HTTP 请求**: 通常，服务用于发送 HTTP 请求和处理响应，如获取数据、创建数据、更新数据等。

在 `Angular` 中，创建一个可注入的服务 (`Injectable Service`) 是一种常见的实践，可以帮助你将业务逻辑与组件分离。下面是如何创建和使用一个 Angular 服务的详细步骤和代码示例。

------

### 1. 创建服务

使用 Angular CLI 创建一个服务。这里我们将创建一个名为 `data.service.ts` 的服务。

```
ng generate service data
```

此命令会在 `src/app/` 目录下生成 `data.service.ts` 和 `data.service.spec.ts` 文件。

### 2. 实现服务

打开 `data.service.ts` 文件，添加以下代码：

```js
// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 使用 @Injectable 装饰器，使服务可注入
@Injectable({
  providedIn: 'root' // 指定服务在根注入器中可用
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // 示例 API

  constructor(private http: HttpClient) { } // 注入 HttpClient

  // 发送 GET 请求，返回 Observable
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // 返回的 Observable
  }

  // 发送 POST 请求，返回 Observable
  createPost(post: { title: string; body: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, post); // 返回的 Observable
  }
}
```

### 3.  更新 AppModule

确保你的 `app.module.ts` 文件中导入了 `HttpClientModule`。这将允许你使用 `HttpClient` 发送 HTTP 请求。

```js
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // 导入 HttpClientModule

import { AppComponent } from './app.component';
import { DataService } from './data.service'; // 导入自定义服务

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule // 添加 HttpClientModule 到 imports 数组
  ],
  providers: [DataService], // 提供自定义服务
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 4. 在组件中使用服务

打开 `app.component.ts` 文件，使用 `DataService` 来获取和创建数据：

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

  constructor(private dataService: DataService) { } // 注入服务

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

### 5. 更新 HTML 模板

在 `src/app/app.component.html` 中更新模板，添加输入框以创建新帖子：

```js
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

### 6.  运行应用

确保一切设置无误后，在项目目录中运行：

```
ng serve
```

然后在浏览器中访问 `http://localhost:4200`，你将看到一个显示帖子标题的列表，并可以通过输入框创建新帖子。

### 总结

- **@Injectable 装饰器**: 使服务可注入，并可以通过构造函数注入 `HttpClient`。
- **服务方法**: 创建 `getPosts` 和 `createPost` 方法，分别用于发送 GET 和 POST 请求。
- **组件使用服务**: 在组件中注入 `DataService`，并通过调用服务的方法来获取和创建数据。

通过这个过程，你成功地创建了一个 Angular 服务，并在组件中使用它来处理 HTTP 请求。这种分离关注点的方式使得代码更加模块化和可维护。