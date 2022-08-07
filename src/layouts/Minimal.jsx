import { Outlet } from 'react-router-dom';

import constants from '../constants';
import './Minimal.scss';

const Minimal = () => {
  return (
    <main className="minimal-layout">
      <div className='scrollable'>
        <Outlet />
      </div>
    </main>
  );
};

export default Minimal;
