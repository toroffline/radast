import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './layout/Layout';
import './App.css';

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

    const UserRegister = lazy(() => import('./components/register/Register'));

    function WildCardRedirect() {
        return <Navigate to="/company/list" />;
    }

    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/company/list" element={<CompanyList />} />
                        <Route
                            path="/company/detail/:companyId"
                            element={<CompanyDetail />}
                        />
                        <Route path="*" element={<WildCardRedirect />} />
                    </Route>
                    <Route path="/user/register" element={<UserRegister />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

function Loading() {
    return <>loading...</>;
}

export default App;
