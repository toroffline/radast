import { Sidebar } from 'flowbite-react';
import { FiBriefcase } from 'react-icons/fi';

const customTheme = {
    root: {
        base: 'h-screen',
        inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-gray-50 py-4 px-3 dark:bg-gray-800',
    },
};

function SideBar() {
    return (
        <Sidebar theme={customTheme} className="side-bar">
            <Sidebar.Logo href="/company/list" img="/favicon.ico">
                <p>Radast</p>
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
