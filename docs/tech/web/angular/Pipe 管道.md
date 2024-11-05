<<<<<<< HEAD:docs/tech/Web/Angular/Pipe 管道.md
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

:::success 前文提醒

在 Angular 中，`Pipe` 是一种特殊的工具，可以对数据进行格式化或转换，通常用于模板中。Angular 提供了一些内置的管道（如 `date`、`uppercase`、`currency` 等），你还可以创建自定义的管道来实现特定的数据转换需求。

以下是如何使用 Angular 的内置管道，以及如何创建和使用自定义管道的步骤。

::: 

------

## 1. 使用内置管道

Angular 提供了一些常用的内置管道，如 `uppercase`、`lowercase`、`date`、`currency`、`percent` 等。可以直接在模板中使用这些管道来格式化数据。

示例：使用内置管道

假设你有一个显示用户名、日期和金额的组件模板：

```html
<!-- app.component.html -->
<p>用户名：{{ name | uppercase }}</p>
<p>注册日期：{{ registrationDate | date:'fullDate' }}</p>
<p>余额：{{ balance | currency:'USD' }}</p>
```

解释

- `uppercase`：将字符串转换为大写。
- `date`：格式化日期。
- `currency`：格式化为货币，指定货币类型（如 `USD`）。

组件代码

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

当你运行这个代码时，会显示格式化后的内容。

------

## 2. 创建自定义管道

假设你想创建一个自定义管道，将一个字符串反转。以下是创建和使用自定义管道的步骤。

### 第一步：生成管道文件

在终端中运行以下命令：

```js
ng generate pipe reverse
```

此命令会生成两个文件：`reverse.pipe.ts` 和 `reverse.pipe.spec.ts`，并将 `ReversePipe` 类声明在 `app.module.ts` 中。

### 第二步：实现自定义管道逻辑

在生成的 `reverse.pipe.ts` 文件中实现管道逻辑。例如，我们要将输入字符串反转。

`reverse.pipe.ts`

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    // 检查输入是否为字符串
    if (!value) return '';
    return value.split('').reverse().join('');
  }

}
```

解释

- `@Pipe` 装饰器：用来定义管道，`name: 'reverse'` 表示管道的名称。
- `PipeTransform` 接口：实现 `transform` 方法，该方法负责将输入的值转换为期望的输出格式。

### 第三步：在模块中导入管道

确保 `ReversePipe` 已在 `app.module.ts` 中导入和声明。如果没有自动导入，可以手动添加。

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReversePipe } from './reverse.pipe'; // 导入自定义管道

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe // 声明管道
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 第四步：在模板中使用自定义管道

现在，可以在模板中使用 `reverse` 管道。

`app.component.html`

```html
<p>原始名称：{{ name }}</p>
<p>反转后的名称：{{ name | reverse }}</p>
```

组件代码

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

## 3. 测试自定义管道

运行应用：

```js
ng serve
```

访问 `http://localhost:4200`，你应该会看到类似的输出：

```js
原始名称：Angular Pipes
反转后的名称：sepiP ralugnA
```

------

### 总结

- **内置管道**：在模板中直接使用，如 `uppercase`、`date` 等。
- **自定义管道**：通过 `@Pipe` 创建，定义 `transform` 方法，实现特定的数据转换逻辑。
- **模块声明**：确保在 `app.module.ts` 中导入并声明自定义管道。
- **模板使用**：在模板中使用自定义管道，格式为 `{{ value | customPipeName }}`。

## 例子 2：

在Angular中，管道（Pipe）是一种用于在模板中转换数据的工具。它们允许你以一种简单的方式对模板中显示的数据进行处理，例如格式化日期、货币、文本转换等。Angular内置了许多常用的管道，比如 `DatePipe`、`UpperCasePipe`、`LowerCasePipe` 等，你也可以创建自定义管道以满足特定需求。

管道通过在HTML模板中使用 `|` 符号来应用，后面跟着管道的名称和可能的参数。

```html
<!-- 使用内置的管道 -->
<p>{{ birthday | date }}</p>

<!-- 使用自定义管道 -->
<p>{{ text | customPipe:param1:param2 }}</p>
```

### 使用方法

```js
ng genrate pipe <文件名称>
```

创建文件 文件名称.pipe.ts

在Module注册文件



### 组件代码 Component

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

### Pipe 代码

```js
import { Pipe } from "@angular/core";

@Pipe({
    name: 'sex'
})

export class SexPipe{
    transform(val:number){
        if(val == 1){
            return '男';
        }else if(val == 0){
            return '女';
        }else{
            return '未知';
        }
    }
}
```

### Html 代码

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

### 输出

```js
1 - 1 - 男
2 - 0 - 女
3 - 0 - 女
4 - 0 - 女
5 - 1 - 男
6 - 1 - 男
7 - 0 - 女
8 - 1 - 男
9 - 0 - 女
```



# Pipe 其他功能

[Pipe 文档]: https://angular.cn/api

```js
{{item | lowercase}}

{{item | uppercase}}

{{item | titlecase}}

{{item | slice:0:3 }}

{{item | slice:3 }}

{{Lists | json }}

{{salary | number: '2'}}

{{salary | currency }} //钱

{{salary | currency : 'RM'}} //钱
```

```js
https://angular.cn/api/common/DatePipe  // 查看更多文档
```

```js
{{e.birthday | date }}

{{e.birthday | date:'yyyy-MM-dd HH:mm:ss' }}
```

=======
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

