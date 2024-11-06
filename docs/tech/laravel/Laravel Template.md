---
id: laravel-template
slug: /laravel-template
title: Template Breeze
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

# 安裝 laravel/breeze

```
composer require laravel/breeze --dev
php artisan breeze:install
```

配置 `postcss.config.js`

```
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

🍂 再次安裝

```
php artisan breeze:install
```
其他 `Template`

```
php artisan ui vue --auth

npm install && npm run dev
```

Blade.PHP

```
@extends('layouts.master')
@section('content')

@endsection
@section('scripts')

@endsection
```
