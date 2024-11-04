---
slug: restful-api-url-definition
title: 关于 Restful Api 路径定义的思考
date: 2024-10-24
authors: Hoo
tags: [闲聊, restful api]
keywords: [闲聊, restful api]
description: 这篇文章分享了作者使用Rest Api的心得和体会。
image: https://github.com/HoowcBN/techdocs_pic/blob/main/restful-api-blog.jpg?raw=true
---

你是否曾经在深夜与程序代码斗智斗勇，想知道怎样让你的应用程序顺利交流？那你可能需要认识一下 RESTful API！它就像网络世界里的一个友好翻译官，负责让各种程序能顺畅对话，而不用担心语言不通。

<!-- truncate -->

## RESTful API 设计的思考与实践

`RESTful API` 作为现代 web 应用程序的重要组成部分，已经成为开发者设计接口时不可或缺的标准。尽管关于其设计原则的讨论屡见不鲜，遵循这些原则可以显著提升 API 的一致性与可维护性。下面，我将分享一些关于 `RESTful API` 风格的思考与实践经验。

## 设计 API 接口的思考

我们来探讨一个具体的场景：如何设计与用户相关的 API 接口。以下是一些常见的操作：

- 获取用户列表
- 查看用户详情
- 新增用户
- 更新用户
- 删除用户
- 查看用户的产品
- 查看其他用户的产品

使用：

- 查询用户：`GET /users`
- 查看用户详情：`GET /users/:id`
- 创建用户：`POST /users/`
- 更新用户：`PUT /users/:id`
- 删除用户：`DELETE /users/:id`

以下是对这些 API 接口的解释，帮助你更好地理解它们的功能和设计理念：

1. **查询用户：`GET /users`**
   - **功能**：这个接口用于获取所有用户的列表。它通常会返回一个用户对象的数组，包含每个用户的基本信息。
   - **HTTP 方法**：GET 方法用于请求数据，而不会对服务器上的资源进行更改。
2. **查看用户详情：`GET /users/:id`**
   - **功能**：通过指定的用户 ID (`:id` 是一个占位符，表示具体的用户 ID)，此接口返回该用户的详细信息。详细信息通常包括用户的姓名、电子邮件、注册日期等。
   - **HTTP 方法**：同样使用 GET 方法来获取特定用户的信息。
3. **创建用户：`POST /users/`**
   - **功能**：此接口用于创建一个新的用户。请求的主体中应包含新用户的必要信息，例如姓名、电子邮件、密码等。创建成功后，服务器通常会返回新用户的 ID 或其他相关信息。
   - **HTTP 方法**：POST 方法用于发送数据到服务器，通常会导致服务器上的资源状态发生变化（例如，创建新用户）。
4. **更新用户：`PUT /users/:id`**
   - **功能**：通过指定的用户 ID，此接口用于更新现有用户的信息。请求的主体应包含要更新的字段及其新值。例如，可以更新用户的电子邮件或姓名。
   - **HTTP 方法**：PUT 方法用于替换资源的当前表示，通常意味着对整个资源进行更新。
5. **删除用户：`DELETE /users/:id`**
   - **功能**：通过指定的用户 ID，此接口用于删除该用户。删除后，该用户的信息将不再存在于系统中。
   - **HTTP 方法**：DELETE 方法用于请求删除资源，表示希望服务器删除指定的用户。

这些接口的设计遵循 RESTful API 的原则，强调资源的清晰表示和操作，使得客户端与服务器之间的交互更加直观和一致。

------

以下是我在 C# 使用 `Restful API` 的代码结构：

```js
public class UserApi
{
	const string baseUrl = "http://hoochin-001-site1.itempurl.com/api/"; // Restful Api 的链接
	HttpClient client = new HttpClient();

	// 获取所有用户
	public async Task<List<User>> GetAllUser()
	{
		string jsonStr = await client.GetStringAsync(baseUrl + "User");
		return JsonConvert.DeserializeObject<List<User>>(jsonStr);
	}

	// 寻找某一个用户
	public async Task<User> FindUser(int id)
	{
		var jsonStr = await client.GetStringAsync(baseUrl + "User/" + id);
		return JsonConvert.DeserializeObject<User>(jsonStr);
	}

	// 修改用户
	public async Task EditUser(User user)
	{
		var jsonStr = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
		await client.PutAsync(baseUrl + "User/" + user.Id, jsonStr);
	}

	// 删除用户
	public async Task DeleteUser_Admin(int id)
	{
		await client.DeleteAsync(baseUrl + "User/" + id);
	}

	// 新增用户
	public async Task UserCreateDat(User user)
	{
		var jsonStr = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
		await client.PostAsync(baseUrl + "User", jsonStr);
	}
}
```

