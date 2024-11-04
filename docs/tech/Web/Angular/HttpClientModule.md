---
id: httpclient-module
slug: /httpclient-module
title: Angular HttpClientModule
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---

## HttpClientModule 

`HttpClientModule` 是 Angular 框架中的一个模块，用于简化和增强与服务器进行 HTTP 通信的功能。它提供了一个可注入的 `HttpClient` 服务，允许开发者轻松发送 HTTP 请求并处理响应。以下是对 `HttpClientModule` 的详细解释：

### 主要功能

1. **HTTP 请求**:

   - `HttpClient` 可以发送多种类型的 HTTP 请求，包括 GET、POST、PUT、DELETE 等。这些请求可以用于与 RESTful API 进行交互，获取或发送数据。

2. **响应处理**:

   - `HttpClient` 返回的响应是一个 RxJS 的 `Observable`，这使得你可以使用响应式编程的方式来处理数据流。你可以通过 `subscribe` 方法来监听响应，并对数据进行处理。

3. **自动 JSON 转换**:

   - `HttpClient` 会自动将 HTTP 响应的 JSON 数据转换为 JavaScript 对象，这使得处理响应数据更加方便。

4. **请求拦截器**:

   - 你可以定义拦截器来处理请求和响应。这对于在每个请求中添加认证令牌、处理错误、记录请求等非常有用。

5. **简化错误处理**:

   - `HttpClient` 提供了更简洁的错误处理机制，允许你轻松捕获和处理 HTTP 错误。

     

------

### 简单的示例1：

在 **`app.module.ts`** 文件中导入 `HttpClientModule`

```javascript
import { HttpClientModule } from '@angular/common/http'; // 导入 HttpClientModule，以便在应用中使用 HttpClient 服务

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    HttpClientModule // 导入 HttpClientModule，允许我们在服务中使用 HttpClient 进行 HTTP 请求
  ],
  providers: [], 
  bootstrap: [AppComponent] 
})
export class AppModule { } 
```

然后，您可以在您的组件中使用 `HttpClient` 来发送请求并处理响应。

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
          // 更新组件中的发票数据
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

### 简单的示例2： 

#### 1. 安装 `HttpClientModule`

在 `app.module.ts` 文件中导入 `HttpClientModule`：

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

#### 2. 创建数据服务

创建一个服务用于发送 HTTP 请求：

```
ng generate service data
```

然后在 `data.service.ts` 中添加代码：

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

#### 3. 修改根组件

在根组件中使用这个服务：

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

#### 4. 更新 HTML 模板

确保你的 `AppComponent` 模板正确引用了输入和列表。上面的代码中已经包含了 HTML 模板。

```html
<h1>Posts</h1>
<!-- 显示帖子列表 -->
<ul>
  <li *ngFor="let post of posts">
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </li>
</ul>

<h2>Create Post</h2>
<!-- 输入新帖子的表单 -->
<div>
  <input [(ngModel)]="newPost.title" placeholder="Title" />
  <textarea [(ngModel)]="newPost.body" placeholder="Body"></textarea>
  <button (click)="createPost()">Create</button>
</div>
```

#### 5. 运行应用

确保一切设置无误后，在项目目录中运行：

```
ng serve
```

