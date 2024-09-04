import React from 'react';
import SidebarLayout from '../Components/Templates/SidebarLayout';
import MenuList from '../Components/Organisms/menuList';
import { useRecoilValue } from 'recoil';
import { selectedMenuState } from '../State/menuState';

const sampleMenus = [
  { id: 1, name: 'Breakfast Menu', items: [{ id: 1, name: 'Pancakes' }, { id: 2, name: 'Omelette' }] },
  { id: 2, name: 'Lunch Menu', items: [{ id: 1, name: 'Burger' }, { id: 2, name: 'Salad' }] }
];

const MenuManagement = () => {
  const selectedMenu = useRecoilValue(selectedMenuState);

  return (
    <SidebarLayout menus={sampleMenus}>
      <MenuList selectedMenu={selectedMenu} />
    </SidebarLayout>
  );
};

export default MenuManagement;
