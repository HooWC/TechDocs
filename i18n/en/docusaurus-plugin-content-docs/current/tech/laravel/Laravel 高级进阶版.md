---
id: laravel-hight
slug: /laravel-hight
title: Advanced learning
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---



## Laravel Advanced learning





### ☕ Scheduler

#### 1，Configuration Scheduler

Open the `app/Console/Kernel.php` file, you will see the `schedule` method, this is where the tasks are defined:

```php
<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Execute the report:daily command at 8 am every day
        //$schedule->command('report:daily')->dailyAt('08:00');
        $schedule->command('report:daily')->everyMinute();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
        require base_path('routes/console.php');
    }
}
```

#### 2，SendDailyReport

```
php artisan make:command SendDailyReport
```

```php
<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SendDailyReport extends Command
{
    // Command Signature
    protected $signature = 'report:daily';

    // Command Description
    protected $description = 'Send daily report email to all users';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('Starting to send daily report emails');

        // Retrieve all users
        $users = User::all();
        $this->info('Number of users found: ' . $users->count());

        if ($users->isEmpty()) {
            $this->error('No users found.');
            return;
        }

        foreach ($users as $user) {
            try
            {
                Mail::raw('Here is your daily report content', function ($message) use ($user) {
                    $message->to($user->email)
                        ->from(config('services.mail.mail_gmail'), config('services.mail.mail_name'))
                        ->subject('Daily Report');
                });
                $this->info('Email successfully sent to: ' . $user->email);
            }
            catch (\Exception $e)
            {
                $this->error('Failed to send email to ' . $user->email . ': ' . $e->getMessage());
            }
        }

        $this->info('Daily report emails sent successfully.');
    }
}
```

#### 3，ENV Setting

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ex_sh
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=11db8c1f10c50d
MAIL_PASSWORD=667fe814a795e7
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=HooBusiness@example.com
MAIL_FROM_NAME=Hoo
```

#### 4，php artisan migrate

Create User

#### 5，start up Scheduler

```
php artisan schedule:run
```



#### Automatically execute `php artisan report:daily`

In Windows environment, you can use **Task Scheduler** to set up scheduled tasks.

#### Setting steps:

1. **Open Task Scheduler**: Press `Win + R` keys, enter `taskschd.msc` and press Enter.

2. **Create a basic task**:

    - Click **"Create Basic Task"** on the right.

    - Enter a task name, such as "Laravel Report Daily".

3. **Set Trigger**:

    - On the Trigger page, select **"Daily"** or other desired frequency.

    - Specify the start time, such as `08:00`.

4. **Set Action**:

    - On the Action page, select **"Start Program"**.

    - Program or Script Path Enter your PHP executable file path, such as `D:\php-8.3.10\php.exe`.

    - Enter in the Add Parameters section

     ```
     artisan report:daily
     ```
     
     , for example:
     
     ```
     D:\Code\Laravel P\example-app2\artisan report:daily
     ```

5. **Save and Finish**





### ☕ Event & Listener

#### Scenario: Send a welcome email after user registration

When a new user registers, we trigger an event `UserRegistered`, and then the listener `SendWelcomeEmail` will capture the event and send a welcome email.

#### 1. Installation

```
php artisan make:event UserRegistered
php artisan make:listener SendWelcomeEmail --event=UserRegistered
```

#### 2. Define event and listener logic

Open `app/Events/UserRegistered.php` and edit the following:

```php
namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserRegistered
{
    use Dispatchable, SerializesModels;

    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }
}
```



#### 3. Write the logic of sending emails in the listener file

Open the `app/Listeners/SendWelcomeEmail.php` file and add the following code:

```php
namespace App\Listeners;

use App\Events\UserRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmail implements ShouldQueue
{
    use InteractsWithQueue;

    public function __construct()
{
    // Optional: perform initialization in the constructor
}

public function handle(UserRegistered $event)
{
    $user = $event->user;

    Mail::raw('Welcome to our website!', function ($message) use ($user) {
        $message->to($user->email)
                ->subject('Welcome!');
    });
}
}
```



#### 4. Register events and listeners

Open `app/Providers/EventServiceProvider.php` and register events and listeners in the `$listen` array:

```php
namespace App\Providers;

use App\Events\UserRegistered;
use App\Listeners\SendWelcomeEmail;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        UserRegistered::class => [
            SendWelcomeEmail::class,
        ],
    ];

    public function boot()
    {
        parent::boot();
    }
}
```



5. Trigger events

Trigger the `UserRegistered` event in the user registration logic. For example, add the following code to the user controller:

```php
php artisan make:controller UserController
```

```php
<?php

namespace App\Http\Controllers;

use App\Events\UserRegistered;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create($request->only('name', 'email', 'password'));

        event(new UserRegistered($user));

        return response()->json(['message' => 'Registration successful!']);
    }
}
```

api.php

```php
Route::post('register', [\App\Http\Controllers\UserController::class, 'register']);
```

Test the registration request through Postman or the command line to confirm that you received the welcome email.

### ☕ Authorization Policies

Using authorization policies in Laravel can help you better manage user permissions. Below are detailed steps and code to create and use policies.

#### 1. Installation

```
php artisan make:policy PostPolicy
```

This will create a `PostPolicy.php` file in the `app/Policies` directory.

#### 2. Define policy methods

Open `app/Policies/PostPolicy.php` and define the user permission logic in the policy. The following example shows checking whether the user has the permission to update and delete a specific `Post`:

```php
<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    /**
     * Determine whether the user can update the post
     */
    public function update(User $user, Post $post)
    {
        return $user->id === $post->user_id;
    }

    /**
     * Determine whether the user can delete the post
     */
    public function delete(User $user, Post $post)
    {
        return $user->id === $post->user_id;
    }
}
```



#### 3. Register policies

Open the `AuthServiceProvider` file (`app/Providers/AuthServiceProvider.php`) and register `PostPolicy` in the `$policies` array:

```php
<?php

namespace App\Providers;

use App\Models\Post;
use App\Policies\PostPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Post::class => PostPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();
    }
}
```



#### 4. Use policies for authorization checks

In the controller, you can use policies to check user permissions.

For example, use the `authorize` method in `PostController`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function update(Request $request, Post $post)
{
    // Check if the user has permission to update the post
    $this->authorize('update', $post);

    // Perform the update operation
    $post->update($request->all());

    return response()->json(['message' => 'Post updated successfully']);
}

public function delete(Post $post)
{
    // Check if the user has permission to delete the post
    $this->authorize('delete', $post);

    // Perform the delete operation
    $post->delete();

    return response()->json(['message' => 'Post deleted successfully']);
}
}
```



#### 5. Use policies in Blade templates

You can use the `@can` directive in Blade templates to check policy permissions:

```php
@can('update', $post)
    <a href="{{ route('posts.edit', $post) }}">Edit a post</a>
@endcan

@can('delete', $post)
    <form action="{{ route('posts.destroy', $post) }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit">Delete a post</button>
    </form>
@endcan
```





### ☕ Real-time event broadcasting x

In Laravel, real-time event broadcasting can broadcast server-side events to the front-end, allowing the client to receive and respond to events in real time. This is very useful for implementing real-time update functions (such as notifications, chats, etc.). The following are detailed steps and codes for implementing real-time event broadcasting using Laravel Broadcasting.

