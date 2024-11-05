---
id: laravel-policy
slug: /laravel-policy
title: Policy
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

### Laravel Policy does not require installation

*In Laravel, Policy is an authorization mechanism that defines the authorization strategy for models. It allows you to define who can perform which operations on a model in your application. Generally, Policy is used to separate authorization logic from controller logic to ensure that your application has good security and maintainability. *

*Specifically, Policy allows you to define authorization logic for specific models. These logics determine which users can perform which operations in a given context. For example, you can use Policy to define who can create, view, update, or delete a specific type of resource. In Policy, you can define these authorization rules based on the needs and business logic of your application. *

**In simple terms, Policy is to prevent hackers from breaking the rules of the code at will**

##### 😁 Install `Policy` file

```
php artisan make:policy PostPolicy
```
**or**

```
php artisan make:policy AuthenticatorsPolicy --model=Authenticators
```

##### Add registration in `app/Http/Providers`

```
protected $policies = [
Authenticator::class => AuthenticatorPolicy::class,
];
```

### 🍂 Controller usage

```
$request->validate([
    'authenticator_id' => ['required', 'integer', 'exists:authenticators,id'],
    'code' => ['required', 'digits:6'],
]);

$authenticator = Authenticator::find($request->authenticator_id);
$this->authorize('verify', $authenticator);
```

### 🍂 Policy File Code `CRUM`

```
<?php

namespace App\Policies;

use App\Models\Authenticator;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AuthenticatorPolicy
{
    public function verify(User $user, Authenticator $authenticators)
    {
        if ($user->id === $authenticators->user_id)
            return Response::allow();
        else
            return Response::deny("You are not allowed to perform this operation");
    }

    public function view(User $user)
    {
        if ($user->roles->contains('name', 'account'))
            return Response::allow();
        else
            return Response::deny("You are not allow to view");
    }

    public function create(User $user)
    {
        if ($user->roles->contains('name', 'account'))
            return Response::allow();
        else
            return Response::deny("You are not allow to create");
    }

    public function update(User $user, Authenticator $authenticators)
    {
        if ($user->id === $authenticators->user_id)
            return Response::allow();
        else
            return Response::deny("You are not allow to update");
    }

    public function delete(User $user, Authenticator $authenticators)
    {
        if ($user->id === $authenticators->user_id)
            return Response::allow();
        else
            return Response::deny("You are not allow to delete");
    }

}
```

### 正How to use the standard project: the example is as follows

```
public function verify(Request $request)
{
    $request->validate([
        'authenticator_id' => ['required', 'integer', 'exists:authenticators,id'],
        'code' => ['required', 'digits:6'],
    ]);
    $authenticator = Authenticator::find($request->authenticator_id);
    $this->authorize('verify', $authenticator);

    $verifyCode = str_pad(TOTP::create($authenticator->secret_key)->now(), 6, '0', STR_PAD_LEFT);
    $isCodeValid = $verifyCode === $request->code;
    return response()->json([
        'message' => $isCodeValid ? 'Verification successful' : 'Verification failed',
        'authenticator' => $isCodeValid,
    ]);
}

public function index(Request $request)
{
    $this->authorize('view', Authenticator::class);

    $authenticators = $request->user()->authenticators;
    return AuthenticatorResource::collection($authenticators);
}

public function store(AuthenticatorRequest $request)
{
    $this->authorize('create', Authenticator::class);

    $authenticator = new Authenticator($request->validated());
    $authenticator->user_id = $request->user()->id;
    $authenticator->save();
    return response()->json([
       'message' => 'Authenticator created successfully',
       'authenticator' => AuthenticatorResource::make($authenticator)
    ]);
}

public function update(Authenticator $authenticator, AuthenticatorRequest $request)
{
    $this->authorize('update',$authenticator);

    $updateData = $request->only('account_name');
    $authenticator->update($updateData);
    return response()->json([
        'message' => 'Authenticator update successfully',
        'authenticator' =>  AuthenticatorResource::make($authenticator),
    ]);
}

public function destroy(Authenticator $authenticator, AuthenticatorRequest $request )
{
    $this->authorize('delete', $authenticator);

    $authenticator->delete();
    return response()->json([
        'message' => 'Authenticator deleted successfully'
    ]);
}
```