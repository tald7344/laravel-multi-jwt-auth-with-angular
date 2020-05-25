# Laravel Multi JWT Auth For [ Admin & User ] With Angular
If You Want to manage different user levels(Admins and Users in my case). 
 	I could have used user roles as identifier and pass them as custom claims in my jwt like this:

	$token = auth()->claims([‘role’ => ‘user’])->attempt($credentials);
	
But no, i’m afraid the project might grow and that level of authentication might prove inefficient.
	
For this article, i’ll be using the latest version on Laravel 7.x now. To install Laravel 7.x visit: 
	https://laravel.com/docs/7.x#installation

After complete setup, We’ll require the a multi Auth package and configure it by entering these in your terminal
    
```php
    1- composer require hesto/multi-auth
	2- php artisan multi-auth:install admin -f --views
```

If There Is Error: (Call to undefined function Hesto\MultiAuth\Commands\Traits\str_singular

Use This Command To Fix It :

```php
    composer require laravel/helpers    
```

Then install JWT like this:

```php
    composer require tymon/jwt-auth
```

Add the following to your config/app.php Under providers :

```php
    'Tymon\JWTAuth\Providers\JWTAuthServiceProvider',
```

If THere Is Error : (Class 'Tymon\JWTAuth\Providers\JWTAuthServiceProvider' not found) Replace IT With : 

```php 
    'Tymon\JWTAuth\Providers\LaravelServiceProvider' ,
```

Add the following to your config/app.php Under Aliases :

```php
    'JWTAuth' => 'Tymon\JWTAuth\Facades\JWTAuth',         
    'JWTFactory' => 'Tymon\JWTAuth\Facades\JWTFactory',	
```

Then run:

```php
    php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
```

Now run this below to generate a secret code :

```php
    php artisan jwt:secret
```

Register the jwt.auth and jwt.refresh middleware in app/http/Kernel.php :

```php
    protected $routeMiddleware = [
		...
		    'jwt.auth' => 'Tymon\JWTAuth\Middleware\GetUserFromToken',
		    'jwt.refresh' => 'Tymon\JWTAuth\Middleware\RefreshToken',
		];
```


**NOTE** : You Have To Implements the JWTSubject TO Both (Admin & User) Model AS :
```php
    class Admin extends Authenticatable implements JWTSubject {
        use Notifiable;
        protected $fillable = [
            'name', 'email', 'password',
        ];

        protected $hidden = [
            'password', 'remember_token',
        ];

        public function sendPasswordResetNotification($token) {
            $this->notify(new AdminResetPassword($token));
        }

        public function getJWTIdentifier() {
            return $this->getKey();
        }

        public function getJWTCustomClaims() {
            return [];
        }
    }
```

Make Sure You Have Two Model (User, Admin) With There Table and Columns In migration file As :

```php
    public function up() {
        Schema::create('admins', function (Blueprint $table) {
            $table->string('email')->index();
            $table->string('token')->index();
            $table->timestamp('created_at')->nullable();
        });
    }
```

Now migrate your database :

    php artisan migrate

setup your controllers. I prefer to keep everything separate so i created an “Api” folder under controllers.
		 I also created “User” folder and “Admin” folder under Api. Lastly, create an “Auth” folder under 
		 both User and Admin to handle authentication

You can run these to auto-create the folders and files :

```php
    1. php artisan make:Controller Api/Admin/Auth/LoginController
    2. php artisan make:Controller Api/Admin/Auth/RegisterController
    3. php artisan make:Controller Api/User/Auth/LoginController
    4. php artisan make:Controller Api/User/Auth/RegisterController
```

Open up routes/api.php, paste this:

```php
    //User Auth
    Route::post('userlogin', 'Api\User\Auth\LoginController@login');
    Route::post('userregister', 'Api\User\Auth\RegisterController@register');

    //Admin Auth
    Route::post('adminlogin', 'Api\Admin\Auth\LoginController@login');
    Route::post('adminregister', 'Api\Admin\Auth\RegisterController@register');


    //Here is the protected User Routes Group,  
    Route::group(['middleware' => 'jwt.auth', 'prefix' => 'user'], function(){
        Route::get('logout', 'Api\User\UserController@logout');
        Route::get('dashboard', 'Api\User\UserController@dashboard');
    });


    //Here is the protected Admin Routes Group
    Route::group([ 'prefix' => 'admin'], function(){
        Route::post('settings', 'Api\Admin\AdminController@settings');
        Route::post('dashboard', 'Api\Admin\AdminController@dashboard');
    });
```

In User/Auth/LoginController.php file :

```php
    namespace App\Http\Controllers\Api\User\Auth;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use Validator;
    use JWTFactory;
    use JWTAuth;
    use JWTAuthException;
    use App\User;
    use Illuminate\Support\Facades\Auth;

    class LoginController extends Controller
    {
        public function __construct() {
            $this->user = new User;
        }
        public function login(Request $request) {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255',
                'password'=> 'required'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors());
            }
            \Config::set('jwt.user', 'App\User'); 
            \Config::set('auth.providers.users.model', \App\User::class);
            $credentials = $request->only('email', 'password');
            $token = null;
            try {
                if (! $token = JWTAuth::attempt($credentials)) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }
            return response()->json(compact('token'));
        }
    }
```

Is Admin/Auth/LoginController.php File :

```php
	namespace App\Http\Controllers\Api\Admin\Auth;
    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use Validator;
    use JWTFactory;
    use JWTAuth;
    use JWTAuthException;
    use App\Admin;
    use Illuminate\Support\Facades\Auth;

    class LoginController extends Controller {
        public function __construct() {
            $this->admin = new Admin;
        }				   
        public function login(Request $request) {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255',
                'password'=> 'required'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors());
            }
            config()->set( 'auth.defaults.guard', 'admin' );
            \Config::set('jwt.user', 'App\Admin'); 
            \Config::set('auth.providers.users.model', \App\Admin::class);
            $credentials = $request->only('email', 'password');
            $token = null;
            try {
                if (! $token = JWTAuth::attempt($credentials)) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }
            return response()->json(compact('token'));
        }
    }
```

Now either register or seed your User and Admin table with fake data like this:

    Email: testEmail23@gmail.com
    Password: 123

To Test User With Postman:
     
    Route : http://127.0.0.1:8000/api/userlogin
    Data : 
        {
            "email": "testEmail23@gmail.com",
            "password": "123"
        }

To Test Admin With Postman:
     
    Route : http://127.0.0.1:8000/api/adminlogin
    Data : {
                "email": "testEmail23@gmail.com",
                "password": "123"
            }
