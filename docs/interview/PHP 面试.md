---
id: interview-qr-php
slug: /interview-qr-php
title: PHP 面试题
date: 2025-01-07
authors: Hoo
tags: [interview]
keywords: [interview]
---

### 1. **反转字符串**

编写一个函数来反转字符串。

```php
function reverseString($str) {
    return strrev($str);
}
echo reverseString("hello"); // 输出: olleh
```

------

### 2. **检查回文字符串**

判断一个字符串是否是回文。

```php
function isPalindrome($str) {
    $reversed = strrev($str);
    return $str === $reversed;
}
echo isPalindrome("madam") ? "Yes" : "No"; // 输出: Yes
```

------

### 3. **计算数组的平均值**

编写一个函数，计算数组的平均值。

```php
function calculateAverage($arr) {
    return array_sum($arr) / count($arr);
}
echo calculateAverage([10, 20, 30, 40]); // 输出: 25
```

------

### 4. **斐波那契数列**

打印前 10 个斐波那契数列。

```php
function fibonacci($n) {
    $fib = [0, 1];
    for ($i = 2; $i < $n; $i++) {
        $fib[] = $fib[$i - 1] + $fib[$i - 2];
    }
    return $fib;
}
print_r(fibonacci(10));
```

------

### 5. **判断素数**

编写一个函数检查一个数字是否是素数。

```php
function isPrime($num) {
    if ($num <= 1) return false;
    if ($num == 2) return true;
    
    for ($i = 2; $i <= sqrt($num); $i++) {
        if ($num % $i == 0) return false;
    }
    return true;
}
echo isPrime(7) ? "Yes" : "No"; // 输出: Yes
```

------

### 6. **统计字符串中单词的出现次数**

计算每个单词在字符串中出现的次数。

```php
function wordCount($str) {
    $words = str_word_count($str, 1);
    return array_count_values($words);
}
print_r(wordCount("hello world hello PHP"));

Array
(
    [hello] => 2
    [world] => 1
    [PHP] => 1
)
```

------

### 7. **排序数组**

用 PHP 内置函数对数组排序。

```php
function sortArray($arr) {
    sort($arr);
    return $arr;
}
print_r(sortArray([5, 2, 9, 1, 5, 6]));

Array
(
    [0] => 1
    [1] => 2
    [2] => 5
    [3] => 5
    [4] => 6
    [5] => 9
)
```

```php
function sortArrayReverse($arr) {
    rsort($arr); // 对数组进行降序排序
    return $arr;
}
print_r(sortArrayReverse([5, 2, 9, 1, 5, 6]));

Array
(
    [0] => 9
    [1] => 6
    [2] => 5
    [3] => 5
    [4] => 2
    [5] => 1
)
```



------

### 8. **实现基本的登录验证**

检查用户名和密码是否匹配。

```php
function login($username, $password) {
    $Username = "admin";
    $Password = "1234";
    return $username === $storedUsername && $password === $storedPassword;
}
echo login("admin", "1234") ? "Login successful" : "Invalid credentials";
```

------

### 9. **计算阶乘**

编写一个函数计算一个数字的阶乘。

```php
function factorial($n) {
    return $n == 0 ? 1 : $n * factorial($n - 1);
}
echo factorial(5); // 输出: 120
```

------

### 10. **检查数组中是否有重复项**

编写一个函数检查数组中是否有重复的值。

```php
function hasDuplicates($arr) {
    return count($arr) !== count(array_unique($arr));
}
echo hasDuplicates([1, 2, 3, 4, 4]) ? "Yes" : "No"; // 输出: Yes
```



### =========



### 1. **PHP 连接 MySQL 数据库**

写一个简单的 PHP 脚本连接到 MySQL 数据库并检查连接是否成功。

```php
$servername = "localhost";
$username = "root";
$password = "";
$database = "test_db";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} else {
    echo "连接成功！";
}
$conn->close();
```

------

### 2. **插入数据到 MySQL 表中**

编写一个函数，用于向 MySQL 表中插入数据。

```php
function insertData($name, $email) {
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) die("连接失败: " . $conn->connect_error);

    $sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
    if ($conn->query($sql) === TRUE) {
        echo "数据插入成功";
    } else {
        echo "错误: " . $conn->error;
    }
    $conn->close();
}

insertData("John Doe", "john@example.com");
```

```php
function insertData($name, $email) {
    // 创建连接
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }

    // 使用准备语句插入数据
    $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    // 绑定参数
    $stmt->bind_param("ss", $name, $email); // "ss" 表示两个字符串类型参数

    // 执行语句
    if ($stmt->execute()) {
        echo "数据插入成功";
    } else {
        echo "错误: " . $stmt->error;
    }

    // 关闭连接和语句
    $stmt->close();
    $conn->close();
}

// 调用函数插入数据
insertData("John Doe", "john@example.com");
```



------

### 3. **从 MySQL 数据库中获取数据**

编写一个脚本从数据库中读取数据并显示。

```php
$conn = new mysqli("localhost", "root", "", "test_db");
if ($conn->connect_error) die("连接失败: " . $conn->connect_error);

$sql = "SELECT id, name, email FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . " - Name: " . $row["name"] . " - Email: " . $row["email"] . "<br>";
    }
} else {
    echo "没有数据";
}
$conn->close();
```

```php
function getUserData($name, $email) {
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) {
        die("连接失败: " . $conn->connect_error);
    }

    // 使用准备语句避免 SQL 注入
    $stmt = $conn->prepare("SELECT id, name, email FROM users WHERE name = ? AND email = ?");
    if ($stmt === false) {
        die("准备语句创建失败: " . $conn->error);
    }

    // 绑定参数
    $stmt->bind_param("ss", $name, $email);  // 绑定两个字符串类型的参数

    // 执行查询
    $stmt->execute();

    // 获取结果
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "ID: " . $row["id"] . " - Name: " . $row["name"] . " - Email: " . $row["email"] . "<br>";
        }
    } else {
        echo "没有数据";
    }

    // 关闭连接和语句
    $stmt->close();
    $conn->close();
}

// 假设用户输入的查询条件
$name = "John Doe";
$email = "john@example.com";
getUserData($name, $email);
```

每次调用 `fetch_assoc()`，会向下移动到结果集的下一行。

常与 `while` 循环配合使用，用于遍历查询结果。



**示例**：

```php
$sql = "SELECT * FROM users";
$result = $conn->query($sql);
echo "共有 " . $result->num_rows . " 条记录";
```

如果 `users` 表中有 5 条记录，输出：

```php
共有 5 条记录
```

------

### 4. **更新数据库中的数据**

写一个函数更新用户的 email 信息。

```php
function updateEmail($id, $newEmail) {
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) die("连接失败: " . $conn->connect_error);

    $sql = "UPDATE users SET email='$newEmail' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "数据更新成功";
    } else {
        echo "更新失败: " . $conn->error;
    }
    $conn->close();
}

updateEmail(1, "newemail@example.com");
```

