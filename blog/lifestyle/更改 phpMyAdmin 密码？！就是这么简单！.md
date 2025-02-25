---
slug: phpmyadmin-how-change-password
title: 更改 phpMyAdmin 密码？！就是这么简单！(ง •_•)ง
date: 2024-11-7
authors: Hoo
tags: [闲聊, mysql]
keywords: [闲聊, mysql]
description: 这篇教程详细介绍如何在phpMyAdmin中更改密码，提供清晰的分步骤指导，包括登录、设置新密码、保存以及配置文件更新等操作，帮助你快速、安全地完成密码修改。
image: https://github.com/HoowcBN/techdocs_pic/blob/main/d9030a5696d2507a1dfb38a686ac93c2.jpg?raw=true
---



嘿，代码侠们！今天我们要搞定一个看似高深但其实一点都不难的任务：如何在phpMyAdmin里更改数据库密码！是不是觉得有点小紧张？放心，过程很简单，不会比在超市选一袋薯片难（有时那才叫纠结呢）。跟我一步步操作，你很快就能掌握这个“超级大招”了！(ง •_•)ง

<!-- truncate -->

# 【究极指南】轻松更改phpMyAdmin密码！(｡•̀ᴗ-)✧



## Step 1：打开 phpMyAdmin，先打个招呼吧！

首先，我们得找到phpMyAdmin！在本地服务器上，你可以输入 `http://localhost/phpmyadmin` 打开它。如果是远程服务器，可能得用指定的URL。

### 登录提示

进入phpMyAdmin后，你会被要求输入用户名和密码。一般来说，默认用户名是 `root`，默认密码为空，但有时候管理员可能已经给它设了个密码——所以，遇到这种情况，不要惊讶，直接问问设置的管理员就好 (⊙_⊙)？

> 如果你连现有的密码都不记得，那这篇文章可能能帮你半点忙都没有了！（快去翻一下密码本或问问负责这块的技术小伙伴吧！）

## Step 2：找到你的“用户账号”（User Accounts）

登录成功后，你会进入phpMyAdmin的主界面，别被一大堆选项迷惑，我们今天只关心一件事：找到**“User accounts”**（用户账户）选项卡。

点击这个选项卡，页面会列出所有数据库的用户账号，包括用户名、主机、权限等信息。通常来说，我们的主要用户是`root`，也就是数据库的“最高权限大佬”。所以，接下来我们要专门照顾一下这个“老大”。

## Step 3：选择你要修改密码的用户

在“User accounts”里找到**`root`**用户，或其他你要修改密码的用户，然后在它的旁边有一个**“Edit privileges”**（编辑权限）按钮，点进去吧！（是时候面对权力的滋味了 ( •̀ ω •́ )✧）

## Step 4：准备好新密码！进入“更改密码”界面

进入用户编辑界面后，向下滚动，你会看到一个叫 **“Change password”**（更改密码）的选项区域。点击它！这里就是我们设置新密码的地方啦~

### 密码设置Tips：

1. **牢记新密码**。不要随便设置什么`123456`或`password`之类的“摆设密码”，这简直在邀请黑客来探访呀！不妨考虑一个复杂一点的组合，比如 `mYp@55w0Rd2023!`（参考就好，别用同样的哦~）。
2. **强密码搭配**：字母、数字、符号一起上，增强安全性！一个强大的密码大概就像锁着的保险柜，打开它可没那么容易。
3. **记下来！** 如果你平时“健忘症”发作，不妨记录在安全的地方。密码管理器软件也可以考虑哦！（怕丢密码的童鞋有福了 (￣︶￣)）

## Step 5：保存修改，享受你的成果！

设置完新密码后，点击页面下方的 **“Go”**（执行）按钮，phpMyAdmin会自动保存新密码！这样，我们就完成了phpMyAdmin密码的更改~ 简单吧？(o＾▽＾o)/

> **小提醒**：有些朋友在改完密码后可能会直接跳过保存步骤，记得这步非常重要，少了这一步可就白忙活了哦~

## Step 6：更新配置文件（config.inc.php）

这一步仅限于如果你修改了 `root` 用户密码 **并且** phpMyAdmin 在你的本地服务器上无法自动识别你的新密码。那么，就需要手动更新你的配置文件了！

### 如何更新配置文件？

1. **找到你的config.inc.php文件**：一般在`phpmyadmin`文件夹下能找到它。打开文件，找到类似 `$cfg['Servers'][$i]['password']` 的行。
2. **更改密码**：把你刚才设置的新密码填写进去（像这样：`$cfg['Servers'][$i]['password'] = '你的新密码';`）。
3. **保存文件**：保存后，重新启动phpMyAdmin，尝试用新密码登录。

如果成功登录，那就一切OK了！如果还是有问题，可能要检查一下文件权限，确保config.inc.php允许phpMyAdmin正常访问。

## 额外提示：还可以在命令行里更改密码！

要是觉得在phpMyAdmin界面里设置不够“带劲儿”，你还可以用命令行更改密码：

```bash
mysql -u root -p
```

输入现有的`root`密码后，接着输入以下命令来更改密码：

```bash
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '你的新密码';
FLUSH PRIVILEGES;
```

然后退出即可！这方法对命令行用户来说非常快捷（也显得技术范儿十足！(｡•̀ᴗ-)✧）

------

## 最后的小贴士 (❁´◡`❁)

1. **牢记新密码**：为了防止“登录恐惧症”找上门，一定要记好你的新密码哦！
2. **定期更改密码**：尤其是数据库管理员账号，建议隔段时间更改一次密码，保持安全习惯~
3. **使用强密码生成器**：如果还是不知道该怎么选个合适的密码，可以试试密码生成器，随机生成的密码往往更难被破解。

搞定啦！以上就是更改phpMyAdmin密码的详细流程，是不是比想象中简单多了？希望这篇教程能帮到你，记得动手实践，才能真正掌握哦！ ￣︶￣∗￣︶￣*￣︶￣∗)