import React, { createContext, useContext, useEffect, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [header, setHeader] = useState();
    const [breadcrumb, setBreadcrumb] = useState();
    const [oneTimeRegister, setOneTimeRegister] = useState(false);

    function setLatestDisplayBreadcrumb(display) {
        breadcrumb &&
            breadcrumb.length > 0 &&
            setBreadcrumb((prev) => {
                const temp = [...prev];
                temp.forEach((b, index) => {
                    if (index === prev.length - 1) {
                        b.display = display;
                    }
                });
                return temp;
            });
    }

    useEffect(() => {
        if (oneTimeRegister) {
            navigate('/user/register-thankyou');
        }
    }, [oneTimeRegister]);

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
        <AppContext.Provider
            value={{
                header,
                breadcrumb,
                oneTimeRegister,
                setOneTimeRegister,
                setHeader,
                setLatestDisplayBreadcrumb,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