Real-time event broadcasting is a mechanism that allows Laravel applications to notify client applications, such as web pages or mobile applications, of events in real time. This allows for features such as real-time chat and push notifications without the client constantly polling the server for updates. Pusher is a very commonly used third-party service that makes it easier for Laravel to implement event broadcasting.

Pusher registration is required

#### 1. Install

```
npm install
npm install vite --save-dev
composer require pusher/pusher-php-server
```

```
php artisan make:model Message -m
```

Edit the `Message` model

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

In this model, `user_id` indicates the sender of the message, and `content` is the message content. You can customize the fields as needed.

Create a migration file for the Messages table

```php
public function up()
{
    Schema::create('messages', function (Blueprint $table) {
    	$table->id();
    	$table->unsignedBigInteger('user_id');
    	$table->text('content');
    	$table->timestamps();
	});
}
```

```
php artisan migrate
```



#### 2， Configuring the Broadcast Driver

```
BROADCAST_DRIVER=pusher
PUSHER_APP_ID=your-app-id
PUSHER_APP_KEY=your-app-key
PUSHER_APP_SECRET=your-app-secret
PUSHER_HOST=127.0.0.1
PUSHER_PORT=6001
PUSHER_SCHEME=http
PUSHER_APP_CLUSTER=mt1
```



#### 3，Set up broadcast events

```
php artisan make:event MessageSent
```

In the generated event class (e.g. `app/Events/MessageSent.php`), implement the `ShouldBroadcast` interface:

```php
<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use App\Models\Message;

class MessageSent implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new Channel('chat');
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}
```



#### 4. Trigger an event

Call `event(new MessageSent($message))` where you need to trigger an event. For example, trigger an event when a new message is sent in `MessageController`:

```
php artisan make:controller MessageController
```

```php
<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(Request $request)
    {
        $message = Message::create([
            'user_id' => $request->user()->id,
            'content' => $request->input('content'),
        ]);

        // Broadcast Events
        event(new MessageSent($message));

        return response()->json(['message' => 'Message sent successfully!']);
    }
}
```



#### 5. Listen for broadcast events on the front end

Use Laravel Echo and Pusher to receive broadcast events on the front end. First install Laravel Echo and Pusher JavaScript SDK:

```
npm install --save laravel-echo pusher-js
```

Initialize Echo in the front-end JavaScript file and listen for events. For example, in `resources/js/app.js`:

```js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.MIX_PUSHER_APP_KEY,
    cluster: process.env.MIX_PUSHER_APP_CLUSTER,
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
});

window.Echo.channel('chat')
    .listen('.message.sent', (e) => {
        console.log('News:', e.message);
    });
```



#### 6. Run the broadcast service

```
npm run dev
```

```
npm install --save laravel-echo pusher-js
```

.env

```
VITE_PUSHER_APP_KEY=your-app-key
VITE_PUSHER_APP_CLUSTER=your-app-cluster
```

cmd

```
composer require beyondcode/laravel-websockets --with-all-dependencies
```

```
php artisan websockets:serve
```

```
php artisan serve
```





### ☕  OAuth 2.0 / Laravel Passport

Yes, Laravel Passport does provide a `createToken` method that allows the creation of access tokens in an OAuth 2.0 implementation. This method is ideal for generating "Personal Access Tokens" for users, which are often used for API authentication.

#### 1. Installation

```
composer require laravel/passport
```



#### 2. Configuration Passport

```
php artisan migrate
```

**Generate encryption key**: Generates the encryption key required by Passport.

```
php artisan passport:install
```



#### 3. Add Passport service provider

Add to the `providers` array in the `config/app.php` file:

```php
Laravel\Passport\PassportServiceProvider::class,
```



#### 4. Configure Auth

In the `config/auth.php` file, set the `api` authentication driver to `passport`:

```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'passport',
        'provider' => 'users',
    ],
],
```


#### 5. Set up the User model

```php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    // Other model codes...
}
```



#### 6. Define routes

In `routes/api.php`, define the Passport route:

```php
use Laravel\Passport\RouteRegistrar;

Route::group(['middleware' => ['auth:api']], function () {
    // Routes that require authentication
});

Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
```



#### 7. Create an authentication controller

Create a controller to handle registration and login:

```php
php artisan make:controller AuthController
```

Then implement the registration and login logic in `AuthController`:

```php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('Personal Access Token')->accessToken;

        return response()->json(['token' => $token]);
    }
}
```



#### 8. Test the API

You can use Postman or any API client to test the registration and login APIs:

**Register**:

- Request type: POST
- URL: `http://your-domain/api/register`
- Request body:

```json
{
    "name": "Your Name",
    "email": "your-email@example.com",
    "password": "your-password",
    "password_confirmation": "your-password"
}
```

**Login**:

- Request type: POST
- URL: `http://your-domain/api/login`
- Request body:

```json
{
    "email": "your-email@example.com",
    "password": "your-password"
}
```

The returned JSON will contain a `token`, which you can use for authentication.

#### 9. Protect routes

Add the `auth:api` middleware to the routes that need to be protected. For example:

```php
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
```







### ☕ Task Queues

Time-consuming tasks (such as sending emails) can be pushed into queues and processed asynchronously to improve application performance.

With these steps, you can create and use task queues in Laravel. Asynchronous processing of tasks can significantly improve the responsiveness of the system while maintaining the efficiency of background tasks.

#### 1. Configure queue drivers

In the `config/queue.php` file, Laravel provides a variety of queue drivers, including database, Redis, Beanstalkd, etc. The `database` driver is commonly used in the development environment. Make sure the appropriate driver is set in the `.env` file, for example:

```
QUEUE_CONNECTION=database
```



#### 2. Create a queue table

If you use the `database` driver, please generate a queue table first:

```
php artisan queue:table
php artisan migrate
```

The generated table `jobs` will store the information of the queue tasks.



#### 3. Create a queue task

Use the Artisan command to create a queue task class. For example, here is a task for sending emails:

```
php artisan make:job SendEmailJob
```

This command will generate the `SendEmailJob.php` file in the `app/Jobs/` directory.

#### 4. Write the queue task logic

In the generated `SendEmailJob` class, write the task logic. Suppose we want to send an email, we can use the following code:

```php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function handle()
    {
        Mail::to($this->user->email)->send(new \App\Mail\WelcomeEmail($this->user));
    }
}
```

In this code, the `handle` method defines the specific logic of task execution. Here we use Laravel's email sending function to send a welcome email to the user.

#### 5. Dispatch queue tasks

When using tasks in an application, you can push tasks to the queue through the `dispatch` method. For example, send a welcome email after the user registers:

```php
use App\Jobs\SendEmailJob;
use App\Models\User;

$user = User::find(1); // Example User
SendEmailJob::dispatch($user);
```



#### 6. Run queue tasks

Use the `queue:work` command to start a queue worker to process queue tasks:

```
php artisan queue:work
```

The `queue:work` command will listen to the queue and process the tasks in the queue.

#### 7. Set up task failure retries (optional)

If you need to automatically retry when a task fails, you can define the `$tries` and `$timeout` properties in the task class:

```php
class SendEmailJob implements ShouldQueue
{
    public $tries = 3; // Maximum number of attempts
    public $timeout = 120; // Timeout (seconds)
    // ...
}
```