------

### 5. **删除数据库中的数据**

编写一个函数删除指定的用户。

```php
function deleteUser($id) {
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) die("连接失败: " . $conn->connect_error);

    $sql = "DELETE FROM users WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "用户删除成功";
    } else {
        echo "删除失败: " . $conn->error;
    }
    $conn->close();
}

deleteUser(2);
```

------

### 6. **预处理语句防止 SQL 注入**

用 `prepare` 和 `bind_param` 防止 SQL 注入。

```php
function safeInsert($name, $email) {
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) die("连接失败: " . $conn->connect_error);

    $stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $email);

    if ($stmt->execute()) {
        echo "安全插入成功";
    } else {
        echo "插入失败: " . $stmt->error;
    }
    $stmt->close();
    $conn->close();
}

safeInsert("Alice", "alice@example.com");
```

**准备语句** (`prepare()`):

- 使用 SQL 语句模板，创建一个预处理语句对象。
- 这个过程只是将 SQL 语句发送到 MySQL 服务器，并进行语法分析。

**绑定参数** (`bind_param()`):

- 使用 `bind_param()` 方法将实际的参数（如变量）绑定到 SQL 语句中的占位符（`?`）上。
- 在执行之前，必须绑定所有参数。

通过 `execute()` 执行准备好的 SQL 语句，并将绑定的参数传递给 SQL 语句。



#### **常用的类型字符**

| 字符 | 数据类型           | 示例               |
| ---- | ------------------ | ------------------ |
| `i`  | 整数（`int`）      | `42`, `-1`         |
| `d`  | 双精度浮点数       | `3.14`, `2.718`    |
| `s`  | 字符串（`string`） | `"hello"`, `"abc"` |
| `b`  | 二进制数据         | `binary data`      |

------

#### **示例：根据不同类型绑定参数**

假设我们有一个表 `users`，包含以下字段：

- `id`（整数）
- `name`（字符串）
- `salary`（浮点数）

我们可以这样绑定参数：

```php
$stmt = $conn->prepare("INSERT INTO users (id, name, salary) VALUES (?, ?, ?)");
$stmt->bind_param("isd", $id, $name, $salary);

// 参数赋值
$id = 1;          // 整数 -> "i"
$name = "Alice";  // 字符串 -> "s"
$salary = 5000.50;// 浮点数 -> "d"

// 执行插入
$stmt->execute();
```

------

### 7. **分页查询**

实现分页查询从数据库中获取数据。

```php
function getPaginatedData($page, $itemsPerPage) {
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) die("连接失败: " . $conn->connect_error);

    $offset = ($page - 1) * $itemsPerPage;
    $sql = "SELECT * FROM users LIMIT $itemsPerPage OFFSET $offset";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "ID: " . $row["id"] . " - Name: " . $row["name"] . " - Email: " . $row["email"] . "<br>";
        }
    } else {
        echo "没有更多数据";
    }
    $conn->close();
}

getPaginatedData(1, 5);
```

------

### 8. **获取总记录数**

查询表中总共有多少条记录。

```php
function getTotalCount() {
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) die("连接失败: " . $conn->connect_error);

    $sql = "SELECT COUNT(*) AS total FROM users";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    echo "总记录数: " . $row['total'];

    $conn->close();
}

getTotalCount();
```

------

### 9. **事务处理**

实现一个简单的事务操作。

```php
$conn = new mysqli("localhost", "root", "", "test_db");
if ($conn->connect_error) die("连接失败: " . $conn->connect_error);

$conn->autocommit(FALSE);

try {
    $conn->query("UPDATE users SET email='test1@example.com' WHERE id=1");
    $conn->query("UPDATE users SET email='test2@example.com' WHERE id=2");
    $conn->commit();
    echo "事务完成";
} catch (Exception $e) {
    $conn->rollback();
    echo "事务回滚: " . $e->getMessage();
}

$conn->close();
```

**`autocommit(FALSE)`** 是 PHP 的 MySQLi 类提供的方法，用来关闭数据库连接的自动提交功能。默认情况下，每个 SQL 语句在执行后会立即提交（即自动提交）。关闭自动提交后，可以手动控制事务的提交和回滚。



`commit()` 是 MySQLi 中用于 **提交事务** 的方法。它的作用是 **保存** 自 `begin` 或 `start` 开始的所有数据库操作（如 `UPDATE`、`INSERT` 等）。

### **为什么需要 `commit()`？**

当你在 MySQL 中使用事务时，你并不直接提交每一条 SQL 语句，而是**先将它们保留在一个临时状态**。只有当你调用 `commit()` 时，数据库才会**正式保存**这些更改。如果在 `commit()` 之前出现错误，你可以通过 `rollback()` 来撤销（回滚）所有更改。

`commit()` 提交当前事务，将所有更改永久保存。

`rollback()` 用于回滚事务，将更改撤销。

`query()` 只是执行单个 SQL 语句，并不会管理事务的提交和回滚。

使用事务可以确保多个 SQL 操作要么全部成功，要么全部失败，从而保证数据一致性。

------

### 10. **错误日志记录 **   x

编写一个简单的错误日志记录系统。

```php
function logError($message) {
    $file = 'error_log.txt';
    file_put_contents($file, date("Y-m-d H:i:s") . " - $message\n", FILE_APPEND);
}

try {
    $conn = new mysqli("localhost", "root", "", "test_db");
    if ($conn->connect_error) throw new Exception("连接失败: " . $conn->connect_error);
    // 其他数据库操作...
} catch (Exception $e) {
    logError($e->getMessage());
    echo "错误已记录到日志";
}
```



### **如何使用 `query`**

`query` 是执行 SQL 查询的最基础方法，可以用于执行 **增删改查**（CRUD）操作。

#### 1. **SELECT 查询**

```php
$sql = "SELECT * FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 遍历查询结果
    while ($row = $result->fetch_assoc()) {
        echo "用户ID: " . $row["id"] . " - 名字: " . $row["name"] . "<br>";
    }
} else {
    echo "没有找到记录";
}
```

- 解释

  ：

  - 使用 `query()` 执行 `SELECT` 查询。
  - 返回的 `$result` 是一个 `mysqli_result` 对象。
  - 使用 `$result->num_rows` 检查是否有结果。
  - 使用 `$result->fetch_assoc()` 获取每行数据作为关联数组。

------

#### 2. **INSERT 查询**

```php
$sql = "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')";
if ($conn->query($sql) === true) {
    echo "新记录插入成功";
} else {
    echo "插入失败: " . $conn->error;
}
```

- 解释

  ：

  - 执行 `INSERT` 查询。
  - 如果成功，`query()` 返回 `true`。
  - 如果失败，返回 `false`，可以通过 `$conn->error` 获取详细错误信息。

------

#### 3. **UPDATE 查询**

```php
$sql = "UPDATE users SET name = 'Bob' WHERE id = 1";
if ($conn->query($sql) === true) {
    echo "记录更新成功";
} else {
    echo "更新失败: " . $conn->error;
}
```