在 Angular 中，`Pipe` 是一种特殊的工具，可以对数据进行格式化或转换，通常用于模板中。Angular 提供了一些内置的管道（如 `date`、`uppercase`、`currency` 等），你还可以创建自定义的管道来实现特定的数据转换需求。

以下是如何使用 Angular 的内置管道，以及如何创建和使用自定义管道的步骤。

------

## 1. 使用内置管道

Angular 提供了一些常用的内置管道，如 `uppercase`、`lowercase`、`date`、`currency`、`percent` 等。可以直接在模板中使用这些管道来格式化数据。

示例：使用内置管道

假设你有一个显示用户名、日期和金额的组件模板：

```html
<!-- app.component.html -->
<p>用户名：{{ name | uppercase }}</p>
<p>注册日期：{{ registrationDate | date:'fullDate' }}</p>
<p>余额：{{ balance | currency:'USD' }}</p>
```

解释

- `uppercase`：将字符串转换为大写。
- `date`：格式化日期。
- `currency`：格式化为货币，指定货币类型（如 `USD`）。

组件代码

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

当你运行这个代码时，会显示格式化后的内容。

------

## 2. 创建自定义管道

假设你想创建一个自定义管道，将一个字符串反转。以下是创建和使用自定义管道的步骤。

### 第一步：生成管道文件

在终端中运行以下命令：

```js
ng generate pipe reverse
```

此命令会生成两个文件：`reverse.pipe.ts` 和 `reverse.pipe.spec.ts`，并将 `ReversePipe` 类声明在 `app.module.ts` 中。

### 第二步：实现自定义管道逻辑

在生成的 `reverse.pipe.ts` 文件中实现管道逻辑。例如，我们要将输入字符串反转。

`reverse.pipe.ts`

```js
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    // 检查输入是否为字符串
    if (!value) return '';
    return value.split('').reverse().join('');
  }

}
```

解释

- `@Pipe` 装饰器：用来定义管道，`name: 'reverse'` 表示管道的名称。
- `PipeTransform` 接口：实现 `transform` 方法，该方法负责将输入的值转换为期望的输出格式。

### 第三步：在模块中导入管道

确保 `ReversePipe` 已在 `app.module.ts` 中导入和声明。如果没有自动导入，可以手动添加。

`app.module.ts`

```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReversePipe } from './reverse.pipe'; // 导入自定义管道

@NgModule({
  declarations: [
    AppComponent,
    ReversePipe // 声明管道
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 第四步：在模板中使用自定义管道

现在，可以在模板中使用 `reverse` 管道。

`app.component.html`

```html
<p>原始名称：{{ name }}</p>
<p>反转后的名称：{{ name | reverse }}</p>
```

组件代码

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

## 3. 测试自定义管道

运行应用：

```js
ng serve
```

访问 `http://localhost:4200`，你应该会看到类似的输出：

```js
原始名称：Angular Pipes
反转后的名称：sepiP ralugnA
```

------

### 总结

- **内置管道**：在模板中直接使用，如 `uppercase`、`date` 等。
- **自定义管道**：通过 `@Pipe` 创建，定义 `transform` 方法，实现特定的数据转换逻辑。
- **模块声明**：确保在 `app.module.ts` 中导入并声明自定义管道。
- **模板使用**：在模板中使用自定义管道，格式为 `{{ value | customPipeName }}`。

## 例子 2：

在Angular中，管道（Pipe）是一种用于在模板中转换数据的工具。它们允许你以一种简单的方式对模板中显示的数据进行处理，例如格式化日期、货币、文本转换等。Angular内置了许多常用的管道，比如 `DatePipe`、`UpperCasePipe`、`LowerCasePipe` 等，你也可以创建自定义管道以满足特定需求。

管道通过在HTML模板中使用 `|` 符号来应用，后面跟着管道的名称和可能的参数。

```html
<!-- 使用内置的管道 -->
<p>{{ birthday | date }}</p>

<!-- 使用自定义管道 -->
<p>{{ text | customPipe:param1:param2 }}</p>
```

### 使用方法

```js
ng genrate pipe <文件名称>
```

创建文件 文件名称.pipe.ts

在Module注册文件



### 组件代码 Component

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

### Pipe 代码

```js
import { Pipe } from "@angular/core";

@Pipe({
    name: 'sex'
})

export class SexPipe{
    transform(val:number){
        if(val == 1){
            return '男';
        }else if(val == 0){
            return '女';
        }else{
            return '未知';
        }
    }
}
```

### Html 代码

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

### 输出

```js
1 - 1 - 男
2 - 0 - 女
3 - 0 - 女
4 - 0 - 女
5 - 1 - 男
6 - 1 - 男
7 - 0 - 女
8 - 1 - 男
9 - 0 - 女
```



# Pipe 其他功能

[Pipe 文档]: https://angular.cn/api

```js
{{item | lowercase}}

{{item | uppercase}}

{{item | titlecase}}

{{item | slice:0:3 }}

{{item | slice:3 }}

{{Lists | json }}

{{salary | number: '2'}}

{{salary | currency }} //钱

{{salary | currency : 'RM'}} //钱
```

```js
https://angular.cn/api/common/DatePipe  // 查看更多文档
```

```js
{{e.birthday | date }}

{{e.birthday | date:'yyyy-MM-dd HH:mm:ss' }}
```

>>>>>>> d75f00fc1ea1253c1f56f4615d7fcfbc00d453b8:docs/tech/web/angular/Pipe 管道.md
