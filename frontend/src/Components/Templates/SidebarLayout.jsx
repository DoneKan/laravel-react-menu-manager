import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { menusState, selectedMenuIdState, selectedMenuState, fetchMenusSelector } from '../../State/menuState';
import Button from '../Atoms/Button';
import { FolderIcon, MenuIcon, ChevronDownIcon } from 'lucide-react';

const SidebarLayout = ({ children }) => {
    const [menus, setMenus] = useRecoilState(menusState);
    const [selectedMenuId, setSelectedMenuId] = useRecoilState(selectedMenuIdState);
    const selectedMenu = useRecoilValue(selectedMenuState);
    const fetchMenus = useRecoilValue(fetchMenusSelector);

    useEffect(() => {
        const loadMenus = async () => {
            const fetchedMenus = await fetchMenus;
            setMenus(fetchedMenus);
        };
        loadMenus();
    }, [fetchMenus, setMenus]);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex" style={{ height: 'calc(100vh - 48px)' }}>
                <Sidebar
                    menus={menus}
                    selectedMenuId={selectedMenuId}
                    setSelectedMenuId={setSelectedMenuId}
                />
                <MainContent selectedMenu={selectedMenu}>{children}</MainContent>
            </div>
        </div>
    );
};

const Sidebar = ({ menus, selectedMenuId, setSelectedMenuId }) => (
    <div className="bg-blueGray-900 text-white" style={{ width: '240px', color: '#101828', backgroundColor: '#101828' }}>
        <div className="p-6">
            <h1 className="text-xl font-bold mb-6">Menu Management</h1>
            <Button className="w-full mb-6">Create New Menu</Button>
            <MenuList
                menus={menus}
                selectedMenuId={selectedMenuId}
                setSelectedMenuId={setSelectedMenuId}
            />
        </div>
    </div>
);

const MenuList = ({ menus, selectedMenuId, setSelectedMenuId }) => (
    <ul className="space-y-2">
        {menus && menus.length > 0 ? (
            menus.map((menu) => (
                <li key={menu.id}>
                    <button
                        onClick={() => setSelectedMenuId(menu.id)}
                        className={`w-full text-left px-4 py-2 rounded-lg hover:bg-green focus:outline-none focus:ring-2 ${selectedMenuId === menu.id ? 'bg-green-500 text-white' : 'text-gray-300'
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
);

const MainContent = ({ children, selectedMenu }) => (
    <div className="flex-1 flex flex-col">
        <Header selectedMenu={selectedMenu} />
        <ContentArea>{children}</ContentArea>
    </div>
);

const Header = ({ selectedMenu }) => (
    <>
        <div className="border-b border-gray-200 flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-4">
                <FolderIcon className="h-6 w-6 text-blue-500" />
                <span>Menus</span>
            </div>
        </div>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
                <MenuIcon className="h-6 w-6 text-white-500" />
                <h3 className="text-2xl font-bold">{selectedMenu ? selectedMenu.name : 'Select a Menu'}</h3>
            </div>
        </div>
    </>
);
const ContentArea = ({ children }) => (
    <div className="flex-1 p-6 overflow-auto">
        <div className="flex">
            <div className="w-[349px] mr-8">
                <SystemManagementDropdown />
                <ExpandCollapseButtons />
                <SystemLayoutToggleBox />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    </div>
);

const SystemManagementDropdown = () => (
    <div className="mb-8">
        <div className="flex items-center gap-2 w-full">
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
);

const ExpandCollapseButtons = () => (
    <div className="mb-8">
        <div className="w-full bg-gray-100 p-1 rounded-full flex space-x-2">
            <button className="flex-1 bg-black text-white hover:text-green-700 focus:outline-none px-4 py-2 rounded-full transition duration-300 ease-in-out">
                Expand All
            </button>
            <button className="flex-1 bg-black text-white hover:text-red-700 hover:bg-white focus:outline-none px-4 py-2 rounded-full transition duration-300 ease-in-out">
                Collapse All
            </button>
        </div>
    </div>
);

const SystemLayoutToggleBox = () => (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-y-auto" style={{ height: '710px' }}>
        <div className="p-4">
        </div>
    </div>
);



export default SidebarLayout;