------

#### 4. **DELETE 查询**

```php
$sql = "DELETE FROM users WHERE id = 1";
if ($conn->query($sql) === true) {
    echo "记录删除成功";
} else {
    echo "删除失败: " . $conn->error;
}
```

------

### **常见问题**

1. **SQL 注入风险**： 如果直接在 `$sql` 中拼接用户输入，可能会导致 SQL 注入攻击。建议使用 **`prepared statements`**（预处理语句）代替。

   **不安全示例**：

   ```php
   $username = $_POST['username'];
   $sql = "SELECT * FROM users WHERE name = '$username'";
   ```

   **安全示例（使用 prepared statements）**：

   ```php
   $stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");
   $stmt->bind_param("s", $_POST['username']);
   $stmt->execute();
   ```

   

   ### **完整代码：**

   #### **1. HTML 表单（`index.html` 或 `form.html`）**

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>查询用户</title>
   </head>
   <body>
       <h2>查询用户信息</h2>
       <form action="search_user.php" method="POST">
           <label for="username">用户名:</label>
           <input type="text" name="username" id="username" required>
           <input type="submit" value="查询">
       </form>
   </body>
   </html>
   ```

   #### **2. PHP 代码（`search_user.php`）**

   ```php
   <?php
   function getUserByUsername($username) {
       // 创建数据库连接
       $conn = new mysqli("localhost", "root", "", "test_db");
   
       // 检查连接
       if ($conn->connect_error) {
           die("连接失败: " . $conn->connect_error);
       }
   
       // 使用预处理语句避免 SQL 注入
       $stmt = $conn->prepare("SELECT * FROM users WHERE name = ?");
       $stmt->bind_param("s", $username);  // "s" 表示参数是字符串类型
   
       // 执行查询
       $stmt->execute();
   
       // 获取查询结果
       $result = $stmt->get_result();
   
       // 检查是否有结果
       if ($result->num_rows > 0) {
           // 输出查询结果
           while ($row = $result->fetch_assoc()) {
               echo "ID: " . $row["id"] . " - Name: " . $row["name"] . " - Email: " . $row["email"] . "<br>";
           }
       } else {
           echo "没有找到用户。";
       }
   
       // 关闭连接
       $stmt->close();
       $conn->close();
   }
   
   // 检查表单是否通过 POST 提交数据
   if (isset($_POST['username'])) {
       $username = $_POST['username'];  // 获取用户名
       getUserByUsername($username);    // 调用函数查询并显示结果
   }
   ?>
   ```

   

   ### **1. 创建表（Create Table）**

   ```sql
   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100)
   );
   ```

   

2. **错误处理**： 始终检查查询是否成功：

   ```php
   if ($conn->query($sql) === false) {
       echo "错误: " . $conn->error;
   }
   ```

3. **查询结果为空**： `SELECT` 查询可能返回空结果集，需通过 `$result->num_rows` 检查。



### =================



### 1. **检查数组是否是关联数组**

编写一个函数，检查一个数组是关联数组还是索引数组。

```php
function isAssociativeArray($array) {
    return array_keys($array) !== range(0, count($array) - 1);
}
echo isAssociativeArray(["a" => 1, "b" => 2]) ? "关联数组" : "索引数组";
```

------

### 2. **比较两个数组的差异**

用 PHP 函数找出两个数组之间的差异。

`array_diff()` 函数用来比较两个数组，并返回第一个数组中存在，而第二个数组中没有的元素

```php
function getArrayDifference($array1, $array2) {
    return array_diff($array1, $array2);
}
print_r(getArrayDifference([1, 2, 3], [2, 3, 4])); // 输出: [1]
```

------

### 3. **计算数组的交集**

获取两个数组的交集。

```php
function getArrayIntersection($array1, $array2) {
    return array_intersect($array1, $array2);
}
print_r(getArrayIntersection([1, 2, 3], [2, 3, 4])); // 输出: [2, 3]
```

------

### 4. **生成随机字符串**

生成一个长度为 N 的随机字符串。

```php
function generateRandomString($length = 8) {
    return substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, $length);
}
echo generateRandomString(10);
```

------

### 5. **实现文件上传功能**

如何在 PHP 中处理文件上传？

```php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["fileToUpload"]["name"]);
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $targetFile)) {
        echo "文件上传成功: " . $targetFile;
    } else {
        echo "文件上传失败";
    }
}
```

**HTML 表单**:

```html
<form action="" method="POST" enctype="multipart/form-data">
    <input type="file" name="fileToUpload">
    <input type="submit" value="上传">
</form>
```

------

### 6. **PHP 的 Cookie 和 Session 区别**

- **Cookie**: 存储在客户端 (浏览器)，用于小量数据的持久存储，随着每个请求发送到服务器。
- **Session**: 存储在服务器，用于用户的临时数据存储，只在用户活动期间有效。

简单代码示例：

```php
// 设置 Cookie
setcookie("user", "John", time() + (86400 * 30), "/"); 

// 设置 Session
session_start();
$_SESSION["user"] = "John";

session_start();
if (isset($_SESSION["user"])) {
    echo "用户是：" . $_SESSION["user"]; // 输出：用户是：John
    echo "角色是：" . $_SESSION["role"]; // 输出：角色是：admin
} else {
    echo "Session 数据不存在。";
}

session_start();
unset($_SESSION["user"]); // 删除 "user" 键

session_destroy(); // 销毁 Session 数据
```

------

### 7. **计算两个日期的差**

计算两个日期之间的天数。

```php
function dateDifference($date1, $date2) {
    $datetime1 = new DateTime($date1);
    $datetime2 = new DateTime($date2);
    $interval = $datetime1->diff($datetime2);
    return $interval->days;
}
echo dateDifference("2024-12-20", "2025-01-01"); // 输出: 12
```

------

### 8. **动态调用函数**

使用变量函数动态调用。

```php
function sayHello() {
    return "Hello, World!";
}
$functionName = "sayHello";
echo $functionName(); // 输出: Hello, World!
```

------

### 9. **通过接口实现多态**

用 PHP 接口实现多态特性。

```php
interface Animal {
    public function sound();
}

class Dog implements Animal {
    public function sound() {
        return "Bark";
    }
}

class Cat implements Animal {
    public function sound() {
        return "Meow";
    }
}

function makeSound(Animal $animal) {
    echo $animal->sound();
}

makeSound(new Dog()); // 输出: Bark
makeSound(new Cat()); // 输出: Meow
```

------

### 10. **计算数组中每个值出现的次数**

统计数组中每个值出现的次数。

```php
function countValues($array) {
    return array_count_values($array);
}
print_r(countValues(["apple", "banana", "apple", "orange", "banana"]));
```

------

### 11. **过滤数组中的空值**

使用 `array_filter` 去除数组中的空值。

```php
function removeEmptyValues($array) {
    return array_filter($array);
}
print_r(removeEmptyValues(["apple", "", null, "banana", 0, false, "orange"]));
```

------

### 12. **PHP 自动加载类 **  x

通过 `spl_autoload_register` 实现自动加载。

```php
spl_autoload_register(function ($class) {
    include $class . ".php";
});

