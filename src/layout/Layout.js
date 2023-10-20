import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import SideBar from '../components/sideBar/SideBar';
import { AppProvider } from '../context/appContext';

function Layout() {
    return (
        <AppProvider>
            <SideBar />
            <div className="main">
                <Header />
                <Outlet />
            </div>
        </AppProvider>
    );
}

export default Layout;
