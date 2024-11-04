---
id: laravel-role
slug: /laravel-role
title: Role 验证
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

### Web Role 验证

```
Route::middleware(['auth:sanctum','verified', 'role:admin'])->group(function (){
    Route::get('/admin/users', [UserController::class, 'users'])->name('admin.users');
});
```

### app/Http/Middleware/打开新文件

```
public function handle(Request $request, Closure $next, ...$roles): Response
{
    if(auth()->check() && auth()->user()->hasAnyRole(...$roles)){
        return $next($request);
    } else {
        return redirect()->route('login');
    }
}
```

### Model 代码

```
public function hasAnyRole(...$roles)
{
    return $this->roles->whereIn('name', $roles)->count() > 0;
}
```