// 假设有文件 Dog.php，内含 Dog 类
$dog = new Dog();
```

------

### 13. **PHP 中的异常处理**

使用 try-catch 捕获异常。

```php
try {
    throw new Exception("发生错误");
} catch (Exception $e) {
    echo "捕获异常: " . $e->getMessage();
}
```

------

### 14. **检测字符串是否包含某个子字符串**

检查字符串中是否存在子字符串。

```php
function contains($haystack, $needle) {
    return strpos($haystack, $needle) !== false;
}
echo contains("hello world", "world") ? "包含" : "不包含";
```

------

### 15. **获取客户端 IP 地址**  x

获取访问者的 IP 地址。

```php
function getClientIp() {
    return $_SERVER['REMOTE_ADDR'];
}
echo "用户 IP 地址: " . getClientIp();
```

------

### 16. **生成分页链接**  x

实现分页功能。

```php
function generatePagination($currentPage, $totalPages) {
    for ($i = 1; $i <= $totalPages; $i++) {
        if ($i == $currentPage) {
            echo "<strong>$i</strong> ";
        } else {
            echo "<a href='?page=$i'>$i</a> ";
        }
    }
}
generatePagination(3, 10);
```



### ================

### **1. 简单数组与 `for` 循环**

```php
$fruits = ["Apple", "Banana", "Cherry"];

// 使用 for 遍历数组
for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "\n";
}
```

**输出**:

```
Apple
Banana
Cherry
```

------

### **2. 多维数组与嵌套 `for` 循环**

```php
$students = [
    ["name" => "Alice", "age" => 20],
    ["name" => "Bob", "age" => 22],
    ["name" => "Charlie", "age" => 19]
];

for ($i = 0; $i < count($students); $i++) {
    echo "Name: " . $students[$i]["name"] . ", Age: " . $students[$i]["age"] . "\n";
}
```

**输出**:

```
Name: Alice, Age: 20
Name: Bob, Age: 22
Name: Charlie, Age: 19
```

------

### **3. 动态生成数组与 `for` 循环**

生成一个从 1 到 10 的数字数组。

```php
$numbers = [];
for ($i = 1; $i <= 10; $i++) {
    $numbers[] = $i; // 将数字加入数组
}
print_r($numbers);
```

**输出**:

```
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
    [3] => 4
    [4] => 5
    [5] => 6
    [6] => 7
    [7] => 8
    [8] => 9
    [9] => 10
)
```

------

### **4. 过滤数组中的值**

使用 `for` 循环过滤掉数组中的偶数。

```php
$numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
$filtered = [];

for ($i = 0; $i < count($numbers); $i++) {
    if ($numbers[$i] % 2 != 0) { // 只保留奇数
        $filtered[] = $numbers[$i];
    }
}
print_r($filtered);
```

**输出**:

```
Array
(
    [0] => 1
    [1] => 3
    [2] => 5
    [3] => 7
    [4] => 9
)
```

------

### **5. 使用 `for` 循环与关联数组（需要先获取键数组）**

```php
$person = ["name" => "John", "age" => 30, "city" => "New York"];

// 获取键数组
$keys = array_keys($person);

for ($i = 0; $i < count($keys); $i++) {
    $key = $keys[$i];
    echo $key . ": " . $person[$key] . "\n";
}
```

**输出**:

```
name: John
age: 30
city: New York
```

------

### **6. 使用 `for` 和数组索引删除特定值**

移除数组中的值 5。

```php
$numbers = [1, 5, 3, 5, 7, 9];
for ($i = 0; $i < count($numbers); $i++) {
    if ($numbers[$i] === 5) {
        unset($numbers[$i]); // 删除元素
    }
}
// 重新索引数组
$numbers = array_values($numbers);
print_r($numbers);
```

**输出**:

```
Array
(
    [0] => 1
    [1] => 3
    [2] => 7
    [3] => 9
)
```

------

### **7. 合并两个数组**

将两个数组合并成一个。

```php
$array1 = ["a", "b", "c"];
$array2 = ["x", "y", "z"];

$merged = [];
for ($i = 0; $i < count($array1); $i++) {
    $merged[] = $array1[$i];
    $merged[] = $array2[$i];
}
print_r($merged);
```

**输出**:

```
Array
(
    [0] => a
    [1] => x
    [2] => b
    [3] => y
    [4] => c
    [5] => z
)
```

------

### **8. 遍历带条件的多维数组**

从一个多维数组中找到年龄大于 20 的学生。

```php
$students = [
    ["name" => "Alice", "age" => 20],
    ["name" => "Bob", "age" => 22],
    ["name" => "Charlie", "age" => 19]
];

$filtered = [];
for ($i = 0; $i < count($students); $i++) {
    if ($students[$i]["age"] > 20) {
        $filtered[] = $students[$i];
    }
}
print_r($filtered);
```

**输出**:

```
Array
(
    [0] => Array
        (
            [name] => Bob
            [age] => 22
        )
)
```

------

### **9. 累加数组中的值**

计算数组中所有值的总和。

```php
$numbers = [1, 2, 3, 4, 5];
$sum = 0;

for ($i = 0; $i < count($numbers); $i++) {
    $sum += $numbers[$i];
}
echo "总和: $sum";
```

**输出**:

```
总和: 15
```

------

### **10. 按特定顺序插入值到数组中**

在索引位置 2 之后插入新值。

```php
$numbers = [1, 2, 3, 4, 5];
$newValue = 99;

for ($i = count($numbers); $i > 2; $i--) {
    $numbers[$i] = $numbers[$i - 1]; // 向右移动
}
$numbers[3] = $newValue;

print_r($numbers);
```

**输出**:

```
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
    [3] => 99
    [4] => 4
    [5] => 5
)
```



### =========

### **1. PHP 与 MySQL 基础操作**

在 PHP 中操作 MySQL 通常使用 `mysqli` 或 `PDO`。以下是使用 **`mysqli`** 进行的常见操作示例：

#### 连接数据库

```php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test_db";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}
echo "连接成功!";
```

#### 插入数据

```php
$sql = "INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com')";
if ($conn->query($sql) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "错误: " . $sql . "<br>" . $conn->error;
}
```

#### 查询数据

```php
$sql = "SELECT id, name, email FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Email: " . $row["email"]. "<br>";
    }
} else {
    echo "0 结果";
}
```

#### 更新数据

```php
$sql = "UPDATE users SET name='Jane Doe' WHERE id=1";
if ($conn->query($sql) === TRUE) {
    echo "记录更新成功";
} else {
    echo "错误: " . $sql . "<br>" . $conn->error;
}
```

#### 删除数据

```php
$sql = "DELETE FROM users WHERE id=1";
if ($conn->query($sql) === TRUE) {
    echo "记录删除成功";
} else {
    echo "错误: " . $sql . "<br>" . $conn->error;
}
```

------

### **2. 面向对象编程 (OOP)**

PHP 是面向对象的语言，OOP 可以帮助你构建结构更清晰、可维护的应用程序。以下是一些常见的 OOP 特性和使用方法：

#### 类与对象

```php
class Person {
    public $name;
    public $age;

