---
id: laravel-request
slug: /laravel-request
title: Request
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

## Request Writing

#### Basic Usage

```php
$request->validate([
    'authenticator_id' => ['required', 'integer', 'exists:authenticators,id'],
    'code' => ['required', 'digits:6'],
]);
```

```php
$request->validate([
    'name' => ['required', 'string', 'max:255'],
    'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
    'password' => ['required', 'confirmed', Rules\Password::defaults()],
]);
```

```php
$loginData = $request->only('email', 'password');

if (Auth::attempt($loginData))
```

```php
$userId = $request->input('user_id');
$user = User::find($userId);
```
#### File usage

##### Install Request file

```
php artisan make:request UserRequest
```

**Basic usage**

```php
public function authorize(): bool
{
    return true;
}

public function rules(): array
{
    return [
        'email' => ['required', 'string', 'email'],
        'password' => ['required', 'string'],
    ];
}

# error message
public function message()
{
	return [
		'email.required' => 'Please Press the email'
	]
}
```

##### Advanced usage CRUD

**Example 1:**

```php
public function authorize(): bool
{
    return true;
}

public function rules(): array
{
    switch ($this->method()) {
        case 'POST':
            return [
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'unique:users,email'],
                'password' => ['required', 'min:6', 'max:20']
            ];
        case 'PATCH':
            return [
                'user_id' => ['required', 'integer', 'exists:user,id'],
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'email', 'unique:users,email']
            ];
        case 'DELETE':
            return [
                'user_id' => ['required', 'integer', 'exists:user,id']
            ];
        default:
            return [];
    }
}

public function validated($key = null, $default = null)
{
    $validated = parent::validated($key, $default);
    return $validated;
}
```

**example 2：**

```php
public function authorize(): bool
{
    return true;
}

public function rules()
{
    switch ($this->method()) {
        case 'POST':
            return [
                'account_name' => ['required', 'string', 'max:255'],
                'secret_key' => ['required', 'string']
            ];
        case 'PATCH':
            return [
                'authenticator_id' => ['required', 'integer', 'exists:authenticators,id'],
                'account_name' => ['required', 'string', 'max:255']
            ];
        case 'DELETE':
            return [
                'authenticator_id' => ['required', 'integer', 'exists:authenticators,id']
            ];
        default:
            return [];
    }
}

public function validated($key = null, $default = null)
{
    $validated = parent::validated($key, $default);
    return $validated;
}
```