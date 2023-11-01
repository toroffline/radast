import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import SideBar from '../components/sideBar/SideBar';

function Layout() {
    return (
        <>
            <SideBar />
            <div className="main">
                <Header />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
