---
id: dayjs-react
slug: /dayjs-react
title: DayJS 插件
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

## Day.js 的安装和引入

### 1. 安装 Day.js

首先，通过 npm 安装 Day.js：

```react
npm install dayjs
```

### 2. 引入 Day.js

在项目文件中使用 `import` 语法引入 Day.js：

```react
import dayjs from 'dayjs';
```

### 3. Day.js 基本用法示例

下面是一些常用的 Day.js 方法和代码示例。

#### 3.1 获取当前日期和时间

可以使用 `dayjs()` 获取当前的日期和时间：

```react
import dayjs from 'dayjs';

const now = dayjs();
console.log(now.format()); // 输出当前日期和时间，例如 '2024-11-04T13:45:30+08:00'
```

#### 3.2 格式化日期和时间

使用 `format` 方法可以将日期格式化为特定的格式：

```react
console.log(dayjs().format('YYYY-MM-DD')); // 输出 '2024-11-04'
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss')); // 输出 '2024-11-04 13:45:30'（示例时间）
```

#### 3.3 解析日期字符串

可以将日期字符串解析为 Day.js 对象，然后进行各种操作：

```react
const date = dayjs('2024-01-01');
console.log(date.format('YYYY-MM-DD')); // 输出 '2024-01-01'
```

#### 3.4 日期加减操作

Day.js 提供了 `add` 和 `subtract` 方法，可以对日期进行加减操作：

```react
console.log(dayjs().add(7, 'day').format('YYYY-MM-DD')); // 当前日期加7天
console.log(dayjs().subtract(1, 'month').format('YYYY-MM-DD')); // 当前日期减1个月
```

#### 3.5 获取日期的不同部分

可以使用 `.year()`、`.month()`、`.date()` 等方法获取日期的具体部分：

```react
const date = dayjs('2024-11-04');

console.log(date.year()); // 输出年份，如 2024
console.log(date.month()); // 输出月份（0 表示一月，11 表示十二月）
console.log(date.date()); // 输出日期，如 4
console.log(date.day()); // 输出星期几（0 表示星期日，6 表示星期六）
```

#### 3.6 判断日期是否相同

`isSame` 方法可以用来比较两个日期是否相同，还可以指定比较的精度（如年、月、日）：

```react
const date1 = dayjs('2024-11-04');
const date2 = dayjs('2024-11-04');

console.log(date1.isSame(date2, 'day')); // 输出 true，因为日期相同
console.log(date1.isSame(dayjs(), 'year')); // 输出 false 或 true，取决于当前年份
```

#### 3.7 使用插件实现相对时间

Day.js 提供了一些插件，如 `relativeTime` 用于显示相对时间（如“2 天前”）。

##### 安装 relativeTime 插件

```react
npm install dayjs-plugin-relativeTime
```

##### 使用 relativeTime 插件

```react
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// 扩展 Day.js 功能
dayjs.extend(relativeTime);

console.log(dayjs().from(dayjs('2024-10-01'))); // 输出 'in a month' 或 '1 month ago' 等
console.log(dayjs('2024-10-01').fromNow()); // 输出相对于当前时间的相对时间
```

#### 3.8 使用其他插件

Day.js 提供了很多插件，比如 `isBetween` 用于判断一个日期是否在两个日期之间。

##### 安装并使用 `isBetween` 插件

```react
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const start = dayjs('2024-10-01');
const end = dayjs('2024-12-01');
const date = dayjs('2024-11-01');

console.log(date.isBetween(start, end)); // 输出 true，因为日期在区间内
```

### 4. Day.js 实战示例：计算年龄

假设我们需要计算一个人的年龄：

```react
import dayjs from 'dayjs';

const birthDate = dayjs('1998-06-26');
const current = dayjs();
const age = current.diff(birthDate, 'year'); // 使用 diff 方法计算年份差

console.log(`年龄: ${age} 岁`); // 输出 '年龄: 26 岁'（假设当前年份是 2024）
```

### 总结

Day.js 是一个功能强大但轻量的日期和时间处理库，适合在需要日期操作的项目中使用。通过插件扩展，Day.js 还能满足更多高级需求，例如相对时间、区间判断等。
