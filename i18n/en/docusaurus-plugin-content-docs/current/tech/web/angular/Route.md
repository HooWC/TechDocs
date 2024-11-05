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

:::success Previous article reminder

In Angular, `app-routing.module.ts` is used to define the routing configuration file of the application. With the routing module, you can set the page path and the corresponding components to achieve page navigation. Here are the steps to create and configure routing:

:::

### 1. Create `app-routing.module.ts`

If there is no `app-routing.module.ts` file, you can use the Angular CLI command to generate it. Open the terminal and run the following command:

```js
ng generate module app-routing --flat --module=app
```

- `--flat`: means to create a file directly in the `src/app` directory instead of creating a new folder.

- `--module=app`: automatically import this routing module into `app.module.ts`.

The generated `app-routing.module.ts` file contains the basic routing module settings.

### 2. Configure `app-routing.module.ts`

Define application routes in the `app-routing.module.ts` file. Suppose you have `HomeComponent` and `AboutComponent` in your project, and want to set routes `/home` and `/about` to point to these components respectively.

Code example

```js
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Configure /home path
  { path: 'about', component: AboutComponent }, // Configure /about path
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default redirect to /home
  { path: '**', redirectTo: '/home' } // Wildcard path to handle invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Register the application's root routes using forRoot()
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

### 3. import  `AppRoutingModule`

After generating the file, `AppRoutingModule` should have been automatically imported into `app.module.ts`. If it is not automatically imported, just add it manually.

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
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
    AppRoutingModule // Add AppRoutingModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 4. Add navigation links and routing outlets in the template

In `app.component.html`, use `<router-outlet>` as a placeholder for routing content and add navigation links.

`app.component.html`

```js
<nav>
<a routerLink="/home">Home</a>
<a routerLink="/about">About</a>
</nav>

<!-- Routing placeholder -->
<router-outlet></router-outlet>
```

- `routerLink`: used to specify the navigation path.

- `<router-outlet>`: renders the currently activated routing component.

### 5. Test Routing

Now, start the Angular application:

```
ng serve
```

Test the routing by visiting the following URLs:

- `http://localhost:4200/home` will load `HomeComponent`

- `http://localhost:4200/about` will load `AboutComponent`

#### Summary

- Use `Routes` to define an array of application routes and map paths to specific components.
- Use `RouterModule.forRoot()` to register the root route.
- `<router-outlet>` displays the contents of the route loading.
- `routerLink` is added to the link to implement navigation.

## Example 2:

`app-routing.module.ts`

```javascript
// Example
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

`Other Uses`

```html
<a [routerLink]="['']">Home</a>
<a [routerLink]="['/son']">Son</a>
```

### Children

```javascript
// example
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

`Front-end` localhost/son/list

```html
<a [routerLink]="['/son/list']">List</a>

<router-outlet></router-outlet>
```



### Routing parameters

`queryParams` method

```html
<a [routerLink]="['/son']" [queryParams]="{id:1, name:'Hoo'}">Son</a>
```

`Son 的 component`

```javascript
import { ActivateRoute } from '@angular/router';

constructor(private routerinfo:ActivaRoute) { }

ngOnInit(){
	// id is the parameter name
	this.id = this.routerinfo.snapshot.queryParams["id"]
}
```



`params` method

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
<a [routerLink]="['/son','my name is Hoo']">Son</a>
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













