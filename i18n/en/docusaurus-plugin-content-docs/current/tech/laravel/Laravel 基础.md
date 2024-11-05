---
id: laravel-base
slug: /laravel-base
title: Basic Learning
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

# Laravel Basic

### To use Laravel initially, you need to install the following

[**Node.js Install**](https://nodejs.org/en/download/)
[**PHPStorm Install**](https://www.jetbrains.com/phpstorm/download/#section=windows)
[**PHPStorm Free activation code(Expired)**](https://www.ajihuo.com/)
[**Postman Install**](https://www.postman.com/downloads/)
[**xampp Install**](https://www.apachefriends.org/download.html)
[**Laragon Install**](https://laragon.org/download/index.html)
[**Laragon Installation steps or solutions**](https://www.kreaweb.be/laragon-add-phpmyadmin/)

### Laravel Install

```
composer create-project laravel/laravel example-app
```

```
composer create-project laravel/laravel:^10.0 example-app
```

```
composer create-project laravel/laravel .
```

### Laravel start up

```
php artisan serve
php artisan serve --port=8080
```

```
php artisan key:generate
```



### 🎲 Install Model Command

```
php artisan make:model <model-name> -m    (model / migrate)

php artisan make:model <model-name> -cm   (model / migration / controller)

php artisan make:model <model-name> --all
```
### 🎲 Install Controller Command

```
php artisan make:controller <controller-name>

php artisan make:controller <controller-name> --resource  (api)
```
### 🎲 Install Migration Command

```
php artisan make:migration <migration-name>

php artisan make:migration <migration-name> --table=users
```
### 🎲 Migrate Command

```
php artisan migrate

php artisan migrate:fresh

//After migration, insert some initial data into the database and rerun all migrations
php artisan migrate:fresh --seed
```
### 🎲 Create dummy data command

```
php artisan db:seed

php artisan db:seed --class=ProjectNameSeeder
```

### 🎲 Model Writing

```
protected $fillable = [
        'name',
        'email',
        'password',
    ];
    
//If not written, the system will default to products
public $table = "product";
    
//Don't use it, just write it
public $timestamps = false;
```

### 🍂 Migration Writing

```php
$table->id();
$table->bigIncrements('id'); // Big integer auto-increment field
$table->string('name');
$table->boolean('is_active');
$table->char('code', 10); // Fixed-length string
$table->date('start_date');
$table->dateTime('created_at');
$table->time('meeting_time');
$table->timestamp('last_updated');
$table->decimal('price', 8, 2);
$table->float('discount', 5, 2);
$table->enum('gender', ['male', 'female']);
$table->integer('quantity');
$table->bigInteger('total'); // Not limited by the range of values ​​of ordinary integer types
$table->text('description'); // For smaller text content
$table->longText('full_text'); // For larger text content
$table->uuid('uuid');
$table->foreignId('user_id')->constrained(); // Used to specify the association between the foreign key and another table.
$table->foreignId('creator_id')->constrained('users');
$table->foreign('user_id')->references('id')->on('users');

->nullable()
->unique()
->nullable()->unique()
->default('active')
->unsigned() //零和正数，而不允许负数
->onDelete('cascade')
->foreign('service_category_id')->references('id')->on('service_categories')->onDelete('cascade')

```



## ENV URL

`ENV`

```php
IDP_METADATA=http://www.saml-ip-v1.localhost/saml/metadata
IDP_LOGOUT=http://www.saml-ip-v1.localhost/logout
IDP_SPLOGOUT=http://www.saml-ip-v1.localhost/idp/logout
```

`config / services`

```php
'idp' => [
        'idp_metadata' => env('IDP_METADATA'),
        'idp_logout' => env('IDP_LOGOUT'),
        'idp_splogout' => env('IDP_SPLOGOUT'),
    ],
```

`Use`

```php
config('services.idp.idp_logout')
```



```
@include('view_name')
@include('view_name',['name' => 'Hoo']) #Data transfer

return view('view',compact('a','b')) #Data transfer

$items = User::with('photo')->get(); #Get function
```

### Add or delete a Table

```
# Modify Products
php artisan make:migration RemoveColumnFromProducts #Delete
$table->dropColumn('tests')

php artisan make:migration AddColumnToProducts #Add
$table->string('tests')
```

### Error

```
@if($errors->any())
	@foreach($errors->all() as $error)
		<li>{{ $error }}</li>
	@endforeach
@endif
```







