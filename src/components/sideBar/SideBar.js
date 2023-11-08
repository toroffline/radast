import { Sidebar } from 'flowbite-react';
import { FiBriefcase, FiX } from 'react-icons/fi';
import './SideBar.css';

const customTheme = {
    root: {
        base: 'h-screen',
        inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800',
    },
};

function SideBar() {
    return (
        <Sidebar
            theme={customTheme}
            className="side-bar transition-transform left-0 top-0 -translate-x-full"
            id="drawer-sidebar"
        >
            <Sidebar.Logo href="/company/list" img="radast.png">
                <p>Radast</p>
                <button
                    type="button"
                    data-drawer-hide="drawer-sidebar"
                    className="close"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FiX />
                </button>
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/company/list" icon={FiBriefcase}>
                        <p>Company</p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

export default SideBar;
