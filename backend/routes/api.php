<?php
require_once 'cors.php';


use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;


Route::prefix('api')->group(function () {
    Route::get('/menus', [MenuController::class, 'index']);
    Route::post('/menus', [MenuController::class, 'store']);
    Route::get('/menus/{menu}', [MenuController::class, 'show']);
    Route::post('/menus/{menu}/items', [MenuController::class, 'addItem']);
    Route::put('/menu-items/{menuItem}', [MenuController::class, 'updateItem']);
    Route::delete('/menu-items/{menuItem}', [MenuController::class, 'deleteItem']);
});