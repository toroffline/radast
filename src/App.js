import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './layout/Layout';
import './App.css';
import { AppProvider } from './context/appContext';

function App() {
    return (
        <div className="app">
            <Router />
        </div>
    );
}

function Router() {
    const CompanyList = lazy(() =>
        import('./components/company/list/CompanyList')
    );
    const CompanyDetail = lazy(() =>
        import('./components/company/detail/CompanyDetail')
    );
    const UserRegister = lazy(() => import('./pages/register/Register'));
    const RegisterThankyou = lazy(() =>
        import('./pages/register-thankyou/RegisterThankyou')
    );

    function WildCardRedirect() {
        return <Navigate to="/company/list" />;
    }

    return (
        <HashRouter basename="/radast">
            <AppProvider>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route element={<Layout />}>
                            <Route
                                path="/company/list"
                                element={<CompanyList />}
                            />
                            <Route
                                path="/company/detail/:companyId"
                                element={<CompanyDetail />}
                            />
                            <Route path="*" element={<WildCardRedirect />} />
                        </Route>
                        <Route
                            path="/user/register"
                            element={<UserRegister />}
                        />

                        <Route
                            path="/user/register-thankyou"
                            element={<RegisterThankyou />}
                        />
                    </Routes>
                </Suspense>
            </AppProvider>
        </HashRouter>
    );
}

function Loading() {
    return <>loading...</>;
}

export default App;
