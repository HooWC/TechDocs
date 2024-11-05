---
slug: restful-api-url-definition
title: Thoughts on Restful Api path definition
date: 2024-10-24
authors: Hoo
tags: [Small talk, restful api]
keywords: [Small talk, restful api]
description: This article shares the author's experience and insights in using Rest Api.
image: https://github.com/HoowcBN/techdocs_pic/blob/main/restful-api-blog.jpg?raw=true
---

Have you ever spent the night wrestling with your code, wondering how to get your applications to talk to each other? Then you might want to get to know the RESTful API! It’s like a friendly translator on the web, helping programs talk to each other without having to worry about language barriers.

<!-- truncate -->

## Thinking and practice of RESTful API design

`RESTful API`, as an important part of modern web applications, has become an indispensable standard for developers to design interfaces. Although discussions about its design principles are common, following these principles can significantly improve the consistency and maintainability of APIs. Below, I will share some thoughts and practical experience on the `RESTful API` style.

## Thinking about designing API interfaces

Let's explore a specific scenario: how to design API interfaces related to users. Here are some common operations:

- Get a list of users
- View user details
- Add a new user
- Update a user
- Delete a user
- View a user's products
- View other users' products

Usage:

- Query users: `GET /users`
- View user details: `GET /users/:id`
- Create a user: `POST /users/`
- Update a user: `PUT /users/:id`
- Delete a user: `DELETE /users/:id`

Here is an explanation of these API interfaces to help you better understand their functions and design concepts:

1. **Query users: `GET /users`**
- **Function**: This interface is used to get a list of all users. It usually returns an array of user objects containing basic information about each user.
- **HTTP method**: The GET method is used to request data without making changes to resources on the server.
2. **View User Details: `GET /users/:id`**
- **Function**: This interface returns detailed information about a user by specifying a user ID (`:id` is a placeholder for a specific user ID). The details usually include the user's name, email, registration date, etc.
- **HTTP Method**: Also use the GET method to get information about a specific user.
3. **Create User: `POST /users/`**
- **Function**: This interface is used to create a new user. The body of the request should contain the necessary information of the new user, such as name, email, password, etc. After successful creation, the server usually returns the ID or other relevant information of the new user.
- **HTTP Method**: The POST method is used to send data to the server, which usually causes a change in the resource status on the server (for example, creating a new user).
4. **Update User: `PUT /users/:id`**
- **Function**: This interface is used to update the information of an existing user by specifying a user ID. The body of the request should contain the fields to be updated and their new values. For example, the user's email or name can be updated.
- **HTTP method**: The PUT method is used to replace the current representation of a resource, which usually means updating the entire resource.
5. **Delete user: `DELETE /users/:id`**
- **Function**: This interface is used to delete the user by specifying the user ID. After deletion, the user's information will no longer exist in the system.
- **HTTP method**: The DELETE method is used to request the deletion of resources, indicating that you want the server to delete the specified user.

The design of these interfaces follows the principles of RESTful API, emphasizing the clear representation and operation of resources, making the interaction between the client and the server more intuitive and consistent.

------

The following is the code structure of my C# using `Restful API`:

```js
public class UserApi
{
    const string baseUrl = "http://hoochin-001-site1.itempurl.com/api/"; // URL for the Restful API
    HttpClient client = new HttpClient();

    // Get all users
    public async Task<List<User>> GetAllUser()
    {
        string jsonStr = await client.GetStringAsync(baseUrl + "User");
        return JsonConvert.DeserializeObject<List<User>>(jsonStr);
    }

    // Find a specific user
    public async Task<User> FindUser(int id)
    {
        var jsonStr = await client.GetStringAsync(baseUrl + "User/" + id);
        return JsonConvert.DeserializeObject<User>(jsonStr);
    }

    // Edit user
    public async Task EditUser(User user)
    {
        var jsonStr = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
        await client.PutAsync(baseUrl + "User/" + user.Id, jsonStr);
    }

    // Delete user
    public async Task DeleteUser_Admin(int id)
    {
        await client.DeleteAsync(baseUrl + "User/" + id);
    }

    // Create new user
    public async Task UserCreateDat(User user)
    {
        var jsonStr = new StringContent(JsonConvert.SerializeObject(user), Encoding.UTF8, "application/json");
        await client.PostAsync(baseUrl + "User", jsonStr);
    }
}
```

The following is my code structure using Laravel + Restful Api:

```php
// Get all users
public function index()
{
    return User::all();
}

// Create a new user
public function store(UserRequest $request)
{
    User::create($request->all());
    return true;
}

// Display a specific user
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

// Update user
public function update(UserRequest $request)
{
    $user_id = $request->input('user_id');
    $user = User::find($user_id);
    $updateData = $request->only('name', 'email');
    return $user->update($updateData);
}

// Delete user
public function destroy(UserRequest $request)
{
    // Prevent using delete function
    // Only allow the user to block their account
    $user_id = $request->input('user_id');
    $user = User::find($user_id);
    return $user->delete();
}
```

In today's digital age, the presence of users on various online platforms has become increasingly important. Whether it is social media, e-commerce websites or online games, user accounts are more than just an identity, they carry users' personal information, history and social relationships. Therefore, the issue of how to deal with inactive or illegal user accounts, especially the choice between deletion and blocking, is worth our in-depth discussion.

**I. The shortcomings of deleting user accounts**

First, there are many shortcomings in deleting user accounts. Each user's account contains a large amount of personal data, which may include the user's purchase history, social interaction records, uploaded content, etc. Once deleted, this information cannot be restored, which not only affects the user experience, but may also cause data loss to the platform itself.

Secondly, users may temporarily leave a platform for various reasons, such as life pressure, busy work or short-term interest transfer. In this case, directly deleting the user account may cause users to lose contact with the platform and even hinder their future return. Users may want to use the platform again in the future, and a deleted account means that they need to re-register and lose all previous data and connections.

**II. The advantages of blocking user accounts**

In contrast, blocking user accounts instead of deleting them provides more flexibility and inclusiveness. When a user needs to limit his account due to violation of regulations or other reasons, blocking is a more appropriate option. By blocking the account, the platform can take necessary measures to maintain a healthy environment in the community without depriving the user of history and data.

Blocking the account allows users to have the opportunity to review their behavior in the future and restore their account after complying with the platform rules. This approach not only reflects respect for users, but also provides them with an opportunity to correct their behavior. After realizing that their behavior is inappropriate, users may be willing to change themselves and reintegrate into the community.

**Three, maintain community and user relationships**

Blocking accounts also helps maintain the overall community atmosphere of the platform. By restricting inappropriate behavior, the platform can better protect the experience of other users without completely erasing a violating user. This approach can establish a more positive user culture, let users understand that their behavior affects others, and motivate them to comply with the platform's regulations.

In addition, blocking accounts provides a better management mechanism for the platform. In some cases, the platform may want to observe certain users and understand their behavior patterns. Blocking rather than deleting can provide such a possibility for the platform to help it conduct data analysis and community management.

**IV. Conclusion**

To sum up, deleting user accounts is often an extreme solution, while blocking user accounts provides a more flexible way of handling. In today's information-based context, we should value the existence and contribution of each user, take measures to protect their rights, and maintain the healthy development of the community. Blocking accounts can not only effectively deal with inappropriate behavior, but also leave a door for users to rejoin the community in the future. In this way, we can protect the platform while respecting and understanding every user and promoting a more positive and harmonious online environment.