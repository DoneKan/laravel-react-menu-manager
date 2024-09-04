import React from 'react';
import { RecoilRoot } from 'recoil';
import MenuManagement from './Pages/menuManagement';

const App = () => {
  return (
    <RecoilRoot>
      <MenuManagement />
    </RecoilRoot>
  );
};

export default App;
