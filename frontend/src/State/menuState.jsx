import { atom, selector } from 'recoil';
import { getAllMenus, getMenu } from '../services/api';

export const menusState = atom({
  key: 'menusState',
  default: [],
});

export const selectedMenuIdState = atom({
  key: 'selectedMenuIdState',
  default: null,
});

export const selectedMenuState = selector({
  key: 'selectedMenuState',
  get: async ({get}) => {
    const menuId = get(selectedMenuIdState);
    if (!menuId) return null;
    try {
      const response = await getMenu(menuId);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu:', error);
      return null;
    }
  },
});

export const fetchMenusSelector = selector({
  key: 'fetchMenusSelector',
  get: async () => {
    try {
      const response = await getAllMenus();
      return response.data;
    } catch (error) {
      console.error('Error fetching menus:', error);
      return [];
    }
  },
});