#### 8. Failed task processing (optional)

You can use `queue:failed-table` to create a database table for failed tasks:

```
php artisan queue:failed-table
php artisan migrate
```




### ☕ Middleware

Used to filter HTTP requests, such as authentication, cross-site request forgery (CSRF) protection, etc.

Laravel middleware provides flexible control over requests, allowing you to insert custom logic during request processing, such as authentication, logging, cross-site request protection, etc. Through middleware, Laravel can effectively enhance the security and maintainability of applications.

#### 1. Create middleware

```
php artisan make:middleware CheckAdmin
```

This command will generate the `CheckAdmin.php` file in the `app/Http/Middleware` directory.

#### 2. Write middleware logic

In the generated `CheckAdmin.php` file, write the logic of the middleware. This example will check whether the user is an administrator and return a 403 error if not.

```php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is logged in and is an administrator
        if (!Auth::check() || !Auth::user()->is_admin) {
            // If not an administrator, return a 403 error
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // If the user is an administrator, continue with the request
        return $next($request);
    }
}
```

```php
Schema::table('users', function (Blueprint $table) {
        $table->boolean('is_admin')->default(false); // Not an administrator by default
    });
```



#### 3. Register middleware

Open the `app/Http/Kernel.php` file and register the middleware as routing middleware. Add to the `$routeMiddleware` array:

```php
protected $routeMiddleware = [
    // Other middleware
    'admin' => \App\Http\Middleware\CheckAdmin::class,
];
```

This way you can use `admin` as a middleware alias to call `CheckAdmin` in the route.

#### 4. Apply middleware to routes

Middleware can be applied to a single route or a route group. For example, apply the `admin` middleware in `routes/web.php`:

```php
use Illuminate\Support\Facades\Route;

Route::middleware(['admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/settings', [AdminController::class, 'settings']);
});
```

Or apply the middleware to a single route:

```php
Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->middleware('admin');
```



#### 5. Global middleware (optional)

If you need to apply middleware on all requests, you can add the middleware to the `$middleware` array in the `app/Http/Kernel.php` file:

```php
protected $middleware = [
    // Global Middleware
    \App\Http\Middleware\CheckAdmin::class,
];
```

In this way, each request will be checked by `CheckAdmin` first.

### ☕ API Resources

API resources provide a flexible JSON format for model data, define the structure through the `toArray` method, and can attach additional metadata. API resources can make your API clearer and more standardized.

#### 1. Create API resources

Use the `make:resource` command to generate an API resource class. For example, create an API resource for the `User` model:

```
php artisan make:resource UserResource
```

This command will generate the `UserResource.php` file in the `app/Http/Resources/` directory.

#### 2. Define the API resource format

In the generated `UserResource.php` file, use the `toArray` method to define the output format of the API resource. You can choose to return specific fields or a custom format. For example:

```php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toDateTimeString(),
        ];
    }
}
```

In this example, only the `id`, `name`, `email`, and `created_at` fields are returned. If you have sensitive fields, such as passwords, make sure not to include them here.

#### 3. Use API resources to return data

Use API resources in controllers to return model data. For example, in `UserController`, return data for a single user:

```php
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }
}
```

If you would like to return a collection of users, you may use the `UserResource::collection` method:

```php
public function index()
{
    $users = User::all();
    return UserResource::collection($users);
}
```



#### 4. Customize resource collection format (optional)

Laravel also supports creating dedicated resource collection classes. You can use the following command to generate resource collection classes:

```
php artisan make:resource UserCollection
```

In `UserCollection.php`, you can customize the collection return format.

#### 5. Add additional metadata (optional)

You can add additional metadata to the resource, such as status information or pagination data. You can use the `with` method in the resource class:

```php
public function with($request)
{
    return [
        'status' => 'success',
        'code' => 200,
    ];
}
```

#### Complete Example

After creating `UserResource`, the API will return JSON in the following format:

```json
{
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "created_at": "2024-10-31 12:34:56"
    },
    "status": "success",
    "code": 200
}
```





### ☕ Seeder and Factories

Laravel's Seeder and Factories can be used to generate fake data and populate database data during development and testing. The following are detailed steps and complete code examples for using Seeder and Factories.

#### 1. Factories: Create and define factories

Factories are used to create fake data for models, which is suitable for generating different test data when the database is populated.

Use the `make:factory` command to generate factories. For example, to generate a factory for the `User` model:

```
php artisan make:factory UserFactory
```

The generated factory file will be located in the `database/factories/` directory.

#### 2. Define fake data for Factory

In the generated `UserFactory.php` file, use the Faker library to define fake data for the model. The following is an example of `UserFactory`:

```php
namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // Default Password
            'remember_token' => Str::random(10),
        ];
    }
}
```

In this example, the factory generates fake data for fields such as `name` and `email` for the `User` model.

#### 3. Seeder: Create and define data population

Seeder is used to insert batches of test data into the database.

Generate Seeder using Artisan commands, such as generating `UserSeeder`:

```
php artisan make:seeder UserSeeder
```

The generated Seeder file will be located in the `database/seeders/` directory.

#### 4. Define Seeder data population logic

In `UserSeeder.php`, call the factory to generate multiple user records:

```php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Use the factory to generate 10 users
        User::factory()->count(10)->create();
    }
}
```

This code will create 10 user records using `UserFactory`.

#### 5. Run Seeder

In `DatabaseSeeder.php`, register `UserSeeder` to the `run` method so that it will be called when running database population:

```php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(UserSeeder::class);
    }
}
```

Then, run the `db:seed` command to execute the Seeder and populate the data:

```
php artisan db:seed
```

You can also run a specific Seeder separately:

```
php artisan db:seed --class=UserSeeder
```



#### 6. Use Tinker to test Factory (optional)

Laravel provides the Tinker tool, which can be used to quickly generate data. Enter the Tinker environment:

```php
php artisan tinker
```

Then run the following command to generate a single user:

```php
User::factory()->create();
```

Or generate multiple users:

```php
User::factory()->count(5)->create();
```





### ☕ Caching

Laravel's cache system provides multiple cache driver support, which can use methods such as `put`, `get`, and `remember` to operate the cache and improve application performance.

Laravel's cache system supports multiple drivers (such as Redis, Memcached, files, etc.), which can effectively improve the performance of the application. The following are detailed steps and code examples for using cache.

#### 1. Configure cache driver

Laravel uses file cache by default. You can change the driver type in the `.env` file. For example, change the cache driver to Redis:

```
CACHE_DRIVER=redis
```

Confirm that the Redis configuration in the `.env` file is correct. The default Redis configuration is as follows:

```php
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

Make sure Redis is running on the server. If you use other drivers (such as Memcached), install the driver and configure the corresponding `.env` settings.

#### 2. Using Cache in Laravel

Laravel provides multiple cache methods to easily operate the cache.

Example: Store Data in Cache

Use the following code in a controller or service to store data in the cache:

```php
use Illuminate\Support\Facades\Cache;

// Store data in the cache with a validity period of 60 minutes
Cache::put('key', 'value', 60);

Cache::put('key', 'value', null); // Permanent Cache

