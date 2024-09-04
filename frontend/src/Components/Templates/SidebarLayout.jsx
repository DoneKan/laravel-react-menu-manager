import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedMenuState } from '../../State/menuState';
import Button from '../Atoms/Button';
import { FolderIcon, MenuIcon, ChevronDownIcon } from 'lucide-react';

const SidebarLayout = ({ menus, children }) => {
    const [selectedMenu, setSelectedMenu] = useRecoilState(selectedMenuState);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex" style={{ height: 'calc(100vh - 48px)' }}>
                {/* Sidebar */}
                <div
                    className="bg-blueGray-900 text-white"
                    style={{
                        width: '240px',
                        color: '#101828',
                        backgroundColor: '#101828'
                    }}
                >
                    <div className="p-6">
                        <h1 className="text-xl font-bold mb-6">Menu Management</h1>
                        <Button className="w-full mb-6">Create New Menu</Button>
                        <ul className="space-y-2">
                            {menus && menus.length > 0 ? (
                                menus.map((menu) => (
                                    <li key={menu.id}>
                                        <button
                                            onClick={() => setSelectedMenu(menu)}
                                            className={`w-full text-left px-4 py-2 rounded-lg hover:bg-black focus:outline-none focus:ring-2 ${
                                                selectedMenu?.id === menu.id ? 'bg-black' : ''
                                            }`}
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

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Breadcrumb Header */}
                    <div className="border-b border-gray-200 flex justify-between items-center px-6 py-4">
                        <div className="flex items-center gap-4">
                            <FolderIcon className="h-6 w-6 text-blue-500" />
                            <span>Menus</span>
                        </div>
                    </div>

                    {/* Page Title */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <MenuIcon className="h-6 w-6 text-blue-500" />
                            <h3 className="text-2xl font-bold">Menus</h3>
                        </div>
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex-1 p-6 overflow-auto">
                        {/* System Management Dropdown */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 w-[349px]">
                                <input
                                    type="text"
                                    className="bg-white rounded-lg px-4 py-2 w-full text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="System Management"
                                />
                                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <ChevronDownIcon className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        {/* Expand/Collapse Buttons */}
                        <div className="mb-8">
                            <div className="w-[282px] flex space-x-2">
                                <button className="bg-gray-100 text-blue-500 hover:text-blue-700 focus:outline-none px-4 py-2 rounded-lg flex-1">Expand All</button>
                                <button className="bg-gray-100 text-blue-500 hover:text-blue-700 focus:outline-none px-4 py-2 rounded-lg flex-1">Collapse All</button>
                            </div>
                        </div>

                        {/* Main Content */}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarLayout;