import React from 'react';

const MenuList = ({ selectedMenu }) => {
  if (!selectedMenu) {
    return <p>Select a menu from the sidebar to manage its items.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{selectedMenu.name}</h2>
      <ul>
        {selectedMenu.items && selectedMenu.items.length > 0 ? (
          selectedMenu.items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))
        ) : (
          <li>No items in this menu.</li>
        )}
      </ul>
    </div>
  );
};

export default MenuList;