Cache::forever('key', 'value'); // Permanent Cache
```

You can use the `remember` method to cache data for a period of time. If the cache does not exist, execute the given callback and cache the result:

```php
Cache::remember('key', 60, function () {
    return 'value';
});
```

Example: Get data from cache

Use the `get` method to get data from cache:

```php
$value = Cache::get('key');

// If key does not exist, return the default value
$value = Cache::get('key', 'default');
```

Example: Delete cache

Use the `forget` method to delete cache items:

```php
Cache::forget('key');
```



#### 3. Cache collection data

Caching collection data such as query results can effectively reduce database queries. For example:

```php
$users = Cache::remember('users', 60, function () {
    return \App\Models\User::all();
});
```

The above example caches all user data for 60 minutes, and subsequent requests will directly retrieve data from the cache.

#### 4. Redis specific cache operations

If you use the Redis driver, you can access the Redis instance to perform operations:

```php
use Illuminate\Support\Facades\Redis;

// Storing Values
Redis::set('key', 'value');

// Get Value
$value = Redis::get('key');
```



#### 5. Clear the cache

Use the Artisan command to clear all caches:

```
php artisan cache:clear
```

### ☕RabbitMQ

RabbitMQ is a message broker that can be used for task queues, messaging, and asynchronous processing in distributed systems. Here are the complete steps and code examples on how to configure and use RabbitMQ in Laravel.

#### 1. Install the RabbitMQ client library

Laravel does not have built-in support for RabbitMQ, so you need to use a community-provided package, such as the `vladimir-yuldashev/laravel-queue-rabbitmq` package. First, install the package:

```
composer require vladimir-yuldashev/laravel-queue-rabbitmq
```



#### 2. Configure the queue connection

After the installation is complete, configure the `config/queue.php` file and add the RabbitMQ configuration in `connections`:

```php
'connections' => [
    'rabbitmq' => [
        'driver' => 'rabbitmq',
        'queue' => 'default', // Default queue name
        'connection' => 'default',
        'hosts' => [
            [
                'host' => env('RABBITMQ_HOST', '127.0.0.1'),
                'port' => env('RABBITMQ_PORT', 5672),
                'user' => env('RABBITMQ_USER', 'guest'),
                'password' => env('RABBITMQ_PASSWORD', 'guest'),
                'vhost' => env('RABBITMQ_VHOST', '/'),
            ],
        ],
        'options' => [
            'ssl_options' => [
                'cafile' => env('RABBITMQ_SSL_CAFILE', null),
                'local_cert' => env('RABBITMQ_SSL_LOCALCERT', null),
                'local_key' => env('RABBITMQ_SSL_LOCALKEY', null),
                'verify_peer' => env('RABBITMQ_SSL_VERIFY_PEER', true),
                'passphrase' => env('RABBITMQ_SSL_PASSPHRASE', null),
            ],
            'queue' => [
                'job' => \VladimirYuldashev\LaravelQueueRabbitMQ\Queue\Jobs\RabbitMQJob::class,
            ],
        ],
    ],
],
```

Add the following RabbitMQ configuration items to your `.env` file:

```php
RABBITMQ_HOST=127.0.0.1
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_VHOST=/
```



#### 3. Create a task queue Job

You can use Laravel's Artisan command to create a Job to process tasks:

```
php artisan make:job ProcessMessage
```

In the `app/Jobs/ProcessMessage.php` file, define the specific execution content of the task, for example:

```php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function handle()
    {
        // Process the message here
        \Log::info("Processing message: " . $this->data);
    }
}
```



#### 4. Put the task into the queue

Where the queue is needed (such as in the controller), you can use the following code to put the task into the queue:

```php
use App\Jobs\ProcessMessage;

Route::get('/send', function () {
    $data = 'This is a message for RabbitMQ';
    ProcessMessage::dispatch($data);
    return 'Message sent to RabbitMQ!';
});
```



#### 5. Start the queue listener

Finally, start the queue listener with the following command to process tasks in the RabbitMQ queue:

```php
php artisan queue:work --queue=rabbitmq
```

By configuring the `queue.php` file, creating a Job, and using `dispatch` to send tasks to the RabbitMQ queue, you can easily use RabbitMQ as a queue driver for Laravel.

### ☕ Service Providers

#### 1. Create a service provider

In development, it is often necessary to register common services, such as custom payment processing or data conversion services. Service providers can bind these service classes to the container for easy calling from various parts of the project.

```
php artisan make:provider CustomServiceProvider
```

Create `CustomService.php` in the `app/Services/` directory to implement basic business logic:

```php
namespace App\Services;

class CustomService
{
    public function performAction()
    {
        return "Custom Service Action Performed!";
    }
}
```

In the `register` method in `CustomServiceProvider.php`, bind `CustomService` to the container:

```php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\CustomService;

class CustomServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(CustomService::class, function ($app) {
            return new CustomService();
        });
    }

    public function boot()
    {
        // You can add other startup logic here
    }
}
```



#### 2. Register service provider

**Register service provider in `config/app.php`**:

```php
'providers' => [
    // Other service providers
    App\Providers\CustomServiceProvider::class,
],
```

Inject `CustomService` in a controller or elsewhere, and call its `performAction` method:

```php
namespace App\Http\Controllers;

use App\Services\CustomService;

class ExampleController extends Controller
{
    protected $customService;

    public function __construct(CustomService $customService)
    {
        $this->customService = $customService;
    }

    public function index()
    {
        return $this->customService->performAction();
    }
}
```





### ☕ Model Observers

If you use Laravel's built-in `php artisan serve` to run a local server during development, the information will be displayed in the command line window where `php artisan serve` is started.

Model observers are used to perform specific actions when model events (such as create, update, delete, etc.) occur. Using observers can separate business logic from controllers, making the code clearer and easier to maintain. Here are the detailed steps and code examples:

#### 1. Create Observer

Laravel provides Artisan commands to quickly generate observer files. Suppose you have a `User` model and want to listen to user creation and deletion events.

```
php artisan make:observer UserObserver --model=User
```

After executing this command, Laravel will generate the `UserObserver.php` file in the `app/Observers` directory and automatically associate it with the `User` model.

#### 2. Define the Observer method

Open the `app/Observers/UserObserver.php` file and define the actions to be performed when a specific event occurs. For example, record related actions when a user is created and deleted:

```js
<?php

namespace App\Observers;

use App\Models\User;

class UserObserver
{
    // Listen to the user creation event
    public function created(User $user)
    {
        // Logic to execute when a user is created
        echo "User created with ID: " . $user->id;
    }

    // Listen to the user deletion event
    public function deleted(User $user)
    {
        // Logic to execute when a user is deleted
        echo "User deleted with ID: " . $user->id;
    }
}
```



#### 3. Register Observer in the service provider

To make the observer effective, you need to register it in `AppServiceProvider` or a custom service provider. In the `boot` method in `App\Providers\AppServiceProvider`, register `UserObserver`:

```js
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\User;
use App\Observers\UserObserver;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        User::observe(UserObserver::class);
    }

    public function register()
    {
        //
    }
}
```



#### 4. Test Observer

You can test the observer by creating or deleting users. Open Laravel Tinker or execute the following code in the controller to observe the effect:

```js
// Create User
$user = \App\Models\User::create([
    'name' => 'John Doe',
    'email' => 'johndoe@example.com',
    'password' => bcrypt('password')
]);

