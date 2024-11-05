---
id: dayjs-react
slug: /dayjs-react
title: DayJS Plugin
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---

## Installation and import of Day.js

### 1. Install Day.js

First, install Day.js through npm:

```react
npm install dayjs
```

### 2. Import Day.js

Use the `import` syntax to import Day.js in the project file:

```react
import dayjs from 'dayjs';
```

### 3. Basic usage examples of Day.js

Here are some commonly used Day.js methods and code examples.

#### 3.1 Get the current date and time

You can use `dayjs()` to get the current date and time:

```react
import dayjs from 'dayjs';

const now = dayjs();

console.log(now.format()); // Output the current date and time, for example, '2024-11-04T13:45:30+08:00'

```

#### 3.2 Format the date and time

The `format` method can be used to format the date into a specific format:

```react
console.log(dayjs().format('YYYY-MM-DD')); // Output '2024-11-04'
console.log(dayjs().format('YYYY-MM-DD HH:mm:ss')); // Output '2024-11-04 13:45:30' (example time)
```

#### 3.3 Parsing date strings

You can parse the date string into a Day.js object and then perform various operations:

```react
const date = dayjs('2024-01-01');
console.log(date.format('YYYY-MM-DD')); // Output '2024-01-01'
```

#### 3.4 Date addition and subtraction operations

Day.js provides the `add` and `subtract` methods, which can be used to add and subtract dates:

```react
console.log(dayjs().add(7, 'day').format('YYYY-MM-DD')); // Current date plus 7 days
console.log(dayjs().subtract(1, 'month').format('YYYY-MM-DD')); // Current date minus 1 month
```

#### 3.5 Get different parts of the date

You can use `.year()`, `.month()`, `.date()` and other methods to get specific parts of the date:

```react
const date = dayjs('2024-11-04');

console.log(date.year()); // Output year, such as 2024
console.log(date.month()); // Output month (0 for January, 11 for December)
console.log(date.date()); // Output date, such as 4
console.log(date.day()); // Output day of the week (0 for Sunday, 6 for Saturday)
```

#### 3.6 Determine whether the dates are the same

The `isSame` method can be used to compare whether two dates are the same, and you can also specify the comparison precision (such as year, month, day):

```react
const date1 = dayjs('2024-11-04');
const date2 = dayjs('2024-11-04');
console.log(date1.isSame(date2, 'day')); // Outputs true, because the dates are the same
console.log(date1.isSame(dayjs(), 'year')); // Outputs false or true, depending on the current year
```
#### 3.7 Using plugins to implement relative time

Day.js provides some plugins, such as `relativeTime` for displaying relative time (such as "2 days ago").

##### Install relativeTime plugin

```react
npm install dayjs-plugin-relativeTime
```

##### Use relativeTime plugin

```react
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend Day.js functionality
dayjs.extend(relativeTime);

console.log(dayjs().from(dayjs('2024-10-01'))); // Output 'in a month' or '1 month ago', etc.
console.log(dayjs('2024-10-01').fromNow()); // Output relative time relative to current time
```

#### 3.8 Use other plugins

Day.js provides many plugins, such as `isBetween`, which is used to determine whether a date is between two dates.

##### Install and use the `isBetween` plugin

```react
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const start = dayjs('2024-10-01');
const end = dayjs('2024-12-01');
const date = dayjs('2024-11-01');

console.log(date.isBetween(start, end)); // Output true, because the date is within the interval
```

### 4. Day.js practical example: calculating age

Suppose we need to calculate a person's age:

```react
import dayjs from 'dayjs';

const birthDate = dayjs('1998-06-26');
const current = dayjs();
const age = current.diff(birthDate, 'year'); // Use diff method to calculate year difference

console.log(`age: ${age} years`); // Output 'age: 26 years' (assuming current year is 2024)
```

### Summary

Day.js is a powerful but lightweight date and time processing library suitable for projects that require date operations. Through plug-in extensions, Day.js can also meet more advanced requirements, such as relative time, interval judgment, etc.