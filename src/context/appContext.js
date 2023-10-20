import React, { createContext, useContext, useEffect, useState } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

const AppContext = createContext();

const menus = [
    {
        name: 'company-list',
        breadcrumbDisplay: 'Company',
        display: 'Company',
        path: '/company/list',
        sub: [
            {
                name: 'company-detail',
                breadcrumbDisplay: 'Detail',
                display: 'Company Detail',
                path: '/company/detail/:companyId',
                show: false,
            },
        ],
    },
];

const AppProvider = ({ children }) => {
    const { pathname } = useLocation();
    const [header, setHeader] = useState();
    const [breadcrumb, setBreadcrumb] = useState();

    useEffect(() => {
        if (pathname) {
            let activeMenu;
            for (let menu of menus) {
                const rootMatch = matchPath(menu.path, pathname);
                if (rootMatch) {
                    activeMenu = {
                        display: menu.display,
                        path: pathname,
                        breadcrumbDisplay: menu.breadcrumbDisplay,
                    };
                    break;
                } else if (menu.sub) {
                    for (let s of menu.sub) {
                        const subMatch = matchPath(s.path, pathname);
                        if (subMatch) {
                            activeMenu = {
                                display: s.display,
                                path: pathname,
                                breadcrumbDisplay: s.breadcrumbDisplay,
                                parent: {
                                    path: menu.path,
                                    breadcrumbDisplay: menu.breadcrumbDisplay,
                                },
                            };
                            break;
                        }
                    }
                }
                if (!activeMenu) {
                    break;
                }
            }

            if (activeMenu) {
                setHeader(activeMenu.display);
                const breadcrumb = [
                    {
                        display: 'Home',
                        redirect: null,
                    },
                ];
                if (activeMenu.parent) {
                    breadcrumb.push({
                        display: activeMenu.parent.breadcrumbDisplay,
                        redirect: activeMenu.parent.path,
                    });
                }
                breadcrumb.push({
                    display: activeMenu.breadcrumbDisplay,
                    redirect: activeMenu.path,
                });
                setBreadcrumb(breadcrumb);
            }
        }
    }, [pathname]);

    return (
        <AppContext.Provider value={{ header, breadcrumb }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
