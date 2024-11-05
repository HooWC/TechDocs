---
id: laravel-queue
slug: /laravel-queue
title: Queue
date: 2024-11-04
authors: Hoo
tags: [laravel]
keywords: [laravel]
---

## Laravel Queue

*In Laravel, Queue is a mechanism for asynchronously processing tasks. It allows you to push tasks into the queue and then process them asynchronously in the background without blocking the current request processing flow. This is useful for situations where you need to handle time-consuming tasks or communicate with external services*

#### Introduction

```
//Simple passing parameters
SendEmailJob::dispatch();
SendEmailJob::dispatch($data, $header);

//Passing parameters
dispatch(new SendEmailJob());
dispatch(new SendEmailJob($userMail));
```

#### Install Table

```
php artisan queue:table
```

```
.env
QUEUE_CONNECTION=database
```

#### Startup

```
php artisan queue:work
```

## Basic usage

##### Install Queue file

```
php artisan make:job SlowJob
```

##### Use (Send data)

```
SalesCsvProcess::dispatch($data, $header);
```

##### Job file


```
class SalesCsvProcess implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $data;
    public $header;

    /**
     * Create a new job instance.
     */
    public function __construct($data,$header)
    {
        $this->data = $data;
        $this->header = $header;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        foreach($this->data as $sale){
            $saleData = array_combine($this->header,$sale);
            Sales::create($saleData);
        }
    }
}
```

#### start up

```
php artisan queue:work
```



## Queue and Email Usage

##### Install Event

```
php artisan make:event UserRegistered
```

##### Install Listener

```
php artisan make:listener SendWelcomeEmail --event=UserRegistered
```

##### Send data

```
Register::dispatch($user);
```

##### Save Event data
```
class Register
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
```

##### Listener Send Email Request

```
class SendRegisterEmailNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public $tries = 3;

    public function __construct()
    {
        //
    }

    public function handle($event)
    {
        $email = new Register($event->user);
        Mail::to($event->user->email)->send($email);
    }

}
```

#### start up

```
php artisan queue:work
```





## Email usage

##### Install Mail file

```
php artisan make:mail WelcomeMail
```

##### Code

```
class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'CodingTOTP',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.register',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
```



### Email 2

register In the code

```
Mail::to($data->email)->send(new WelcomeMail($data->name));
```

```
class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct(private $name)
    {
		//
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'CodingTOTP',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.register',
            with: ['name' => $this->name]
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
```

### Send pictures

```
public function attachments(): array
{
	$attachment = public_path('images/logo.png');
    return [
    	Attachment::fromPath($attachment),
    ];
}
```





======

Use

```
php artisan queue:table
php artisan make:job JobName
```

Job

```
private $email;
private $name;

construct($email, $name)
{
	$this->email = $email;
	$this->name = $name;
}

public function handle():vold
{
	Mail::to($data->email)->send(new WelcomeMail($data->name));
}
```

Controller

```
JobName::dispatch($data->email, $data->name);
```

