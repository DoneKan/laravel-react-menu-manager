import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedMenuState } from '../../State/menuState';
import Button from '../Atoms/Button';

const SidebarLayout = ({ menus, children }) => {
  const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Sidebar */}
      <div className="w-60 bg-white rounded-3xl shadow-lg overflow-hidden border-t border-gray-200" style={{ height: '1032px', marginTop: '24px', marginLeft: '24px' }}>
        <div className="p-6">
          <h1 className="text-xl font-bold mb-6">Menu Management</h1>
          <Button className="w-full mb-6">Create New Menu</Button>
          <ul className="space-y-2">
            {menus && menus.length > 0 ? (
              menus.map((menu) => (
                <li key={menu.id}>
                  <button
                    onClick={() => setSelectedMenu(menu)}
                    className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 ${selectedMenu?.id === menu.id ? 'bg-gray-200' : ''}`}
                  >
                    {menu.name}
                  </button>
                </li>
              ))
            ) : (
              <li>No menus available</li>
            )}
          </ul>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 ml-6">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
