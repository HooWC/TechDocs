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

Configuration `postcss.config.js`

```
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
};
```

🍂 Install again

```
php artisan breeze:install
```
Other `Template`

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