    // 构造方法
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    // 方法
    public function greet() {
        return "Hello, my name is " . $this->name . " and I am " . $this->age . " years old.";
    }
}

// 创建对象
$person1 = new Person("John", 30);
echo $person1->greet();
```

#### 继承

```php
class Employee extends Person {
    public $jobTitle;

    // 构造方法
    public function __construct($name, $age, $jobTitle) {
        parent::__construct($name, $age); // 调用父类构造函数
        $this->jobTitle = $jobTitle;
    }

    public function getJob() {
        return $this->name . " is a " . $this->jobTitle;
    }
}

// 创建子类对象
$employee1 = new Employee("Jane", 25, "Developer");
echo $employee1->getJob();
```

#### 多态

```php
class Animal {
    public function makeSound() {
        echo "Some generic animal sound.";
    }
}

class Dog extends Animal {
    public function makeSound() {
        echo "Bark!";
    }
}

class Cat extends Animal {
    public function makeSound() {
        echo "Meow!";
    }
}

$animal1 = new Dog();
$animal1->makeSound(); // 输出: Bark!

$animal2 = new Cat();
$animal2->makeSound(); // 输出: Meow!
```

#### 抽象类与接口 x

```php
abstract class Shape {
    abstract public function area();
}

class Circle extends Shape {
    public $radius;

    public function __construct($radius) {
        $this->radius = $radius;
    }

    public function area() {
        return pi() * pow($this->radius, 2);
    }
}

// 创建 Circle 对象
$circle = new Circle(5);
echo "Area of circle: " . $circle->area();
```

------

### **3. PHP 和 MySQL 使用 PDO (推荐的方式)** x

`PDO`（PHP Data Objects）是一个更现代、更安全的数据库连接和操作方式，适用于不同类型的数据库。

#### 连接数据库

```php
$dsn = 'mysql:host=localhost;dbname=test_db';
$username = 'root';
$password = '';

try {
    $pdo = new PDO($dsn, $username, $password);
    // 设置错误模式
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "连接成功";
} catch (PDOException $e) {
    echo "连接失败: " . $e->getMessage();
}
```

#### 插入数据

```php
$sql = "INSERT INTO users (name, email) VALUES (:name, :email)";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);

// 插入数据
$name = "John Doe";
$email = "john@example.com";
$stmt->execute();
```

#### 查询数据

```php
$sql = "SELECT id, name, email FROM users";
$stmt = $pdo->query($sql);
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    echo "id: " . $row["id"] . " - Name: " . $row["name"] . " - Email: " . $row["email"] . "<br>";
}
```

------

### **4. MVC 模式概述**

MVC（模型-视图-控制器）是一个软件设计模式，用于实现应用程序的分层架构，通常在 web 开发中应用。它将应用程序分为三个核心部分：

- **Model**（模型）：与数据相关的部分，负责处理数据的获取、存储和处理。
- **View**（视图）：显示数据的部分，负责与用户交互。
- **Controller**（控制器）：控制器处理用户请求并调用模型和视图进行响应。

#### 简单的 MVC 示例

**目录结构**：

```php
/mvc
    /models
        User.php
    /views
        userView.php
    /controllers
        UserController.php
    index.php
```

#### Model（模型）

```php
// /models/User.php
class User {
    public $name;
    public $email;

    public function __construct($name, $email) {
        $this->name = $name;
        $this->email = $email;
    }

    public static function getAllUsers() {
        // 模拟数据库查询
        return [
            new User("John", "john@example.com"),
            new User("Jane", "jane@example.com")
        ];
    }
}
```

#### View（视图）

```php
// /views/userView.php
function renderUserList($users) {
    echo "<h2>User List</h2>";
    foreach ($users as $user) {
        echo "Name: " . $user->name . " | Email: " . $user->email . "<br>";
    }
}
```

#### Controller（控制器）

```php
// /controllers/UserController.php
require_once 'models/User.php';
require_once 'views/userView.php';

class UserController {
    public function displayUsers() {
        $users = User::getAllUsers();
        renderUserList($users);
    }
}
```

#### Index（入口）

```php
// index.php
require_once 'controllers/UserController.php';

$controller = new UserController();
$controller->displayUsers();
```



### ====================

以下是关于 **PHP 语法（Syntax）、逻辑（Logic）、数组（Array）、循环（For Loop）、函数（Function）** 的代码示例，帮助你快速复习基础知识。

------

### **1. PHP 基础语法（Syntax）** √

```php
<?php
// PHP 代码必须写在 <?php 和 ?> 标签之间

// 变量声明
$name = "John Doe";
$age = 25;

// 条件语句
if ($age >= 18) {
    echo $name . " is an adult.";
} else {
    echo $name . " is not an adult.";
}

// 输出
echo "<br>Welcome to PHP learning!";
?>
```

------

### **2. PHP 逻辑（Logic） **√

#### **条件语句**

```php
<?php
$number = 10;

// 判断是奇数还是偶数
if ($number % 2 == 0) {
    echo "$number is odd.";
} else {
    echo "$number is even.";
}

// 三元运算符
$result = ($number > 5) ? "Greater than 5" : "5 or less";
echo "<br>" . $result;
?>
```

#### **开关语句（Switch Case）** √

```php
<?php
$day = "Monday";

switch ($day) {
    case "Monday":
        echo "Today is Monday.";
        break;
    case "Tuesday":
        echo "Today is Tuesday.";
        break;
    default:
        echo "It's another day.";
        break;
}
?>
```

------

### **3. PHP 数组（Array）** √

#### **索引数组**

```php
<?php
$fruits = ["Apple", "Banana", "Cherry"];

// 访问数组元素
echo $fruits[0]; // 输出: Apple

// 遍历数组
foreach ($fruits as $fruit) {
    echo "<br>Fruit: " . $fruit;
}
?>
```

#### **关联数组 **√

```php
<?php
$person = [
    "name" => "John Doe",
    "age" => 25,
    "job" => "Developer"
];

// 访问元素
echo "Name: " . $person["name"];

// 遍历关联数组
foreach ($person as $key => $value) {
    echo "<br>$key: $value";
}
?>
```

#### **多维数组** √

```php
<?php
$users = [
    ["name" => "Alice", "age" => 30],
    ["name" => "Bob", "age" => 25],
    ["name" => "Charlie", "age" => 35]
];

// 访问多维数组元素
echo "First user: " . $users[0]["name"];

