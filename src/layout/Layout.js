import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import SideBar from '../components/sideBar/SideBar';
import { FiMenu } from 'react-icons/fi';

function Layout() {
    return (
        <>
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
            <SideBar />
            <div className="main">
                <Header />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
