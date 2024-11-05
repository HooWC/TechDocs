---
id: pipe
slug: /pipe
title: Angular Pipe
date: 2024-11-04
authors: Hoo
tags: [angular]
keywords: [angular]
---

# Angular Pipe 

:::success Previous article reminder

In Angular, `Pipe` is a special tool that can format or transform data, usually used in templates. Angular provides some built-in pipes (such as `date`, `uppercase`, `currency`, etc.), and you can also create custom pipes to implement specific data transformation needs.

Here are the steps to use Angular's built-in pipes and how to create and use custom pipes.

:::

------

## 1. Use built-in pipes

Angular provides some commonly used built-in pipes, such as `uppercase`, `lowercase`, `date`, `currency`, `percent`, etc. You can use these pipes directly in the template to format data.

Example: Using built-in pipes

Suppose you have a component template that displays a username, date, and amount:

```html
<!-- app.component.html -->
<p>Username: {{ name | uppercase }}</p>
<p>Registration date: {{ registrationDate | date:'fullDate' }}</p>
<p>Balance: {{ balance | currency:'USD' }}</p>
```

Explanation

- `uppercase`: Converts a string to uppercase.
- `date`: Formats a date.
- `currency`: Formats as currency, specifying the currency type (e.g. `USD`).

Component code

```js
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  name = 'john doe';
  registrationDate = new Date();
  balance = 1000.5;
}
```

When you run this code, the formatted content will be displayed.

------

## 2. Create a custom pipe

Suppose you want to create a custom pipe to reverse a string. Here are the steps to create and use a custom pipe.

### Step 1: Generate pipe files

Run the following command in the terminal:

```js
ng generate pipe reverse
```

This command generates two files: `reverse.pipe.ts` and `reverse.pipe.spec.ts`, and declares the `ReversePipe` class in `app.module.ts`.

### Step 2: Implement custom pipe logic

Implement the pipe logic in the generated `reverse.pipe.ts` file. For example, we want to reverse the input string.

`reverse.pipe.ts`

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    // Check if the input is a string
    if (!value) return '';
    return value.split('').reverse().join('');
  }

}
```

Explanation

- `@Pipe` decorator: used to define the pipe, `name: 'reverse'` indicates the name of the pipe.

- `PipeTransform` interface: implements the `transform` method, which is responsible for converting the input value to the desired output format.

### Step 3: Import the pipe in the module

Make sure `ReversePipe` has been imported and declared in `app.module.ts`. If it is not automatically imported, you can add it manually.

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReversePipe } from './reverse.pipe'; // Import custom pipe

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe // Declare the pipe
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Step 4: Use the custom pipe in the template

Now, you can use the `reverse` pipe in the template.

`app.component.html`

```html
<p>Original name: {{ name }}</p>
<p>Reversed name: {{ name | reverse }}</p>
```

Component code

```js
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  name = 'Angular Pipes';
}
```

------

## 3. Test custom pipes

Run the application:

```js
ng serve
```

Visit `http://localhost:4200`, you should see output similar to this:

```js
Original name: Angular Pipes
Reversed name: sepiP ralugnA
```

------

### Summary

- **Built-in pipes**: Used directly in templates, such as `uppercase`, `date`, etc.

- **Custom pipes**: Created by `@Pipe`, define the `transform` method to implement specific data conversion logic.

- **Module declaration**: Make sure to import and declare custom pipes in `app.module.ts`.

- **Template use**: Use custom pipes in templates in the format of `{{ value | customPipeName }}`.

## Example 2:

In Angular, pipes are a tool used to transform data in templates. They allow you to process data displayed in the template in a simple way, such as formatting dates, currencies, text conversions, etc. Angular has many commonly used built-in pipes, such as `DatePipe`, `UpperCasePipe`, `LowerCasePipe`, etc., and you can also create custom pipes to meet specific needs.

Pipes are applied by using the `|` symbol in the HTML template, followed by the name of the pipe and possible parameters.

```html
<!-- Using built-in pipes -->
<p>{{ birthday | date }}</p>

<!-- Using custom pipes -->
<p>{{ text | customPipe:param1:param2 }}</p>
```

### Usage

```js
ng genrate pipe <file name>
```

Create file file name.pipe.ts

Register file in Module

### Component code Component

```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-list-pipe',
  templateUrl: './todo-list-pipe.component.html',
  styleUrl: './todo-list-pipe.component.css'
})

export class TodoListPipeComponent {
  lists: number[] = [1,0,0,0,1,1,0,1,0];
}
```

### Pipe Code

```js
import { Pipe } from "@angular/core";

@Pipe({
    name: 'sex'
})

export class SexPipe{
    transform(val:number){
        if(val == 1){
            return 'boy';
        }else if(val == 0){
            return 'girl';
        }else{
            return 'unknow';
        }
    }
}
```

### Html Code

```html
<ul>
    <li *ngFor="let item of lists; index as i">
        {{i+1}} - {{item}} - {{item | sex}}
    </li>
</ul>
```

```js
{{item | sex : "long"}}
```

### output

```js
1 - 1 - boy
2 - 0 - girl
3 - 0 - girl
4 - 0 - girl
5 - 1 - boy
6 - 1 - boy
7 - 0 - girl
8 - 1 - boy
9 - 0 - girl
```



# Pipe other function

[Pipe documentation]: https://angular.cn/api

```js
{{item | lowercase}}

{{item | uppercase}}

{{item | titlecase}}

{{item | slice:0:3 }}

{{item | slice:3 }}

{{Lists | json }}

{{salary | number: '2'}}

{{salary | currency }} //money

{{salary | currency : 'RM'}} //money
```

```js
https://angular.cn/api/common/DatePipe  // View more documentation
```

```js
{{e.birthday | date }}

{{e.birthday | date:'yyyy-MM-dd HH:mm:ss' }}
```

