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



:::success 前文提醒

在 Angular 中，你可以使用 `Axios` 进行 HTTP 请求。虽然 Angular 内置了 `HttpClient` 模块，但如果你熟悉 `Axios` 或有特定需求，也可以使用它。以下是安装和配置 `Axios` 以及在 Angular 中使用它的详细步骤。

::: 

------

### 1. 安装 Axios

首先，在 Angular 项目的根目录中安装 `Axios`。

```js
npm install axios
```

### 2. 创建一个服务 (Service) 来封装 Axios 请求

为了保持代码的清晰和结构化，通常会在服务中封装 HTTP 请求逻辑。使用 Angular CLI 创建一个服务。

```js
ng generate service api
```

这个命令会生成两个文件：`api.service.ts` 和 `api.service.spec.ts`。

### 3. 配置 Axios 请求逻辑

打开生成的 `api.service.ts` 文件，在其中导入 `Axios` 并编写请求方法。

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
    // 配置 Axios 实例
    this.axiosInstance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com', // 你的 API 根路径
      timeout: 1000, // 超时时间
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // GET 请求示例
  getPosts() {
    return this.axiosInstance.get('/posts');
  }

  // POST 请求示例
  createPost(data: any) {
    return this.axiosInstance.post('/posts', data);
  }
}
```

解释

- `this.axiosInstance = axios.create({...})`：创建一个 `Axios` 实例并配置基础路径、超时时间和默认请求头。
- `getPosts` 和 `createPost` 方法分别演示了 GET 和 POST 请求。

### 4. 使用服务中的 Axios 请求

在组件中调用 `ApiService` 服务中的方法。接下来，我们会在 `AppComponent` 中调用这些方法。

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
    // 调用 GET 请求获取数据
    this.apiService.getPosts().then(response => {
      this.posts = response.data;
    }).catch(error => {
      console.error('Error fetching posts:', error);
    });

    // 调用 POST 请求发送数据
    this.apiService.createPost(this.newPost).then(response => {
      console.log('Post created:', response.data);
    }).catch(error => {
      console.error('Error creating post:', error);
    });
  }
}
```

解释

- `this.apiService.getPosts()`：调用 `ApiService` 中的 `getPosts` 方法，获取数据并赋值给 `posts`。
- `this.apiService.createPost(this.newPost)`：调用 `createPost` 方法发送新数据，并在控制台打印响应结果。

### 5. 在 HTML 模板中显示数据

在 `app.component.html` 中显示从 API 获取的数据。

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

- `*ngFor="let post of posts"`：循环显示每篇文章的标题和内容。

------

### 6. 测试

运行 Angular 应用程序并检查数据是否从 API 获取并显示在页面上。

```
ng serve
```

打开浏览器访问 `http://localhost:4200`，你应该能看到 `posts` 列表。

------

### 7. 处理请求和错误

在实际应用中，处理错误信息很重要，可以在服务层添加错误处理。将请求放到 `try-catch` 语句中，或使用 `catch` 方法来处理错误。

#### 在服务中处理错误

在 `api.service.ts` 中修改 `getPosts` 和 `createPost` 方法，加入错误处理。

```js
// GET 请求示例
async getPosts() {
  try {
    const response = await this.axiosInstance.get('/posts');
    return response;
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw error;
  }
}

// POST 请求示例
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

### 总结

- **安装 Axios**：通过 `npm install axios` 安装。
- **创建服务**：通过 `ng generate service api` 创建服务。
- **配置 Axios 实例**：在服务中创建和配置 `Axios` 实例。
- **请求数据**：在组件中调用服务方法并处理数据。
- **错误处理**：在服务中使用 `try-catch` 处理请求错误。





### 例子 2：

该代码使用 `axios` 库来向指定的 API 发出请求，并在 Angular 组件初始化时（即 `ngOnInit` 生命周期钩子）执行该请求，将返回的数据赋值给 `list` 属性。具体过程如下：

1. `list: Array<any> = []`: 定义一个名为 `list` 的数组属性，用于存储从 API 返回的数据，初始值为空数组。
2. `ngOnInit(): void`: `ngOnInit` 是 Angular 组件的生命周期钩子之一，会在组件初始化完成后自动调用。通常用于在组件加载时执行某些操作（如请求数据）。
3. `axios.get('https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/getList')`:
   - 这里使用 `axios.get()` 方法向指定的 URL 发出 GET 请求。
   - `'https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/getList'` 是请求的 API 地址。
4. `.then(res => { this.list = res.data.data })`: 这是一个 Promise 链，在请求成功（即接收到响应）时执行 `then` 方法。
   - `res` 是请求的响应对象。
   - `res.data` 是响应的主体，假设包含一个 `data` 属性，存放了我们需要的数组数据。
   - `this.list = res.data.data`: 将响应中的数据（`res.data.data`）赋值给 `list` 属性。

最终效果是：当组件初始化时，会向指定的 API 发出请求，并将返回的数据存储在 `list` 中，使其可以在模板中使用。

```javascript
list:Array<any> = [];

ngOnInit():void {
	axios.get('https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/getList').then( res => {
		this.list = res.data.data
	})
}
```

或

```javascript
list: Array<any> = []; // 定义一个名为 list 的数组，用于存储从 API 获取的数据。
page: number = 0; // 定义一个名为 page 的数字，用于跟踪当前页面，初始值为 0。

ngOnInit(): void { // Angular 组件生命周期钩子，在组件初始化后调用
    // 发起 GET 请求到指定的 API
	axios.get('https://www.fastmock.site/mock/323354e56ef21147c3f550e18435baa1/api/getList')
        .then(res => { // 处理请求成功的响应
            let list: Array<any> = res.data.data; // 将响应中的数据存储到临时变量 list 中
            // 遍历获取的数据，按每10个数据分组
            for (let index = 0; index < list.length; index++) { 
                // 将当前索引及下一个9个元素（共10个）切片，并推入 this.list
                this.list.push(list.slice(index, index + 10));
                index += 9; // 增加索引9，以便下一次循环从下一个组开始
            }
        });
}
```

前端使用

```html
<tr *ngIf="let item of list[page]">
	<td>{{  item.id }}</td>
	<td>{{  item.title }}</td>
</tr>
```







