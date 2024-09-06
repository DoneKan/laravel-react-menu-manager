<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return response()->json(['message' => 'Welcome to the Menu Manager API']);
});
Route::get('/menus', [MenuController::class, 'index']);
Route::post('/menus', [MenuController::class, 'store']);
Route::get('/menus/{menu}', [MenuController::class, 'show']);
Route::post('/menus/{menu}/items', [MenuController::class, 'addItem']);
Route::post('/menu-items/{menuItem}/move', [MenuController::class, 'moveItem']);
Route::post('/menu-items/bulk-delete', [MenuController::class, 'bulkDelete']);
Route::put('/menu-items/{menuItem}', [MenuController::class, 'updateItem']);
Route::delete('/menu-items/{menuItem}', [MenuController::class, 'deleteItem']);
Route::post('/menus/{menu}/reorder', [MenuController::class, 'reorderItems']);