// Deleting a User
$user->delete();
```

The observer will trigger the `created` and `deleted` methods when the create or delete operation is performed, and output the corresponding message.

#### Common usage examples

In addition to creation and deletion, observers can also listen to other events, such as `updated`, `saving`, `restoring`, etc. You can define the corresponding methods in `UserObserver` as needed:

```js
public function updated(User $user)
{
    echo "User updated with ID: " . $user->id;
}
```

In this way, model observers can help you perform specific actions when model events are triggered, making the code logic more modular and clear.

### ☕ Custom Commands (Artisan Commands)

Custom Artisan commands allow you to extend Laravel's command line tools, which are very suitable for performing scheduled tasks, batch processing of data, etc. The following are detailed steps and code examples for creating custom commands:

#### 1. Generate custom commands

Use Artisan commands to generate a new command class:

```
php artisan make:command CustomCommand
```

After running, Laravel will create a `CustomCommand.php` file in the `app/Console/Commands` directory.

#### 2. Define the name and function of the command

Open `app/Console/Commands/CustomCommand.php` and modify the command name, description and processing logic:

```js
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CustomCommand extends Command
{
    // Define the name of the command, used for calling it in the command line
    protected $signature = 'custom:run';

    // Description of the command, displayed in `php artisan list`
    protected $description = 'Execute a custom command';

    // The command's processing logic
    public function handle()
    {
        // Write the actual logic of the command here
        $this->info('Custom Command Executed Successfully!');
    }
}
```

- **`$signature`**: Defines the command's calling name, such as `custom:run`.
- **`$description`**: The command's description, which can help understand the command's purpose.
- **`handle` method**: The actual processing logic of the command. You can add any required business logic here, such as querying the database, processing data, etc.

#### 3. Register custom commands

In `app/Console/Kernel.php`, register the custom command to the `$commands` array:

```js
protected $commands = [
    \App\Console\Commands\CustomCommand::class,
];
```

After registration, Laravel will be able to recognize and use this custom command.

#### 4. Execute custom commands

You can now run custom commands in the terminal with the following command:

```js
php artisan custom:run
```

After execution, the terminal will output `Custom Command Executed Successfully!`, indicating that the command has been successfully run.

#### 5, Another example

Another example, demonstrating how to create a custom Artisan command to get data from an API and store it in the database. Suppose we want to create a command to get user data and insert it into the `users` table.

##### 5.1, Generate a custom command

First, generate a new custom command:

```
php artisan make:command FetchUsers
```

This will create a file named `FetchUsers.php` in the `app/Console/Commands` directory.

##### 5.2, define the name and function of the command

Open the `app/Console/Commands/FetchUsers.php` file and modify the command name, description and processing logic:

```js
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\User;

class FetchUsers extends Command
{
    // Define the name of the command
    protected $signature = 'fetch:users';

    // Description of the command
    protected $description = 'Fetch users from an external API and store them in the database';

    // Command processing logic
    public function handle()
    {
        // Call an external API to get user data
        $response = Http::get('https://jsonplaceholder.typicode.com/users');

        if ($response->successful()) {
            $users = $response->json();

            foreach ($users as $userData) {
                // Insert user data into the database
                User::updateOrCreate(
                    ['email' => $userData['email']], // Unique identifier
                    [
                        'name' => $userData['name'],
                        'username' => $userData['username'],
                        'address' => json_encode($userData['address']),
                    ]
                );
            }

            $this->info('Users fetched and stored successfully!');
        } else {
            $this->error('Failed to fetch users from the API.');
        }
    }
}

```

##### Code analysis

- **`$signature`**: defines the command call name as `fetch:users`.

- **`$description`**: describes the command's function.

- `handle` method

- Use Laravel's HTTP client to get user data from the specified API (here using JSONPlaceholder's sample API).

- If the request is successful, traverse the user data and use the `updateOrCreate` method to insert the user information into the database. If the user already exists (based on the email field), update the user's information.

- Output a success or failure message.

##### 5.3, Register custom commands

In the `app/Console/Kernel.php` file, register the custom command to the `$commands` array:

```
protected $commands = [
    \App\Console\Commands\FetchUsers::class,
];
```



##### 5.4, Execute custom commands

You can now run custom commands in the terminal with the following command:

```
php artisan fetch:users
```

After execution, the command will fetch user data from the API and store it in the database. The terminal will display `Users fetched and stored successfully!` to indicate that the operation was successful.

##### Application scenarios

This command can be used to periodically synchronize user data from an external API to your application, such as maintaining data consistency when registering, updating information, or performing data analysis. You can set this command to run on a scheduled basis in conjunction with Laravel's task scheduler to ensure that your database is always in sync with the external data source.

### ☕ User avatars

Here are detailed steps and code examples for processing user avatar uploads and saving avatar images to Laravel applications.

#### 1, Create database fields

First, make sure you have a field in your user table to store the path to the avatar. If you don't have this field yet, you can add it through migration.

Run the following command in your terminal to create a migration:

```js
php artisan make:migration add_avatar_to_users_table --table=users
```

Then, add the `avatar` field to the generated migration file:

```js
// database/migrations/xxxx_xx_xx_xxxxxx_add_avatar_to_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAvatarToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->nullable(); // Add an avatar field
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('avatar'); // Delete the avatar field
        });
    }
}
```

Run the migration command to update the database:

```
php artisan migrate
```

#### 2. Create an avatar upload controller

Next, create a controller to handle avatar uploads. Run in the terminal:

```
php artisan make:controller AvatarController
```

Add the following code to the generated `AvatarController`:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    public function upload(Request $request)
    {
        // Validate the file in the request
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Get the current user
        $user = Auth::user();

        // Process the uploaded avatar
        if ($request->hasFile('avatar')) {
            // Delete old avatar if it exists
            if ($user->avatar) {
                Storage::delete($user->avatar);
            }

            // Upload new avatar
            $path = $request->file('avatar')->store('avatars'); // Stored in storage/app/avatars

            // Update the user's avatar path
            $user->avatar = $path;
            $user->save();
        }

        return response()->json(['message' => 'Avatar uploaded successfully', 'avatar' => $path]);
    }

    public function getAvatar()
    {
        // Get the current user's avatar
        $user = Auth::user();
        return response()->json(['avatar' => $user->avatar]);
    }
}
```



#### 3. Routing configuration

Add the corresponding routes in `routes/web.php` or `routes/api.php`:

```php
use App\Http\Controllers\AvatarController;

Route::middleware('auth:sanctum')->post('/upload-avatar', [AvatarController::class, 'upload']);
Route::middleware('auth:sanctum')->get('/get-avatar', [AvatarController::class, 'getAvatar']);
```



#### 4. Front-end upload form example

You can use HTML form or JavaScript/Axios to upload avatars. The following is a simple HTML form example:

```html
<form id="avatar-form" enctype="multipart/form-data">
    @csrf
    <input type="file" name="avatar" id="avatar" required>
    <button type="submit">Upload an avatar</button>
</form>

<script>
    document.getElementById('avatar-form').addEventListener('submit', function (e) {
        e.preventDefault();

        let formData = new FormData(this);
        
        fetch('/upload-avatar', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}', // Laravel CSRF token
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
</script>
```



#### 5. Get the avatar

To get the current user's avatar, you can call the `getAvatar` method:

