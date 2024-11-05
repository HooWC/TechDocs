---
id: laravel-api
slug: /laravel-api
title: API Study
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

### Laravel Api Writing

```php
Route::apiResource('user',UserController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgetPassword', [AuthController::class, 'forgetPassword']);
Route::post('/verifyEmail', [AuthController::class, 'verifyEmail'])->name('verifyEmail.post');
```
### API Default route

```
http://127.0.0.1:8000/api/account/authenticator/verify
```
```
http://127.0.0.1:8000/api/account/authenticators  (CRUD)
```

```php
Route::group(['prefix' => 'account', 'as' => 'api.account.', 'middleware' => 'auth:api'], function () {

    Route::group(['prefix' => 'authenticator', 'as' => 'authenticator.'], function () {
        Route::post('verify', [AuthenticatorController::class, 'verify']);
    });

    Route::resource('authenticators', AuthenticatorController::class)->parameters([
        'authenticator' => 'authenticator'
    ])->only(['index','store','update','destroy']);

});
```
### Ajax Default route

```
/api/ajax/account/filterProjectName
```

```php
Route::group(['prefix' => 'ajax'], function () {

    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::post('isDisabledUser', [AdminController::class, 'isDisabledUser']);
    });

    Route::group(['prefix' => 'account', 'as' => 'account.'], function () {
        Route::get('getKeyCode', [AccountController::class,'getKeyCode']);
        Route::post('getNewAuthenticator', [AccountController::class,'getNewAuthenticator']);
        Route::post('deleteAuthenticatorFunction', [AccountController::class,'deleteAuthenticatorFunction']);
        Route::post('filterProjectName', [AccountController::class,'filterProjectName']);
    });

});
```

### Quick build `User Api Controller`

```php
public function index()
{
    return User::all();
}

public function store(UserRequest $request)
{
    User::create($request->all());
    return true;
}

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

public function update(UserRequest $request)
{
    $user_id = $request->input('user_id');
    $user = User::find($user_id);
    $updateData = $request->only('name', 'email');
    return $user->update($updateData);
}

public function destroy(UserRequest $request)
{
    // Disable the use of delete function
    // Only allow users to block accounts
    $user_id = $request->input('user_id');
    $user = User::find($user_id);
    return $user->delete();
}
```
