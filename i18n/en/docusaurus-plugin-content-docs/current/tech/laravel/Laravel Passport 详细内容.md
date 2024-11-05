---
id: laravel-passport
slug: /laravel-passport
title: Passport
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

## Laravel Passport

[Laravel 10 RESTful APIs with Passport Authentication Installing website](https://onlinewebtutorblog.com/laravel-10-rest-apis-with-passport-authentication/)

*Passport Mode Introduction*

```
->Authorization Code Grant: x
grant_type=authorization_code
In the interaction between the client and the resource owner, the access token is obtained through the authorization code issued by the authorization server.

->Implicit Grant: x
grant_type=implicit
Access token is obtained directly on the client, which is suitable for some front-end applications, such as single-page applications (SPA).

->Password Grant: ✓
grant_type=password
The user directly provides the username and password, which is suitable for trusted clients and user-trusted scenarios.

->Client Credentials Grant: x
grant_type=client_credentials
Applicable to scenarios where the client itself is not a specific user, and the client uses its own credentials to obtain the access token directly from the authorization server.

->Refresh Token Grant: x
grant_type=refresh_token
Use the refresh token to obtain a new access token, which is suitable for scenarios with long-term validity.
```

### Install Passport

```
composer require laravel/passport  --with-all-dependencies
```

```
php artisan migrate 
```

### generate

`passport:install` is used to initialize Laravel Passport and set up the necessary database and data

`passport:keys` is used to generate Passport encryption keys

`passport:client` is used to create an OAuth client. These commands combined make it easier and more convenient to implement OAuth authentication in Laravel applications.

```
php artisan passport:install
```

```
php artisan passport:keys
```

```
php artisan passport:client
```

### Using the Token API

##### Example:

```
public function login(Request $request)
{
    $loginData = $request->only('email', 'password');

    if (Auth::attempt($loginData)) {
        $user = User::where('email', $request->email)->first();
        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->accessToken;

        return response([
            'message' => 'Login successfully',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    return response([
        'message' => 'Login failed. Please verify your email and password'
    ], 401);
}
```

*Usually used with OAuth 2.0*