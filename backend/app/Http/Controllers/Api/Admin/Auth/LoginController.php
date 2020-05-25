<?php

namespace App\Http\Controllers\Api\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use JWTFactory;
use JWTAuth;
use JWTAuthException;
use App\Admin;


use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->admin = new Admin;
    }
    
    public function login(Request $request)
    {
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
                // user = JWTAuth::toUser($token);
//                 $user = Auth::user();
      return response()->json(compact('token'));
    }


}