```javascript
fetch('/get-avatar', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token, // Replace with your Bearer Token
    },
})
.then(response => response.json())
.then(data => {
    if (data.avatar) {
        console.log('User avatar path:', data.avatar);
    }
});
```



#### 6. Display avatar

You can display the avatar through the generated avatar path, for example:

```html
<img src="{{ asset($user->avatar) }}" alt="User Avatar" />
```

### Summary

The above steps show how to implement the user avatar upload function in Laravel, including database migration, controller, route configuration, and front-end code examples. With these codes, users can upload, save, and get their avatars. If needed, you can further expand this function, such as adding more verification, adjusting the storage path, etc.

### ☕ middleware('auth:sanctum')

`middleware('auth:sanctum')` is a middleware in Laravel that is used to protect your routes so that they can only be accessed by authenticated users. Specifically, `sanctum` is a lightweight authentication system provided by Laravel, which is particularly suitable for API development.

Verify user identity.

Log request information.

Modify the request or response.

**`auth:api`**: Suitable for applications that require complex authentication, usually used in conjunction with Passport.

**`auth:sanctum`**: For quick, simple applications, typically used in SPAs or mobile applications, using simple token authentication provided by Laravel Sanctum

Which one to choose depends on the needs and complexity of your application. If your application only needs basic user authentication, using Sanctum will be simpler and faster; if you need more complex OAuth2 functionality, you should choose Passport.

The steps for using `middleware('auth:sanctum')` and `HasApiTokens` for API authentication are as follows. This will include installing Sanctum, setting up a user model, creating tokens, and protecting routes.

#### 1. Install Laravel Sanctum

In your Laravel project, first install Sanctum via Composer:

```
composer require laravel/sanctum
```

#### 2. Publish Sanctum configuration

Once installed, publish Sanctum's configuration and migration files:

```
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

#### 3. Run database migrations

Run database migrations to create the necessary tables:

```
php artisan migrate
```

#### 4. Configure authentication guards

In the `config/auth.php` file, set the API guard to use Sanctum:
```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],

    'api' => [
        'driver' => 'sanctum', // Set the API guard to Sanctum
        'provider' => 'users',
    ],
],
```



#### 5. Use `HasApiTokens` Trait in User Model

Introduce `HasApiTokens` feature in user model (usually `App\Models\User`):

```php
namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens; // Introducing the HasApiTokens trait

    // Other model properties and methods
}
```



#### 6. Create a user token

Create a token for the user in the controller. The following is an example controller for user login and generating a token:

```php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            // Creating a Token
            $token = $user->createToken('token-name')->plainTextToken;

            return response()->json(['token' => $token], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
```



#### 7. Protect routes

Use `middleware('auth:sanctum')` in the route file to protect routes that require authentication. For example, to protect a route that obtains user information:

```php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user(); // Returns the information of the currently logged in user
});
```



#### 8. Make requests using API tokens

In the client (e.g., Postman or a front-end application), use the generated token to make API requests. Add the `Authorization` field to the request header:

```
Authorization: Bearer your-token-here
```

###

#### Revoke tokens

You can revoke a user's token in the following ways:

```php
// Revoke all tokens
$user->tokens()->delete();

// Or revoke a specific token
$token = $user->tokens()->find($tokenId);
$token->delete();
```

#### Summary

Through the above steps, you can successfully use `middleware('auth:sanctum')` and the `HasApiTokens` feature to implement API authentication. Laravel Sanctum provides a simple and effective way to manage API tokens for single-page applications (SPA) and mobile applications.

### ☕ Define Model Relationships

In Laravel, if you want to define a relationship in one model with another model and connect the two models through the `user_id` field, you usually use the `belongsTo` relationship. The following are detailed codes and steps, assuming that we have a `User` model and a `Post` model, and the `user_id` field in the `Post` model points to the `User` model.

### Step 1: Define Model Relationships

#### 1.1. User Model

Define the relationship with `Post` in the `User` model:

```php
// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    // Define a relationship with the Post model
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
```

#### 1.2. Post model

Define the relationship between `Post` and `User` in the `Post` model:

```php
// app/Models/Post.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // Define a relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

### Step 2: Create database migrations

If you haven't created the `posts` table yet, you can create it through migrations. Run the following command to generate the migration file:

```
php artisan make:migration create_posts_table
```

Then in the generated migration file, define the structure of the `posts` table:

```php
// database/migrations/xxxx_xx_xx_xxxxxx_create_posts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Adding a user_id field
            $table->string('title');
            $table->text('content');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
```

### Step 3: Run Migrations

Run migrations to create the `posts` table:

```
php artisan migrate
```

### Step 4: Use Relationships

Now you can use the defined relationships to get a user's posts or get a user's posts.

#### 4.1. Get all posts for a user

```php
use App\Models\User;

$user = User::find(1); // Get the user with ID 1
$posts = $user->posts; // Get all posts by this user

foreach ($posts as $post) {
    echo $post->title; // Output the title of each post
}
```

#### 4.2. Get the user of the post

```php
use App\Models\Post;

$post = Post::find(1); // Get the post with ID 1
$user = $post->user; // Get the user of the post

echo $user->name; // Output the user name of the post
```

### Summary

Through the above steps, you can define the relationship between `User` and `Post` in Laravel, and use the `belongsTo` and `hasMany` methods to easily perform database operations. This makes navigating between models simple and intuitive.

### ☕ Request

In Laravel, `Request` is the core component for handling HTTP requests. Using the `Request` class, you can easily get the requested data, validate input, manage file uploads, and more. The following is a detailed code and steps to introduce how to use the `Request` class.

### 1. Import `Request` class

In your controller, you can use the `Request` class through dependency injection or direct import.

#### Dependency injection

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        // Handling Requests
    }
}
```

#### Using the `Request` facade directly

```php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;

