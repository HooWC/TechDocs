---
id: laravel-middle
slug: /laravel-middle
title: Advanced Learning
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

## Laravel Advanced Learning

#### Route

```php
Route::get()
Route::post()
Route::put()
Route::delete()
Route::any()
Route::match(['get','post'],'index'mfunction(){})
Route::resource()
```

**Single**

```php
Route::get('task/read/{id}',[TaskController::class,"read"])->where('id','[0-9]+');
```

**Multiple**

```php
Route::get('task/read/{id}',[TaskController::class,"read"])->where(['id' => '[0-9]+', 'name' => '[a-z]+']);
```

**Global Routing** app -> Providers -> RouteServiceProvider

```php
// In `RouteServiceProvider` Define global routing pattern constraints in
public function boot()
{
    parent::boot();

    // Global constraint id must be a number
    Route::pattern('id', '[0-9]+');
}
```

`where('id', '.*')` This means that the `id` parameter can accept any characters (numbers, letters, symbols, etc.), even an empty string. This regular expression is very broad and can match almost all input.

```php
Route::get('user/{id}', function ($id) {
    return 'User ID is: ' . $id;
})->where('id', '.*');
```

**Jump route **index jumps to task

```php
Route::redirect('index','task');
```

**Jump route **index jumps to task

```php
Route::permanentRedirect('index','task');
```

**View Route**

```php
Route::view('uri','view',['id' => 10]);
```

**Controller**

```php
return redirect()->route('task.index');
```

**Group**

```php
Route::prefix('api')->get('task',[TaskController::class,"read"]);
```

```php
Route::group(['prefix' => 'api'], function(){
    Route::get('task',[TaskController::class,"read"]);
    Route::get('task',[TaskController::class,"read"]);
})
```

**namespace**

**`namespace('Admin')`**：Place the controller for this set of routes in the App\Http\Controllers\Admin namespace.

```php
Route::namespace('Admin')->group(function(){
	Route::get('read',[TaskController::class,"read"]);
    Route::get('bill',[TaskController::class,"bill"]);
})
 
// Routing becomes the same
// Route::get('read', [\App\Http\Controllers\Admin\TaskController::class, 'read']);
// Route::get('bill', [\App\Http\Controllers\Admin\TaskController::class, 'bill']);
```

**Fallback**

The `fallback` route is used to catch all unmatched requests, usually used to handle 404 errors. You can use the `Route::fallback()` method to define a handler that will be executed when no other routes match.

```php
Route::fallback(function () {
    return redirect('/');
});
```

```php
Route::fallback(function () {
    return view('404');
});
```

**Route::current()**

```php
dump(Route::current()->uri) //Get the current url
```



#### Redirect Return

```php
return response()->json([

],201)
```

```php
return redirect()->to('task');
```

This is a concise syntax provided by Laravel.

```php
return redirect('task')
```

**route()**

```php
return redirect()->route('task');
```

**back()**

**`back()`**：Returns the user to the previous page, often used when form or permission verification fails.

```php
return redirect()->back();
```

**action()**

**`action()`**：Generate URLs and redirect through specific methods of the controller, suitable for in-app operations.

```php
return redirect()->action([TaskController::class, 'read']);
return redirect()->action([TaskController::class, 'index'], ['id' => 10]);
```

**away()**

**`away()`**：Redirect to an external URL (not within the Laravel application).
```php
return redirect()->away('http://www.baidu.com');
```



#### Resource Controller API Route

**Only()**
`only()` is used to **limit users to access only specified operations**, that is, only specific routes can be accessed, and other resource operations will not be available. It can be applied to resource controllers, and can also be used in other scenarios to only allow specific attributes or data operations. **Specific access**

```php
Route::resource('blogs','BlogController')->only(['index','show']);
```

**Except()**

`except()` Used to **exclude access to certain operations**, that is, except for the excluded operations, other operations can be accessed. **Others can be accessed**

```php
Route::resource('blogs','BlogController')->except(['index','show']);
```

**ApiResource()**

**`apiResource`**：Dedicated to API, only generate routes related to data operations, no view routes. **No Edit**

```php
Route::apiResource('blogs','BlogController');
```



#### Form

**POST**

```php
Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
```

```php+HTML
<form action="{{ route('posts.store') }}" method="POST">
    
    @csrf
    <label for="title">Title:</label>
    <input type="text" name="title" id="title" required>

    <label for="content">Content:</label>
    <textarea name="content" id="content" required></textarea>

    <button type="submit">Submit</button>
</form>
```

**PUT**

```php
Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
```

