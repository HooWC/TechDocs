---
id: laravel-model
slug: /laravel-model
title: Model
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

### main

```
public function authenticators()
{
    return $this->hasMany(Authenticator::class, 'user_id');
}
```
### deputy

```
public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}
```
### Multiple ID

```
public function roles()
{
    return $this->belongsToMany(Role::class, 'role_users', 'user_id', 'role_id');
}
```

Get data

```
return $this->hasOne(Photos::class, 'product_id')
Products::with(photo)->get()
```