class UserController extends Controller
{
    public function store()
    {
        $data = Request::all(); // Get all request data
    }
}
```

### 2. Get request data

You can get various data in the request through the `Request` instance.

```php
public function store(Request $request)
{
    $name = $request->input('name'); // Get a single input value
    $email = $request->get('email'); // Get input using the get method
    $allData = $request->all(); // Get all input data
}
```

### 3. Validate request data

Use Laravel's validation function to validate the request data. You can use the `validate` method in the controller.

```php
public function store(Request $request)
{
    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
    ]);

    // After validation, you can use $validatedData
    $user = User::create($validatedData);
}
```

### 4. Handling file uploads

Handling file uploads using `Request` is very simple. You can use the `file` method to get the uploaded file, and the `store` method to save the file.

```php
public function store(Request $request)
{
    $request->validate([
        'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile('avatar')) {
        $path = $request->file('avatar')->store('avatars', 'public'); // Save to the storage/app/public/avatars directory

        // You can save $path to the database
        $user->avatar = $path;
        $user->save();
    }
}
```

### 5. 访问请求的其他信息

你可以获取请求的其他信息，如 URL、请求方法、IP 地址等。

```php
public function index(Request $request)
{
    $url = $request->url(); // Get the request URL
    $method = $request->method(); // Get the request method (GET, POST, etc.)
    $ip = $request->ip(); // Get the client IP address
}
```

### 6. Use middleware to process requests

You can process requests in middleware, such as authentication, logging, etc. Create a middleware and register it:
```php
// Creating Middleware
php artisan make:middleware CheckUserIsAdmin

// Handling requests in middleware
public function handle(Request $request, Closure $next)
{
    if (!$request->user() || !$request->user()->is_admin) {
        return redirect('/'); // If the user is not an administrator, redirect
    }

    return $next($request); // Continue request processing
}
```

### 7. Define routes

Define routes in `routes/web.php` or `routes/api.php` and use controller methods:

```php
use App\Http\Controllers\UserController;

Route::post('/users', [UserController::class, 'store']);
```

### Summary

The above are the detailed code and steps for using the `Request` class in Laravel. The `Request` class provides powerful functions for handling HTTP requests, making it simple and intuitive to obtain and verify request data. Combined with middleware and controllers, you can build powerful web applications.

### ☕ Many-to-Many Relationships

Below are the detailed code and steps for implementing many-to-many relationships using Laravel, including how to preload roles using the `with` method.

### 1. Create models and migration files

Suppose we want to implement a many-to-many relationship between users (`User`) and roles (`Role`).

#### Create user models and migration files

First create a user model and its migration files:

```
php artisan make:model User -m
```

In the generated migration file, define the `users` table:

```php
// database/migrations/xxxx_xx_xx_create_users_table.php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamps();
    });
}
```

#### Create role model and migration file

Next, create the role model and its migration file:

```
php artisan make:model Role -m
```

In the generated migration file, define the `roles` table:

```php
// database/migrations/xxxx_xx_xx_create_roles_table.php
public function up()
{
    Schema::create('roles', function (Blueprint $table) {
        $table->id();
        $table->string('name')->unique();
        $table->timestamps();
    });
}
```

### 2. Create a connection table

Then, you need to create a connection table `role_user` to store the relationship between users and roles. Use the following command to create a migration file:

```
php artisan make:migration create_role_user_table --create=role_user
```

Define the connection table in the migration file:

```php
// database/migrations/xxxx_xx_xx_create_role_user_table.php
public function up()
{
    Schema::create('role_user', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('role_id')->constrained()->onDelete('cascade');
        $table->timestamps();
    });
}
```

### 3. Run migrations

Run migrations to create the tables:

```
php artisan migrate
```

### 4. Define model relationships

Define many-to-many relationships in the `User` model and the `Role` model.

#### User model

```php
// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    // Defining a many-to-many relationship
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
    }
}
```

#### Role Model

```php
// app/Models/Role.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    // Defining a many-to-many relationship
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user', 'role_id', 'user_id');
    }
}
```

### 5. Using Many-to-Many Relationships

Next, use the many-to-many relationships of the Eloquent model.

#### Preloading Roles

Here is an example of getting all users and their roles:

```php
$users = User::with('roles')->get();

foreach ($users as $user) {
    echo $user->name . " has roles: ";
    foreach ($user->roles as $role) {
        echo $role->name . " ";
    }
}
```

### 6. Adding and removing roles

#### Add a role to a user

```php
$user = User::find(1); // Find the user with user ID 1
$roleId = 2; // Assume the role ID to be added

// Attach the role to the user
$user->roles()->attach($roleId);
```

#### Remove a role from a user

```php
$user->roles()->detach($roleId); // Remove the specified role from the user
```

### 7. Example controller

Here is a simple controller example that shows how to use these functions in a controller:

```php
// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Get all users and their roles
        $users = User::with('roles')->get();
        
        return response()->json($users);
    }

    public function attachRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $roleId = $request->input('role_id');
        
        $user->roles()->attach($roleId);

        return response()->json(['message' => 'Role attached successfully.']);
    }

    public function detachRole(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        $roleId = $request->input('role_id');

        $user->roles()->detach($roleId);

        return response()->json(['message' => 'Role detached successfully.']);
    }
}
```

### 8. Routes

Define routes in `routes/web.php`:

```php
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']);
Route::post('/users/{user}/attach-role', [UserController::class, 'attachRole']);
Route::post('/users/{user}/detach-role', [UserController::class, 'detachRole']);
```

### Summary

The above are the detailed steps and code on how to set up and use many-to-many relationships in Laravel, including pre-loaded examples. By defining model relationships and join tables, you can easily manage and manipulate many-to-many relationship data.

### ☕ One-to-One Relationships

Implementing one-to-one relationships in Laravel is very simple. Here are the detailed steps and code examples, assuming that we want to implement a one-to-one relationship between a user (`User`) and a user profile (`Profile`).

### 1. Create Models and Migrations

#### Create User Model and Migrations

First create the User model and its migration file:

```
php artisan make:model User -m
```

In the generated migration file, define the `users` table:

```php
// database/migrations/xxxx_xx_xx_create_users_table.php
public function up()
{
    Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamps();
    });
}
```

#### Create a profile model and migration files

Next, create a profile model and its migration files:

```
php artisan make:model Profile -m
```

In the generated migration file, define the `profiles` table:

```php
// database/migrations/xxxx_xx_xx_create_profiles_table.php
public function up()
{
    Schema::create('profiles', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('bio')->nullable();
        $table->string('avatar')->nullable();
        $table->timestamps();
    });
}
```

### 2. Run migrations

Run migrations to create the tables:

```
php artisan migrate
```

### 3. Define model relationships

Define a one-to-one relationship between the `User` model and the `Profile` model.

#### User model

```php
// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    // Defining a one-to-one relationship
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }
}
```

#### Profile Model

```php
// app/Models/Profile.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    // Defining a reverse one-to-one relationship
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

### 4. Using One-to-One Relationships

Here is an example of how to use one-to-one relationships with Eloquent models.

#### Creating Users and Their Profiles

```php
// Create a User
$user = User::create([
    'name' => 'John Doe',
    'email' => 'john@example.com',
]);

// Create a User Profile
$user->profile()->create([
    'bio' => 'Software Developer',
    'avatar' => 'path/to/avatar.jpg',
]);
```

#### Get users and their profile

```php
$user = User::with('profile')->find(1); // Assume user ID is 1
echo $user->name . " has bio: " . $user->profile->bio;
```

#### Update User Profile

```php
$user = User::find(1);
$user->profile()->update([
    'bio' => 'Senior Software Developer',
    'avatar' => 'path/to/new_avatar.jpg',
]);
```

#### Deleting User Profiles

```php
$user = User::find(1);
$user->profile()->delete();
```

### 5. Example Controller

Here is a simple controller example showing how to use these functions in a controller:

```php
// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Get all users and their profiles
        $users = User::with('profile')->get();
        
        return response()->json($users);
    }

    public function store(Request $request)
    {
        // Create users and their profiles
        $user = User::create($request->only('name', 'email'));
        $user->profile()->create($request->only('bio', 'avatar'));

        return response()->json($user->load('profile'), 201);
    }

    public function updateProfile(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->profile()->update($request->only('bio', 'avatar'));

        return response()->json(['message' => 'Profile updated successfully.']);
    }

    public function deleteProfile($id)
    {
        $user = User::findOrFail($id);
        $user->profile()->delete();

        return response()->json(['message' => 'Profile deleted successfully.']);
    }
}
```

### 6. Routes

Define routes in `routes/web.php`:

```php
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{id}/profile', [UserController::class, 'updateProfile']);
Route::delete('/users/{id}/profile', [UserController::class, 'deleteProfile']);
```

