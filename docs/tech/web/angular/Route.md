<<<<<<< HEAD:docs/tech/Web/Angular/Route.md
---
id: route-angular
slug: /route-angular
title: Angular Route
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---

## 

:::success 前文提醒

在 Angular 中，`app-routing.module.ts` 是用来定义应用的路由配置文件。通过路由模块，你可以设置页面路径和对应的组件，以便实现页面导航。以下是创建和配置路由的步骤：

::: 



### 1. 创建 `app-routing.module.ts`

如果没有 `app-routing.module.ts` 文件，可以使用 Angular CLI 命令来生成它。打开终端并运行以下命令：

```js
ng generate module app-routing --flat --module=app
```

- `--flat`：表示直接在 `src/app` 目录下创建文件，而不是创建一个新的文件夹。
- `--module=app`：将这个路由模块自动导入到 `app.module.ts` 中。

生成的 `app-routing.module.ts` 文件包含基础的路由模块设置。

### 2. 配置 `app-routing.module.ts`

在 `app-routing.module.ts` 文件中定义应用路由。假设你的项目中有 `HomeComponent` 和 `AboutComponent`，并希望设置路由 `/home` 和 `/about` 分别指向这些组件。

代码示例

```js
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // 配置 /home 路径
  { path: 'about', component: AboutComponent }, // 配置 /about 路径
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 默认重定向到 /home
  { path: '**', redirectTo: '/home' } // 通配符路径，用于处理无效路径
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 使用 forRoot() 注册应用的根路由
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 3. 导入 `AppRoutingModule`

生成文件后，`AppRoutingModule` 应该已经自动导入到 `app.module.ts` 中。如果没有自动导入，手动添加即可。

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // 导入 AppRoutingModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // 将 AppRoutingModule 添加到 imports 中
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 4. 在模板中添加导航链接和路由出口

在 `app.component.html` 中，使用 `<router-outlet>` 作为路由内容的占位符，并添加导航链接。

`app.component.html`

```js
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/about">About</a>
</nav>

<!-- 路由占位符 -->
<router-outlet></router-outlet>
```

- `routerLink`：用于指定导航路径。
- `<router-outlet>`：渲染当前激活的路由组件。

### 5. 测试路由

现在，启动 Angular 应用：

```
ng serve
```

访问以下 URL 测试路由：

- `http://localhost:4200/home` 会加载 `HomeComponent`
- `http://localhost:4200/about` 会加载 `AboutComponent`

#### 总结

- 使用 `Routes` 定义应用路由数组，并映射路径到具体组件。
- 使用 `RouterModule.forRoot()` 注册根路由。
- `<router-outlet>` 显示路由加载的内容。
- `routerLink` 添加到链接中以实现导航。



## 例子 2：

 `app-routing.module.ts`

```javascript
// 例子
import { HomeComponent } from './home/home.component'
import { SonComponent } from './son/son.component'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'son',
		component: SonComponent
	},
]
```

`app.component.html`

```html
<router-outlet></router-outlet>
```

`其他使用`

```html
<a [routerLink]="['']">Home</a>
<a [routerLink]="['/son']">Son</a>
```

### Children 子类

```javascript
// 例子
import { HomeComponent } from './home/home.component'
import { SonComponent } from './son/son.component'
import { ListComponent } from './list/list.component'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'son',
		component: SonComponent
		children: [
			{
				path: 'list',
				component: ListComponent
			},
		]
	},
	{
		path:'**',
		component: 404ErrorPage
	}
]
```

`前端` localhost/son/list

```html
<a [routerLink]="['/son/list']">List</a>

<router-outlet></router-outlet>
```



### 路由传参

`queryParams` 方法

```html
<a [routerLink]="['/son']" [queryParams]="{id:1, name:'Hoo'}">Son</a>
```

`Son 的 component`

```javascript
import { ActivateRoute } from '@angular/router';

constructor(private routerinfo:ActivaRoute) { }

ngOnInit(){
	// id为参数名字
	this.id = this.routerinfo.snapshot.queryParams["id"]
}
```



`params` 方法

```javascript
{
	path: 'son/:name',
	component: SonComponent
}

{
	path: 'son/:id/:name',
	component: SonComponent
}
```

```html
<a [routerLink]="['/son','我的名字叫Hoo']">Son</a>
```

```javascript
import { ActivateRoute, Params } from '@angular/router';

constructor(private routerinfo:ActivaRoute) { }

ngOnInit(){
	this.routerinfo.params.subscribe((params:Params) => {
		this.name = params['name']
	})
}
```













