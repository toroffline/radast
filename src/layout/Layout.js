import { Outlet } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

import { useAppContext } from '../context/appContext';
import Header from '../components/header/Header';
import SideBar from '../components/sideBar/SideBar';

function Layout() {
    const { isMobile } = useAppContext();

    return (
        <>
            {!isMobile && (
                <div className="side-bar-toggle">
                    <button
                        type="button"
                        className="drawer-sidebar"
                        data-drawer-target="drawer-sidebar"
                        data-drawer-show="drawer-sidebar"
                        data-drawer-backdrop="true"
                    >
                        <FiMenu />
                    </button>
                </div>
            )}
            <SideBar />
            <div className="main">
                <Header />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
