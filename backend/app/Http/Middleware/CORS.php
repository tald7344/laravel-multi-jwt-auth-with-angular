<?php

namespace App\Http\Middleware;

use Closure;

class CORS
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) 
    {
        header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Headers : X-Requested-With, Content-Type, X-Token-Auth, Authorization');
        header('Access-Control-Allow-Headers : Content-Type, X-Auth-Token, Authorization, Origin');
        header('Access-Control-Allow-Methods : GET, POST, PUT, DELETE, OPTIONS');
        return $next($request);
    }
}
