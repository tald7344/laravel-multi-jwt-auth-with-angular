<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    //     $this->app['router']->matched(function (\Illuminate\Routing\Events\RouteMatched $e) {
    //         $route = $e->route;
    //         if (!array_has($route->getAction(), 'guard')) {
    //             return;
    //         }

    //         $routeGuard = array_get($route->getAction(), 'guard');

    //         $this->app['auth']->resolveUsersUsing(function ($guard = null) use ($routeGuard) {
    //             return $this->app['auth']->guard($routeGuard)->user();
    //         });
    //         $this->app['auth']->setDefaultDriver($routeGuard);
    //     });
    }
}
