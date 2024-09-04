<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::with('rootItems')->get();
        return response()->json($menus);
    }

    public function show(Menu $menu)
    {
        $menu->load('items');
        return response()->json($menu);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $menu = Menu::create($validatedData);
        return response()->json($menu, 201);
    }

    public function addItem(Request $request, Menu $menu)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:menu_items,id',
        ]);

        $depth = 0;
        if ($validatedData['parent_id']) {
            $parent = MenuItem::findOrFail($validatedData['parent_id']);
            $depth = $parent->depth + 1;
        }

        $order = MenuItem::where('menu_id', $menu->id)
            ->where('parent_id', $validatedData['parent_id'])
            ->max('order') + 1;

        $menuItem = $menu->items()->create([
            'name' => $validatedData['name'],
            'parent_id' => $validatedData['parent_id'],
            'depth' => $depth,
            'order' => $order,
        ]);

        return response()->json($menuItem, 201);
    }
    public function moveItem(Request $request, MenuItem $menuItem)
       {
           $validatedData = $request->validate([
               'new_parent_id' => 'nullable|exists:menu_items,id',
           ]);

           $newParentId = $validatedData['new_parent_id'];
           $newDepth = 0;

           if ($newParentId) {
               $newParent = MenuItem::findOrFail($newParentId);
               $newDepth = $newParent->depth + 1;
           }

           $menuItem->update([
               'parent_id' => $newParentId,
               'depth' => $newDepth,
           ]);

           // Update depth for all child items
           $this->updateChildrenDepth($menuItem);

           return response()->json($menuItem);
       }

       private function updateChildrenDepth(MenuItem $parent)
       {
           $children = MenuItem::where('parent_id', $parent->id)->get();

           foreach ($children as $child) {
               $child->update(['depth' => $parent->depth + 1]);
               $this->updateChildrenDepth($child);
           }
       }

       public function bulkDelete(Request $request)
       {
           $validatedData = $request->validate([
               'item_ids' => 'required|array',
               'item_ids.*' => 'exists:menu_items,id',
           ]);

           MenuItem::whereIn('id', $validatedData['item_ids'])->delete();

           return response()->json(['message' => 'Items deleted successfully']);
       
        }

    public function updateItem(Request $request, MenuItem $menuItem)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $menuItem->update($validatedData);
        return response()->json($menuItem);
    }

    public function deleteItem(MenuItem $menuItem)
    {
        $menuItem->delete();
        return response()->json(null, 204);
    }
    public function reorderItems(Request $request, Menu $menu)
{
    $validatedData = $request->validate([
        'items' => 'required|array',
        'items.*.id' => 'required|exists:menu_items,id',
        'items.*.order' => 'required|integer|min:0',
    ]);

    foreach ($validatedData['items'] as $item) {
        MenuItem::where('id', $item['id'])
            ->where('menu_id', $menu->id)
            ->update(['order' => $item['order']]);
    }

    return response()->json(['message' => 'Items reordered successfully']);
}
}