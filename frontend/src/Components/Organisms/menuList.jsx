import React from 'react';

const MenuList = ({ selectedMenu }) => {
  if (!selectedMenu) {
    return <p className="text-black">Select a menu from the sidebar to manage its items.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{selectedMenu.name}</h2>
      <ul className="list-disc list-inside">
        {selectedMenu.items && selectedMenu.items.length > 0 ? (
          selectedMenu.items.map((item) => (
            <li key={item.id} className="py-2">
              {item.name}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No items in this menu.</li>
        )}
      </ul>
    </div>
  );
};

export default MenuList;
