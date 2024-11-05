<<<<<<< HEAD
---
id: scss-intro
slug: /scss-intro
title: SCSS 简介
date: 2024-11-04
authors: Hoo
tags: [scss]
keywords: [scss]
---

SCSS（Sassy CSS）是 Sass（Syntactically Awesome Style Sheets）的一个语法扩展，是一种 CSS 预处理器，旨在增强 CSS 的功能，使样式表的编写更高效和灵活。SCSS 的语法与传统的 CSS 相似，允许开发者在熟悉的 CSS 语法基础上，使用更高级的特性。

SCSS 提供了许多有助于组织和管理样式的功能，例如变量、嵌套规则、混合宏（mixins）、继承和运算等。通过使用变量，开发者可以定义颜色、字体大小和其他样式属性，并在整个项目中重用这些变量。这使得主题和样式的一致性得以维护，尤其是在大型项目中。

嵌套规则是 SCSS 的一大特点，允许开发者在样式表中按照 HTML 结构嵌套选择器。这样可以减少样式表的层次，使得代码更易读和管理。例如，开发者可以在一个规则中定义其子元素的样式，而无需在每个选择器中重复父选择器的名称。

混合宏（mixins）是 SCSS 中的另一个强大功能，允许开发者创建可复用的样式组，并在需要的地方调用。混合宏可以接受参数，使得样式的复用更加灵活。此外，SCSS 还支持条件语句和循环，这使得生成复杂的样式变得简单。

SCSS 的编译过程会将 SCSS 代码转换为标准的 CSS 代码，这意味着最终的样式表仍然可以在所有浏览器中正常使用。由于 SCSS 的这些高级特性，开发者可以编写更加简洁、模块化和可维护的样式代码，从而提升开发效率。

随着现代前端开发的不断演进，SCSS 已成为许多大型项目和框架（如 Bootstrap 和 Foundation）的重要组成部分。掌握 SCSS 使开发者能够更好地组织和管理 CSS，提高样式表的可读性和可维护性，为用户提供更优质的网页体验。
=======
---
id: scss-intro
slug: /scss-intro
title: SCSS 简介
date: 2024-11-04
authors: Hoo
tags: [scss]
keywords: [scss]
---

## SCSS

### 安装

```
npm install -g sass
```

### 文件

```
project/
│
├── scss/
│   ├── _reset.scss // 全局变量
│   ├── _variables.scss // 定义变量
│   ├── _mixins.scss // 函数
│   └── style.scss // 转换这个就可以了
│
└── css/
    └── style.css 
```

### 转换 Css 文件

```
sass style.scss style.css
```

### 变量

```
$myFont: Helvetica, sans-serif;
$myColor: red;
$myFontSize: 18px;
$myWidth: 680px;
```

### Global

```
$myColor: red;

h1 {
  $myColor: green !global;
  color: $myColor;
}

p {
  color: $myColor;
}
```

```
@import "文件名";
```

```
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

### Class 创建 @mixin

```
@mixin important-text {
  color: red;
  font-size: 25px;
  font-weight: bold;
  border: 1px solid blue;
}

selector {
  @include mixin-name;
}

===

@mixin special-text {
  @include important-text;
  @include link;
  @include special-border;
}

===

@mixin bordered($color, $width) {
  border: $width solid $color;
}

.myArticle {
  @include bordered(blue, 1px);  // Call mixin with two values
}

.myNotes {
  @include bordered(red, 2px); // Call mixin with two values
}

```

### @extend 引用

```
.button-basic  {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report  {
  @extend .button-basic;
  background-color: red;
}

.button-submit  {
  @extend .button-basic;
  background-color: green;
  color: white;
}
```













>>>>>>> d75f00fc1ea1253c1f56f4615d7fcfbc00d453b8
