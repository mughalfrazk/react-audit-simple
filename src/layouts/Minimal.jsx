import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Toaster from '../components/Toaster';
import './Minimal.scss';
import { setGlobalError } from '../redux/slices/local-slice';

const Minimal = () => {
  const dispatch = useDispatch();
  const globalError = useSelector(state => state.local.globalError)

  return (
    <main className="minimal-layout">
      <div className='scrollable'>
        <Outlet />
        <Toaster message={globalError} setClose={() => dispatch(setGlobalError(""))} />
      </div>
    </main>
  );
};

export default Minimal;