接下来是我使用 Laravel + Restful Api 的代码结构：

```php
// 获取所有用户
public function index()
{
    return User::all();
}

// 新增用户
public function store(UserRequest $request)
{
    User::create($request->all());
    return true;
}

// 显示某一个用户
public function show(string $id)
{
    $data = User::find($id);
    if ($data) {
        return $data;
    } else {
        return response()->json([
            'status' => false,
            'message' => 'User not found'
        ]);
    }
}

// 更新用户
public function update(UserRequest $request)
{
    $user_id = $request->input('user_id');
    $user = User::find($user_id);
    $updateData = $request->only('name', 'email');
    return $user->update($updateData);
}

// 删除用户
public function destroy(UserRequest $request)
{
    // 禁止使用 delete function
    // 只有让用户 block account 而已
    $user_id = $request->input('user_id');
    $user = User::find($user_id);
    return $user->delete();
}
```

在当今数字化时代，用户在各种在线平台上的存在变得愈发重要。无论是社交媒体、电子商务网站还是在线游戏，用户账户不仅仅是一个身份标识，它承载着用户的个人信息、历史记录和社交关系。因此，关于如何处理不活跃或违反规定的用户账号的问题，尤其是删除与封锁之间的选择，值得我们深入探讨。

**一、删除用户账号的缺陷**

首先，删除用户账号的做法存在诸多缺陷。每个用户的账号中都蕴藏着大量的个人数据，这些数据可能包括用户的购买历史、社交互动记录、上传的内容等。一旦删除，这些信息将无法恢复，这不仅影响到用户的体验，也可能对平台自身造成数据损失。

其次，用户可能会因为各种原因而暂时离开某个平台，例如生活压力、工作忙碌或是短暂的兴趣转移。在这种情况下，直接删除用户账号可能会导致用户失去与平台的联系，甚至阻碍他们未来的回归。用户可能在未来希望再次使用该平台，而一个被删除的账号意味着他们需要重新注册，失去之前的所有数据和连接。

**二、封锁用户账号的优势**

相比之下，将用户账号封锁而非删除，提供了更多的灵活性和包容性。当一个用户因违反规定或其他原因而需要限制其账号时，封锁是一个更为合适的选择。通过封锁账号，平台能够在不剥夺用户历史和数据的情况下，采取必要的措施以维护社区的健康环境。

封锁账号允许用户在未来有机会重新审视自己的行为，并在遵守平台规则后恢复其账号。这样的处理方式不仅体现了对用户的尊重，也为他们提供了改正的机会。用户在意识到自己的行为不当后，可能会愿意改变自己，重新融入社区。

**三、维护社区和用户关系**

封锁账号的做法也有助于维护平台的整体社区氛围。通过对不当行为进行限制，平台能够更好地保护其他用户的体验，同时又不至于让一个违规用户被完全抹去。这种方式可以建立一个更为正面的用户文化，让用户明白他们的行为会影响他人，并激励他们遵守平台的规定。

此外，封锁账号为平台提供了更好的管理机制。在一些情况下，平台可能希望对某些用户进行观察，了解其行为模式。封锁而不是删除，可以为平台提供这样的可能性，帮助其进行数据分析和社区管理。

**四、总结**

综上所述，删除用户账号往往是一种极端的解决方案，而封锁用户账号则提供了更为灵活的处理方式。在当今信息化的背景下，我们应该重视每个用户的存在与贡献，采取措施保护他们的权利，同时维护社区的健康发展。封锁账号不仅能有效应对不当行为，还能为用户留下一扇未来重新加入社区的大门。通过这种方式，我们可以在保护平台的同时，也能够尊重和理解每一个用户，促进更为积极和谐的在线环境。
