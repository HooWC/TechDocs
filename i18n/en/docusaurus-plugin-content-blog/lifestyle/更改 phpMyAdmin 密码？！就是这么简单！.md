---
slug: phpmyadmin-how-change-password
title: Change phpMyAdmin password?! It's that easy! (ง •_•)ง
date: 2024-11-7
authors: Hoo
tags: [Small talk, mysql]
keywords: [Small talk, mysql]
description: This tutorial details how to change your password in phpMyAdmin, providing clear step-by-step instructions, including logging in, setting a new password, saving, and updating the configuration file, to help you complete the password change quickly and securely.
image: https://github.com/HoowcBN/techdocs_pic/blob/main/d9030a5696d2507a1dfb38a686ac93c2.jpg?raw=true
---



Hey, coders! Today we are going to tackle a task that seems advanced but is actually not difficult at all: how to change the database password in phpMyAdmin! Are you feeling a little nervous? Don't worry, the process is simple, no more difficult than choosing a bag of potato chips in the supermarket (sometimes that's what you call tangled). Follow me step by step, and you will soon master this "super trick"! (ง •_•)ง

<!-- truncate -->

# 【Ultimate Guide】Easily change the phpMyAdmin password! (｡•̀ᴗ-)✧



## Step 1: Open phpMyAdmin and say hello!

First, we need to find phpMyAdmin! On a local server, you can open it by typing `http://localhost/phpmyadmin`. If it is a remote server, you may have to use a specific URL.

### Login prompt

Once you enter phpMyAdmin, you will be asked to enter your username and password. Generally, the default username is `root` and the default password is blank, but sometimes the administrator may have set a password for it - so if you encounter this situation, don't be surprised, just ask the administrator who set it up (⊙_⊙)?

> If you don't even remember your current password, this article may not be able to help you at all! (Go check your password book or ask the technical partner in charge of this!)

## Step 2: Find your "User Accounts"

After logging in successfully, you will enter the main interface of phpMyAdmin. Don't be confused by a lot of options. Today we only care about one thing: find the **"User accounts"** tab.

Click this tab, and the page will list all the user accounts of the database, including username, host, permissions and other information. Generally speaking, our main user is `root`, which is the "highest authority boss" of the database. So, next we have to take special care of this "boss".

## Step 3: Select the user you want to change the password

In "User accounts", find the **`root`** user, or other users whose passwords you want to change, and then there is a **"Edit privileges"** button next to it, click it! (It's time to face the taste of power ( •̀ ω •́ )✧)

## Step 4: Prepare a new password! Enter the "Change Password" interface

After entering the user editing interface, scroll down and you will see an option area called **"Change password"**. Click it! This is where we set a new password~

### Password setting tips:

1. **Remember the new password**. Don't just set a "decorative password" like `123456` or `password`, which is simply inviting hackers to visit! Consider a more complex combination, such as `mYp@55w0Rd2023!` (just for reference, don't use the same one~).
2. **Strong password combination**: letters, numbers, and symbols together to enhance security! A strong password is probably like a locked safe, it's not that easy to open it.
3. **Write it down! ** If you usually have "amnesia", you might as well record it in a safe place. You can also consider password manager software! (Those who are afraid of losing their passwords are in luck (￣︶￣))

## Step 5: Save the changes and enjoy your achievements!

After setting the new password, click the **"Go"** (execution) button at the bottom of the page, and phpMyAdmin will automatically save the new password! In this way, we have completed the change of phpMyAdmin password~ Simple, right? (o＾▽＾o)/

> **Reminder**: Some friends may skip the save step directly after changing the password. Remember this step is very important. If you miss this step, you will be busy in vain~

## Step 6: Update the configuration file (config.inc.php)

This step is only limited to if you have changed the `root` user password **and** phpMyAdmin cannot automatically recognize your new password on your local server. Then, you need to manually update your configuration file!

### How to update the configuration file?

1. **Find your config.inc.php file**: Generally, you can find it in the `phpmyadmin` folder. Open the file and find the line that looks like `$cfg['Servers'][$i]['password']`.
2. **Change password**: Fill in the new password you just set (like this: `$cfg['Servers'][$i]['password'] = 'your new password';`).
3. **Save the file**: After saving, restart phpMyAdmin and try to log in with the new password.

If you log in successfully, then everything is OK! If you still have problems, you may need to check the file permissions to make sure config.inc.php allows phpMyAdmin to access normally.

## Extra tip: You can also change the password in the command line!

If you think setting it in the phpMyAdmin interface is not "exciting" enough, you can also change the password from the command line:

```bash
mysql -u root -p
```

After entering the existing `root` password, enter the following command to change the password:

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your new password';
FLUSH PRIVILEGES;
```

Then exit! This method is very quick for command line users (and also looks very technical! (｡•̀ᴗ-)✧)

------

## Final tips (❁´◡`❁)

1. **Remember your new password**: To prevent "login phobia" from coming to you, be sure to remember your new password!
2. **Change passwords regularly**: Especially for database administrator accounts, it is recommended to change passwords every once in a while to maintain a safe habit~
3. **Use a strong password generator**: If you still don’t know how to choose a suitable password, you can try a password generator. Randomly generated passwords are often more difficult to crack.

Done! The above is the detailed process of changing the phpMyAdmin password. Is it much simpler than you think? I hope this tutorial can help you. Remember to practice it to truly master it! *￣︶￣∗)