```php+HTML
<form action="{{ route('posts.update', $post->id) }}" method="POST">
    @csrf
    @method('PUT')  <!-- Add hidden _method field -->

    <label for="title">Title:</label>
    <input type="text" name="title" id="title" value="{{ $post->title }}" required>

    <label for="content">Content:</label>
    <textarea name="content" id="content" required>{{ $post->content }}</textarea>

    <button type="submit">Update</button>
</form>
```

```php
Route::put('/posts/{post}/{anotherParam}', [PostController::class, 'update'])->name('posts.update');
```

```php+HTML
<form action="{{ route('posts.update', ['post' => $post->id, 'anotherParam' => $anotherValue]) }}" method="POST">
    @csrf
    @method('PUT')

    <label for="title">Title:</label>
    <input type="text" name="title" id="title" value="{{ $post->title }}" required>

    <label for="content">Content:</label>
    <textarea name="content" id="content" required>{{ $post->content }}</textarea>

    <button type="submit">Update</button>
</form>
```

**DELETE**

```php+HTML
<form action="{{ route('posts.destroy', $post->id) }}" method="POST">
    @csrf
    @method('DELETE')  <!-- Add hidden _method field -->

    <p>Are you sure you want to delete this post?</p>
    <button type="submit">Delete</button>
</form>
```



#### Database Syntax

**Find**

```php
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
```

**Create**

```php
public function store(UserRequest $request)
{
    User::create($request->all());
    return true;
}
```

**All**

```php
public function index()
{
    return User::all();
}
```

**Update**

```php
public function update(UserRequest $request)
{
    $user_id = $request->input('user_id');
    $user = User::find($user_id);
    $updateData = $request->only('name', 'email');
    return $user->update($updateData);
}
```

**Delete**

```php
public function destroy(UserRequest $request)
{
    // Disable the use of delete function
    // Only allow users to block accounts
    
    $user_id = $request->input('user_id');
    $user = User::find($user_id);
    return $user->delete();
}
```

**Where**

```php
public function index()
{
    return User::where('id', 1)->get();  // Get the user with id 1
}
```

```php
public function index()
{
    return User::where('name', 'John')->get();  // Get the user whose name is 'John'
}
```

```php
public function index()
{
    return User::where('name', 'John')
               ->where('email', 'john@example.com')
               ->get();  // 获取 name 为 'John' 且 email 为 'john@example.com' 的用户
}
```

```php
public function index()
{
    return User::where('email', 'john@example.com')->first();  // Get the first user whose email is 'john@example.com'
}
```

**pluck()**

```php
public function index()
{
    return User::where('email', 'like', '%example.com')->pluck('name');  // Get the name column of users whose email contains 'example.com'
}
```

**orWhere**

```php
public function index()
{
    return User::where('name', 'John')
               ->orWhere('email', 'john@example.com')
               ->get();  // Get users whose name is 'John' or whose email is 'john@example.com'
}
```

**whereBetween()**

Query records where user `age` is between 18 and 30

```php
public function index()
{
    return User::whereBetween('age', [18, 30])->get();
}
```

**whereIn()**

```php
public function index()
{
    return User::whereIn('id', [1, 2, 3, 4])->get();
}
```

```php
public function index()
{
    return User::whereIn('status', ['active', 'pending'])->get();
}
```

**`whereIn('status', ['active', 'pending'])`**：Query users whose `status` field is `'active'` or `'pending'`.

**whereNull()**

Query users whose `deleted_at` is `NULL` (i.e. records that have not been soft deleted)

```php
public function index()
{
    return User::whereNull('deleted_at')->get();
}
```

 **orderBy()**

Sort by the `created_at` column in ascending order (oldest to newest)

```php
public function index()
{
    return User::orderBy('created_at', 'asc')->get();
}
```

```php
public function index()
{
    return User::orderBy('name', 'desc')->get();
}
```

```php
public function index()
{
    return User::orderBy('role', 'asc')
               ->orderBy('name', 'desc')
               ->get();
}
```

**latest()**

`latest()` It is a simplified `orderBy`, which sorts by the `created_at` column in descending order by default, and is usually used to get the latest records.

```php
public function index()
{
    return User::latest()->get();
}
```

Get the latest record by `updated_at`

```php
public function index()
{
    return User::latest('updated_at')->get();
}
```

**inRandomOrder()**

`inRandomOrder()` Used to randomly sort query results, usually to get random data.

```php
public function index()
{
    return User::inRandomOrder()->get();
}
```

```php
public function index()
{
    return User::inRandomOrder()->take(5)->get();
}
```

**join()**

```php
public function index()
{
    return User::join('posts', 'users.id', '=', 'posts.user_id')
               ->select('users.name', 'posts.title', 'posts.content')
               ->get();
}
```

