=======
---
id: route-angular
slug: /route-angular
title: Angular Route
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---

## Route

在 Angular 中，`app-routing.module.ts` 是用来定义应用的路由配置文件。通过路由模块，你可以设置页面路径和对应的组件，以便实现页面导航。以下是创建和配置路由的步骤：

### 1. 创建 `app-routing.module.ts`

如果没有 `app-routing.module.ts` 文件，可以使用 Angular CLI 命令来生成它。打开终端并运行以下命令：

```js
ng generate module app-routing --flat --module=app
```

- `--flat`：表示直接在 `src/app` 目录下创建文件，而不是创建一个新的文件夹。
- `--module=app`：将这个路由模块自动导入到 `app.module.ts` 中。

生成的 `app-routing.module.ts` 文件包含基础的路由模块设置。

### 2. 配置 `app-routing.module.ts`

在 `app-routing.module.ts` 文件中定义应用路由。假设你的项目中有 `HomeComponent` 和 `AboutComponent`，并希望设置路由 `/home` 和 `/about` 分别指向这些组件。

代码示例

```js
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // 配置 /home 路径
  { path: 'about', component: AboutComponent }, // 配置 /about 路径
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // 默认重定向到 /home
  { path: '**', redirectTo: '/home' } // 通配符路径，用于处理无效路径
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // 使用 forRoot() 注册应用的根路由
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 3. 导入 `AppRoutingModule`

生成文件后，`AppRoutingModule` 应该已经自动导入到 `app.module.ts` 中。如果没有自动导入，手动添加即可。

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // 导入 AppRoutingModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule // 将 AppRoutingModule 添加到 imports 中
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 4. 在模板中添加导航链接和路由出口

在 `app.component.html` 中，使用 `<router-outlet>` 作为路由内容的占位符，并添加导航链接。

`app.component.html`

```js
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/about">About</a>
</nav>

<!-- 路由占位符 -->
<router-outlet></router-outlet>
```

- `routerLink`：用于指定导航路径。
- `<router-outlet>`：渲染当前激活的路由组件。

### 5. 测试路由

现在，启动 Angular 应用：

```
ng serve
```

访问以下 URL 测试路由：

- `http://localhost:4200/home` 会加载 `HomeComponent`
- `http://localhost:4200/about` 会加载 `AboutComponent`

#### 总结

- 使用 `Routes` 定义应用路由数组，并映射路径到具体组件。
- 使用 `RouterModule.forRoot()` 注册根路由。
- `<router-outlet>` 显示路由加载的内容。
- `routerLink` 添加到链接中以实现导航。



## 例子 2：

 `app-routing.module.ts`

```javascript
// 例子
import { HomeComponent } from './home/home.component'
import { SonComponent } from './son/son.component'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'son',
		component: SonComponent
	},
]
```

`app.component.html`

```html
<router-outlet></router-outlet>
```

`其他使用`

```html
<a [routerLink]="['']">Home</a>
<a [routerLink]="['/son']">Son</a>
```

### Children 子类

```javascript
// 例子
import { HomeComponent } from './home/home.component'
import { SonComponent } from './son/son.component'
import { ListComponent } from './list/list.component'

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'son',
		component: SonComponent
		children: [
			{
				path: 'list',
				component: ListComponent
			},
		]
	},
	{
		path:'**',
		component: 404ErrorPage
	}
]
```

`前端` localhost/son/list

```html
<a [routerLink]="['/son/list']">List</a>

<router-outlet></router-outlet>
```



### 路由传参

`queryParams` 方法

```html
<a [routerLink]="['/son']" [queryParams]="{id:1, name:'Hoo'}">Son</a>
```

`Son 的 component`

```javascript
import { ActivateRoute } from '@angular/router';

constructor(private routerinfo:ActivaRoute) { }

ngOnInit(){
	// id为参数名字
	this.id = this.routerinfo.snapshot.queryParams["id"]
}
```



`params` 方法

```javascript
{
	path: 'son/:name',
	component: SonComponent
}

{
	path: 'son/:id/:name',
	component: SonComponent
}
```

```html
<a [routerLink]="['/son','我的名字叫Hoo']">Son</a>
```

```javascript
import { ActivateRoute, Params } from '@angular/router';

constructor(private routerinfo:ActivaRoute) { }

ngOnInit(){
	this.routerinfo.params.subscribe((params:Params) => {
		this.name = params['name']
	})
}
```













>>>>>>> d75f00fc1ea1253c1f56f4615d7fcfbc00d453b8:docs/tech/web/angular/Route.md
