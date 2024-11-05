---
id: data-fns-react
slug: /data-fns-react
title: Date Plugins
date: 2024-11-04
authors: Hoo
tags: [react]
keywords: [react]
---
`date-fns` is a popular JavaScript date processing library, similar to `moment.js` or `day.js`, but it provides rich date processing methods in the form of functions, which is very suitable for use in React projects.

The following are detailed steps and code examples on how to integrate and use `date-fns` in React projects.

### 1. Install `date-fns`

In the root directory of the React project, install `date-fns` through npm or yarn:

```react
npm install date-fns
```

or

```react
yarn add date-fns
```

### 2. Use `date-fns` in React components

Once `date-fns` is installed, you can import and use it in any React component. The following are some common date processing operations, including formatting dates, comparing dates, calculating time differences, etc.

#### 2.1 Import `date-fns` function

`date-fns` adopts modular design, so you only need to import the required functions instead of importing the entire library. This can reduce the code size.

#### 2.2 Basic example code

The following code shows how to use the common date functions of `date-fns` in a React component.

```js
import React from 'react';
import { format, addDays, subMonths, differenceInYears, isAfter } from 'date-fns';

function DateExample() {
  // Get the current date
  const today = new Date();

  // Use the `format` function to format the date
  const formattedDate = format(today, 'yyyy-MM-dd'); // Output format: 2024-11-04

  // Use the `addDays` function to add days
  const nextWeek = addDays(today, 7); // Current date plus 7 days

  // Use the `subMonths` function to subtract months
  const lastMonth = subMonths(today, 1); // Current date minus 1 month

  // Use the `differenceInYears` function to calculate age
  const birthDate = new Date(1998, 5, 26); // Assume the birth date is 1998-06-26
  const age = differenceInYears(today, birthDate); // Calculate age

  // Use the `isAfter` function to compare two dates
  const isFuture = isAfter(nextWeek, today); // Check if nextWeek is after today

  return (
    <div>
      <h3>Example of Date Handling Using date-fns</h3>
      <p>Today's date: {formattedDate}</p>
      <p>Next week's date: {format(nextWeek, 'yyyy-MM-dd')}</p>
      <p>Last month's date: {format(lastMonth, 'yyyy-MM-dd')}</p>
      <p>Age: {age} years old</p>
      <p>Is next week after today: {isFuture ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default DateExample;
```

### 3. Common `date-fns` functions and usage

#### 3.1 Formatting dates

The `format` function can format dates into a specific format.

```react
import { format } from 'date-fns';

const today = new Date();
console.log(format(today, 'yyyy-MM-dd')); // Output: '2024-11-04'
console.log(format(today, 'dd/MM/yyyy HH:mm:ss')); // Output: '04/11/2024 13:45:30'
```

#### 3.2 Date addition and subtraction

You can use functions such as `addDays` and `subMonths` to add and subtract dates:

```react
import { addDays, subMonths } from 'date-fns';

const today = new Date();
const nextWeek = addDays(today, 7); // Current date plus 7 days
const lastMonth = subMonths(today, 1); // Current date minus 1 month
```

#### 3.3 Calculate date differences

Use `differenceInYears`, `differenceInDays` and other functions to calculate the difference between two dates:

```react
import { differenceInYears, differenceInDays } from 'date-fns';

const birthDate = new Date(1998, 5, 26);
const today = new Date();
const age = differenceInYears(today, birthDate); // Calculate age
const daysDifference = differenceInDays(today, birthDate); // The difference in days between two dates
```

#### 3.4 Compare dates

Use `isAfter`, `isBefore` and other functions to compare dates:

```react
import { isAfter, isBefore } from 'date-fns';

const date1 = new Date(2024, 10, 4);
const date2 = new Date(2024, 9, 15);

console.log(isAfter(date1, date2)); // Output: true, because date1 is after date2
console.log(isBefore(date1, date2)); // Output: false, because date1 is not before date2
```

### 4. Full code example: Calculate the countdown to a future birthday

Here is a React component that uses `date-fns` to calculate the number of days until the next birthday:

```js
import React from 'react';
import { format, addYears, differenceInDays, isBefore } from 'date-fns';

function BirthdayCountdown() {
  const today = new Date();
  const birthDate = new Date(today.getFullYear(), 5, 26); // Assume the birthday is June 26

  // If the birthday has passed, calculate next year's birthday
  const nextBirthday = isBefore(birthDate, today) ? addYears(birthDate, 1) : birthDate;

  // Calculate the number of days until the next birthday
  const daysUntilBirthday = differenceInDays(nextBirthday, today);

  return (
    <div>
      <h3>Birthday Countdown</h3>
      <p>Today's date: {format(today, 'yyyy-MM-dd')}</p>
      <p>Next birthday date: {format(nextBirthday, 'yyyy-MM-dd')}</p>
      <p>Days until the next birthday: {daysUntilBirthday} days</p>
    </div>
  );
}

export default BirthdayCountdown;

```

### Summary

`date-fns` is a powerful and flexible date processing library that is very suitable for use in React projects. By importing only the functions you need, `date-fns` can effectively reduce the code size. Whether it is date formatting, addition and subtraction, comparison or calculating date differences, `date-fns` can provide you with simple and easy-to-use solutions.

