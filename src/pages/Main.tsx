import { Outlet } from 'react-router-dom';

import { Navbar, Sidebar } from '../components';

const Main = () => {
  return (
    <>
      <Navbar />
      <main className='px-6 h-[calc(100vh-60px)] my-2 grid grid-cols-12 overflow-y-scroll'>
        <Sidebar />
        <div className='col-span-8 flex flex-col'>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Main;