// 遍历多维数组
foreach ($users as $user) {
    echo "<br>Name: " . $user["name"] . ", Age: " . $user["age"];
}
?>
```

------

### **4. PHP 循环（For Loop） **√

#### **For 循环** √

```php
<?php
// 打印 1 到 5
for ($i = 1; $i <= 5; $i++) {
    echo "Number: $i<br>";
}
?>
```

#### **While 循环 **√

```php
<?php
$count = 1;

while ($count <= 3) {
    echo "Count: $count<br>";
    $count++;
}
?>
```

#### **Do-While 循环** √

```php
<?php
$count = 1;

do {
    echo "Count: $count<br>";
    $count++;
} while ($count <= 3);
?>
```

#### **嵌套循环** √

```php
<?php
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 2; $j++) {
        echo "i: $i, j: $j<br>";
    }
}
?>
```

------

### **5. PHP 函数（Function） **√

#### **定义和调用函数** √

```php
<?php
// 定义一个函数
function greet($name) {
    return "Hello, $name!";
}

// 调用函数
echo greet("John");
?>
```

#### **带默认参数的函数** √

```php
<?php
function sayHello($name = "Guest") {
    return "Hello, $name!";
}

// 使用默认参数
echo sayHello();

// 提供参数
echo "<br>" . sayHello("Alice");
?>
```

#### **可变参数函数 **√

```php
<?php
function sumNumbers(...$numbers) {
    return array_sum($numbers);
}

// 调用函数
echo sumNumbers(1, 2, 3, 4); // 输出: 10
?>
```

#### **递归函数 **√

```php
<?php
function factorial($n) {
    return $n == 1 ? 1 : $n * fa($n - 1);
}

// 调用递归函数
echo factorial(5); // 输出: 120
?>
```

#### **匿名函数** √

```php
<?php
$double = function($n) {
    return $n * 2;
};

echo $double(5); // 输出: 10
?>
```

------

### **综合示例 **√

#### 使用数组、循环和函数打印用户信息 √

```php
<?php
$users = [
    ["name" => "Alice", "age" => 30],
    ["name" => "Bob", "age" => 25],
    ["name" => "Charlie", "age" => 35]
];

function displayUsers($users) {
    foreach ($users as $user) {
        echo "Name: " . $user["name"] . ", Age: " . $user["age"] . "<br>";
    }
}

displayUsers($users);
?>
```

------

### **练习建议**

1. 修改数组内容，观察输出结果。
2. 使用循环生成表格或列表。
3. 实现一个简单的登录逻辑，结合数组和条件语句。
4. 尝试创建更多函数并调用它们，提升代码复用能力。

需要进一步深入某些方面的内容，请告诉我！

### ===========================

### **1. 基本函数 **√

```php
<?php
// 定义一个简单函数
function greet($name) {
    return "Hello, $name!";
}

// 调用函数
echo greet("Alice"); // 输出: Hello, Alice!
?>
```

------

### **2. 带默认参数的函数** √

```php
<?php
function sayHello($name = "Guest") {
    return "Hello, $name!";
}

// 使用默认值
echo sayHello(); // 输出: Hello, Guest!

// 提供参数
echo sayHello("John"); // 输出: Hello, John!
?>
```

------

### **3. 返回多个值的函数**√

```php
<?php
function getUserDetails() {
    return ["name" => "Alice", "age" => 30, "job" => "Developer"];
}

// 调用函数并解构返回值
$user = getUserDetails();
echo "Name: " . $user["name"] . ", Age: " . $user["age"]; // 输出: Name: Alice, Age: 30
?>
```

------

### **4. 带引用参数的函数** √ 看

```php
<?php
function addFive(&$num) {
    $num += 5;
}

$value = 10;
addFive($value);
echo $value; // 输出: 15
?>
```

------

### **5. 可变参数函数** √

```php
<?php
function sumNumbers(...$numbers) {
    return array_sum($numbers);
}

// 调用函数
echo sumNumbers(1, 2, 3, 4); // 输出: 10
?>
```

------

### **6. 递归函数** √

```php
<?php
function factorial($n) {
    return $n == 1 ? 1 : $n * factorial($n - 1);
}

// 调用递归函数
echo factorial(5); // 输出: 120
?>
```

------

### **7. 匿名函数（闭包）** √

```php
<?php
$double = function($n) {
    return $n * 2;
};

echo $double(4); // 输出: 8
?>
```

------

### **8. 高阶函数** √

```php
<?php
function applyToNumbers($callback, $numbers) {
    foreach ($numbers as $num) {
        echo $callback($num) . "<br>";
    }
}

// 使用高阶函数
applyToNumbers(function($n) {
    return $n * $n;
}, [1, 2, 3, 4]); // 输出每个数字的平方
?>
```

------

### **9. 函数类型声明** √

```php
<?php
function multiply(int $a, int $b): int {
    return $a * $b;
}

// 调用函数
echo multiply(3, 5); // 输出: 15
?>
```

------

### **10. 使用全局变量** √

```php
<?php
$counter = 0;

function incrementCounter() {
    global $counter;
    $counter++;
}

incrementCounter();
incrementCounter();
echo $counter; // 输出: 2
?>
```

------

### **11. 函数作为参数** √

```php
<?php
function executeFunction($callback) {
    echo $callback() . "<br>";
}

// 调用函数
executeFunction(function() {
    return "Hello from a callback!";
});
?>
```

------

### **12. 动态函数调用** √

```php
<?php
function greet() {
    return "Hello!";
}

$functionName = "greet";
echo $functionName(); // 输出: Hello!
?>
```

------

### **13. 嵌套函数** √

```php
<?php
function outerFunction($name) {
    function innerFunction($name) {
        return "Hello, $name!";
    }
    return innerFunction($name);
}

// 调用外部函数
echo outerFunction("Alice"); // 输出: Hello, Alice!
?>
```

------

### **14. 创建自己的工具函数** √ 看

```php
<?php
// 检查字符串是否以特定字符结尾
function endsWith($string, $char) {
    return substr($string, -1) === $char;
}

echo endsWith("Hello", "o") ? "Yes" : "No"; // 输出: Yes
?>
```

------

### **15. 函数结合数组** √ 看

```php
<?php
function doubleNumbers($numbers) {
    return array_map(function($num) {
        return $num * 2;
    }, $numbers);
}

// 调用函数
print_r(doubleNumbers([1, 2, 3])); // 输出: Array ( [0] => 2 [1] => 4 [2] => 6 )
?>
```



### ===================



#### **1.1 文件结构 **√

```
/mvc
  ├── index.php        # 入口文件
  ├── controllers/
  │   └── HomeController.php
  ├── models/
  │   └── UserModel.php
  └── views/
      └── home.php
```

#### **1.2 示例代码** √

##### **index.php**

```php
<?php
require 'controllers/HomeController.php';

$controller = new HomeController();
$controller->index();
?>
```

##### **controllers/HomeController.php**

```php
<?php
require 'models/UserModel.php';