### Summary

The above are the detailed steps and code for setting up and using one-to-one relationships in Laravel, including examples of creating, reading, updating, and deleting profiles. By defining model relationships, you can easily manage and manipulate the data of one-to-one relationships.

### ☕ Get data through associations (Eager Loading)

In Laravel, using eager loading can efficiently load data associated with models, reduce the number of database queries, and improve application performance. The following are detailed steps and code examples for using eager loading.

### 1. Prerequisites

Assume that we already have a user (`User`) and a profile (`Profile`) model, and a one-to-one relationship has been established between these models. Please refer to the code and steps for the one-to-one relationship provided earlier.

### 2. Using eager loading

#### 2.1 Define eager loading

You can use the `with` method to specify the association to load in the query. For example, to get all users and their profiles, you can use the following code:

```php
$users = User::with('profile')->get();
```

This will load all users and their associated profiles, reducing the number of database queries.

#### 2.2 Sample Code

Here is an example controller that shows how to use eager loading to get users and profiles:

```php
// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Fetch all users and their profiles using eager loading
        $users = User::with('profile')->get();
        
        return response()->json($users);
    }

    public function show($id)
    {
        // Use eager loading to get the specified user and his/her profile
        $user = User::with('profile')->findOrFail($id);
        
        return response()->json($user);
    }
}
```

### 3. Routes

Define routes in `routes/web.php`:

```php
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
```

### 4. Accessing Eager Loaded Data

When you get users and their profiles from the database, you can directly access the related data, for example:

```php
$users = User::with('profile')->get();

foreach ($users as $user) {
    echo $user->name . ' - ' . $user->profile->bio . '<br>';
}
```

### 5. Dealing with the N+1 problem of eager loading

Using eager loading can significantly reduce the N+1 query problem. Here is a simple comparison:

#### 5.1 Without eager loading

```php
$users = User::all();
foreach ($users as $user) {
    echo $user->name . ' - ' . $user->profile->bio . '<br>'; // Each user will query the profile individually
}
```

In this example, for each user, an additional query is executed to get their profile, resulting in the N+1 query problem.

#### 5.2 Using Eager Loading

```php
$users = User::with('profile')->get();
foreach ($users as $user) {
    echo $user->name . ' - ' . $user->profile->bio . '<br>'; // Only two queries are executed
}
```

With eager loading, only two queries will be executed: one for all users and one for all profiles.

### 6. Summary

Eager loading is a powerful feature that can help you optimize database queries, reduce the number of unnecessary queries, and improve the performance of your application. Use the `with` method to load related data to make your code more concise and efficient.

### ☕ Conditional Relationships

Conditional relationships in Laravel allow us to filter related data based on specific conditions so that only related records that meet the conditions are loaded. This is very useful for situations where partial data is required, such as only getting published posts or orders with a certain status.

### 1. Example scenario

Suppose we have two models: `User` and `Post`, and a user (`User`) can have multiple posts (`Post`), but we only want to load published posts.

### 2. Prepare models and migrations

#### User model
```php
// app/Models/User.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    // Define a one-to-many relationship with Post
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    // Get only published articles
    public function publishedPosts()
    {
        return $this->hasMany(Post::class)->where('is_published', true);
    }
}
```

#### Post Model

```php
// app/Models/Post.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'content', 'is_published', 'user_id'];
}
```

#### Migration

Make sure there is an `is_published` field in the `posts` table to indicate whether the post has been published.

```php
// database/migrations/xxxx_xx_xx_create_posts_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('title');
            $table->text('content');
            $table->boolean('is_published')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
```

### 3. Use conditional associations

Use the conditional association method `publishedPosts()` in the controller or elsewhere to get published posts:

```php
// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function showPublishedPosts($id)
    {
        // Use the conditional join publishedPosts to get only published posts
        $user = User::with('publishedPosts')->findOrFail($id);

        return response()->json($user->publishedPosts);
    }
}
```

### 4. Routing

Define a route in `routes/web.php` and use the `showPublishedPosts` method.

```php
use App\Http\Controllers\UserController;

Route::get('/users/{id}/published-posts', [UserController::class, 'showPublishedPosts']);
```

### 5. Use dynamic conditions

You can also use the `when` method to dynamically add conditions when the conditions are met. For example:

```php
// Get a user's posts and filter the published posts when the conditions are met
$user = User::with(['posts' => function ($query) {
    $query->when(request('published_only'), function ($query) {
        $query->where('is_published', true);
    });
}])->findOrFail($id);
```

### 6. Test Results

Visit `/users/{id}/published-posts` to see the published posts of the specified user

### ☕ Aggregate Functions

In Laravel, aggregate functions such as `count`, `sum`, `avg`, `max`, and `min` can be used to calculate data statistics in the database. These methods can be called directly in the query builder to obtain specific aggregate results.

### 1. Example scenario

Suppose we have an `Order` model to represent orders, and each order contains fields such as order amount (`amount`) and order status (`status`). We will use aggregate functions to obtain some statistical information, such as the total number of orders, total amount, average amount, etc.

### 2. Prepare models and migrations

#### Order model

```php
// app/Models/Order.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['amount', 'status'];
}
```

#### Migration

Make sure the `orders` table has an `amount` field to store the order amount and a `status` field to store the order status.

```php
// database/migrations/xxxx_xx_xx_create_orders_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount', 10, 2); // Order amount
            $table->string('status'); // Order Status
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
```

### 3. Use aggregate functions

#### 3.1 Get the total number of orders

```php
use App\Models\Order;

$totalOrders = Order::count();
```

#### 3.2 Get the total amount of orders

```php
$totalAmount = Order::sum('amount');
```

#### 3.3 Get the average amount of orders

```php
$averageAmount = Order::avg('amount');
```

#### 3.4 Get the maximum amount of an order

```php
$maxAmount = Order::max('amount');
```

#### 3.5 Get the minimum amount of an order

```php
$minAmount = Order::min('amount');
```

### 4. Example Controller

Create a controller to show how to use these aggregate functions.

```php
// app/Http/Controllers/OrderController.php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function stats()
    {
        $totalOrders = Order::count();
        $totalAmount = Order::sum('amount');
        $averageAmount = Order::avg('amount');
        $maxAmount = Order::max('amount');
        $minAmount = Order::min('amount');

        return response()->json([
            'total_orders' => $totalOrders,
            'total_amount' => $totalAmount,
            'average_amount' => $averageAmount,
            'max_amount' => $maxAmount,
            'min_amount' => $minAmount,
        ]);
    }
}
```

### 5. Routing

Define a route in `routes/web.php` and use the `stats` method.

```php
use App\Http\Controllers\OrderController;

Route::get('/orders/stats', [OrderController::class, 'stats']);
```

### 6. Test results

Visit `/orders/stats` to see the statistics of the order, including the total number, total amount, average amount, maximum amount, and minimum amount.

### 7. Use aggregate functions in combination with conditions

If you only need to count order information under specific conditions, such as only getting orders with `status` as `completed`, you can use `where` in combination with aggregate functions:

```php
$completedOrderCount = Order::where('status', 'completed')->count();
$completedOrderTotalAmount = Order::where('status', 'completed')->sum('amount');
```

These aggregate functions can more accurately obtain data statistics that meet the conditions when combined with conditional queries.























































































































































































































