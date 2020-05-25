<?php


use Illuminate\Support\Facades\Route;


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
    Route::post('test', 'Api\User\TestController@index');
});


//Here is the protected Admin Routes Group
Route::group([ 'prefix' => 'admin'], function(){
     Route::post('settings', 'Api\Admin\AdminController@settings');
     Route::post('dashboard', 'Api\Admin\AdminController@dashboard');
     Route::post('test', 'Api\User\AdminTestController@index');
});