class HomeController {
    public function index() {
        $userModel = new UserModel();
        $users = $userModel->getUsers();
        require 'views/home.php';
    }
}
?>
```

##### **models/UserModel.php**

```php
<?php
class UserModel {
    public function getUsers() {
        // 模拟从数据库获取数据
        return [
            ['name' => 'Alice', 'age' => 25],
            ['name' => 'Bob', 'age' => 30],
        ];
    }
}
?>
```

##### **views/home.php**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Users</title>
</head>
<body>
    <h1>User List</h1>
    <ul>
        <?php foreach ($users as $user): ?>
            <li><?php echo $user['name'] . ' (' . $user['age'] . ' years old)'; ?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
```

------

### **2. PHP OOP 示例** √

#### **2.1 类和对象** √

```php
<?php
class User {
    public $name;
    private $age;

    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    public function getDetails() {
        return $this->name . " is " . $this->age . " years old.";
    }
}

// 创建对象
$user = new User("Alice", 25);
echo $user->getDetails(); // 输出: Alice is 25 years old.
?>
```

#### **2.2 继承** √

```php
<?php
class Person {
    protected $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function greet() {
        return "Hello, my name is " . $this->name;
    }
}

class Employee extends Person {
    private $jobTitle;

    public function __construct($name, $jobTitle) {
        parent::__construct($name);
        $this->jobTitle = $jobTitle;
    }

    public function getJobDetails() {
        return $this->greet() . " and I am a " . $this->jobTitle;
    }
}

// 创建对象
$employee = new Employee("Bob", "Developer");
echo $employee->getJobDetails(); // 输出: Hello, my name is Bob and I am a Developer
?>
```

#### **2.3 静态方法和属性√ 看**

```php
<?php
class MathUtils {
    public static function add($a, $b) {
        return $a + $b;
    }
}

// 调用静态方法
echo MathUtils::add(3, 5); // 输出: 8
?>
```

#### **2.4 接口**√

```php
<?php
interface Animal {
    public function makeSound();
}

class Dog implements Animal {
    public function makeSound() {
        return "Woof!";
    }
}

class Cat implements Animal {
    public function makeSound() {
        return "Meow!";
    }
}

$dog = new Dog();
echo $dog->makeSound(); // 输出: Woof!

$cat = new Cat();
echo $cat->makeSound(); // 输出: Meow!
?>
```

------

### **3. PHP For Loop 示例**√

#### **3.1 基础 For 循环**√

```php
<?php
for ($i = 1; $i <= 5; $i++) {
    echo "Count: $i<br>";
}
?>
```

#### **3.2 嵌套 For 循环**√

```php
<?php
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 2; $j++) {
        echo "i: $i, j: $j<br>";
    }
}
?>
```

#### **3.3 遍历数组**√

```php
<?php
$fruits = ["Apple", "Banana", "Cherry"];

for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "<br>";
}
?>
```

#### **3.4 结合条件的循环**√

```php
<?php
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 == 0) {
        echo "$i is even<br>";
    }
}
?>
```

------

### 综合建议√

1. **MVC** 是项目组织的核心结构，确保理解每个文件的职责。
2. **OOP** 是大型项目的基石，熟悉类、继承、接口和静态属性。
3. **For Loop** 是基础技能，练习结合数组、条件语句等使用场景。



### ====================

### **1. PHP `foreach` 循环 示例**√

`foreach` 循环是 PHP 中用于遍历数组的主要方式，它简化了对数组元素的访问和操作。

#### **1.1 `foreach` 循环遍历索引数组**√

```php
<?php
$fruits = ["Apple", "Banana", "Cherry"];

foreach ($fruits as $fruit) {
    echo $fruit . "<br>";
}
?>
```

**输出:**

```
Apple
Banana
Cherry
```

#### **1.2 `foreach` 循环遍历关联数组**√

```php
<?php
$person = [
    "name" => "Alice",
    "age" => 25,
    "job" => "Developer"
];

foreach ($person as $key => $value) {
    echo $key . ": " . $value . "<br>";
}
?>
```

**输出:**

```
name: Alice
age: 25
job: Developer
```

#### **1.3 `foreach` 与多维数组**√

```php
<?php
$users = [
    ["name" => "Alice", "age" => 25],
    ["name" => "Bob", "age" => 30],
    ["name" => "Charlie", "age" => 35]
];

foreach ($users as $user) {
    echo "Name: " . $user["name"] . ", Age: " . $user["age"] . "<br>";
}
?>
```

**输出:php**

```
Name: Alice, Age: 25
Name: Bob, Age: 30
Name: Charlie, Age: 35
```

------

### **2. PHP 与 HTML 混合使用**√

PHP 可以嵌入到 HTML 中，动态生成页面内容。以下是一些常见的用法示例。

#### **2.1 输出 HTML 内容**√

```php
<?php
$name = "John Doe";
echo "<h1>Welcome, $name!</h1>";
?>
```

**输出:**

```
<h1>Welcome, John Doe!</h1>
```

#### **2.2 在 HTML 表格中使用 PHP**√

```php
<?php
$users = [
    ["name" => "Alice", "age" => 25],
    ["name" => "Bob", "age" => 30],
    ["name" => "Charlie", "age" => 35]
];
?>

<table border="1">
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>
    <?php foreach ($users as $user): ?>
    <tr>
        <td><?php echo $user["name"]; ?></td>
        <td><?php echo $user["age"]; ?></td>
    </tr>
    <?php endforeach; ?>
</table>
```

**输出:**

```
| Name    | Age |
|---------|-----|
| Alice   | 25  |
| Bob     | 30  |
| Charlie | 35  |
```

#### **2.3 使用 PHP 处理表单数据 **√

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    echo "Hello, $name!";
}
?>

<form method="POST" action="">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name">
    <input type="submit" value="Submit">
</form>
```

**输出:**

```
输入姓名后点击提交，将输出：Hello, [输入的姓名]！
```

#### **2.4 在 HTML 中嵌入 PHP 代码**  √

```php
<?php
$pageTitle = "Welcome Page";
$year = date("Y");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
</head>
<body>
    <h1>Welcome to our site!</h1>
    <footer>
        <p>&copy; <?php echo $year; ?> Your Company. All Rights Reserved.</p>
    </footer>
