---
id: xampp-php-version-update
slug: /xampp-php-version-update
title: Xampp PHP version update
date: 2024-03-21
authors: Hoo
tags: [tool]
keywords: [tool]
---

:::success Previous

The detailed steps to update the PHP version in XAMPP are as follows:

::: 

### Step 1: Download the new version of PHP

1. Open  [**PHP official download page**](https://www.php.net/downloads.php)。
2. Choose the appropriate PHP version for your operating system, making sure to download the "Thread Safe" ZIP archive for XAMPP.
- If you are using Windows, usually download the "Windows x64" or "Windows x86" version.
3. After downloading, extract the ZIP file to a temporary folder for later use.

### Step 2: Back up old PHP files

1. Open the XAMPP installation directory (usually `C:\xampp`).

2. Find the `php` folder in it, for example `C:\xampp\php`.

3. To back up the old version, copy

   ```
   php
   ```

    Rename the folder to 

   ```
   php_old
   ```

   (or any other name you like, such as

   ```
   php_backup
   ```

   ）.

   - This step ensures that old PHP files are not lost and can be restored at any time.

### Step 3: Copy the new PHP files to XAMPP

1. Copy all the contents of the new PHP folder you just unzipped.

2. Create a new `php` folder in the XAMPP installation directory, for example `C:\xampp\php`.

3. Paste all the files in the new PHP folder into this `php` folder.

### Step 4: Update the `php.ini` configuration file

1. Find and open the `php.ini-development` or `php.ini-production` file in the new `php` folder.

2. Rename the file to `php.ini`.

3. If necessary, you can rename it according to the previous version

   ```
   php_old\php.ini
   ```

    File configuration to adjust the new 

   ```
   php.ini
   ```

   , for example, modify:

- `max_execution_time`: the maximum time for script execution.

- `memory_limit`: the maximum memory usage allowed by PHP.

- `upload_max_filesize`: the maximum file size allowed for upload.

### Step 5: Update Apache configuration files (optional)

1. Open the `C:\xampp\apache\conf\extra` directory.

2. Find and edit the `httpd-xampp.conf` file.

3. Find

   ```
   LoadModule php_module
   ```

    config line, making sure it points to the path to the new version of PHP, for example:

   ```
   LoadModule php_module "C:/xampp/php/php8apache2_4.dll"
   ```

  - You need to ensure that the `.dll` files contained in the new PHP folder are compatible with the version of Apache.

### Step 6: Restart XAMPP

1. Open the XAMPP control panel.
2. Click "Stop" to stop the Apache service, and then click "Start" to restart Apache.
3. Check if Apache is running properly and there are no errors.

### Step 7: Verify PHP version

1. Create a new `phpinfo.php` file in the `htdocs` directory of XAMPP (for example, `C:\xampp\htdocs`).

2. Enter the following content in the file:

   ```
   <?php
   phpinfo();
   ```

3. Visit `http://localhost/phpinfo.php` in your browser and check if the PHP information page shows the new version you installed.

### Additional Tips

- **Restore from old version**: If there is a problem with the update, you can delete the new `php` folder, rename the `php_old` folder back to `php`, and restart Apache.
- **Apache configuration file backup**: Before modifying `httpd-xampp.conf`, it is best to back up the original file.

After completing these steps, your XAMPP will use the new version of PHP!