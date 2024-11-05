---
id: laravel-seeder
slug: /laravel-seeder
title: Seeder
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

# Laravel Seeder 

*Laravel seeder It is to create SQL in virtual user data, which can help programmers test projects well.*

#### Install Factory 

```
php artisan make:factory UserFactory --model=User
```

```
public function definition(): array
{
    return [
        'name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'email_verified_at' => now(),
        'password' => static::$password ??= Hash::make('password'),
        'login_date' => now(),
        'is_disabled' => false,
    ];
}
```

#### Install Seeder

```
php artisan make:seeder UsersTableSeeder
```

```
$user1 = User::factory()
    ->create([
        'name' => 'fakeAccount011',
        'email' => 'fakeaccount@gmail.com',
        'email_verified_at' => now(),
        'password' => Hash::make('AccountPassword'),
        'login_date' => now(),
        'is_disabled' => false,
    ]);

$user2 = User::factory()
    ->create([
        'name' => 'fakeAdmin099',
        'email' => 'fakeadmin@gmail.com',
        'email_verified_at' => now(),
        'password' => Hash::make('AdminPassword'),
        'login_date' => now(),
        'is_disabled' => false,
    ]);

RoleUser::firstOrCreate([
    'user_id' => $user1->id,
    'role_id' => 1,
]);

RoleUser::firstOrCreate([
    'user_id' => $user2->id,
    'role_id' => 2,
]);

$FakeUsers = User::factory()
    ->count(5)
    ->create();

$FakeUsers->each(function ($user) {
    RoleUser::firstOrCreate([
        'user_id' => $user->id,
        'role_id' => mt_rand(1, 2),
    ]);
});
```

```
Role::create(['name' => 'account']);
Role::create(['name' => 'admin']);
```

### Creating dummy data

```
php artisan db:seed
```
*If you only want to run specific seeders, you can use the `--class` option to specify the name of the seeding class to run.*

```
php artisan db:seed --class=UsersTableSeeder
```