</body>
</html>
```

**输出:**

```php
页面标题为 "Welcome Page"，并且显示当前年份。
```

------

### **3. 综合示例：使用 `foreach` 和 PHP 输出 HTML 表格**  √

```php
<?php
$employees = [
    ["name" => "John", "position" => "Manager", "salary" => 5000],
    ["name" => "Jane", "position" => "Developer", "salary" => 4000],
    ["name" => "Alex", "position" => "Designer", "salary" => 3500]
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee List</title>
    <style>
        table { width: 50%; margin: 20px auto; border-collapse: collapse; }
        th, td { padding: 8px 12px; border: 1px solid #ddd; text-align: center; }
    </style>
</head>
<body>
    <h1>Employee Information</h1>
    <table>
        <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
        </tr>
        <?php foreach ($employees as $employee): ?>
        <tr>
            <td><?php echo $employee["name"]; ?></td>
            <td><?php echo $employee["position"]; ?></td>
            <td><?php echo "$" . number_format($employee["salary"], 2); ?></td>
        </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
```

**输出：**

```
一个包含员工信息的表格，列出每个员工的姓名、职位和薪资。
```

------

### 总结

1. **`foreach` 循环**：用于简化对数组和对象的遍历，特别是当你需要处理大量数据时。
2. **PHP 在 HTML 中使用**：PHP 可以嵌入到 HTML 中动态生成页面内容，通常用于表单处理、数据展示等场景。



### ===================

### **1. PHP 冒泡排序 (Bubble Sort) **√

冒泡排序是一种简单的排序算法，通过重复比较相邻的元素，并根据大小交换位置来排序数组。

#### **代码示例：冒泡排序**

```php
<?php
function bubbleSort($array) {
    for ($i = 0; $i < count($array) - 1; $i++) {
        for ($j = 0; $j < count($array) - 1 - $i; $j++) {
            if ($array[$j] > $array[$j + 1]) {
                $temp = $array[$j];
                $array[$j] = $array[$j + 1];
                $array[$j + 1] = $temp;
            }
        }
    }

    return $array;
}

// 测试数组
$numbers = [64, 34, 25, 12, 22, 11, 90];
$sortedNumbers = bubbleSort($numbers);

echo "Sorted Array: " . implode(", ", $sortedNumbers);
?>
```

**输出:**

```
Sorted Array: 11, 12, 22, 25, 34, 64, 90
```

------

### **2. PHP 99 乘法表** √

99 乘法表是经典的编程练习，用嵌套循环输出乘法表。

#### **代码示例：九九乘法表**

```php
for ($i = 1; $i <= 9; $i++) {
    for ($j = 1; $j <= $i; $j++) {
        echo "$j x $i = " . ($i * $j) . "\t";
    }

    echo "\n";
}
```

#### **说明：**

- **HTML 表格** 用于美观显示。
- 外层循环控制乘数 `$i`，从 1 到 9。
- 内层循环控制被乘数 `$j`，从 1 到当前 `$i`。

**输出:** 一个格式化的 99 乘法表：

```
1 × 1 = 1
1 × 2 = 2   2 × 2 = 4
1 × 3 = 3   2 × 3 = 6   3 × 3 = 9
...
```



### =====================

### 01 √

```php
return response()->json([
    'status' => 'success',
    'data' => [
        'id' => 1,
        'name' => 'John Doe',
        'email' => 'john@example.com',
    ]
], 200);
```

### 02 √

```php
<?php
$counter = 0;

while (true) {
    $counter++;

    // 如果计数器是偶数，跳过本次循环
    if ($counter % 2 == 0) {
        echo "Skipping even number: $counter\n";
        continue;
    }

    // 打印奇数
    echo "Processing odd number: $counter\n";

    // 如果计数器达到或超过10，退出循环
    if ($counter >= 10) {
        echo "Counter has reached $counter, exiting loop.\n";
        break;
    }
}
```

输出示例

```
Processing odd number: 1
Skipping even number: 2
Processing odd number: 3
Skipping even number: 4
Processing odd number: 5
Skipping even number: 6
Processing odd number: 7
Skipping even number: 8
Processing odd number: 9
Counter has reached 10, exiting loop.
```



### ===========

### **1. 字符串分割 (`split`)**

PHP 提供了以下函数来分割字符串：

#### **`explode()`**

将字符串按指定的分隔符分割成数组。

```php
$string = "apple,banana,cherry";
$array = explode(",", $string);
print_r($array);
```

**输出：**

```
Array
(
    [0] => apple
    [1] => banana
    [2] => cherry
)
```

#### **`str_split()`**

将字符串按固定长度分割成数组。

```php
$string = "abcdef";
$array = str_split($string, 2); // 每2个字符分割一次
print_r($array);
```

**输出：**

```
Array
(
    [0] => ab
    [1] => cd
    [2] => ef
)
```

#### **`preg_split()`**

使用正则表达式分割字符串。

```php
$string = "apple123banana456cherry";
$array = preg_split("/\d+/", $string);
print_r($array);
```

**输出：**

```
Array
(
    [0] => apple
    [1] => banana
    [2] => cherry
)
```

------

### **2. 字符串截取 (`substr`)**

PHP 提供了 `substr()` 函数来截取字符串的一部分。

#### **基本用法**

```php
$string = "Hello, world!";
$substring = substr($string, 7, 5); // 从索引7开始截取5个字符
echo $substring; // 输出：world
```

#### **从字符串末尾开始截取**

```php
$string = "Hello, world!";
$substring = substr($string, -6, 5); // 从倒数第6个字符开始截取5个字符
echo $substring; // 输出：world
```

#### **不指定长度（截取到末尾）**

```php
$string = "Hello, world!";
$substring = substr($string, 7); // 从索引7开始，截取到末尾
echo $substring; // 输出：world!
```

------

### **总结**

- 分割字符串

  ：

  - 使用 `explode()` 按分隔符分割字符串。
  - 使用 `str_split()` 按固定长度分割字符串。
  - 使用 `preg_split()` 根据正则表达式分割字符串。

- 截取字符串

  ：

  - 使用 `substr()` 根据起始位置和长度截取字符串。

### ==============

###  **使用 `strrev()` 函数**

`strrev()` 是 PHP 内置函数，用于直接反转字符串。

#### 示例代码：

```php
$input = "hello";
$reversed = strrev($input);
echo $reversed; // 输出：olleh
```



```php
$input = "你好，世界"; // 多字节字符
$array = mb_str_split($input); // 将字符串拆分成数组
$reversedArray = array_reverse($array); // 反转数组
$reversed = implode("", $reversedArray); // 重新拼接成字符串
echo $reversed; // 输出：界世，好你
```



```php
$array = ["a" => 1, "b" => 2, "c" => 3];

if (array_key_exists("b", $array)) {
    echo "键 'b' 存在于数组中。";
} else {
    echo "键 'b' 不存在于数组中。";
}
```



```php
$array = ["a" => 1, "b" => null, "c" => 3];

if (isset($array["b"])) {
    echo "键 'b' 存在且值不为 null。";
} else {
    echo "键 'b' 不存在或值为 null。";
}
```



```php
$array = [1, "2", 3];

if (in_array(2, $array, true)) {
    echo "值 2 存在于数组中（严格类型比较）。";
} else {
    echo "值 2 不存在于数组中（严格类型比较）。";
}
```



```php
$array = [1, 2, 3, 4, 5];

if (in_array(3, $array)) {
    echo "值 3 存在于数组中。";
} else {
    echo "值 3 不存在于数组中。";
}
```



```php
$string = "hello";
if (count(array_unique(str_split($string))) < strlen($string)) {
    echo "有重复字符";
} else {
    echo "没有重复字符";
}
```

