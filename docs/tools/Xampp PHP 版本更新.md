---
id: xampp-php-version-update
slug: /xampp-php-version-update
title: Xampp PHP 版本更新
date: 2024-03-21
authors: Hoo
tags: [工具]
keywords: [工具]
---

:::success 前文

更新 XAMPP 中 PHP 版本的详细步骤如下：

::: 

### 步骤 1：下载新版本的 PHP

1. 打开 [**PHP 官方下载页面**](https://www.php.net/downloads.php)。
2. 根据你的操作系统选择相应的 PHP 版本，确保下载适合 XAMPP 的“线程安全 (Thread Safe)”的 ZIP 压缩包。
   - 如果使用的是 Windows 系统，通常下载“Windows x64”或“Windows x86”版本。
3. 下载完成后，将 ZIP 文件解压到一个临时文件夹中备用。

### 步骤 2：备份旧的 PHP 文件

1. 打开 XAMPP 安装目录（通常是 `C:\xampp`）。

2. 找到其中的 `php` 文件夹，例如 `C:\xampp\php`。

3. 为了备份旧版本，将 

   ```
   php
   ```

    文件夹重命名为 

   ```
   php_old
   ```

   （或其他你喜欢的名称，如 

   ```
   php_backup
   ```

   ）。

   - 这一步确保旧的 PHP 文件不会丢失，并且可以随时恢复。

### 步骤 3：复制新 PHP 文件到 XAMPP

1. 将刚才解压出来的新 PHP 文件夹内容全部复制。
2. 在 XAMPP 安装目录下创建一个新的 `php` 文件夹，例如 `C:\xampp\php`。
3. 将新 PHP 文件夹的所有文件粘贴到这个 `php` 文件夹中。

### 步骤 4：更新 `php.ini` 配置文件

1. 在新的 `php` 文件夹内找到并打开 `php.ini-development` 或 `php.ini-production` 文件。

2. 将文件重命名为 `php.ini`。

3. 如果需要，可以根据之前旧版本中的 

   ```
   php_old\php.ini
   ```

    文件配置来调整新的 

   ```
   php.ini
   ```

   ，例如修改：

   - `max_execution_time`：脚本执行的最大时间。
   - `memory_limit`：PHP 允许的最大内存使用量。
   - `upload_max_filesize`：允许上传的最大文件大小。

### 步骤 5：更新 Apache 配置文件（可选）

1. 打开 `C:\xampp\apache\conf\extra` 目录。

2. 找到并编辑 `httpd-xampp.conf` 文件。

3. 查找 

   ```
   LoadModule php_module
   ```

    的配置行，确保指向新版本 PHP 的路径，例如：

   ```
   LoadModule php_module "C:/xampp/php/php8apache2_4.dll"
   ```

   - 需要保证新 PHP 文件夹中包含的 `.dll` 文件和 Apache 的版本兼容。

### 步骤 6：重启 XAMPP

1. 打开 XAMPP 控制面板。
2. 点击“Stop”停止 Apache 服务，然后再点击“Start”重新启动 Apache。
3. 检查 Apache 是否正常运行，没有报错信息。

### 步骤 7：验证 PHP 版本

1. 在 XAMPP 的 `htdocs` 目录（例如 `C:\xampp\htdocs`）中新建一个 `phpinfo.php` 文件。

2. 在文件中输入以下内容：

   ```
   <?php
   phpinfo();
   ```

3. 在浏览器中访问 `http://localhost/phpinfo.php`，检查 PHP 信息页面是否显示为你安装的新版本。

### 额外提示

- **旧版本恢复**：如果更新有问题，你可以删除新的 `php` 文件夹，将 `php_old` 文件夹重命名回 `php`，再重启 Apache。
- **Apache 配置文件备份**：修改 `httpd-xampp.conf` 前，最好备份一份原文件。

完成这些步骤后，你的 XAMPP 将使用新版本的 PHP！