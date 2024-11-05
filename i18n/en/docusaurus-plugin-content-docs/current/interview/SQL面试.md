---
sidebar_position: 4
title: SQL Interview
authors: Hoo
---

 
# SQL Interview 
🐣 **SQL** (Structured Query Language) is used to manage relational database management systems (RDBMS). The scope of SQL includes data insertion, querying, updating and deletion, database schema creation and modification, and data access control.


[SQL Advanced Tutorial]: https://www.runoob.com/sql/sql-top.html


## What can SQL do?
- SQL performs queries against a database
- SQL can fetch data from a database
- SQL inserts new records into a database.
- SQL to update data in a database
- SQL deletes records from a database
- SQL to Create New Database
- SQL to create new table in database
- SQL to create stored procedure in database
- SQL to create view in database
- SQL can set permissions on tables, stored procedures and views.


## SELECT statement
```sql
SELECT * FROM Websites.
```
```sql
SELECT name,country FROM Websites; ```sql
```


## SQL SELECT DISTINCT Statement
In a table, a column may contain multiple duplicate values, and sometimes you may want to list only the distinct values.
The DISTINCT keyword is used to return uniquely distinct values.
```sql
SELECT DISTINCT country FROM Websites.
```
```sql
SELECT COUNT(DISTINCT country) FROM Customers;
```


## SQL WHERE Syntax
```sql
SELECT * FROM Websites WHERE country='CN'; ``# SQL WHERE Syntax ``sql

SELECT * FROM Websites WHERE id=1; ```sql
```

```sql
SELECT * FROM Products
WHERE Price BETWEEN 50 AND 60.
```
```sql
SELECT * FROM Customers
WHERE City IN ('Paris','London'); ```sql SELECT * FROM Customers
```
```sql
SELECT * FROM Customers
WHERE City LIKE 's%';
```


## SQL AND & OR operators
```sql
SELECT * FROM Websites
WHERE country='CN'
AND alexa > 50.

SELECT * FROM Websites
WHERE country='USA'
OR country='CN'; SELECT * FROM Websites WHERE country='USA' AND alexa > 50

SELECT * FROM Websites
WHERE alexa > 15
AND (country='CN' OR country='USA').
```


## SQL ORDER BY Syntax
- **ASC**: means sort in ascending order.
- **DESC**: means sort in descending order.
```sql
SELECT * FROM Websites
ORDER BY alexa.

SELECT * FROM Websites
ORDER BY alexa DESC.

SELECT * FROM Websites
ORDER BY country,alexa; SELECT * FROM Websites ORDER BY alexa DESC.
```


## SQL INSERT INTO Syntax
```sql
INSERT INTO Websites (name, url, alexa, country)
VALUES ('baidu','https://www.baidu.com/','4','CN');

INSERT INTO Websites (name, url, country)
VALUES ('stackoverflow', 'http://stackoverflow.com/', 'IND');
```


## SQL UPDATE Syntax
```sql
UPDATE Websites 
SET alexa='5000', country='USA' 
WHERE name='Rookie Tutorials';
```


## SQL DELETE Syntax
```sql
DELETE FROM Websites
WHERE name='Facebook' AND country='USA';

DELETE FROM table_name.
```





